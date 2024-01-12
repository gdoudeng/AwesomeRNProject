export interface IIsLoginData {
  isLogin: boolean,
  token?: string
}

/**
 * 用户信息
 */
export interface IUserInfoData {
  // 是否绑定微信
  isBindingWx: boolean,
  // 手机号
  phone: string,
  user?: {
    createtime: string,
    creatorid: number,
    edittime: string,
    editorid: number,
    isdelete: boolean,
    islockup: boolean,
    version: number,
    id: number,
    userId: number,
    name: string,
    sex: number,
    invitationCode: string,
    balance: number,
    allVip: boolean
  },
  // 是否是会员
  isVip: boolean,
  // 会员过期时间
  endTime?: string,
  // 是否是终身会员
  isAllVip?: boolean
}


