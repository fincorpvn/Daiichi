import {useRoute} from '@react-navigation/core';
import {Button, ButtonBorder, Div, ImageView, Label} from 'components';
import {Ecolors, EStyle, Icons} from 'constant';
import React, {useEffect, useState} from 'react';
import {goBack} from 'services';

function AlertError() {
  const route = useRoute<any>();
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <Div screen={true} alignItems={'center'} justifyContent={'center'}>
      <Div
        width={337}
        borderRadius={5}
        style={EStyle.shadow}
        backgroundColor={Ecolors.whiteColor}
        minHeight={193}>
        <Div
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}>
          <ImageView
            marginTop={31}
            source={Icons.erroricon}
            widthHeight={57}
            resizeMode={'contain'}
          />
          <Label
            margin={20}
            multilanguage={route?.params?.multilanguage ?? true}
            textAlign={'center'}>
            {route?.params?.content || ''}
          </Label>
        </Div>
        <Button
          width={'100%'}
          height={46}
          borderTopWidth={1}
          borderTopColor={Ecolors.spaceColor}
          alignItems={'center'}
          justifyContent={'center'}
          onPress={() => {
            goBack().then(() => {
              if (route?.params?.onPress) {
                route?.params?.onPress();
              }
            });
          }}>
          <Label
            size={16}
            color={Ecolors.linkColor}
            fontWeight={'500'}>{`alert.thulai`}</Label>
        </Button>
      </Div>
    </Div>
  );
}

export default React.memo(AlertError);
