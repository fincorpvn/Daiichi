import {Button, Div, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React from 'react';

interface IItem {
  title?: string;
  icon?: any;
  iconRight?: any;
  isForward?: boolean;
  onPress?: () => void;
  color?: string;
  content?: string;
  contentColor?: string;
  iconRightColor?: string;
  isLine?: boolean;
  iconRightSize?: number;
}

function ItemCardProfile(Props: {item: IItem}) {
  return (
    <>
      <Button
        onPress={() => Props.item.onPress && Props.item.onPress()}
        height={50}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        paddingLeft={17}
        paddingRight={24}
        backgroundColor={Ecolors.white}>
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-start'}>
          <Div width={25}>
            <ImageView
              tintColor={Props.item.color || Ecolors.textColor}
              source={Props.item.icon || Icons.close}
              widthHeight={13}
              resizeMode={'contain'}
            />
          </Div>
          <Label color={Props.item.color || Ecolors.textColor}>
            {Props.item.title}
          </Label>
        </Div>
        {Props.item.content && (
          <Div
            flex={1}
            marginRight={24}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}>
            <Label
              color={Props.item.contentColor || Ecolors.textColor}
              multilanguage={false}>
              {Props.item.content}
            </Label>
          </Div>
        )}
        {Props.item.isForward && (
          <ImageView
            source={Props.item.iconRight || Icons.forward}
            widthHeight={Props.item.iconRightSize || 12}
            tintColor={Props.item.iconRightColor || Ecolors.textColor}
            resizeMode={'contain'}
          />
        )}
      </Button>
      {Props.item.isLine ? (
        <Div height={1} width={'100%'} backgroundColor={Ecolors.spaceColor} />
      ) : (
        <Div height={10} />
      )}
    </>
  );
}

export default React.memo(ItemCardProfile);
