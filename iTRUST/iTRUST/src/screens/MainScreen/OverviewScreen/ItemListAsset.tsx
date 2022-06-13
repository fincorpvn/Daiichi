import {Div, Label} from 'components';
import {Ecolors, EStyle} from 'constant';
import React from 'react';
import {Animated} from 'react-native';
import {useAppSelector} from 'store/hooks';
import {
  convertNav,
  convertNumber,
  convertPercent,
  convertProductCode,
} from 'utils';

interface Props {
  data: any;
  scale: any;
}

function RowSpaceItem(p: {children?: any; paddingTop?: number}) {
  return (
    <Div
      flexDirection={'row'}
      paddingTop={p.paddingTop ?? 0}
      alignItems={'center'}
      width={'100%'}
      justifyContent={'space-between'}>
      {p.children && p.children}
    </Div>
  );
}

function ItemListAsset({data, scale}: Props) {
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const {
    color,
    name,
    code,
    holdingVolume,
    sumOfValueNavCurrent,
    interestOrHole,
    ratePercent,
  } = data;
  return (
    <Div width={259}>
      <Animated.View
        style={{
          flex: 1,
          transform: [
            {
              scale,
            },
          ],
        }}>
        <Div
          flex={1}
          backgroundColor={Ecolors.whiteColor}
          style={EStyle.shadowItem}
          borderRadius={8}
          borderColor={Ecolors.bordercolor}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          paddingVertical={10}
          paddingHorizontal={5}
          borderWidth={0.8}>
          {/* line */}
          <Div
            backgroundColor={color || Ecolors.mainColor}
            width={5}
            borderRadius={10}
            height={'100%'}
          />
          {/* content   */}
          <Div
            paddingLeft={15}
            paddingRight={10}
            justifyContent={'flex-start'}
            flex={1}
            flexDirection={'column'}
            alignItems={'flex-start'}>
            <RowSpaceItem>
              <Label multilanguage={false} fontWeight={'500'}>
                {code}
              </Label>
              <Label
                fontWeight={'500'}
                color={color}
                multilanguage={false}
                size={14}>
                {convertPercent(ratePercent)}
              </Label>
            </RowSpaceItem>
            {/* <Label size={14} multilanguage={false} color={Ecolors.gray2x}>
              {convertProductCode({ ...data, I18nState: I18nState })}
            </Label> */}
            <RowSpaceItem paddingTop={20}>
              <Label size={14} color={Ecolors.grayColor}>
                {`overviewscreen.tongsocqq`}
              </Label>
              <Label size={14} color={Ecolors.grayColor}>
                {`overviewscreen.giatrihientai`}
              </Label>
            </RowSpaceItem>
            <RowSpaceItem paddingTop={4}>
              <Label size={14} multilanguage={false}>
                {convertNav(holdingVolume, true)}
              </Label>
              <Label multilanguage={false} size={14}>
                {convertNumber(Math.round(sumOfValueNavCurrent))}
              </Label>
            </RowSpaceItem>
            <Div
              height={1}
              width={'100%'}
              backgroundColor={Ecolors.spaceColor}
              marginTop={9}
            />
            <RowSpaceItem paddingTop={6}>
              <Label size={14}>{`overviewscreen.loilo`}</Label>
            </RowSpaceItem>
            <RowSpaceItem paddingTop={4}>
              <Label
                size={14}
                fontWeight={'500'}
                multilanguage={false}
                color={
                  interestOrHole >= 0 ? Ecolors.greenColor : Ecolors.redColor
                }>
                {interestOrHole >= 0 && '+'}
                {convertPercent(interestOrHole)}
              </Label>
              <Div />
            </RowSpaceItem>
            <Div height={10} />
          </Div>
        </Div>
      </Animated.View>
    </Div>
  );
}

export default React.memo(ItemListAsset);
