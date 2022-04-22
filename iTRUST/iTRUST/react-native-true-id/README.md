# react-native-true-id

## Getting started

Install trueID React Native
`$ react-native install [PATH TO]/react-native-true-id --save`

make sure "react-native-true-id" folder is copied to your "node_modules".
sometime react-native CLI doens't copy folder, it's just make a link.

## Android
- So Lucky, we don't need to do :D
- if you can't connect to development server just run 'adb reverse tcp:8081 tcp:8081'

## iOS
- run pod install
`cd [PATH TO]/ios`
`pod install`


*** NOTE ***
if you got error look like main.jsbundle, it means your project didn't build your react-native to main.jsbundle.
cd [your react-native project] run command below
`react-native bundle --dev false --platform ios --entry-file index.js --bundle-output ios/main.jsbundle --assets-dest ./ios"`



## Usage
```javascript
import RNTrueId from 'react-native-true-id';

  var PublicFaceScanEncryptionKey =
  "-----BEGIN PUBLIC KEY-----\n" +
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5PxZ3DLj+zP6T6HFgzzk\n" +
  "M77LdzP3fojBoLasw7EfzvLMnJNUlyRb5m8e5QyyJxI+wRjsALHvFgLzGwxM8ehz\n" +
  "DqqBZed+f4w33GgQXFZOS4AOvyPbALgCYoLehigLAbbCNTkeY5RDcmmSI/sbp+s6\n" +
  "mAiAKKvCdIqe17bltZ/rfEoL3gPKEfLXeN549LTj3XBp0hvG4loQ6eC1E1tRzSkf\n" +
  "GJD4GIVvR+j12gXAaftj3ahfYxioBH7F7HQxzmWkwDyn3bqU54eaiB7f0ftsPpWM\n" +
  "ceUaqkL2DZUvgN0efEJjnWy5y1/Gkq5GGWCROI9XG/SwXJ30BbVUehTbVcD70+ZF\n" +
  "8QIDAQAB\n" +
  "-----END PUBLIC KEY-----";

  var configInfo = {
    domain: "https://api.trueid.ai",
    domainPath: "/ekyc/v1.0",
    authDomain: "https://api.trueid.ai",
    authDomainPath: "/v1/oauth",
    appId: "50d8da22d5756eff7f336482ee776b4c",
    appSecret: "ZCPB+OsoZltvf+S8vb+A2jKfuRNty0s4/sWdNAZZlEE=",
    zoomLicenseKey: "dMHqo4N8s5PvJnHpMBDn7n35aJddeYki",
    zoomServerBaseURL: "https://api.zoomauth.com/api/v2/biometrics",
    zoomPublicKey: PublicFaceScanEncryptionKey,
    zoomAuthURL: "https://onboard-liveness.trueid.ai/liveness/key"

  }


RNTrueID.configure(configInfo)

// Start
RNTrueID.start((cardInfo) => {
  // YOUR CODE HERE
})

// 

// màn hình chụp ảnh selfie
// Thiết kế giao diện UI
// màn hình comfirm 

// get requestId
var id = RNTrueID.requestId()
```

### CardInfo
CardInfo is object.
{
  person: {
    result: "ID",
    time_used: "GENDER",
    client_id: "date of birth",
    request_id: "NAME",
    attributes: Object - information is extracted from identity cards: id_number, name, dob (date of birth),id_origin, id_address and confidence,
    input_image_type: 3,
    liveness_strategy: 3,
    id_card_token: "token id card",
    selfie: "SELFIE IMAGE BASE 64 STRING"
  },
  records: {
    idVerification: {
      name: "NAME",
      message: "MESSAGE",
      type: RECORD_TYPE_INT,
      status: RECORD_STATUS_BOOLEAN
    },
    ocrScan: {
      name: "NAME",
      message: "MESSAGE",
      type: RECORD_TYPE_INT,
      status: RECORD_STATUS_BOOLEAN
    },
    livenessDetection, {
      name: "NAME",
      message: "MESSAGE",
      type: RECORD_TYPE_INT,
      status: RECORD_STATUS_BOOLEAN
    },
    faceComparision, {
      name: "NAME",
      message: "MESSAGE",
      type: RECORD_TYPE_INT,
      status: RECORD_STATUS_BOOLEAN
    }
  },
  "frontCardImage": "IMAGE BASE 64 STRING",
  "backCardImage": "IMAGE BASE 64 STRING",
  "result": {
    "result":1,
    "time_used":34,
    "client_id":" Id Client",
    "request_id":"Id Request"
  }
}