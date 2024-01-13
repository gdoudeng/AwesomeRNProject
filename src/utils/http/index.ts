import { IBaseResponse } from "@src/utils/http/types";
import type { MiddleWare, RequestOptions } from "@cyzeal/fetch-onion-model";
import { create } from "@cyzeal/fetch-onion-model";
import timeout from "@cyzeal/fetch-onion-model/lib/middleware/timeout.js";
import { userDao } from "@src/dao/UserDao";
import { Alert } from "react-native";
import { reset } from "@src/navigation/RootNavigation";

const defaultConfig: RequestOptions = {
  baseUrl: __DEV__ ? "https://recite.dev.tcpsapp.com/admin" : "https://recite.tcpsapp.com/admin",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
};

const reportMiddleware: MiddleWare = async (ctx, next) => {
  console.log(`${ctx.method} ${ctx.url}`);
  await next();
  console.log(`${ctx.method} ${ctx.url} done. status: ${ctx.status}`);
};

const interceptorsRequestMiddleware: MiddleWare = async (ctx, next) => {
  if (userDao.token) {
    ctx.options.headers = {
      "Content-Type": "application/json",
      "X-FM-TOKEN": userDao.token
    };
  } else {
    ctx.options.headers = {
      "Content-Type": "application/json"
    };
  }
};

const interceptorsResponseMiddleware: MiddleWare = async (ctx, next) => {
  await next();

};

class Http {
  private static instance = create(defaultConfig, [reportMiddleware, interceptorsRequestMiddleware, timeout(10000), interceptorsResponseMiddleware]);

  request<T = any>(url: string, requestOptions: RequestOptions<IBaseResponse<T>>): Promise<IBaseResponse<T>> {
    return new Promise((resolve, reject) => {
      Http.instance<IBaseResponse<T>>(url, requestOptions)
        .then((res) => {
          this.handleResponse<T>(url, res, resolve, reject);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  private handleResponse<T = any>(url: string, response: IBaseResponse, resolve: (value: IBaseResponse<T> | PromiseLike<IBaseResponse<T>>) => void, reject: (reason?: any) => void) {
    // response.code：是与服务器端约定code：1表示请求成功，非1表示请求失败，msg：请求失败内容
    if (response && response.code === 1) {
      // 设置token
      if (response && response.data && response.data.token) {
        userDao.token = response.data.token;
      }
      resolve(response);
    } else if (response && response.code === 3 && response.msg && response.msg.includes("没有权限") && url !== "/security/logout") {
      Alert.alert(
        "提示",
        "登陆过期，请重新登陆 :)",
        [
          {
            text: "确定", onPress: async () => {
              userDao.clearUserToken();
              reset("Login");
            }
          }
        ],
        { cancelable: false }
      );
      reject(response.data && response.data.errors ? response.data.errors.join(",") : response.msg);
    } else if (response && [7, 8].includes(response.code) && url !== "/security/logout") {
      Alert.alert(
        "提示",
        response.code === 7 ? "登陆失效，请重新登陆！" : "当前账号在其他地方登陆，请重新登陆！",
        [
          {
            text: "确定", onPress: async () => {
              userDao.clearUserToken();
              reset("Login");
            }
          }
        ],
        { cancelable: false }
      );
      reject(response.code === 7 ? "登陆失效，请重新登陆！" : "当前账号在其他地方登陆，请重新登陆！");
    } else {
      reject(response.data && response.data.errors ? response.data.errors.join(",") : response.msg);
    }
  }

  async get<T>(url: string, params?: Record<string, unknown>) {
    return await this.request<T>(url, {
      method: "GET",
      params
    });
  }

  async post<T>(url: string, data?: Record<string, unknown>) {
    return await this.request<T>(url, {
      method: "POST",
      data
    });
  }
}

export const http = new Http();

