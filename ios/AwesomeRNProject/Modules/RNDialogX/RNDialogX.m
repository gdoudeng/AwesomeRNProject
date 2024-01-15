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
    QMUIAlertAction *action1 = [QMUIAlertAction actionWithTitle:@"取消"
                                                          style:QMUIAlertActionStyleCancel
                                                        handler:^(__kindof QMUIAlertController *_Nonnull aAlertController, QMUIAlertAction *_Nonnull action) {
    }];
    QMUIAlertAction *action2 = [QMUIAlertAction actionWithTitle:@"删除"
                                                          style:QMUIAlertActionStyleDestructive
                                                        handler:^(__kindof QMUIAlertController *_Nonnull aAlertController, QMUIAlertAction *_Nonnull action) {
    }];
    QMUIAlertAction *action3 = [QMUIAlertAction actionWithTitle:@""
                                                          style:QMUIAlertActionStyleDefault
                                                        handler:^(__kindof QMUIAlertController *_Nonnull aAlertController, QMUIAlertAction *_Nonnull action) {
    }];
    QMUIAlertController *alertController = [QMUIAlertController alertControllerWithTitle:@"确定删除？" message:@"删除后将无法恢复，请慎重考虑" preferredStyle:QMUIAlertControllerStyleAlert];

    [alertController addAction:action1];
    [alertController addAction:action2];
    [alertController addAction:action3];
    [alertController showWithAnimated:YES];
}

@end
