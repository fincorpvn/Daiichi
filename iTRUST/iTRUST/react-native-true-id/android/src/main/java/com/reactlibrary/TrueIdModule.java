package com.reactlibrary;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.graphics.Bitmap;
import android.os.Build;
import android.util.Base64;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import org.jetbrains.annotations.NotNull;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Map;

import vng.com.vn.trueid.models.CardInfo;
import vng.com.vn.trueid.models.CheckingRecord;
import vng.com.vn.trueid.models.ConfigInfo;
import vng.com.vn.trueid.models.DetectionType;
import vng.com.vn.trueid.models.Person;
import vng.com.vn.trueid.TrueID;
import vng.com.vn.trueid.TrueIDListener;

public class TrueIdModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public TrueIdModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "TrueId";
    }
    @ReactMethod
    public void setLanguage(ReadableMap data) {
        String language = data.getString("language");
        TrueID.setLanguage(getCurrentActivity(), language);
    }

    @ReactMethod
    public void configure(ReadableMap data) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            String domain = data.getString("domain");
            String domainPath = data.getString("domainPath");
            String authDomain = data.getString("authDomain");
            String authDomainPath = data.getString("authDomainPath");
            String appId = data.getString("appId");
            String appSecret = data.getString("appSecret");
            String accessToken = data.getString("accessToken");

            ConfigInfo configInfo;
//            if (!data.hasKey("zoomLicenseKey")) {
            configInfo = new ConfigInfo(domain, domainPath, authDomain, authDomainPath, appId, appSecret);
//            }
//            else {
//                String zoomLicenseKey = data.getString("zoomLicenseKey");
//                String zoomPublicKey = data.getString("zoomPublicKey");
//                String zoomServerBaseURL = data.getString("zoomServerBaseURL");
//                configInfo = new ConfigInfo(domain, domainPath, authDomain, authDomainPath, appId, appSecret, zoomLicenseKey, zoomServerBaseURL, zoomPublicKey);
//            }

            TrueID.configure(getCurrentActivity(), configInfo,accessToken);
            String language = data.getString("language");
            TrueID.setLanguage(getCurrentActivity(), language);
        }
        else {
            this.showAlert("trueID doesn't support Android less than 6");
        }
    }

    @ReactMethod
    public void start(final Callback callback) {
        TrueID.start(getCurrentActivity(), new TrueIDListener() {
            @Override
            public void completion(@NotNull CardInfo cardInfo) {
                if (callback != null) {
                    // person
                    Person person = cardInfo.getPerson();
                    WritableMap personMap = new WritableNativeMap();
                    if (person != null) {
                        String base64;
                        Bitmap selfie = person.getSelfie();
                        if (selfie == null) {
                            base64 = "";
                        }
                        else {
                            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                            selfie.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
                            byte[] byteArray = byteArrayOutputStream .toByteArray();

                            base64 = Base64.encodeToString(byteArray, Base64.DEFAULT);
                        }

                        personMap.putString("idNumber", person.getIdNumber());
                        personMap.putString("gender", person.getGender());
                        personMap.putString("dob", person.getDob());
                        personMap.putString("fullname", person.getFullname());
                        personMap.putString("address", person.getAddress());
                        personMap.putString("givenPlace", person.getGivenPlace());
                        personMap.putString("doi", person.getDoi());
                        personMap.putString("origin", person.getOrigin());
                        personMap.putString("dueDate", person.getDueDate());
                        personMap.putString("selfie", base64);
                    }
                    else {
                        personMap.putString("idNumber", "");
                        personMap.putString("gender", "");
                        personMap.putString("dob", "");
                        personMap.putString("fullname", "");
                        personMap.putString("address", "");
                        personMap.putString("doi", "");
                        personMap.putString("origin", "");
                        personMap.putString("dueDate", "");
                        personMap.putString("selfie", "");
                    }

                    // records
                    DetectionType[] recordTypes = DetectionType.values();
                    WritableMap records = new WritableNativeMap();
                    for (int i=0; i<recordTypes.length; i++) {
                        DetectionType type = recordTypes[i];
                        CheckingRecord r = cardInfo.getRecord(type);
                        WritableMap rMap = new WritableNativeMap();
                        if (r != null) {
                            rMap.putString("name", r.name);
                            rMap.putString("message", r.message);
                            rMap.putInt("type", i);
                            rMap.putBoolean("status", r.status);
                        }
                        else {
                            rMap.putString("name", "");
                            rMap.putString("message", "");
                            rMap.putInt("type", i);
                            rMap.putBoolean("status", false);
                        }

                        records.putMap(type.toString(), rMap);
                    }

                    Bitmap image;
                    String frontBase64;
                    String backBase64;

                    image = cardInfo.getFrontCardImage();
                    if (image == null) {
                        frontBase64 = "";
                    }
                    else {
                        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                        image.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
                        byte[] byteArray = byteArrayOutputStream .toByteArray();

                        frontBase64 = Base64.encodeToString(byteArray, Base64.DEFAULT);;
                    }

                    image = cardInfo.getBackCardImage();
                    if (image == null) {
                        backBase64 = "";
                    }
                    else {
                        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                        image.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
                        byte[] byteArray = byteArrayOutputStream .toByteArray();

                        backBase64 = Base64.encodeToString(byteArray, Base64.DEFAULT);;
                    }

                    // result
                    Map resultMap = cardInfo.getResult();
                    if (resultMap == null) {
                        resultMap = new HashMap<String, String>();
                    }

                    WritableMap res = new WritableNativeMap();
                    res.putMap("person", personMap);
                    res.putMap("records", records);
                    res.putString("requestId", cardInfo.getRequestId());
                    res.putString("frontCardImage", frontBase64);
                    res.putString("backCardImage", backBase64);
                    res.putMap("result", kUtils.convertMapToWritableMap(resultMap));

                    callback.invoke(res);
                }
            }
        });
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String requestId() {
        return TrueID.requestId();
    }

    private void showAlert(String message) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getCurrentActivity());
        builder.setTitle("trueID");
        builder.setMessage(message);
        builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                dialogInterface.cancel();
            }
        });

        AlertDialog alert = builder.create();
        alert.show();
    }
}
