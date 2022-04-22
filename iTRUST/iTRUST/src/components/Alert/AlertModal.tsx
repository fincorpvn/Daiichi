import {useRoute} from '@react-navigation/core';
import {Button, ButtonBorder, Div, ImageView, Label} from 'components';
import {Ecolors, EStyle, Icons} from 'constant';
import React, {useEffect, useState} from 'react';
import {goBack} from 'services';
import {Log} from 'utils';

function AlertModal() {
  const route = useRoute<any>();
  Log('route?.params', route?.params.type);
  useEffect(() => {
    return () => {
      route?.params?.onClose && route?.params?.onClose();
    };
  }, []);
  return (
    <Div flex={1} alignItems={'center'} justifyContent={'center'}>
      <Div
        width={337}
        borderRadius={5}
        style={EStyle.shadow}
        backgroundColor={Ecolors.whiteColor}
        minHeight={193}>
        {/* header */}
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          borderBottomWidth={1}
          borderBottomColor={Ecolors.spaceColor}>
          <Div heightWidth={46} />
          <Div
            flexDirection={'row'}
            flex={1}
            alignItems={'center'}
            justifyContent={'center'}>
            <Label
              // multilanguage={route?.params?.multilanguage ?? true}
              fontWeight={'700'}>
              {route?.params?.title || ''}
            </Label>
          </Div>
          <Button
            onPress={() => {
              route?.params?.onClose && route?.params?.onClose();
              goBack();
            }}
            widthHeight={46}
            alignItems={'center'}
            justifyContent={'center'}>
            <ImageView
              source={Icons.close}
              widthHeight={20}
              resizeMode={'contain'}
            />
          </Button>
        </Div>
        {/* content */}
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          marginTop={28}
          marginBottom={39}
          paddingHorizontal={35}>
          <Label
            multilanguage={route?.params?.multilanguage ?? true}
            textAlign={'center'}>
            {route?.params?.content || ''}
          </Label>
        </Div>
        {route?.params?.error ? (
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            paddingHorizontal={14}
            paddingBottom={13}>
            <ButtonBorder
              type={1}
              width={148}
              title={route?.params?.titleClose}
              onPress={() => {
                goBack();
                // route?.params?.onCancel && route?.params?.onCancel();
              }}
            />
          </Div>
        ) : route?.params?.type == 1 ? (
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            paddingHorizontal={14}
            paddingBottom={13}>
            <ButtonBorder
              type={2}
              width={148}
              title={route?.params?.titleCancel}
              onPress={() => {
                goBack();
                route?.params?.onCancel && route?.params?.onCancel();
              }}
            />
            <ButtonBorder
              type={1}
              width={148}
              title={route?.params?.titleConfirm}
              onPress={() => {
                goBack();
                route?.params?.onConfirm && route?.params?.onConfirm();
              }}
            />
          </Div>
        ) : (
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            paddingHorizontal={14}
            paddingBottom={13}>
            <ButtonBorder
              type={1}
              width={148}
              title={route?.params?.titleClose}
              onPress={() => {
                goBack();
                route?.params?.onConfirm && route?.params?.onConfirm();
              }}
            />
          </Div>
        )}
      </Div>
    </Div>
  );
}

export default React.memo(AlertModal);
