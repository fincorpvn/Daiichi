import {Div, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React from 'react';
import {convertTimestamp} from 'utils';

interface Props {
  data: any;
  actionDelete?: boolean;
  onSelectItem?: () => void;
}

function ItemNotification({data, actionDelete, onSelectItem}: Props) {
  return (
    <Div
      width={'100%'}
      paddingHorizontal={16}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'center'}>
      <Div
        width={'100%'}
        minHeight={148}
        borderWidth={0.8}
        borderColor={Ecolors.spaceColor}
        borderRadius={5}>
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          paddingVertical={13}
          borderBottomWidth={1}
          borderBottomColor={Ecolors.spaceColor}
          paddingHorizontal={11}
          justifyContent={'space-between'}>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-start'}>
            <ImageView
              source={Icons.warningamount}
              tintColor={Ecolors.greenColor}
              widthHeight={20}
              marginRight={11}
              resizeMode={'contain'}
            />
            <Label fontWeight={'700'} multilanguage={false}>
              Hệ thống
            </Label>
          </Div>
          <Label fontWeight={'700'} multilanguage={false}>
            {convertTimestamp(new Date().getTime())}
          </Label>
        </Div>
      </Div>
    </Div>
  );
}

export default React.memo(ItemNotification);
