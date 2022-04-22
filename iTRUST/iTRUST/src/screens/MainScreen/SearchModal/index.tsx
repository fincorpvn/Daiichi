/* eslint-disable @typescript-eslint/no-unused-vars */
import {Button, Div, Label} from 'components';
import {Ecolors} from 'constant';
import React from 'react';
import {View} from 'react-native';
import {goBack, navigate} from 'services/navigation';
import {heightScale, widthScreen} from 'utils';

function SearchModal() {
  return (
    <Div flex={1} alignItems={'center'} justifyContent={'center'}>
      <Button
        onPress={() => {
          // goBack();
          navigate('ProfileScreen');
        }}
        width={widthScreen}
        height={200}
        backgroundColor={Ecolors.blue}
        alignItems={'center'}
        justifyContent={'center'}
        borderRadius={20}>
        <Label color={Ecolors.white}>Goback</Label>
      </Button>
    </Div>
  );
}

export default React.memo(SearchModal);
