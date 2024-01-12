import { Dimensions } from "react-native";

/**
 * 判断是否是手机号
 * @param phone
 * @return boolean 是就返回true
 */
export function checkPhone(phone: string): boolean {
  return /^1[3456789]\d{9}$/.test(phone);
}

// 判断是否是标点符号 包括空格和换行
export function checkPunctuation(str: string) {
  return /[-`~!@#$^&*()=|{}':;,\[\].<>\/?！￥…（）—【】‘；：”“。，、？《》]|[ ]|[\r\n]/.test(str);
}

export function getScreenHeight(): number {
  return Dimensions.get("window").height;
}

export function getScreenWidth(): number {
  return Dimensions.get("window").width;
}

// 2. shallow compare 只做第一层数据的查询，跳过数组、对象、方法
// https://juejin.cn/post/6857022433845772296
export function isObjShallowEqual(obj1: object, obj2: object) {
  const keys1 = Object.getOwnPropertyNames(obj1);
  const keys2 = Object.getOwnPropertyNames(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  // if found unequal, then return false, which means unequal
  return keys1.every(key => {
    // @ts-ignore
    const type = typeof obj1[key];
    // do not check function, array, object
    if (["function", "array", "object"].includes(type)) {
      // @ts-ignore
      return type === typeof obj2[key];
    }
    // if unequal, return true
    // @ts-ignore
    return obj1[key] === obj2[key];

  });
}
