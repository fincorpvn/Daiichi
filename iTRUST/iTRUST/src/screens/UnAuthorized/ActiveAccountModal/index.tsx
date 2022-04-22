import {
  Alert,
  Button,
  Div,
  HeaderBack,
  ImageView,
  InputItem,
  Label,
  LoadingIndicator,
} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useRef, useState} from 'react';
import {apiAuth, navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import {isvalidPhone, Log, parseMultilanguage} from 'utils';

function ActiveAccountModal() {
  const [phone, setPhone] = useState<string>('');
  const [isErrorPhone, setIsErrorPhone] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<string>('');
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const phoneRef = useRef<any>();
  const doActiveAccount = async () => {
    try {
      setLoading(true);

      if (!isvalidPhone(phone)) {
        setIsErrorPhone(!isvalidPhone(phone));
        const t: string = phone.length
          ? I18nState == 'vi'
            ? 'Sai số điện thoại'
            : 'Phone number is incorrect'
          : I18nState == 'vi'
          ? 'Số điện thoại bắt buộc nhập'
          : 'Phone number is required';
        setTitleError(t);
        return;
      }
      const res = await apiAuth.activeAccount({
        phone,
      });
      if (res.status == 200) {
        Alert.show({
          multilanguage: false,
          titleClose: `alert.dongy`,
          content: I18nState == 'vi' ? res.message : res.messageEn,
          type: 2,
          onClose: () => {
            navigate('LoginScreen');
          },
          onConfirm: () => {
            navigate('LoginScreen');
          },
          onCancel: () => {
            navigate('LoginScreen');
          },
        });
      }
    } catch (error: any) {
      // Alert.showError({
      //   multilanguage: false,
      //   content: I18nState == 'vi' ? error.message : error.messageEn,
      // });
      setIsErrorPhone(true);
      setTitleError(I18nState == 'vi' ? error.message : error.messageEn);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack type={4} title={`activeaccountscreen.titletrong`} />
      <Div paddingHorizontal={16} flex={1}>
        <Div alignItems={'center'}>
          <Label
            size={20}
            fontWeight={'700'}>{`activeaccountscreen.kichhoattaikhoan`}</Label>
          <Label
            marginTop={3}
            marginHorizontal={14}
            textAlign={'center'}
            size={14}>{`activeaccountscreen.contentactive`}</Label>
        </Div>
        <Label
          marginTop={17}>{`activeaccountscreen.sodienthoaidadangky`}</Label>
        <InputItem
          maxLength={10}
          inputRef={phoneRef}
          value={phone}
          isError={isErrorPhone}
          // titleError={
          //   phone.length
          //     ? `registerscreen.saisodienthoai`
          //     : `registerscreen.sodienthoaikhongduocdetrong`
          // }
          placeholder={parseMultilanguage(`activeaccountscreen.placehoder`)}
          marginHorizontal={0}
          marginTop={6}
          onChangeText={(t: string) => {
            setPhone(t);
            if (isErrorPhone) {
              setIsErrorPhone(false);
            }
          }}
          keyboardType={'number-pad'}
          onSubmitEditing={() => {
            setIsErrorPhone(!isvalidPhone(phone));
            const t: string = phone.length
              ? I18nState == 'vi'
                ? 'Sai số điện thoại'
                : 'Phone number is incorrect'
              : I18nState == 'vi'
              ? 'Số điện thoại bắt buộc nhập'
              : 'Phone number is required';
            setTitleError(t);
            doActiveAccount();
          }}
        />
        {isErrorPhone && (
          <Div
            alignItems="center"
            justifyContent="flex-start"
            marginTop={6}
            flexWrap={'wrap'}
            flexDirection="row">
            <Label
              size={14}
              multilanguage={false}
              color={Ecolors.redColor}
              fontWeight="400">
              {titleError}
            </Label>
          </Div>
        )}
        <Button
          width={'100%'}
          height={48}
          onPress={() => {
            doActiveAccount();
          }}
          marginTop={17}
          borderRadius={5}
          backgroundColor={Ecolors.mainColor}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <>
              <Label
                fontWeight={'500'}
                color={
                  Ecolors.whiteColor
                }>{`activeaccountscreen.tieptuc`}</Label>
              <ImageView
                width={22}
                marginLeft={10}
                height={11}
                resizeMode={'contain'}
                source={Icons.forwardregister}
              />
            </>
          )}
        </Button>
      </Div>
    </Div>
  );
}

export default React.memo(ActiveAccountModal);
