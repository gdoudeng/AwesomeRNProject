import AsyncStorage from "@react-native-async-storage/async-storage";

export const TOKEN_KEY = "X-FM-TOKEN";
// app首次打开隐私弹窗
export const APP_PRIVACY_KEY = "X-App-Privacy";

export default class UserDao {
  // 保存用户token
  static saveUserToken(token: string) {
    AsyncStorage.setItem(TOKEN_KEY, token);
  }

  // 获取用户token
  static async getUserToken() {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (e) {
      return "";
    }
  }

  static async clearUserToken() {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, "");
    } catch (e) {
      console.log(e);
    }
  }

  static setAppPrivacyFlag(value: string) {
    AsyncStorage.setItem(APP_PRIVACY_KEY, value);
  }

  /**
   * 应用首次打开 弹出隐私弹窗
   */
  static async getAppPrivacyFlag() {
    try {
      return await AsyncStorage.getItem(APP_PRIVACY_KEY);
    } catch (e) {
      return "";
    }
  }
}

