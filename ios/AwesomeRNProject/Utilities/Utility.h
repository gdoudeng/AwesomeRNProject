//
//  Utility.h
//  shootingV4
//
//  Created by Mac on 2020/5/26.
//
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface Utility : NSObject

// 读取plist文件
+ (NSDictionary *)readFromPlist;

// 根据路径获取文件名
+ (NSString *)showFileNameFromPath:(NSString *)path;

// 写入plist文件
+ (void)writeDicToPlist:(NSDictionary *)dict;

+ (UIWindow *)keyWindow;

@end
