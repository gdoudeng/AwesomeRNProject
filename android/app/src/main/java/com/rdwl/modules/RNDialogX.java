package com.rdwl.modules;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.kongzue.dialogx.dialogs.MessageDialog;
import com.kongzue.dialogx.dialogs.WaitDialog;
import com.kongzue.dialogx.interfaces.BaseDialog;
import com.kongzue.dialogx.interfaces.DialogLifecycleCallback;

/**
 * android封装的是DialogX
 * {@see https://github.com/kongzue/DialogX/wiki/%E5%9F%BA%E7%A1%80%E5%AF%B9%E8%AF%9D%E6%A1%86-MessageDialog-%E5%92%8C-%E8%BE%93%E5%85%A5%E5%AF%B9%E8%AF%9D%E6%A1%86-InputDialog}
 */
public class RNDialogX extends ReactContextBaseJavaModule {
    private static final String TAG = "RNDialogX";

    public RNDialogX(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return TAG;
    }

    @ReactMethod
    public void showLoading(String content) {
        WaitDialog.show(content);
    }

    @ReactMethod
    public void dismissLoading() {
        WaitDialog.dismiss();
    }

    @ReactMethod
    public void showMessageDialog(ReadableMap options, final Callback callback) {
        MessageDialog mMessageDialog = MessageDialog.build();
        try {
            applyOptions(mMessageDialog, options);
        } catch (Exception e) {
            callback.invoke(BaseDialog.BUTTON_SELECT_RESULT.NONE);
            return;
        }

        // 在 onDismiss 中获取用户选择进行统一处理，以防止编写大量可能在不同选择下都要处理的重复代码
        mMessageDialog.setDialogLifecycleCallback(new DialogLifecycleCallback<MessageDialog>() {
                    @Override
                    public void onDismiss(MessageDialog dialog) {
                        // 对话框关闭时回调
                        callback.invoke(dialog.getButtonSelectResult());
                    }
                })
                .show();
    }

    private void applyOptions(MessageDialog messageDialog, ReadableMap options) {
        ReadableMapKeySetIterator iterator = options.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();

            switch (key) {
                case "title" -> messageDialog.setTitle(options.getString("title"));
                case "content" -> messageDialog.setMessage(options.getString("content"));
                case "okText" -> messageDialog.setOkButton(options.getString("okText"));
                case "cancelText" -> messageDialog.setCancelButton(options.getString("cancelText"));
                case "otherText" -> messageDialog.setOtherButton(options.getString("otherText"));
            }
        }
    }
}
