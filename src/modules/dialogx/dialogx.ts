import { BUTTON_SELECT_RESULT, IDialogX, WaitDialogXType } from "./types";
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

  showMessageDialog(title = "提示", content?: string, okText = "确定", cancelText = "取消"): Promise<BUTTON_SELECT_RESULT> {
    return new Promise(resolve => {
      RNDialogX.showMessageDialog(title, content, okText, cancelText, (result: BUTTON_SELECT_RESULT) => {
        resolve(result);
      });
    });
  }
}

export const dialogx = new DialogX();
