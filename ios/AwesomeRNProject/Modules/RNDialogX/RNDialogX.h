//
//  RNDialogX.h
//  AwesomeRNProject
//
//  Created by dwb on 2024/1/15.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * 完成（SUCCESS）、警告（WARNING）和错误（ERROR）
 */
typedef NS_ENUM(NSInteger, WAIT_DIALOG_X_TYPE) {
    WAIT_DIALOG_X_TYPE_SUCCESS,
    WAIT_DIALOG_X_TYPE_WARNING,
    WAIT_DIALOG_X_TYPE_ERROR,
};

typedef NS_ENUM(NSInteger, DIALOG_X_BUTTON_SELECT_RESULT) {
    DIALOG_X_BUTTON_SELECT_RESULTNone,        // 未做出选择
    DIALOG_X_BUTTON_SELECT_RESULTButtonOK,    // 选择了确定按钮
    DIALOG_X_BUTTON_SELECT_RESULTButtonCancel, // 选择了取消按钮
    DIALOG_X_BUTTON_SELECT_RESULTButtonOther  // 选择了其他按钮
};


@interface RNDialogX : NSObject <RCTBridgeModule>

@end

NS_ASSUME_NONNULL_END
