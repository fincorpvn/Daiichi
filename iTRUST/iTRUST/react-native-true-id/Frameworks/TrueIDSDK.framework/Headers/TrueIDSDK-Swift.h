// Generated by Apple Swift version 5.6 (swiftlang-5.6.0.323.62 clang-1316.0.20.8)
#ifndef TRUEIDSDK_SWIFT_H
#define TRUEIDSDK_SWIFT_H
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wgcc-compat"

#if !defined(__has_include)
# define __has_include(x) 0
#endif
#if !defined(__has_attribute)
# define __has_attribute(x) 0
#endif
#if !defined(__has_feature)
# define __has_feature(x) 0
#endif
#if !defined(__has_warning)
# define __has_warning(x) 0
#endif

#if __has_include(<swift/objc-prologue.h>)
# include <swift/objc-prologue.h>
#endif

#pragma clang diagnostic ignored "-Wauto-import"
#include <Foundation/Foundation.h>
#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>

#if !defined(SWIFT_TYPEDEFS)
# define SWIFT_TYPEDEFS 1
# if __has_include(<uchar.h>)
#  include <uchar.h>
# elif !defined(__cplusplus)
typedef uint_least16_t char16_t;
typedef uint_least32_t char32_t;
# endif
typedef float swift_float2  __attribute__((__ext_vector_type__(2)));
typedef float swift_float3  __attribute__((__ext_vector_type__(3)));
typedef float swift_float4  __attribute__((__ext_vector_type__(4)));
typedef double swift_double2  __attribute__((__ext_vector_type__(2)));
typedef double swift_double3  __attribute__((__ext_vector_type__(3)));
typedef double swift_double4  __attribute__((__ext_vector_type__(4)));
typedef int swift_int2  __attribute__((__ext_vector_type__(2)));
typedef int swift_int3  __attribute__((__ext_vector_type__(3)));
typedef int swift_int4  __attribute__((__ext_vector_type__(4)));
typedef unsigned int swift_uint2  __attribute__((__ext_vector_type__(2)));
typedef unsigned int swift_uint3  __attribute__((__ext_vector_type__(3)));
typedef unsigned int swift_uint4  __attribute__((__ext_vector_type__(4)));
#endif

#if !defined(SWIFT_PASTE)
# define SWIFT_PASTE_HELPER(x, y) x##y
# define SWIFT_PASTE(x, y) SWIFT_PASTE_HELPER(x, y)
#endif
#if !defined(SWIFT_METATYPE)
# define SWIFT_METATYPE(X) Class
#endif
#if !defined(SWIFT_CLASS_PROPERTY)
# if __has_feature(objc_class_property)
#  define SWIFT_CLASS_PROPERTY(...) __VA_ARGS__
# else
#  define SWIFT_CLASS_PROPERTY(...)
# endif
#endif

#if __has_attribute(objc_runtime_name)
# define SWIFT_RUNTIME_NAME(X) __attribute__((objc_runtime_name(X)))
#else
# define SWIFT_RUNTIME_NAME(X)
#endif
#if __has_attribute(swift_name)
# define SWIFT_COMPILE_NAME(X) __attribute__((swift_name(X)))
#else
# define SWIFT_COMPILE_NAME(X)
#endif
#if __has_attribute(objc_method_family)
# define SWIFT_METHOD_FAMILY(X) __attribute__((objc_method_family(X)))
#else
# define SWIFT_METHOD_FAMILY(X)
#endif
#if __has_attribute(noescape)
# define SWIFT_NOESCAPE __attribute__((noescape))
#else
# define SWIFT_NOESCAPE
#endif
#if __has_attribute(ns_consumed)
# define SWIFT_RELEASES_ARGUMENT __attribute__((ns_consumed))
#else
# define SWIFT_RELEASES_ARGUMENT
#endif
#if __has_attribute(warn_unused_result)
# define SWIFT_WARN_UNUSED_RESULT __attribute__((warn_unused_result))
#else
# define SWIFT_WARN_UNUSED_RESULT
#endif
#if __has_attribute(noreturn)
# define SWIFT_NORETURN __attribute__((noreturn))
#else
# define SWIFT_NORETURN
#endif
#if !defined(SWIFT_CLASS_EXTRA)
# define SWIFT_CLASS_EXTRA
#endif
#if !defined(SWIFT_PROTOCOL_EXTRA)
# define SWIFT_PROTOCOL_EXTRA
#endif
#if !defined(SWIFT_ENUM_EXTRA)
# define SWIFT_ENUM_EXTRA
#endif
#if !defined(SWIFT_CLASS)
# if __has_attribute(objc_subclassing_restricted)
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_subclassing_restricted)) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# else
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
#  define SWIFT_CLASS_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_CLASS_EXTRA
# endif
#endif
#if !defined(SWIFT_RESILIENT_CLASS)
# if __has_attribute(objc_class_stub)
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME) __attribute__((objc_class_stub))
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) __attribute__((objc_class_stub)) SWIFT_CLASS_NAMED(SWIFT_NAME)
# else
#  define SWIFT_RESILIENT_CLASS(SWIFT_NAME) SWIFT_CLASS(SWIFT_NAME)
#  define SWIFT_RESILIENT_CLASS_NAMED(SWIFT_NAME) SWIFT_CLASS_NAMED(SWIFT_NAME)
# endif
#endif

#if !defined(SWIFT_PROTOCOL)
# define SWIFT_PROTOCOL(SWIFT_NAME) SWIFT_RUNTIME_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
# define SWIFT_PROTOCOL_NAMED(SWIFT_NAME) SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_PROTOCOL_EXTRA
#endif

#if !defined(SWIFT_EXTENSION)
# define SWIFT_EXTENSION(M) SWIFT_PASTE(M##_Swift_, __LINE__)
#endif

#if !defined(OBJC_DESIGNATED_INITIALIZER)
# if __has_attribute(objc_designated_initializer)
#  define OBJC_DESIGNATED_INITIALIZER __attribute__((objc_designated_initializer))
# else
#  define OBJC_DESIGNATED_INITIALIZER
# endif
#endif
#if !defined(SWIFT_ENUM_ATTR)
# if defined(__has_attribute) && __has_attribute(enum_extensibility)
#  define SWIFT_ENUM_ATTR(_extensibility) __attribute__((enum_extensibility(_extensibility)))
# else
#  define SWIFT_ENUM_ATTR(_extensibility)
# endif
#endif
#if !defined(SWIFT_ENUM)
# define SWIFT_ENUM(_type, _name, _extensibility) enum _name : _type _name; enum SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# if __has_feature(generalized_swift_name)
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) enum _name : _type _name SWIFT_COMPILE_NAME(SWIFT_NAME); enum SWIFT_COMPILE_NAME(SWIFT_NAME) SWIFT_ENUM_ATTR(_extensibility) SWIFT_ENUM_EXTRA _name : _type
# else
#  define SWIFT_ENUM_NAMED(_type, _name, SWIFT_NAME, _extensibility) SWIFT_ENUM(_type, _name, _extensibility)
# endif
#endif
#if !defined(SWIFT_UNAVAILABLE)
# define SWIFT_UNAVAILABLE __attribute__((unavailable))
#endif
#if !defined(SWIFT_UNAVAILABLE_MSG)
# define SWIFT_UNAVAILABLE_MSG(msg) __attribute__((unavailable(msg)))
#endif
#if !defined(SWIFT_AVAILABILITY)
# define SWIFT_AVAILABILITY(plat, ...) __attribute__((availability(plat, __VA_ARGS__)))
#endif
#if !defined(SWIFT_WEAK_IMPORT)
# define SWIFT_WEAK_IMPORT __attribute__((weak_import))
#endif
#if !defined(SWIFT_DEPRECATED)
# define SWIFT_DEPRECATED __attribute__((deprecated))
#endif
#if !defined(SWIFT_DEPRECATED_MSG)
# define SWIFT_DEPRECATED_MSG(...) __attribute__((deprecated(__VA_ARGS__)))
#endif
#if __has_feature(attribute_diagnose_if_objc)
# define SWIFT_DEPRECATED_OBJC(Msg) __attribute__((diagnose_if(1, Msg, "warning")))
#else
# define SWIFT_DEPRECATED_OBJC(Msg) SWIFT_DEPRECATED_MSG(Msg)
#endif
#if !defined(IBSegueAction)
# define IBSegueAction
#endif
#if !defined(SWIFT_EXTERN)
# if defined(__cplusplus)
#  define SWIFT_EXTERN extern "C"
# else
#  define SWIFT_EXTERN extern
# endif
#endif
#if __has_feature(modules)
#if __has_warning("-Watimport-in-framework-header")
#pragma clang diagnostic ignored "-Watimport-in-framework-header"
#endif
@import Foundation;
@import ObjectiveC;
#endif

#pragma clang diagnostic ignored "-Wproperty-attribute-mismatch"
#pragma clang diagnostic ignored "-Wduplicate-method-arg"
#if __has_warning("-Wpragma-clang-attribute")
# pragma clang diagnostic ignored "-Wpragma-clang-attribute"
#endif
#pragma clang diagnostic ignored "-Wunknown-pragmas"
#pragma clang diagnostic ignored "-Wnullability"

#if __has_attribute(external_source_symbol)
# pragma push_macro("any")
# undef any
# pragma clang attribute push(__attribute__((external_source_symbol(language="Swift", defined_in="TrueIDSDK",generated_declaration))), apply_to=any(function,enum,objc_interface,objc_category,objc_protocol))
# pragma pop_macro("any")
#endif

@class Person;
@class UIImage;
@class NSString;
enum DetectionType : NSInteger;
@class CheckingRecord;

SWIFT_CLASS("_TtC9TrueIDSDK8CardInfo")
@interface CardInfo : NSObject
@property (nonatomic, strong) Person * _Nullable person;
@property (nonatomic, strong) UIImage * _Nullable frontCardImage;
@property (nonatomic, strong) UIImage * _Nullable backCardImage;
@property (nonatomic, copy) NSDictionary<NSString *, id> * _Nullable result;
@property (nonatomic, copy) NSString * _Nullable qrInfo;
@property (nonatomic, strong) UIImage * _Nullable faceImage;
@property (nonatomic, copy) NSString * _Nonnull requestId;
@property (nonatomic) NSInteger code;
- (CheckingRecord * _Nullable)getRecordWithType:(enum DetectionType)type SWIFT_WARN_UNUSED_RESULT;
- (NSDictionary<NSString *, id> * _Nonnull)toMap SWIFT_WARN_UNUSED_RESULT;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end


SWIFT_CLASS("_TtC9TrueIDSDK14CheckingRecord")
@interface CheckingRecord : NSObject
@property (nonatomic, copy) NSString * _Nonnull name;
@property (nonatomic, copy) NSString * _Nonnull message;
@property (nonatomic) enum DetectionType type;
@property (nonatomic) BOOL status;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end


SWIFT_CLASS("_TtC9TrueIDSDK11ColorConfig")
@interface ColorConfig : NSObject
@property (nonatomic, copy) NSString * _Nonnull main_color;
@property (nonatomic, copy) NSString * _Nonnull second_color;
@property (nonatomic, copy) NSString * _Nonnull text_color;
@property (nonatomic, copy) NSString * _Nonnull border_input_color;
@property (nonatomic, copy) NSString * _Nonnull background_color;
@property (nonatomic, copy) NSString * _Nonnull close_color;
- (nonnull instancetype)initWithJsonString:(NSString * _Nonnull)jsonString;
- (nonnull instancetype)initWithMain_color:(NSString * _Nonnull)main_color second_color:(NSString * _Nonnull)second_color text_color:(NSString * _Nonnull)text_color border_input_color:(NSString * _Nonnull)border_input_color background_color:(NSString * _Nonnull)background_color close_color:(NSString * _Nonnull)close_color OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end


SWIFT_CLASS("_TtC9TrueIDSDK10ConfigInfo")
@interface ConfigInfo : NSObject
@property (nonatomic, copy) NSString * _Nonnull domain;
@property (nonatomic, copy) NSString * _Nonnull domainPath;
@property (nonatomic, copy) NSString * _Nonnull authDomain;
@property (nonatomic, copy) NSString * _Nonnull authDomainPath;
@property (nonatomic, copy) NSString * _Nonnull appId;
@property (nonatomic, copy) NSString * _Nonnull appSecret;
@property (nonatomic, copy) NSString * _Nonnull zoomLicenseKey;
@property (nonatomic, copy) NSString * _Nonnull zoomServerBaseURL;
@property (nonatomic, copy) NSString * _Nonnull zoomPublicKey;
@property (nonatomic, copy) NSString * _Nonnull zoomAuthURL;
@property (nonatomic, copy) NSString * _Nonnull zoomClient;
@property (nonatomic, copy) NSString * _Nonnull accessToken;
- (nonnull instancetype)initWithDomain:(NSString * _Nonnull)domain domainPath:(NSString * _Nonnull)domainPath authDomain:(NSString * _Nonnull)authDomain authDomainPath:(NSString * _Nonnull)authDomainPath appId:(NSString * _Nonnull)appId appSecret:(NSString * _Nonnull)appSecret zoomLicenseKey:(NSString * _Nonnull)zoomLicenseKey zoomServerBaseURL:(NSString * _Nonnull)zoomServerBaseURL zoomPublicKey:(NSString * _Nonnull)zoomPublicKey zoomAuthURL:(NSString * _Nonnull)zoomAuthURL zoomClient:(NSString * _Nonnull)zoomClient accessToken:(NSString * _Nonnull)accessToken OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end

typedef SWIFT_ENUM(NSInteger, DetectionType, closed) {
  DetectionTypeOcrScan = 0,
  DetectionTypeLivenessDetection = 1,
  DetectionTypeFaceComparision = 2,
  DetectionTypeIdVerification = 3,
};


SWIFT_CLASS("_TtC9TrueIDSDK3EID")
@interface EID : NSObject
@property (nonatomic, copy) NSString * _Nonnull eidQRText;
@property (nonatomic, copy) NSString * _Nonnull eidMRZ;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end


SWIFT_CLASS("_TtC9TrueIDSDK12HeaderConfig")
@interface HeaderConfig : NSObject
@property (nonatomic, copy) NSString * _Nonnull origin;
- (nonnull instancetype)initWithJsonString:(NSString * _Nonnull)jsonString;
- (nonnull instancetype)initWithOrigin:(NSString * _Nonnull)origin OBJC_DESIGNATED_INITIALIZER;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end

typedef SWIFT_ENUM(NSInteger, LivenessDetectionMode, closed) {
  LivenessDetectionModeNone = 0,
  LivenessDetectionModeActive = 1,
  LivenessDetectionModePassLiveness = 2,
  LivenessDetectionModePassive = 3,
};


SWIFT_CLASS_NAMED("MRZParser")
@interface MRZParser : NSObject
@property (nonatomic, copy) NSString * _Nonnull parsedMRZ;
- (nonnull instancetype)initWithScan:(NSString * _Nonnull)scan debug:(BOOL)debug OBJC_DESIGNATED_INITIALIZER;
- (NSDictionary<NSString *, id> * _Nonnull)data SWIFT_WARN_UNUSED_RESULT;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end

@class NSDate;

SWIFT_CLASS_NAMED("MRZTD1")
@interface MRZTD1 : MRZParser
/// The document type from the 1st line of the MRZ. (start 1, len 1)
@property (nonatomic, copy) NSString * _Nonnull documentType;
/// The document sub type from the 1st line of the MRZ. (start 2, len 1)
@property (nonatomic, copy) NSString * _Nonnull documentSubType;
/// The country code from the 1st line of the MRZ (start 3, len 3)
@property (nonatomic, copy) NSString * _Nonnull countryCode;
/// The passport number from the 1nd line of the MRZ. (start 6, len 9)
@property (nonatomic, copy) NSString * _Nonnull passportNumber;
/// The date of birth from the 2nd line of the MRZ (start 1, len 6)
@property (nonatomic, copy) NSDate * _Nullable dateOfBirth;
/// The sex from the 2nd line of the MRZ. (start 8, len 1)
@property (nonatomic, copy) NSString * _Nonnull sex;
/// The expiration date from the 2nd line of the MRZ. (start 9, len 6)
@property (nonatomic, copy) NSDate * _Nullable expirationDate;
/// The nationality from the 2nd line of the MRZ. (start 16, len 3)
@property (nonatomic, copy) NSString * _Nonnull nationality;
/// The last name from the 1st line of the MRZ (start 1, len 30, until first <<)
@property (nonatomic, copy) NSString * _Nonnull lastName;
/// The firstname from the 1st line of the MRZ (start first << len 30)
@property (nonatomic, copy) NSString * _Nonnull firstName;
/// Convenience method for getting all data in a dictionary
/// :returns: Return all fields in a dictionary
- (NSDictionary<NSString *, id> * _Nonnull)data SWIFT_WARN_UNUSED_RESULT;
/// Get the description of the MRZ
/// :returns: a string with all fields plus field name (each field on a new line)
@property (nonatomic, readonly, copy) NSString * _Nonnull description;
/// Initiate the MRZ object with the scanned data.
/// :param: scan  the scanned string
/// :param: debug true if you want to see debug messages.
/// :returns: Instance of MRZ
- (nonnull instancetype)initWithScan:(NSString * _Nonnull)scan debug:(BOOL)debug OBJC_DESIGNATED_INITIALIZER;
@end


SWIFT_CLASS_NAMED("MRZTD3")
@interface MRZTD3 : MRZParser
/// The document type from the 1st line of the MRZ. (start 1, len 1)
@property (nonatomic, copy) NSString * _Nonnull documentType;
/// The document sub type from the 1st line of the MRZ. (start 2, len 1)
@property (nonatomic, copy) NSString * _Nonnull documentSubType;
/// The country code from the 1st line of the MRZ (start 3, len 3)
@property (nonatomic, copy) NSString * _Nonnull countryCode;
/// The last name from the 1st line of the MRZ (start 6, len 39, until first <<)
@property (nonatomic, copy) NSString * _Nonnull lastName;
/// The firstname from the 1st line of the MRZ (start 6, len 39, after first <<)
@property (nonatomic, copy) NSString * _Nonnull firstName;
/// The passport number from the 2nd line of the MRZ. (start 1, len 9)
@property (nonatomic, copy) NSString * _Nonnull passportNumber;
/// The nationality from the 2nd line of the MRZ. (start 11, len 3)
@property (nonatomic, copy) NSString * _Nonnull nationality;
/// The date of birth from the 2nd line of the MRZ (start 14, len 6)
@property (nonatomic, copy) NSDate * _Nullable dateOfBirth;
/// The sex from the 2nd line of the MRZ. (start 21, len 1)
@property (nonatomic, copy) NSString * _Nonnull sex;
/// The expiration date from the 2nd line of the MRZ. (start 22, len 6)
@property (nonatomic, copy) NSDate * _Nullable expirationDate;
/// The personal number from the 2nd line of the MRZ. (start 29, len 14
@property (nonatomic, copy) NSString * _Nonnull personalNumber;
/// Convenience method for getting all data in a dictionary
/// :returns: Return all fields in a dictionary
- (NSDictionary<NSString *, id> * _Nonnull)data SWIFT_WARN_UNUSED_RESULT;
/// Get the description of the MRZ
/// :returns: a string with all fields plus field name (each field on a new line)
@property (nonatomic, readonly, copy) NSString * _Nonnull description;
/// Initiate the MRZ object with the scanned data.
/// :param: scan  the scanned string
/// :param: debug true if you want to see debug messages.
/// :returns: Instance of MRZ
- (nonnull instancetype)initWithScan:(NSString * _Nonnull)scan debug:(BOOL)debug OBJC_DESIGNATED_INITIALIZER;
@end



SWIFT_CLASS("_TtC9TrueIDSDK6Person")
@interface Person : NSObject
@property (nonatomic, copy) NSString * _Nonnull idNumber;
@property (nonatomic, copy) NSString * _Nonnull gender;
@property (nonatomic, copy) NSString * _Nonnull dob;
@property (nonatomic, copy) NSString * _Nonnull fullname;
@property (nonatomic, copy) NSString * _Nonnull address;
@property (nonatomic, copy) NSString * _Nonnull doi;
@property (nonatomic, copy) NSString * _Nonnull givenPlace;
@property (nonatomic, copy) NSString * _Nonnull origin;
@property (nonatomic, copy) NSString * _Nonnull dueDate;
@property (nonatomic, copy) NSString * _Nonnull idType;
@property (nonatomic, strong) UIImage * _Nullable selfie;
- (nonnull instancetype)init SWIFT_UNAVAILABLE;
+ (nonnull instancetype)new SWIFT_UNAVAILABLE_MSG("-init is unavailable");
@end


SWIFT_CLASS("_TtC9TrueIDSDK6TrueID")
@interface TrueID : NSObject
+ (void)configureWithConfigInfo:(ConfigInfo * _Nonnull)configInfo configColor:(ColorConfig * _Nonnull)configColor configHeader:(HeaderConfig * _Nonnull)configHeader;
+ (void)startWithListener:(void (^ _Nonnull)(CardInfo * _Nonnull))listener;
+ (NSString * _Nonnull)requestId SWIFT_WARN_UNUSED_RESULT;
+ (NSInteger)getRetryCounter SWIFT_WARN_UNUSED_RESULT;
+ (void)setLanguageWithLanguage:(NSString * _Nonnull)language;
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end











typedef SWIFT_ENUM(NSInteger, typeProcessCheck, closed) {
  typeProcessCheckOcr = 0,
  typeProcessCheckFacematching = 1,
  typeProcessCheckLiveness = 2,
  typeProcessCheckFinished = 3,
};

#if __has_attribute(external_source_symbol)
# pragma clang attribute pop
#endif
#pragma clang diagnostic pop
#endif
