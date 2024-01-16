//
//  RNDialogX.m
//  AwesomeRNProject
//
//  Created by dwb on 2024/1/15.
//

#import "QMUIAlertController.h"
#import "QMUITips.h"
#import "RNDialogX.h"
#import "Utility.h"

@interface RNDialogX ()

@property (nonatomic, strong) QMUITips *tips;

@end

@implementation RNDialogX

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

// To export a module named RNDialogX
RCT_EXPORT_MODULE();

#pragma mark - 显示Loading
RCT_EXPORT_METHOD(showLoading:(NSString *)content) {
    [self hideAnimated:NO];

    UIView *view = [Utility keyWindow].rootViewController.view;

    if (content.length == 0) {
        self.tips = [QMUITips showLoadingInView:view];
    } else {
        self.tips = [QMUITips showLoading:content inView:view];
    }
}

RCT_EXPORT_METHOD(dismissLoading) {
    [self hideAnimated:YES];
}

- (void)hideAnimated:(BOOL)animated {
    if (self.tips) {
        [self.tips hideAnimated:animated];
        self.tips = nil;
    }
}

#pragma mark - 显示Tips
RCT_EXPORT_METHOD(showTipDialog:(NSString *)content with:(nonnull NSNumber *)type and:(nonnull NSNumber *)duration) {
    UIView *view = [Utility keyWindow].rootViewController.view;
    // 获取 NSNumber 对象的整数值
    NSInteger typeValue = [type integerValue];
    NSTimeInterval delay = [duration doubleValue] / 1000.0;

    if (typeValue == WAIT_DIALOG_X_TYPE_SUCCESS) {
        [QMUITips showSucceed:content inView:view hideAfterDelay:delay];
    } else if (typeValue == WAIT_DIALOG_X_TYPE_WARNING) {
        [QMUITips showInfo:content inView:view hideAfterDelay:delay];
    } else if (typeValue == WAIT_DIALOG_X_TYPE_ERROR) {
        [QMUITips showError:content inView:view hideAfterDelay:delay];
    }
}

#pragma mark - 显示对话框
RCT_EXPORT_METHOD(showMessageDialog:(NSDictionary *)options with:(RCTResponseSenderBlock)callback) {
    QMUIAlertAction *actionCancel;
    QMUIAlertAction *actionOK;
    QMUIAlertAction *actionOther;

    NSString *okText = [options objectForKey:@"okText"];
    NSString *cancelText = [options objectForKey:@"cancelText"];
    NSString *otherText = [options objectForKey:@"otherText"];

    if (cancelText != nil) {
        actionCancel = [QMUIAlertAction actionWithTitle:cancelText
                                                  style:QMUIAlertActionStyleCancel
                                                handler:^(__kindof QMUIAlertController *_Nonnull aAlertController, QMUIAlertAction *_Nonnull action) {
            callback(@[@(DIALOG_X_BUTTON_SELECT_RESULTButtonCancel)]);
        }];
    }

    if (okText != nil) {
        actionOK = [QMUIAlertAction actionWithTitle:okText
                                              style:cancelText != nil ?
                    QMUIAlertActionStyleDestructive : QMUIAlertActionStyleCancel
                                            handler:^(__kindof QMUIAlertController *_Nonnull aAlertController, QMUIAlertAction *_Nonnull action) {
            callback(@[@(DIALOG_X_BUTTON_SELECT_RESULTButtonOK)]);
        }];
    }

    if (otherText != nil) {
        actionOther = [QMUIAlertAction actionWithTitle:otherText
                                                 style:QMUIAlertActionStyleCancel
                                               handler:^(__kindof QMUIAlertController *_Nonnull aAlertController, QMUIAlertAction *_Nonnull action) {
            callback(@[@(DIALOG_X_BUTTON_SELECT_RESULTButtonOther)]);
        }];
    }

    QMUIAlertController *alertController = [QMUIAlertController alertControllerWithTitle:[options objectForKey:@"title"] message:[options objectForKey:@"content"] preferredStyle:QMUIAlertControllerStyleAlert];

    if (actionCancel != nil) {
        [alertController addAction:actionCancel];
    }

    if (actionOK != nil) {
        [alertController addAction:actionOK];
    }

    if (actionOther != nil) {
        [alertController addAction:actionOther];
    }

    [alertController showWithAnimated:YES];
}

@end
