import {useRoute} from '@react-navigation/core';
import {
  Alert,
  ButtonBorder,
  Div,
  HeaderBack,
  ImageView,
  Label,
} from 'components';
import {Icons} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {apiAuth, goBack, navigate, startScan, uploadFile} from 'services';
import {img} from 'services/test';
import {useAppSelector} from 'store/hooks';
import {Log} from 'utils';
import {setStoreToken} from 'utils/storage';

function ControlEKYCScreen() {
  const route = useRoute<any>();
  const {statusScreen} = useAppSelector(state => state.authen);
  const [loading, setLoading] = useState(false);
  const currentUser = useAppSelector<any>(state => state.authen.currentUser);
  const countTime = useRef<number>(1);
  const accessToken = useRef<string>('');
  const I18nState = useAppSelector(state => state.languages.I18nState);

  useEffect(() => {
    if (route.params?.data) {
      getAccountToken();
    }
    return () => {
      if (route.params.onBack) {
        route.params.onBack();
      }
    };
  }, [route.params?.data]);

  const getAccountToken = async () => {
    try {
      setLoading(true);
      const res = await apiAuth.login({
        username: route.params?.data?.phone,
        password: route.params?.data?.password,
      });
      if (res.status == 200) {
        await setStoreToken(res.data.access_token);
        accessToken.current = res.data.access_token;
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onGotoEKYC = async () => {
    var res: any = null;
    try {
      if (!currentUser) {
        res = await apiAuth.login({
          username: route.params?.data?.phone,
          password: route.params?.data?.password,
        });
        if (res.status == 200) {
          await setStoreToken(res.data.access_token);
          accessToken.current = res.data.access_token;
        }
      }

      const scanData = await startScan(
        () => {
          // setLoading(true);
        },
        () => {
          // setLoading(false);
        },
        {
          language: I18nState,
          ...(res &&
            !!accessToken.current.length && {
              accessToken: res.data.access_token || accessToken.current,
            }),
        },
      );
      if (!!scanData) {
        if (scanData?.result?.kyc_result?.decision?.code == -1) {
          Alert.showError({
            content: `alert.ekycfail`,
            onPress: () => {
              if (countTime.current > 3) {
                navigate('AccountVerifyScreen');
                return;
              }
              onGotoEKYC();
              countTime.current += 1;
            },
          });
        } else {
          navigate('ReviewInfoModal', {
            data: {
              ...scanData,
              currentUser: {
                ...currentUser,
                ...(route.params?.data?.phone && {
                  phone: route.params?.data?.phone,
                }),
                ...(route.params?.data?.password && {
                  password: route.params?.data?.password,
                }),
                ...(route.params?.data?.name && {
                  name: route.params?.data?.name,
                }),
                ...(route.params?.data?.email && {
                  email: route.params?.data?.email,
                }),
              },
            },
          });
        }
      }
    } catch (error: any) {
      Alert.showError({
        multilanguage: false,
        content: I18nState == 'vi' ? error.message : error.messageEn,
      });
    }
  };

  return (
    <Div screen={true}>
      <HeaderBack
        isShowStep={true}
        step={3}
        type={4}
        title={`setpasswordscreen.titletrong`}
      />

      <Div paddingHorizontal={29}>
        <Div width={'100%'} alignItems={'center'}>
          <Label
            marginTop={30}
            textAlign={'center'}
            size={20}
            fontWeight={'700'}>
            {`controlekyc.xacthucthongtin`}
          </Label>
          <Label marginTop={6} textAlign={'center'} size={14} lineHeight={20}>
            {`controlekyc.content`}
          </Label>
        </Div>
        <Label marginTop={40} size={14} lineHeight={20}>
          {`controlekyc.chuphinhmattruoc`}
        </Label>
        <Div
          flexDirection={'row'}
          marginTop={17}
          alignItems={'center'}
          justifyContent={'flex-start'}>
          <ImageView
            width={132}
            resizeMode={'contain'}
            source={Icons.before}
            marginRight={11}
          />
          <ImageView resizeMode={'contain'} width={132} source={Icons.after} />
        </Div>

        <Label marginTop={18} size={14} lineHeight={20}>
          {`controlekyc.chuphinhchandung`}
        </Label>
        <Div>
          <ImageView
            marginTop={17}
            width={132}
            source={Icons.cmnd}
            resizeMode={'contain'}
          />
        </Div>
      </Div>
      <Div alignItems={'center'}>
        <ButtonBorder
          loading={loading}
          onPress={() => {
            onGotoEKYC();
          }}
          marginTop={30}
          type={1}
          title={'controlekyc.batdau'}
        />
        <ButtonBorder
          marginTop={16}
          onPress={() => {
            if (statusScreen == 'main') {
              goBack();
              return;
            }
            navigate('LoginScreen');
          }}
          type={2}
          title={'controlekyc.thuchiensau'}
        />
      </Div>
    </Div>
  );
}

export default React.memo(ControlEKYCScreen);
