import { Button, Div, ImageView, Input, Label } from 'components';
import { Ecolors, Icons } from 'constant';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { KeyboardTypeOptions } from 'react-native';
import { useAppSelector } from 'store/hooks';

interface PropsInputItem {
  isShowAndHide?: boolean;
  isInput?: boolean;
  autoFocus?: boolean;
  onChangeText?: (evt: string) => void;
  value?: string;
  placeholder?: string;
  marginTop?: number;
  marginHorizontal?: number;
  keyboardType?: KeyboardTypeOptions;
  onSubmitEditing?: () => void;
  inputRef?: any;
  onHandleChange?: () => void;
  renderButtonRight?: () => ReactElement;
  titleError?: string;
  isError?: boolean;
  maxLength?: number;
}

function InputItem({
  onChangeText,
  value = '',
  placeholder = '',
  isShowAndHide = false,
  isError = false,
  isInput = true,
  marginTop = 0,
  keyboardType = 'name-phone-pad',
  marginHorizontal = 30,
  onSubmitEditing,
  onHandleChange,
  inputRef,
  titleError,
  renderButtonRight,
  maxLength,
}: PropsInputItem) {
  const [secureTextEntry, setSecureTextEntry] = useState(isShowAndHide);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const debounceHandle = useRef<any>(null);

  const onChangeStatus = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  useEffect(() => {
    if (value?.length > 0 && onHandleChange) {
      controlDeboundHandle();
    }
    return () => { };
  }, [value]);
  useEffect(() => {
    if (value?.length > 0 && onHandleChange && !isFocus) {
      controlDeboundHandle();
    }
    return () => { };
  }, [isFocus]);

  useEffect(() => {
    if (value?.length > 0 && onHandleChange && !isFocus) {
      controlDeboundHandle();
    }
    return () => {};
  }, [isFocus]);

  const controlDeboundHandle = () => {
    if (debounceHandle.current) {
      clearTimeout(debounceHandle.current);
    }
    debounceHandle.current = setTimeout(() => {
      if (isFocus) {
        return;
      }
      onHandleChange && onHandleChange();
    }, 700);
  };

  return (
    <>
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        borderWidth={0.7}
        borderColor={
          isError
            ? Ecolors.redColor
            : isFocus
              ? Ecolors.focusColor
              : Ecolors.grayColor
        }
        borderRadius={5}
        justifyContent={'flex-start'}
        marginHorizontal={marginHorizontal}
        paddingLeft={15}
        backgroundColor={isInput ? 'transparent' : 'rgba(73, 85, 163, 0.1)'}
        paddingRight={isShowAndHide ? 5 : 15}
        height={48}
        marginTop={marginTop}>
        {isInput ? (
          <Input
            inputRef={inputRef && inputRef}
            onSubmitEditing={() => onSubmitEditing && onSubmitEditing()}
            secureTextEntry={secureTextEntry}
            padding={0}
            margin={0}
            flex={1}
            onFocus={() => {
              setIsFocus(true);
            }}
            onBlur={() => {
              setIsFocus(false);
            }}
            marginVertical={10}
            width={'100%'}
            height={'100%'}
            fontSize={15}
            textAlign={'left'}
            color={Ecolors.textColor}
            placeholder={I18nState == 'vi' ? placeholder : placeholder}
            placeholderTextColor={Ecolors.placeHoderColor}
            value={value}
            numberOfLine={1}
            maxLength={maxLength}
            keyboardType={keyboardType || 'name-phone-pad'}
            onChangeText={(evt: string) => onChangeText && onChangeText(evt)}
          />
        ) : (
          <Div marginVertical={10}>
            <Label multilanguage={false} size={15} color={Ecolors.textColor}>
              {value || ''}
            </Label>
          </Div>
        )}
        {isInput && renderButtonRight && renderButtonRight()}
        {isShowAndHide && (
          <Button
            onPress={onChangeStatus}
            alignItems={'center'}
            justifyContent={'center'}>
            <ImageView
              tintColor={Ecolors.textColor}
              source={secureTextEntry ? Icons.eyeClose : Icons.eyeOpen}
              widthHeight={22}
            />
          </Button>
        )}
        {/* {isError && (
          <ImageView
            tintColor={Ecolors.red}
            source={Icons.error}
            widthHeight={22}
          />
        )} */}
      </Div>
      {isError && !!titleError && (
        <Div
          alignItems="center"
          justifyContent="flex-start"
          marginTop={6}
          flexDirection="row">
          <Label size={14} color={Ecolors.redColor} fontWeight="400">
            {titleError}
          </Label>
        </Div>
      )}
    </>
  );
}

export default React.memo(InputItem);
