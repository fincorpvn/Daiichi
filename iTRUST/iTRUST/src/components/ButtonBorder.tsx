import {Button, Div, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {ReactNode} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useAppSelector} from 'store/hooks';
import LoadingIndicator from './LoadingIndicator';

interface PropsButtonBorder {
  title?: string;
  onPress?: () => void;
  marginTop?: number;
  loading?: boolean | undefined;
  isDisable?: boolean | undefined;
  isNoColor?: boolean;
  width?: number | string;
  height?: number | string;
  IconRight?: any;
  onPressIconRight?: () => void;
  type?: number;
  size?: number;
}

function ButtonBorder({
  title = '',
  onPress,
  loading = false,
  isNoColor = false,
  isDisable = false,
  marginTop,
  width = 317,
  height = 48,
  IconRight = null,
  onPressIconRight,
  type = 1,
  size,
}: PropsButtonBorder) {
  const I18nState = useAppSelector(state => state.languages.I18nState);
  if (type == 1) {
    return (
      <Button
        onPress={() => {
          if (isDisable) {
            return;
          }
          onPress && onPress();
        }}
        width={width || 317}
        height={height || 48}
        marginTop={marginTop ?? 0}
        flexDirection={'row'}
        overflow={'hidden'}
        alignItems={'center'}
        justifyContent={'center'}
        borderRadius={5}
        borderColor={Ecolors.transparent}
        borderWidth={0.8}
        backgroundColor={isDisable ? Ecolors.disableColor : Ecolors.mainColor}>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <Label
            textAlign="center"
            fontWeight={'500'}
            size={size || 16}
            color={Ecolors.whiteColor}>
            {title}
          </Label>
        )}
        {/* {loading && (
          <Div
            style={StyleSheet.absoluteFill}
            alignItems={'center'}
            justifyContent={'center'}
            backgroundColor={Ecolors.transparentLoading}>
            <ActivityIndicator size={'small'} color={Ecolors.whiteColor} />
          </Div>
        )} */}
      </Button>
    );
  }

  if (type == 2) {
    return (
      <Button
        onPress={() => onPress && onPress()}
        width={width || 317}
        height={height || 48}
        flexDirection={'row'}
        marginTop={marginTop ?? 0}
        overflow={'hidden'}
        alignItems={'center'}
        justifyContent={'center'}
        borderRadius={5}
        backgroundColor={Ecolors.disableColor}>
        {loading ? (
          <LoadingIndicator color={Ecolors.whiteColor} />
        ) : (
          <Label
            textAlign="center"
            fontWeight={'500'}
            size={size || 16}
            color={Ecolors.textColor}>
            {title}
          </Label>
        )}
        {/* <Label
          textAlign="center"
          fontWeight={'500'}
          size={size || 16}
          color={Ecolors.textColor}>
          {title}
        </Label>
        {loading && (
          <Div
            style={StyleSheet.absoluteFill}
            alignItems={'center'}
            justifyContent={'center'}
            backgroundColor={Ecolors.transparentLoading}>
            <ActivityIndicator size={'small'} color={Ecolors.whiteColor} />
          </Div>
        )} */}
      </Button>
    );
  }
  if (type == 3) {
    return (
      <Button
        onPress={() => onPress && onPress()}
        width={width || 317}
        marginTop={marginTop ?? 0}
        overflow={'hidden'}
        height={height || 48}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        borderRadius={5}
        borderColor={Ecolors.textColor}
        borderWidth={0.8}
        backgroundColor={Ecolors.whiteColor}>
        {loading ? (
          <LoadingIndicator color={Ecolors.whiteColor} />
        ) : (
          <Label
            textAlign="center"
            fontWeight={'500'}
            size={size || 16}
            color={Ecolors.textColor}>
            {title}
          </Label>
        )}
        {/* {loading && (
          <Div
            style={StyleSheet.absoluteFill}
            alignItems={'center'}
            justifyContent={'center'}
            backgroundColor={Ecolors.transparentLoading}>
            <ActivityIndicator size={'small'} color={Ecolors.whiteColor} />
          </Div>
        )} */}
      </Button>
    );
  }

  return (
    <Div
      width={'100%'}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      marginTop={marginTop}>
      <Button
        overflow={'hidden'}
        alignItems={'center'}
        justifyContent={'center'}
        backgroundColor={isNoColor ? Ecolors.whiteColor : Ecolors.blue}
        width={width}
        height={40}
        borderRadius={10}
        borderWidth={isNoColor ? 1 : 0}
        borderColor={Ecolors.black}
        onPress={() => onPress && onPress()}>
        {loading ? (
          <LoadingIndicator color={Ecolors.whiteColor} />
        ) : (
          <Label
            textAlign="center"
            fontWeight={'bold'}
            color={isNoColor ? Ecolors.textColor : Ecolors.whiteColor}
            size={15}>
            {title}
          </Label>
        )}
        {/* {loading && (
          <Div
            style={StyleSheet.absoluteFill}
            alignItems={'center'}
            justifyContent={'center'}
            backgroundColor={Ecolors.transparentLoading}>
            <ActivityIndicator size={'small'} color={Ecolors.whiteColor} />
          </Div>
        )} */}
      </Button>
      {IconRight && (
        <Button
          onPress={() => onPressIconRight && onPressIconRight()}
          marginLeft={20}>
          <ImageView source={IconRight || Icons.finger} widthHeight={30} />
        </Button>
      )}
    </Div>
  );
}

export default React.memo(ButtonBorder);
