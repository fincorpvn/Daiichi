import {
  Button,
  ButtonBorder,
  Div,
  ImageView,
  InputItem,
  Label,
  Alert,
  Dropdown,
} from 'components';
import HeaderBack from 'components/HeaderBack';
import {Ecolors, Icons} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {goBack, navigate} from 'services/navigation';
import {useAppSelector} from 'store/hooks';
import {checkRegisterValue, isvalidEmail, isvalidPhone} from 'utils';
interface ILblProps {
  content?: string;
  marginTop?: number;
}
function Lbl(props: ILblProps) {
  return (
    <Div
      flexDirection={'row'}
      alignItems={'center'}
      marginTop={props.marginTop ?? 0}
      justifyContent={'flex-start'}
      width={'100%'}>
      <Label>{props.content || ''}</Label>
      <Label multilanguage={false} color={Ecolors.red}>{` *`}</Label>
    </Div>
  );
}

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phonePostal, setPhonePostal] = useState('+84');
  const [province, setProvince] = useState<any>(null);
  const [userRefCode, setUserRefCode] = useState('');
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const [isErrorName, setIsErrorName] = useState<boolean>(false);
  const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false);
  const [isErrorPhone, setIsErrorPhone] = useState<boolean>(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const userRefCodeRef = useRef(null);
  const exp = I18nState == 'vi' ? `Ví dụ` : 'Exp';

  const gotoLogin = () => {
    navigate('LoginScreen');
  };

  useEffect(() => {
    if (phone.length && !phone.startsWith('0')) {
      setPhone(a => `0${a}`);
    }
    return () => {};
  }, [phone]);

  const gotoSetPassword = () => {
    if (
      checkRegisterValue({
        phone,
        name,
        email,
        province,
      })
    ) {
      navigate('SetPasswordScreen', {
        data: {
          name,
          email,
          phone,
          userRefCode,
          phonePostal,
          province,
        },
      });
    } else {
      setIsErrorName(!name.length);
      setIsErrorEmail(!isvalidEmail(email));
      setIsErrorPhone(!isvalidPhone(phone));
      if (!name.length) {
        focusNextInput(nameRef.current);
        return;
      }
      if (!isvalidEmail(email)) {
        focusNextInput(emailRef.current);
        return;
      }
      if (!isvalidPhone(phone)) {
        focusNextInput(phoneRef.current);
        return;
      }
    }

    return;
  };

  const focusNextInput = (prefix: any) => {
    if (prefix) {
      prefix?.focus();
    }
  };

  return (
    <Div useKeyboard={true} screen={true}>
      <HeaderBack
        isShowStep={true}
        step={1}
        type={4}
        title={`registerscreen.titletrong`}
      />
      <ScrollView>
        <Div paddingHorizontal={29}>
          <Div width={'100%'} alignItems={'center'}>
            <Label size={20} fontWeight={'700'}>
              {`registerscreen.dangki`}
            </Label>
            <Label
              marginTop={3}
              size={14}>{`registerscreen.hoantoanmienphivaratdongian`}</Label>
          </Div>

          <Lbl marginTop={48} content={`registerscreen.hotendaydu`} />
          <InputItem
            placeholder={
              I18nState == 'vi'
                ? `${exp}: Nguyễn Văn A`
                : `${exp}: Nguyen Van A`
            }
            value={name}
            onChangeText={(t: string) => {
              setName(t);
              if (isErrorName) {
                setIsErrorName(!t.length);
              }
            }}
            titleError={`registerscreen.tendaydubatbuocnhap`}
            isError={isErrorName}
            marginTop={6}
            marginHorizontal={0}
            inputRef={nameRef}
            onSubmitEditing={() => {
              focusNextInput(emailRef.current);
              setIsErrorName(!name.length);
            }}
          />
          <Lbl marginTop={13} content={`registerscreen.email`} />
          <InputItem
            inputRef={emailRef}
            placeholder={`${exp}: Abc@gmail.com`}
            marginTop={6}
            titleError={
              email.length
                ? `registerscreen.saidinhdangemail`
                : `registerscreen.emailkhongduocdetrong`
            }
            isError={isErrorEmail}
            marginHorizontal={0}
            keyboardType={'email-address'}
            value={email}
            onChangeText={(t: string) => {
              setEmail(t);
              if (isErrorEmail) {
                setIsErrorEmail(!isvalidEmail(t));
              }
            }}
            onSubmitEditing={() => {
              focusNextInput(phoneRef.current);
              setIsErrorEmail(!isvalidEmail(email));
            }}
          />

          <Lbl marginTop={13} content={`registerscreen.phonenumber`} />
          {/* <InputItem
            isError={isErrorPhone}
            titleError={`registerscreen.saisodienthoai`}
            inputRef={phoneRef}
            marginTop={6}
            placeholder={'Ví dụ: 0352222301'}
            keyboardType={'number-pad'}
            marginHorizontal={0}
            value={phone}
            onChangeText={setPhone}
            onSubmitEditing={() => {
              focusNextInput(userRefCodeRef.current);
              setIsErrorPhone(!isvalidPhone(phone));
            }}
          /> */}
          <Div
            marginTop={6}
            flexDirection={'row'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}>
            <Div width={99}>
              <InputItem
                // inputRef={phonePostal}
                placeholder={''}
                isInput={false}
                keyboardType={'name-phone-pad'}
                marginHorizontal={0}
                value={phonePostal}
                onChangeText={setPhonePostal}
                onSubmitEditing={() => {
                  // focusNextInput(userRefCodeRef.current);
                }}
              />
            </Div>

            <Div width={198}>
              <InputItem
                isError={isErrorPhone}
                titleError={
                  phone.length
                    ? `registerscreen.saisodienthoai`
                    : `registerscreen.sodienthoaikhongduocdetrong`
                }
                inputRef={phoneRef}
                placeholder={`${exp}: 03...`}
                keyboardType={'number-pad'}
                marginHorizontal={0}
                maxLength={10}
                value={phone}
                onChangeText={(t: string) => {
                  setPhone(t);
                  if (isErrorPhone) {
                    setIsErrorPhone(!isvalidPhone(t));
                  }
                }}
                onSubmitEditing={() => {
                  focusNextInput(userRefCodeRef.current);
                  setIsErrorPhone(!isvalidPhone(phone));
                }}
              />
            </Div>
          </Div>
          <Label marginTop={13}>{`accountverify.tinhthanhpho`}</Label>
          <Dropdown
            url={`province/list?countryId=${234}`}
            content={`accountverify.vuilongchontinhthanhpho`}
            multilanguage={true}
            value={province}
            paddingHorizontal={0}
            marginTop={6}
            isActive={true}
            onChange={(a: any) => {
              setProvince(a);
            }}
          />

          <Label
            marginTop={13}>{`registerscreen.magioithieucuanguoibanhang`}</Label>
          <InputItem
            inputRef={userRefCodeRef}
            placeholder={`${exp}: RR0938680277`}
            keyboardType={'name-phone-pad'}
            marginTop={6}
            marginHorizontal={0}
            value={userRefCode}
            onChangeText={setUserRefCode}
            onSubmitEditing={() => {
              gotoSetPassword();
            }}
          />

          <Button
            width={'100%'}
            height={48}
            onPress={() => {
              gotoSetPassword();
            }}
            marginTop={13}
            borderRadius={5}
            backgroundColor={Ecolors.mainColor}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Label
              fontWeight={'500'}
              color={Ecolors.whiteColor}>{`registerscreen.tieptuc`}</Label>
            <ImageView
              width={22}
              marginLeft={10}
              height={11}
              resizeMode={'contain'}
              source={Icons.forwardregister}
            />
          </Button>

          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            marginTop={15}>
            <Label size={15}>{`registerscreen.signintitle`}</Label>
            <Button
              onPress={() => {
                gotoLogin();
              }}>
              <Label size={15} fontWeight="700" color={Ecolors.linkColor}>
                {`registerscreen.dangnhap`}
              </Label>
            </Button>
          </Div>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-start'}
            marginTop={40}>
            <Label size={12} multilanguage={false}>
              {`(`}
              <Label
                size={12}
                multilanguage={false}
                color={Ecolors.redColor}>{`*`}</Label>
              {') '}
            </Label>
            <Label size={12}>{`registerscreen.thongtinbatbuoc`}</Label>
          </Div>
        </Div>
        <Div height={350} />
      </ScrollView>
    </Div>
  );
}

export default React.memo(RegisterScreen);
