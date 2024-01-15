//
//  Utility.m
//  shootingV4
//
//  Created by Mac on 2020/5/26.
//

#import "Utility.h"

@implementation Utility

static NSString *plistName = @"RNPList";

#pragma mark - 写入plist文件
+ (void)writeDicToPlist:(NSDictionary *)dict {
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *path = [paths objectAtIndex:0];
    NSString *filePath = [path stringByAppendingPathComponent:[NSString stringWithFormat:@"%@.plist", plistName]];

    [dict writeToFile:filePath atomically:YES];
}

#pragma mark - 读取plist文件
+ (NSDictionary *)readFromPlist {
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *path = [paths objectAtIndex:0];
    NSString *filePath = [path stringByAppendingPathComponent:[NSString stringWithFormat:@"%@.plist", plistName]];

    return [NSDictionary dictionaryWithContentsOfFile:filePath];
}

#pragma mark - 根据路径获取文件名
+ (NSString *)showFileNameFromPath:(NSString *)path {
    return [NSString stringWithFormat:@"%@", [[path componentsSeparatedByString:@"/"] lastObject]];
}

+ (UIWindow *)keyWindow {
    NSArray<UIWindow *> *windows = [[UIApplication sharedApplication] windows];

    for (UIWindow *window in windows) {
        if (window.isKeyWindow) {
            return window;
        }
    }

    return nil;
}

@end
