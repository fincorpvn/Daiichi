import {useRoute} from '@react-navigation/core';
import {
  Alert,
  ButtonBorder,
  Div,
  HeaderBack,
  ImageView,
  Label,
} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useState} from 'react';
import {apiAuth, goBack, navigate, startScan} from 'services';
import {useAppSelector} from 'store/hooks';
import {Log} from 'utils';

function MiniEkycModal() {
  const [loading, setLoading] = useState(false);
  const currentUser = useAppSelector<any>(state => state.authen.currentUser);
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const route = useRoute<any>();

  const onGotoEKYC = async () => {
    try {
      const scanData = await startScan(
        () => {
          // setLoading(true);
        },
        () => {
          // setLoading(false);
        },
        {
          language: I18nState,
        },
      );
      Log('scanData', scanData);
      navigate('ReviewInfoModal', {
        data: {...scanData, currentUser},
      });
      return;

      navigate('EditBankInfoModal', {
        onConfirm: async (e: any) => {
          try {
            goBack();
            setLoading(true);
            if (e && scanData) {
              const res = await apiAuth.createEKYC({
                ...scanData,
                ...e,
                phone: currentUser?.phone || '',
                email: currentUser?.email || '',
              });
              Alert.show({
                multilanguage: false,
                content: res.message,
                onConfirm: () => {
                  if (route.params.onBack) {
                    route.params.onBack();
                    return;
                  }
                  navigate('InvestmentDetailsScreen');
                },
              });
            }
            return;
          } catch (error: any) {
            Alert.show({
              multilanguage: false,
              content: error.message,
            });
          } finally {
            setLoading(false);
          }
        },
      });
    } catch (error: any) {
      Alert.show({
        multilanguage: false,
        content: error.message,
      });
    }
  };

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack type={'2'} title={`MiniEkycModal.xacthucthongtin`} />
      <Div paddingHorizontal={29}>
        <Label marginTop={30} size={20} fontWeight={'700'}>
          {`controlekyc.xacthucthongtin`}
        </Label>
        <Label marginTop={6} size={14} lineHeight={20}>
          {`controlekyc.content`}
        </Label>
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
            if (route.params.onBack) {
              route.params.onBack();
              return;
            }
            navigate('InvestmentDetailsScreen');
          }}
          type={2}
          title={'controlekyc.thuchiensau'}
        />
      </Div>
    </Div>
  );
}

export default React.memo(MiniEkycModal);
