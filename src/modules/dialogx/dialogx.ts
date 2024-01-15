import { BUTTON_SELECT_RESULT, IDialogX, IMessageDialogOptions, WaitDialogXType } from "./types";
import { NativeModules } from "react-native";

const RNDialogX = NativeModules.RNDialogX;

class DialogX implements IDialogX {
  showLoading(content = ""): void {
    RNDialogX.showLoading(content);
  }

  dismissLoading(): void {
    RNDialogX.dismissLoading();
  }

  showTipDialog(content: string, type = WaitDialogXType.SUCCESS, duration = 1500): void {
    RNDialogX.showTipDialog(content, type, duration);
  }

  showSelectDialog(options: IMessageDialogOptions | string): Promise<BUTTON_SELECT_RESULT> {
    const newOptions = typeof options === "string" ? {
      content: options,
      title: "提示",
      okText: "确定",
      cancelText: "取消"
    } : options;
    return new Promise(resolve => {
      RNDialogX.showMessageDialog(newOptions, (result: BUTTON_SELECT_RESULT) => {
        resolve(result);
      });
    });
  }

  showMessageDialog(options: IMessageDialogOptions | string): Promise<BUTTON_SELECT_RESULT> {
    const newOptions = typeof options === "string" ? {
      content: options,
      title: "提示",
      okText: "确定"
    } : options;
    return new Promise(resolve => {
      RNDialogX.showMessageDialog(newOptions, (result: BUTTON_SELECT_RESULT) => {
        resolve(result);
      });
    });
  }
}

export const dialogx = new DialogX();
