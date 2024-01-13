import { CFetch, interceptors } from "./fetch";
import { userDao } from "@src/dao/UserDao";
import { IBaseResponse } from "@src/utils/http/types";

const defaultConfig = {
  baseURL: __DEV__ ? "https://recite.dev.tcpsapp.com/admin" : "https://recite.tcpsapp.com/admin",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
};

const ErrorMsgMap = {
  3: "没有操作权限，请重新登录！",
  8: "当前账号在其他地方登陆，请重新登陆！",
  7: "登陆失效，请重新登陆！",
  105: "该用户未在平台上注册，请重新登陆！"
};

// 添加请求拦截器
interceptors.request.use(config => {
  // 这里是我项目使用到的js-cookie库，主要是为了拿到token，你们这里改成你们获取token的方式即可
  const token = userDao.token;
  config.headers = defaultConfig.headers;
  if (token) {
    config.headers["X-FM-Token"] = token;
  }
  return config;
});

// 添加响应拦截器
interceptors.response.use(
  response => {
    if (response && response.code !== 1) {
      const errorMsg =
        response && response.data && response.data.errors
          ? response.data.errors.join(",")
          : response.msg;
      return Promise.reject(new Error(errorMsg || "Error"));
    }
    if (response) {
      return response;
    }
    return Promise.reject("服务器繁忙，请稍后重试");
  },
  error => {
    // 所有的响应异常 区分来源为取消请求/非取消请求
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

/**
 * GET 请求时，拼接请求URL
 * @param url 请求URL
 * @returns {*}
 */
const handleUrl = (url: string): any => (params: Record<string, any>) => {
  if (params) {
    let paramsArray: Array<string> = [];
    Object.keys(params).forEach(key => {
      if (params[key] != null || params[key] != undefined) {
        paramsArray.push(key + "=" + encodeURIComponent(params[key]));
      }
    });
    if (url.search(/\?/) === -1) {
      typeof (params) === "object" ? url += "?" + paramsArray.join("&") : url;
    } else {
      url += "&" + paramsArray.join("&");
    }
  }
  return url;
};

// get请求方法使用封装
export function get<T>(url: string, params = {}): Promise<IBaseResponse<T>> {
  return CFetch<T>(handleUrl(defaultConfig.baseURL + url)(params), {
    method: "GET"
  });
}

// post请求方法使用封装
export function post<T>(url: string, data = {}): Promise<IBaseResponse<T>> {
  return CFetch<T>(defaultConfig.baseURL + url, {
    method: "POST",
    body: JSON.stringify(data)
  });
}


