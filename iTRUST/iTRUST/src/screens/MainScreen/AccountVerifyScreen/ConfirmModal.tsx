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
import {useDispatch} from 'react-redux';
import {getInfo} from 'reducer/authen';
import {getInvestmentProfile} from 'reducer/authen/selector';
import {apiAuth, navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import {heightScreen, Log, widthScreen} from 'utils';

function ConfirmModal() {
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const currentUser = useAppSelector(state => state.authen.currentUser);

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
      if (!isAccept || !isAcceptFatca) {
        return;
      }
      const res = await apiAuth.approveUser();
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
        <Div padding={16} backgroundColor={Ecolors.spaceColor}>
          <Label>{`accountverify.titleconfirm`}</Label>
          <Label
            marginTop={5}
            color={Ecolors.mainColor}
            fontWeight={'700'}
            multilanguage={false}
            lineHeight={22}
            size={15}>
            <Label
              lineHeight={22}
              size={15}>{`accountverify.contentdiachi1`}</Label>
            {`${email || ''}`}
          </Label>
          <Label marginTop={10} lineHeight={22} size={15}>
            {`accountverify.contentinhoso`}
          </Label>
        </Div>
        <Div padding={10} backgroundColor={Ecolors.spaceColor} marginTop={5}>
          <Label
            marginTop={8}
            size={15}
            fontWeight={'700'}
            color={Ecolors.mainColor}>{`accountverify.congboruiro`}</Label>
          <Label
            marginTop={8}
            size={15}
            fontWeight={'700'}>{`accountverify.title1`}</Label>
          <Label
            size={15}
            lineHeight={22}
            marginTop={8}>{`accountverify.content1`}</Label>
          <Label
            size={15}
            marginTop={8}
            fontWeight={'700'}>{`accountverify.title2`}</Label>
          <Label
            lineHeight={22}
            size={15}
            marginTop={8}>{`accountverify.content2`}</Label>
          <Label
            size={15}
            marginTop={8}
            fontWeight={'700'}>{`accountverify.title3`}</Label>
          <Label
            size={15}
            lineHeight={22}
            marginTop={8}>{`accountverify.content3`}</Label>
        </Div>
        <Div height={30} />
        {(!investmentProfile ||
          investmentProfile?.code == 'INVESTMENT_PROFILE_REJECT') && (
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
              marginBottom={40}
              width={'100%'}
              alignItems={'center'}
              justifyContent={'center'}>
              <ButtonBorder
                type={isAcceptFatca && isAccept ? 1 : 2}
                width={343}
                loading={loading}
                onPress={() => confirm()}
                title={`accountverify.hoantat`}
              />
            </Div>
          </>
        )}
      </ScrollView>
    </Div>
  );
}

export default React.memo(ConfirmModal);
