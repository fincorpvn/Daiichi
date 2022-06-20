import {Div, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useEffect, useState} from 'react';
import {getAsset, getProductList, getProductListSort} from 'reducer/asset';
import {useAppSelector} from 'store/hooks';
import Pie from 'react-native-pie';
import {
  convertNumber,
  convertPercent,
  heightScale,
  Log,
  widthScale,
} from 'utils';
interface Props {
  itemFocus?: any;
  setItemFocus?: (e: any) => void;
}

function ChartPercentHeader({itemFocus, setItemFocus}: Props) {
  const productList = useAppSelector(state => getProductListSort(state));
  const [section, setSection] = useState<Array<any>>([]);
  const asset = useAppSelector(state => getAsset(state));
  useEffect(() => {
    if (productList?.length > 0) {
      bindData(productList);
    }
  }, [productList]);

  const bindData = (a: Array<any>) => {
    setSection(
      a.map((item, index) => {
        const percentage = Math.round(item.ratePercent * 100) / 100;
        return {
          percentage: percentage > 2 ? percentage : 2,
          color: item.color || Ecolors.mainColor,
        };
      }),
    );
  };

  if (!section.length || !asset) {
    return <></>;
  }
  return (
    <Div
      marginTop={20}
      flexDirection={'row'}
      paddingLeft={26}
      alignItems={'center'}
      width={'100%'}>
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}>
        <Div
          widthHeight={100}
          position={'absolute'}
          zIndex={999}
          elevation={999}
          borderRadius={100}
          backgroundColor={Ecolors.whiteColor}
          alignItems={'center'}
          justifyContent={'center'}></Div>
        <Pie
          backgroundColor={Ecolors.whiteColor}
          radius={widthScale(80)}
          dividerSize={widthScale(0.8)}
          sections={section}
        />
      </Div>
      <Div
        marginLeft={21}
        flex={1}
        flexDirection={'column'}
        alignItems={'flex-start'}>
        <Label>{`overviewscreen.sotiendautu`}</Label>
        <Label
          size={19}
          color={Ecolors.textColor}
          fontWeight={'700'}
          multilanguage={false}>
          {convertNumber(Math.round(asset?.sumOfValueInvested || 0))}
        </Label>

        <Label marginTop={11}>{`overviewscreen.tongloilo`}</Label>
        <Div flexDirection={'row'} alignItems={'center'}>
          <ImageView
            marginRight={4}
            source={
              asset?.sumOfInterestOrHole && asset?.sumOfInterestOrHole < 0
                ? Icons.downpecent
                : Icons.uppecent
            }
            width={7}
            height={15}
            resizeMode={'contain'}
          />
          <Label
            size={19}
            color={
              asset?.sumOfInterestOrHole && asset?.sumOfInterestOrHole < 0
                ? Ecolors.redColor
                : Ecolors.greenColor
            }
            fontWeight={'700'}
            multilanguage={false}>
            {`${convertPercent(Math.abs(asset?.sumOfInterestOrHole || 0))}`}
          </Label>
        </Div>
      </Div>
    </Div>
  );
}

export default React.memo(ChartPercentHeader);
