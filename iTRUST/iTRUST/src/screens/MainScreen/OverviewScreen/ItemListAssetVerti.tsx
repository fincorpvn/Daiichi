import {Button, Div, ImageView, Label} from 'components';
import {Ecolors, EStyle, Icons} from 'constant';
import React, {useState} from 'react';
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

function ItemListAssetVerti({data}: Props) {
  const [isDetails, setIsDetails] = useState<boolean>(false);
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const {
    color,
    name,
    holdingVolume,
    code,
    sumOfValueNavCurrent,
    navCurrent,
    navInvested,
    interestOrHole,
    ratePercent,
    sumOfValueNavInvested,
  } = data;

  return (
    <Button
      isScale={false}
      onPress={() => setIsDetails(a => !a)}
      marginHorizontal={16}
      backgroundColor={Ecolors.whiteColor}
      style={EStyle.shadowItem}
      borderRadius={8}
      borderColor={Ecolors.bordercolor}
      paddingVertical={16}
      paddingLeft={16}
      paddingRight={26}
      borderWidth={0.8}>
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Div flexDirection={'row'} alignItems={'center'}>
          <Div
            backgroundColor={color || Ecolors.mainColor}
            width={5}
            borderRadius={10}
            height={40}
            marginRight={9}
          />
          <Div alignItems={'flex-start'}>
            <Div
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'flex-start'}>
              <Label marginRight={10} multilanguage={false} fontWeight={'500'}>
                {code}
              </Label>
              <Label
                fontWeight={'500'}
                color={color}
                multilanguage={false}
                size={14}>
                {convertPercent(ratePercent)}
              </Label>
            </Div>
            <Label size={14} multilanguage={false}>
              {convertNumber(Math.round(sumOfValueNavCurrent ?? 0))}
            </Label>
          </Div>

          {/* <Label size={14} multilanguage={false} color={ Ecolors.gray2x}>
            {convertProductCode({...data, I18nState: I18nState})}
            </Label> */}
        </Div>
        <Div flexDirection={'row'} alignItems={'center'}>
          <Div alignItems={'flex-end'}>
            <Div flexDirection={'row'} alignItems={'center'}>
              <ImageView
                marginRight={4}
                source={
                  interestOrHole >= 0
                    ? Icons.uppecent
                    : Icons.downpecent || Icons.uppecent
                }
                width={7}
                height={15}
                resizeMode={'contain'}
              />
              <Label
                fontWeight={'700'}
                multilanguage={false}
                color={
                  interestOrHole >= 0 ? Ecolors.greenColor : Ecolors.redColor
                }>
                {convertPercent(Math.abs(interestOrHole))}
              </Label>
            </Div>
          </Div>
          <Button onPress={() => setIsDetails(a => !a)} paddingLeft={15}>
            <ImageView
              source={isDetails ? Icons.up : Icons.down}
              width={10}
              tintColor={Ecolors.textColor}
              height={18}
              resizeMode={'contain'}
            />
          </Button>
        </Div>
        {/*  */}
      </Div>
      {isDetails && (
        <>
          <RowSpaceItem paddingTop={20}>
            <Label size={14} color={Ecolors.grayColor}>
              {`overviewscreen.soluongCCQ`}
            </Label>
            <Label size={14} color={Ecolors.grayColor}>
              {`overviewscreen.tonggiatridaututrungbinh`}
            </Label>
          </RowSpaceItem>
          <RowSpaceItem paddingTop={4}>
            <Label size={14} multilanguage={false}>
              {`${convertNav(holdingVolume, true)} ${
                I18nState == 'vi' ? `CCQ` : 'Units'
              }`}
            </Label>

            <Label multilanguage={false} size={14}>
              {convertNumber(Math.round(sumOfValueNavInvested ?? 0))}
            </Label>
          </RowSpaceItem>

          <RowSpaceItem paddingTop={20}>
            <Label size={14} color={Ecolors.grayColor}>
              {`overviewscreen.NAVhientai`}
            </Label>
            <Label size={14} color={Ecolors.grayColor}>
              {`overviewscreen.giamuatrungbinh`}
            </Label>
          </RowSpaceItem>
          <RowSpaceItem paddingTop={4}>
            <Label multilanguage={false} size={14}>
              {convertNav(navCurrent)}
            </Label>
            <Label size={14} multilanguage={false}>
              {convertNav(navInvested)}
            </Label>
          </RowSpaceItem>
        </>
      )}
    </Button>
  );
}

export default React.memo(ItemListAssetVerti);
