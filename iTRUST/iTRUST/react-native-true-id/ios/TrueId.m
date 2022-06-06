#import "TrueId.h"
#import <UIKit/UIKit.h>
#import <TrueIDSDK/TrueIDSDK.h>

@implementation TrueId

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(configure:(NSDictionary*)data) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (@available(iOS 11, *)) {
            NSString *domain = [data objectForKey:@"domain"];
            NSString *domainPath = [data objectForKey:@"domainPath"];
            NSString *authDomain = [data objectForKey:@"authDomain"];
            NSString *authDomainPath = [data objectForKey:@"authDomainPath"];
            NSString *appId = [data objectForKey:@"appId"];
            NSString *appSecret = [data objectForKey:@"appSecret"];

            ConfigInfo *configInfo;
            NSString *zoomLicenseKey = [data objectForKey:@"zoomLicenseKey"];
            NSString *zoomServerBaseURL = [data objectForKey:@"zoomServerBaseURL"];
            NSString *zoomPublicKey = [data objectForKey:@"zoomPublicKey"];

            NSString *zoomAuthURL = [data objectForKey:@"zoomAuthURL"];
             NSString *accessToken = [data objectForKey:@"accessToken"];
            NSString *language = [data objectForKey:@"language"];
            NSString *themeColor = [data objectForKey:@"themeColor"];


            configInfo = [[ConfigInfo alloc] initWithDomain:domain domainPath:domainPath authDomain:authDomain authDomainPath:authDomainPath appId:appId appSecret:appSecret zoomLicenseKey:zoomLicenseKey zoomServerBaseURL: zoomServerBaseURL zoomPublicKey:zoomPublicKey zoomAuthURL:zoomAuthURL zoomClient:@"" accessToken:accessToken];

            ColorConfig *colorConfig;
            colorConfig =  [[ColorConfig alloc] initWithJsonString: themeColor];

            [TrueID setLanguageWithLanguage: language];

            [TrueID configureWithConfigInfo:configInfo configColor: colorConfig];
        }
        else {
            [self showAlert:@"trueID doesn't support iOS less than 9"];
        }
    });
}

RCT_EXPORT_METHOD(start:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (@available(iOS 9, *)) {
            [TrueID startWithListener:^(CardInfo * _Nonnull cardInfo) {
                if (callback) {
                    NSMutableDictionary *res = [NSMutableDictionary new];
                    // person
                    NSString * base64String;
                    if (cardInfo.person) {
                        if (cardInfo.person.selfie) {
                            NSData *imageData = UIImagePNGRepresentation(cardInfo.person.selfie);
                            base64String = [imageData base64EncodedStringWithOptions:0];
                        }
                        else {
                            base64String = @"";
                        }
                        
                        res[@"person"] = @{
                            @"idNumber": cardInfo.person.idNumber ? cardInfo.person.idNumber : @"",
                            @"gender": cardInfo.person.gender ? cardInfo.person.gender : @"",
                            @"dob": cardInfo.person.dob ? cardInfo.person.dob : @"",
                            @"fullname": cardInfo.person.fullname ? cardInfo.person.fullname : @"",
                            @"address": cardInfo.person.address ? cardInfo.person.address : @"",
                            @"givenPlace": cardInfo.person.givenPlace ? cardInfo.person.givenPlace : @"",
                            @"doi": cardInfo.person.doi ? cardInfo.person.doi : @"",
                            @"origin": cardInfo.person.origin ? cardInfo.person.origin : @"",
                            @"dueDate": cardInfo.person.dueDate ? cardInfo.person.dueDate : @"", 
                            @"selfie": base64String
                        };
                    }
                    else {
                        res[@"person"] = @{
                            @"idNumber": @"",
                            @"gender": @"",
                            @"dob": @"",
                            @"fullname": @"",
                            @"address": @"",
                            @"givenPlace": @"",
                            @"doi": @"",
                            @"origin": @"",
                            @"dueDate": @"",
                            @"selfie": @""
                        };
                    }
                    
                    // record
                    NSArray *recordTypes = @[
                        @"ocrScan",
                        @"livenessDetection",
                        @"faceComparision",
                        @"idVerification",
                         @"faceVerification",
                    ];
                    NSMutableDictionary *records = [NSMutableDictionary new];
                    for(NSInteger i=0; i<recordTypes.count; i++) {
                        NSString *type = recordTypes[i];
                        CheckingRecord *r = [cardInfo getRecordWithType:i];
                        if (r) {
                            records[type] = @{
                                @"name": r.name,
                                @"message": r.message,
                                @"type": [NSNumber numberWithInt:(int)r.type],
                                @"status": [NSNumber numberWithBool:r.status]
                            };
                        }
                        else {
                            records[type] = @{
                                @"name": @"",
                                @"message": @"",
                                @"type": @0,
                                @"status": @NO
                            };
                        }
                    }
                    res[@"records"] = records;
              
                    
                    // front image
                    if (cardInfo.frontCardImage) {
                        NSData *imageData = UIImagePNGRepresentation(cardInfo.frontCardImage);
                        base64String = [imageData base64EncodedStringWithOptions:0];
                        res[@"frontCardImage"] = base64String;
                    }
                    else {
                        res[@"frontCardImage"] = @"";
                    }
                    res[@"requestId"] = cardInfo.requestId;
                    
                    // back image
                    if (cardInfo.backCardImage) {
                        NSData *imageData = UIImagePNGRepresentation(cardInfo.backCardImage);
                        base64String = [imageData base64EncodedStringWithOptions:0];
                        res[@"backCardImage"] = base64String;
                    }
                    else {
                        res[@"backCardImage"] = @"";
                    }

                    // result
                    if (cardInfo.result) {
                        res[@"result"] = cardInfo.result;
                    }
                    else {
                        res[@"result"] = @{};
                    }
                    
                    callback(@[res]);
                }
            }];
        }
        else {
            [self showAlert:@"trueID doesn't support iOS less than 11"];
        }
    });
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(requestId) {
    return [TrueID requestId];
}
    

RCT_EXPORT_METHOD(setLanguage:(NSDictionary*)data) {
NSString *language = [data objectForKey:@"language"];
 [TrueID setLanguageWithLanguage: language];
}

- (void)showAlert:(NSString*)message {
    UIViewController *root = [UIApplication sharedApplication].delegate.window.rootViewController;
    if (root) {
        UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"trueID" message:message preferredStyle:UIAlertControllerStyleAlert];
        [alert addAction:[UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleCancel handler:nil]];
        
        [root presentViewController:alert animated:YES completion:nil];
    }
}

@end
