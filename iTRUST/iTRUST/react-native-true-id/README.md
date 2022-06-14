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
      domain: "https://mio3api.dev.fmarket.vn/web/v1/api",
     domainPath: "/ekyc/v1.2",
     authDomain: "https://api.trueid.ai",
     authDomainPath: "/v1/oauth",
     appId: "ea8df9ebff8d38479058d7f1d235e097",
     appSecret: "+xzqA0O4GScV2dSiaB2cDiYVDY7hE0pG6rqN0TTNbU4=",
     zoomLicenseKey: "dSERDnSNV8KzqajJJMEfA353JgNV27jb",
     zoomServerBaseURL: "https://liveness-test.trueid.ai",
     zoomPublicKey: PublicFaceScanEncryptionKey,
     zoomAuthURL: "https://onboard-liveness.trueid.ai/liveness/key",
     language: 'vi',
     accessToken:tokenString// token api mio3api
  }


RNTrueID.configure(configInfo)

// Start
RNTrueID.start((cardInfo) => {
  // YOUR CODE HERE
})

// get requestId
var id = RNTrueID.requestId()
```
personMap.putString("idNumber", "");
personMap.putString("gender", "");
personMap.putString("dob", "");
personMap.putString("fullname", "");
personMap.putString("address", "");
personMap.putString("doi", "");
personMap.putString("origin", "");
personMap.putString("dueDate", "");
personMap.putString("selfie", "");
### CardInfo
CardInfo is object.
{
  person: {
    idNumber: "ID",
    gender: "GENDER",
    dob: "date of birth",
    fullname: "NAME",
    dueDate: "dueDate",
    address: "address",
    doi: "date of ID",
    origin: "",
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