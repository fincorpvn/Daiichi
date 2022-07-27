import Div from 'components/Div';
import React, {useEffect, useRef, useState} from 'react';
import crc from 'crc-react-native';
import {getUuid, Log, requestPermisson, widthScale} from 'utils';
import QQ from 'react-native-qrcode-svg';
import {Ecolors, Efonts, Icons, stringApp} from 'constant';
import Label from 'components/Label';
import Button from 'components/Button';
import ImageView from 'components/ImageView';

import CameraRoll from '@react-native-community/cameraroll';
import Toast from 'components/Toast';
import ViewShot from 'react-native-view-shot';
import {ActivityIndicator, Platform} from 'react-native';
import Alert from 'components/Alert';
import {HTMLView} from 'components';
import {PERMISSIONS} from 'react-native-permissions';

const html = `<p><strong>1.  </strong>Nhấn vào <strong>"Tải về"</strong> để tải hình QR và lưu trên điện thoại của bạn.</p>
<p><strong>2.  </strong>Mở ứng dụng ngân hàng <strong>(Mobile Banking)</strong> của bạn và chọn chức năng QR Code.</p>
<p><strong>3.  </strong>Chọn <strong>hình QR đã tải về</strong>, đối chiếu thông tin và thực hiện chuyển khoản.</p>
`;

const Guide = () => {
  return (
    <Div
      flex={1}
      backgroundColor={Ecolors.transparentLoading}
      alignItems={'center'}
      justifyContent={'center'}>
      <Div
        width={337}
        backgroundColor={Ecolors.whiteColor}
        borderRadius={5}
        minHeight={200}>
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          marginHorizontal={10}
          paddingHorizontal={10}
          borderBottomWidth={0.8}
          borderBottomColor={Ecolors.bordercolor}
          paddingVertical={15}
          justifyContent={'space-between'}>
          <Label
            fontWeight={
              '700'
            }>{`createordermodal.huongdanthanhtoanbangqrcode`}</Label>
          <Button
            onPress={() => {
              Alert.hide();
            }}>
            <ImageView
              widthHeight={16}
              source={Icons.close}
              resizeMode={'contain'}
            />
          </Button>
        </Div>
        <Div paddingVertical={20}>
          <HTMLView
            source={{
              html,
            }}
          />
        </Div>
      </Div>
    </Div>
  );
};

interface IPayment {
  amount: number;
  accountName: string;
  accountNo: string;
  transferContent: string;
  bankId: string;
}
const QRCode = (p: {data: any}) => {
  const viewshotRef = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [qrImg, setQrImg] = useState<string>('');

  const generateQr = (payment: IPayment) => {
    const FIELD1 = '00020101021238';
    const FIELD2 = '0010A00000072701';
    const FIELD3 = '0208QRIBFTTA';
    const FIELD4 = '530370454';
    const FIELD5 = '5802VN62';
    let dataString = FIELD1;
    const s1_1 = FIELD2;
    const s1_2 =
      '00' +
      formatLengthCode(`${payment.bankId}`) +
      payment.bankId +
      '01' +
      formatLengthCode(payment.accountNo) +
      payment.accountNo;

    const s1_3 = FIELD3;
    const s1 = `${s1_1}${formatLengthCode(s1_2)}${s1_2}${s1_3}`;
    dataString = `${dataString}${formatLengthCode(
      s1,
    )}${s1}${FIELD4}${formatLengthCode(payment.amount.toString())}${
      payment.amount
    }${FIELD5}`;
    const s2 =
      '08' +
      formatLengthCode(payment.transferContent) +
      payment.transferContent;
    dataString = `${dataString}${formatLengthCode(s2)}${s2}6304`;
    let crcString = crc.crc16ccitt(dataString).toString(16);
    for (let i = 0; i < 4 - crcString.length; i++) {
      crcString = '0' + crcString;
    }
    Log('`${dataString}${crcString}`', `${dataString}${crcString}`);
    return `${dataString}${crcString}`;
  };

  const formatLengthCode = (content: string) => {
    if (!content) {
      return '00';
    } else {
      if (content.length < 10) {
        return `0${content.length}`;
      } else {
        return `${content.length}`;
      }
    }
  };

  const onSaveQRCode = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      if (viewshotRef.current) {
        await viewshotRef.current.capture().then((img: any) => {
          requestPermisson(
            Platform.OS === 'android'
              ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
              : PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
            () => {
              CameraRoll.save(img, {
                type: 'photo',
              }).then((e: any) => {
                if (!!e) {
                  Toast.show({
                    content: 'alert.taithanhcong',
                    multilanguage: true,
                  });
                } else {
                  Toast.show({
                    content: 'alert.daxayraloi',
                    multilanguage: true,
                  });
                }
              });
            },
          );
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Div
      borderRadius={8}
      padding={20}
      borderWidth={0.8}
      alignItems={'center'}
      borderColor={Ecolors.bordercolor}
      backgroundColor={Ecolors.whiteColor}>
      <Label
        fontWeight={'700'}>{`createordermodal.thanhtoannhanhquaqrcode`}</Label>

      {!!qrImg ? (
        <>
          <Button
            onPress={() => {
              Alert.showComponent({
                component: () => <Guide />,
              });
            }}>
            <Label
              size={14}
              color={Ecolors.linkColor}
              marginBottom={20}
              marginTop={3}>{`createordermodal.huongdanchuyenkhoan`}</Label>
          </Button>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'center'}>
            <ViewShot ref={viewshotRef} options={{format: 'png', quality: 1}}>
              <Div
                borderRadius={8}
                backgroundColor={Ecolors.bgtime}
                padding={7}>
                <QQ
                  size={widthScale(125)}
                  backgroundColor={Ecolors.whiteColor}
                  value={qrImg || '1231'}
                />
              </Div>
            </ViewShot>
            <Button
              widthHeight={100}
              justifyContent={'center'}
              onPress={onSaveQRCode}
              alignItems={'center'}>
              {loading ? (
                <ActivityIndicator size={'large'} color={Ecolors.mainColor} />
              ) : (
                <>
                  <ImageView
                    width={30}
                    height={23}
                    resizeMode={'contain'}
                    source={Icons.downloadqr}
                  />
                  <Label marginTop={6}>{`createordermodal.taive`}</Label>
                </>
              )}
            </Button>
          </Div>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-start'}
            marginTop={10}
            width={'100%'}>
            <ImageView
              widthHeight={16}
              source={Icons.warningamount}
              marginRight={7}
            />
            <Div flex={1}>
              <Label
                size={14}
                fontFamily={
                  Efonts.italic
                }>{`createordermodal.motsonganhangchuahotroquetmaqr`}</Label>
            </Div>
          </Div>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            marginTop={10}
            justifyContent={'flex-start'}
            width={'100%'}>
            <ImageView
              widthHeight={16}
              source={Icons.warningamount}
              resizeMode={'contain'}
              marginRight={7}
            />
            <Div flex={1}>
              <Label
                size={14}
                fontFamily={
                  Efonts.italic
                }>{`createordermodal.quykhachvuilongdoichieuthongtintruockhichuyenkhoan`}</Label>
            </Div>
          </Div>
        </>
      ) : (
        <Button
          onPress={() => {
            const t = generateQr(p.data);
            setQrImg(t);
          }}>
          <Label
            color={Ecolors.linkColor}>{`createordermodal.xemqrcode`}</Label>
        </Button>
      )}
    </Div>
  );
};

export default React.memo(QRCode);
