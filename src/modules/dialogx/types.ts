/**
 * android封装的是DialogX
 * ios封装的是QMUI
 */
export interface IDialogX {
  /**
   * 显示加载中
   * {@link https://github.com/kongzue/DialogX/wiki/%E7%AD%89%E5%BE%85%E6%A1%86-WaitDialog-%E5%92%8C%E6%8F%90%E7%A4%BA%E6%A1%86-TipDialog}
   * @param {string} content 加载中的文案 如果是空字符串那么不显示文案
   */
  showLoading: (content: string) => void;

  /**
   * 隐藏加载中
   */
  dismissLoading: () => void;

  /**
   * 显示一个提示框
   * @param {string} content 提示框的文案
   * @param {WaitDialogXType} type 提示框 TipDialog 分为三种样式，完成（SUCCESS）、警告（WARNING）和错误（ERROR）
   * @param {number} duration 提示框默认在显示 1.5 秒后会自动消失，你可以通过以下方法来自定义显示时间（毫秒）
   */
  showTipDialog: (content: string, type?: WaitDialogXType, duration?: number) => void;

  /**
   * 显示一个对话框
   * @param {string} title        对话框的标题
   * @param {string} content      对话框的内容
   * @param {string} okText       对话框的确定按钮文案
   * @param {string} cancelText   对话框的取消按钮文案
   * @returns {Promise<BUTTON_SELECT_RESULT>}
   */
  showMessageDialog: (title?: string, content?: string, okText?: string, cancelText?: string) => Promise<BUTTON_SELECT_RESULT>;
}

/**
 * 完成（SUCCESS）、警告（WARNING）和错误（ERROR）
 */
export const enum WaitDialogXType {
  SUCCESS,
  WARNING,
  ERROR,
}

export const enum BUTTON_SELECT_RESULT {
  NONE,           // 未做出选择
  BUTTON_OK,      // 选择了确定按钮
  BUTTON_CANCEL,  // 选择了取消按钮
  BUTTON_OTHER    // 选择了其他按钮
}
