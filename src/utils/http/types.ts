// 基本返回数据格式
export interface IBaseResponse<T = any> {
  /**
   * 状态码
   * @type { number }
   */
  code: number;

  /**
   * 消息
   * @type { string }
   */
  msg: string;

  /**
   * 数据
   * @type { T }
   */
  data: T;
}
