import {Button, Div, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React from 'react';
import {ActivityIndicator, ImageBackground, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {goBack} from 'services';
import {widthScreen} from 'utils';
import HeaderBackType3 from './HeaderBackType3';

interface IpropsHeaderBack {
  title?: string;
  type?: number | string;
  children?: any;
  //
  titleRight?: string;
  iconRight?: any;
  contentCenter?: boolean;
  loading?: boolean;
  multilanguage?: boolean;
  onRightPress?: () => void;
  onLayout?: (t: any) => void;
  step?: number;
  isShowStep?: boolean;
}

function HeaderBack({
  title = '',
  type = 1,
  children,
  iconRight,
  titleRight,
  loading,
  onLayout,
  onRightPress,
  multilanguage,
  step,
  isShowStep,
  contentCenter,
}: IpropsHeaderBack) {
  const insests = useSafeAreaInsets();

  if (type == 1) {
    return (
      <ImageBackground
        width={widthScreen}
        resizeMode={'cover'}
        source={Icons.bgheader}>
        <Div
          paddingTop={insests.top + 15}
          paddingBottom={19}
          paddingHorizontal={16}
          // backgroundColor={Ecolors.mainColor}
        >
          <Div flexDirection={'row'} justifyContent={'flex-start'}>
            <Label size={18} fontWeight={'700'}>
              {title}
            </Label>
          </Div>
          {children && children}
        </Div>
      </ImageBackground>
    );
  }

  if (type == 2) {
    return (
      <ImageBackground
        width={widthScreen}
        resizeMode={'cover'}
        source={Icons.bgheader}>
        <Div
          onLayout={(evt: any) => {
            onLayout && onLayout(evt);
          }}
          paddingTop={insests.top + 15}
          paddingBottom={9}
          paddingLeft={19}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          paddingRight={24}
          // backgroundColor={Ecolors.mainColor}
        >
          <Button
            onPress={() => goBack()}
            height={40}
            width={60}
            paddingLeft={10}
            paddingVertical={10}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-start'}>
            <ImageView
              source={Icons.back}
              width={8}
              height={14}
              resizeMode={'contain'}
              tintColor={Ecolors.textColor}
            />
          </Button>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            flex={1}
            justifyContent={'center'}>
            <Label
              textAlign={'center'}
              multilanguage={multilanguage ?? true}
              size={16}
              color={Ecolors.textColor}>
              {title}
            </Label>
          </Div>
          {titleRight && (
            <Button
              onPress={() => {
                onRightPress && onRightPress();
              }}
              width={55}
              height={40}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'flex-end'}>
              {loading ? (
                <ActivityIndicator size={'small'} color={Ecolors.textColor} />
              ) : (
                <Label color={Ecolors.textColor}>{titleRight}</Label>
              )}
            </Button>
          )}
          {iconRight && (
            <Button
              onPress={() => {
                onRightPress && onRightPress();
              }}
              width={55}
              height={40}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'flex-end'}>
              {loading ? (
                <ActivityIndicator size={'small'} color={Ecolors.whiteColor} />
              ) : (
                <ImageView
                  source={iconRight || Icons.edit}
                  width={16}
                  height={19}
                  resizeMode={'contain'}
                />
              )}
            </Button>
          )}
          {!titleRight && !iconRight && <Div width={55} height={40} />}
        </Div>
      </ImageBackground>
    );
  }

  if (type == 3) {
    return (
      <ImageBackground
        width={widthScreen}
        resizeMode={'cover'}
        source={Icons.bgheader}>
        <HeaderBackType3 />
      </ImageBackground>
    );
  }

  if (type == 4) {
    // in unauthen // register ....
    return (
      // <ImageBackground
      //   width={widthScreen}
      //   resizeMode={'cover'}
      //   source={Icons.bgheader}>
      <Div
        paddingTop={insests.top + 15}
        paddingBottom={10}
        paddingHorizontal={16}
        // backgroundColor={Ecolors.whiteColor}
      >
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-start'}>
          <Button
            onPress={() => goBack()}
            height={40}
            paddingLeft={10}
            flexDirection={'row'}
            alignItems={'center'}>
            <ImageView
              source={Icons.back}
              width={8}
              height={14}
              resizeMode={'contain'}
              marginRight={16}
              tintColor={Ecolors.textColor}
            />
          </Button>
          {!isShowStep && (
            <Div
              flex={1}
              flexDirection={'row'}
              alignItems={'center'}
              marginRight={31}
              justifyContent={contentCenter ? 'center' : 'flex-start'}>
              <Label fontWeight={contentCenter ? '700' : '400'}>{title}</Label>
            </Div>
          )}
          {isShowStep && (
            <Div marginLeft={18} height={3} flexDirection={'row'}>
              {Array(3)
                .fill(0)
                .map((item: any, index: number) => {
                  return (
                    <Div
                      key={index}
                      height={3}
                      width={83}
                      marginHorizontal={1}
                      borderRadius={3}
                      backgroundColor={
                        step && step >= index + 1
                          ? Ecolors.mainColor
                          : Ecolors.grayColor || Ecolors.grayColor
                      }
                    />
                  );
                })}
            </Div>
          )}
        </Div>
      </Div>
      // </ImageBackground>
    );
  }

  return (
    <Div
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderBottomWidth={1}
      borderBottomColor={Ecolors.blue}
      paddingBottom={10}
      paddingTop={insests.top + 10}>
      <Button
        onPress={() => {
          goBack();
        }}
        width={50}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}>
        <ImageView
          tintColor={Ecolors.blue}
          source={Icons.back}
          widthHeight={30}
        />
      </Button>
      <Div
        flex={1}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}>
        <Label
          numberOfLines={1}
          size={18}
          fontWeight={'600'}
          color={Ecolors.blue}>
          {title || ''}
        </Label>
      </Div>
      <Div width={50} />
    </Div>
  );
}
export default React.memo(HeaderBack);
