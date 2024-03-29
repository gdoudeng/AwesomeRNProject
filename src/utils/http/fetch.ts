/**
 * Cfetch
 * 基于原生fetch封装了拦截器功能，暴露出来的Cfetch跟原生fetch用法一致，只是增加了拦截器功能。拦截器用法参考axios的拦截器用法。
 * 拦截器: interceptors
 */
import { IBaseResponse } from "@src/utils/http/types";

// 定义用来存储拦截请求和拦截响应结果的处理和错误结果处理的函数集合
const interceptorsReq = [];
const interceptorsRes = [];
const interceptorsResError = [];

/**
 * fetch 网络请求超时处理
 * @param originalFetch 原始的fetch
 * @param timeout 超时时间 10s
 * @returns {Promise.<*>}
 */
const fetchWithTimeout = (originalFetch: Promise<Response>, timeout = 10000): Promise<Response> => {
  let timeoutBlock = null;
  const timeoutPromise = new Promise<Response>((resolve, reject) => {
    timeoutBlock = () => {
      // 请求超时处理
      reject("请求超时，请稍后重试");
    };
  });

  // Promise.race(iterable)方法返回一个promise
  // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
  const abortPromise = Promise.race([
    originalFetch,
    timeoutPromise
  ]);

  setTimeout(() => { timeoutBlock && timeoutBlock(); }, timeout);

  return abortPromise;
};


export function CFetch<T>(input: string, init: RequestInit = {}): Promise<IBaseResponse<T>> {
  // interceptorsReq是拦截请求的拦截处理函数集合
  interceptorsReq.forEach(interceptor => {
    init = interceptor(init);
  });

  // 在原生fetch外面封装一个promise，为了在promise里面可以对fetch请求的结果做拦截处理。
  // 同时，保证Cfetch函数返回的结果是个promise对象。
  return new Promise((resolve, reject) => {
    // 发起fetch请求，fetch请求的形参是接收上层函数的形参
    fetchWithTimeout(fetch(input, init))
      .then(res => {
        if (res && res.status >= 200 && res.status < 400) {
          return res.json();
        } else {
          reject("服务器繁忙，请稍后重试");
        }
      })
      .then(res => {
        // interceptorsRes是拦截响应结果的拦截处理函数集合
        interceptorsRes.forEach(interceptor => {
          // 拦截器对响应结果做处理，把处理后的结果返回给响应结果。
          res = interceptor(res);
        });
        // 将拦截器处理后的响应结果resolve出去
        resolve(res);
      })
      .catch(err => {
        // interceptorsResError是拦截响应错误结果的拦截处理函数集合
        interceptorsResError.forEach(interceptor => {
          // 拦截器对响应错误结果做处理，把处理后的结果返回给响应结果。
          err = interceptor(err);
        });
        reject(err);
      });
  });
}

// interceptors拦截器提供request和response两种拦截器功能。
// 可以通过request和response的use方法来绑定两种拦截器的处理函数。
// use方法接收两个参数，参数为一个callback函数，callback函数用来作为拦截器的成功处理函数，errorCallback作为错误处理函数
// request.use方法会把callback放在interceptorsReq中，等待执行。
// response.use方法会把callback放在interceptorsRes中，等待执行。
// 拦截器的处理函数callback接收一个参数。
// request拦截器的callback接收的是请求发起前的config；
// response拦截器的callback接收的是网络请求的response结果。
export const interceptors = {
  request: {
    use(callback: (init: RequestInit) => RequestInit) {
      interceptorsReq.push(callback);
    }
  },
  response: {
    use(callback: (res: IBaseResponse) => any, errorCallback: (err: string) => any) {
      interceptorsRes.push(callback);
      errorCallback && interceptorsResError.push(errorCallback);
    }
  }
};

