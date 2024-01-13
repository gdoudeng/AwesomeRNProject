import AsyncStorage from "@react-native-async-storage/async-storage";

export const TOKEN_KEY = "X-FM-TOKEN";

class UserDao {
  private _token = "";

  get token(): string {
    return this._token;
  }

  set token(token: string) {
    this._token = token;
    AsyncStorage.setItem(TOKEN_KEY, token);
  }

  // 获取用户token
  async getUserToken() {
    try {
      this._token = await AsyncStorage.getItem(TOKEN_KEY) || "";
    } catch (e) {
      this._token = "";
    }
    return this._token;
  }

  clearUserToken() {
    this.token = "";
  }
}

export const userDao = new UserDao();

