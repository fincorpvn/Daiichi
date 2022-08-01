import {Button, Div, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React from 'react';

function ItemCard(p: {
  title?: string;
  icon?: any;
  onPress?: () => void;
  content?: string;
  isLine?: boolean;
  isEnd?: boolean;
  isCheck?: boolean;
  isRight?: boolean;
}) {
  return (
    <>
      <Button
        onPress={() => p.onPress && p.onPress()}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        paddingHorizontal={16}
        height={50}>
        <Label>{p.title}</Label>
        {p.content ? (
          <Div
            flex={1}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}>
            <Label multilanguage={false} marginLeft={10}>
              {p.content || ''}
            </Label>
          </Div>
        ) : (
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}>
            <ImageView
              widthHeight={17}
              source={p.isCheck ? Icons.check : Icons.uncheck}
              marginRight={10}
            />
            <ImageView
              source={Icons.forward}
              width={8}
              height={14}
              resizeMode={'contain'}
            />
          </Div>
        )}
      </Button>
      {!p.isEnd &&
        (p.isLine ? (
          <Div width={'100%'} height={1} backgroundColor={Ecolors.spaceColor} />
        ) : (
          <Div width={'100%'} height={7} backgroundColor={Ecolors.spaceColor} />
        ))}
    </>
  );
}

export default React.memo(ItemCard);
