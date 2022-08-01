import {
  Alert,
  Button,
  ButtonBorder,
  Div,
  HeaderBack,
  HTMLView,
  ImageView,
  Label,
} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {getInfo} from 'reducer/authen';
import {getInvestmentProfile} from 'reducer/authen/selector';
import ConfirmContent from 'screens/MainScreen/AccountVerifyScreen/ConfirmContent';
import {apiAuth, navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import {heightScreen, Log, widthScreen} from 'utils';

function ConfirmModal() {
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const currentUser = useAppSelector(state => state.authen.currentUser);
  const insets = useSafeAreaInsets();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAccept, setIsAccept] = useState<boolean>(false);
  const [isAcceptFatca, setIsAcceptFatca] = useState<boolean>(true);
  const dispatch = useDispatch();
  const investmentProfile = useAppSelector(state =>
    getInvestmentProfile(state),
  );

  const {email} = currentUser;

  useEffect(() => {
    // getData();
    return () => {};
  }, []);

  // const getData = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await apiAuth.getConfirmProfile();
  //     if (res.status == 200) {
  //       setData(res.data);
  //     }
  //   } catch (error) {
  //     Log('resres', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const confirm = async () => {
    try {
      setLoading(true);
      if (!isAccept) {
        return;
      }
      const res = await apiAuth.approveUser({
        fatca: isAcceptFatca,
      });
      if (res.status == 200) {
        navigate('AccountVerifyScreen');
        dispatch(getInfo({}));
      }
    } catch (error: any) {
      Alert.showError({
        multilanguage: false,
        content: I18nState == 'vi' ? error.message : error.messageEn,
        onPress: () => {
          navigate('AccountVerifyScreen');
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack type={2} title={`accountverify.xacnhanhoantat`} />
      <ScrollView>
        <ConfirmContent email={email} />

        {!investmentProfile ||
        investmentProfile?.code == 'INVESTMENT_PROFILE_REJECT' ? (
          <>
            <Div
              flexDirection={'row'}
              paddingHorizontal={16}
              paddingBottom={24}
              borderTopWidth={1}
              borderTopColor={Ecolors.spaceColor}
              paddingTop={17}
              alignItems={'center'}
              justifyContent={'flex-start'}>
              <Button
                widthHeight={25}
                onPress={() => {
                  setIsAccept(a => !a);
                }}
                marginRight={13}
                borderWidth={1}
                alignItems={'center'}
                justifyContent={'center'}
                borderColor={isAccept ? Ecolors.mainColor : Ecolors.spaceColor}
                borderRadius={25}>
                <ImageView
                  source={isAccept ? Icons.check : Icons.uncheck}
                  widthHeight={20}
                  tintColor={isAccept ? Ecolors.mainColor : Ecolors.grayColor}
                />
              </Button>
              <Div flex={1}>
                <Label>{`accountverify.toidongyvoidieukhoantren`}</Label>
              </Div>
            </Div>
            <Div
              flexDirection={'row'}
              paddingHorizontal={16}
              paddingBottom={24}
              paddingTop={17}
              alignItems={'center'}
              justifyContent={'flex-start'}>
              <Button
                widthHeight={25}
                onPress={() => {
                  setIsAcceptFatca(a => !a);
                }}
                marginRight={13}
                borderWidth={1}
                alignItems={'center'}
                justifyContent={'center'}
                borderColor={
                  isAcceptFatca ? Ecolors.mainColor : Ecolors.spaceColor
                }
                borderRadius={25}>
                <ImageView
                  source={isAcceptFatca ? Icons.check : Icons.uncheck}
                  widthHeight={20}
                  tintColor={
                    isAcceptFatca ? Ecolors.mainColor : Ecolors.grayColor
                  }
                />
              </Button>
              <Div flex={1}>
                <Label>{`accountverify.tongdongyvoidieukhoanfatca`}</Label>
              </Div>
            </Div>
            <Div
              marginBottom={insets.bottom + 30}
              width={'100%'}
              alignItems={'center'}
              justifyContent={'center'}>
              <ButtonBorder
                type={isAccept ? 1 : 2}
                width={343}
                loading={loading}
                onPress={() => confirm()}
                title={`accountverify.hoantat`}
              />
            </Div>
          </>
        ) : (
          <Div height={insets.bottom + 30} />
        )}
      </ScrollView>
    </Div>
  );
}

export default React.memo(ConfirmModal);
