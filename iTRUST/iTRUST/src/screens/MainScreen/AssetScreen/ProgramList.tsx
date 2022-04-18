import {Button, Div, Label} from 'components';
import {Ecolors, EStyle} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {getProductList} from 'reducer/asset';
import {apiAsset} from 'services/apis/apiAsset';
import {useAppSelector} from 'store/hooks';
import {
  convertNav,
  convertNumber,
  convertPercent,
  convertTimestamp,
  Log,
  widthScale,
} from 'utils';

function RowSpaceItem(p: {
  marginTop?: number;
  children: any;
  isBorderBottom?: boolean;
}) {
  return (
    <>
      <Div
        flexDirection={'row'}
        marginTop={p.marginTop ?? 0}
        alignItems={'center'}
        justifyContent={'space-between'}>
        {p.children && p.children}
      </Div>
      {p.isBorderBottom && (
        <Div
          width={'100%'}
          marginTop={7}
          height={1}
          backgroundColor={Ecolors.spaceColor}
        />
      )}
    </>
  );
}

function ProgressSpace(p: {maxValue: number; currentValue: number}) {
  const progress = Math.round((p.currentValue / p.maxValue) * 100);
  return (
    <Div
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'flex-end'}>
      {/* <Div
        width={80}
        height={4}
        flexDirection={'row'}
        overflow={'hidden'}
        justifyContent={'flex-start'}
        borderRadius={10}
        backgroundColor={Ecolors.disableColor}
        alignItems={'center'}>
        <Div
          width={`${progress}%`}
          height={'100%'}
          backgroundColor={Ecolors.textColor}
          borderRadius={10}
        />
      </Div> */}
      <Label>{`assetscreen.lenh`}</Label>
      <Label
        marginLeft={8}
        multilanguage={false}>{`${p.currentValue}/${p.maxValue}`}</Label>
    </Div>
  );
}

function ItemTable(p: {item: any}) {
  const I18nState = useAppSelector(state => state.languages.I18nState);

  return (
    <Div
      paddingHorizontal={15}
      width={311}
      minHeight={216}
      borderRadius={8}
      borderColor={Ecolors.bordercolor}
      overflow={'hidden'}
      backgroundColor={Ecolors.whiteColor}
      style={EStyle.shadowItem}
      marginRight={16}
      borderWidth={0.8}>
      <RowSpaceItem marginTop={13}>
        <Label size={14}>{`assetscreen.quychuongtrinh`}</Label>
        <Label size={14}>{`assetscreen.phiengiaodich`}</Label>
      </RowSpaceItem>
      <RowSpaceItem isBorderBottom={true} marginTop={13}>
        <Label fontWeight={'700'} multilanguage={false} size={14}>
          {I18nState == 'vi'
            ? p.item.nameProgram
            : p.item.nameProgramEn || p.item.nameProgram}
        </Label>
        <Label fontWeight={'700'} multilanguage={false} size={14}>
          {convertTimestamp(p.item.buyDate)}
        </Label>
      </RowSpaceItem>
      <RowSpaceItem marginTop={13}>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`assetscreen.soluong`}</Label>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`assetscreen.giatridaututb`}</Label>
      </RowSpaceItem>
      <RowSpaceItem isBorderBottom={true} marginTop={13}>
        <Label multilanguage={false} size={14}>
          {convertNav(p.item.holdingVolume, true)}
        </Label>
        <Label multilanguage={false} size={14}>
          {convertNumber(`${Math.round(p.item.lockAmount ?? 0)}`)}
        </Label>
      </RowSpaceItem>
      <RowSpaceItem marginTop={13}>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`assetscreen.giamua`}</Label>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`assetscreen.navkitruoc`}</Label>
      </RowSpaceItem>
      <RowSpaceItem isBorderBottom={true} marginTop={13}>
        <Label multilanguage={false} size={14}>
          {convertNav(p.item.price)}
        </Label>
        <Label multilanguage={false} size={14}>
          {convertNav(p.item.navCurrently)}
        </Label>
      </RowSpaceItem>
      <RowSpaceItem marginTop={13}>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`assetscreen.giatrihientai`}</Label>
        <Label color={Ecolors.grayColor} size={14}>{`assetscreen.loilo`}</Label>
      </RowSpaceItem>
      <RowSpaceItem marginTop={13}>
        <Label multilanguage={false} size={14}>
          {convertNumber(Math.round(p.item.sumOfValue ?? 0))}
        </Label>
        <Label
          color={
            p.item.interestOrHoleAmount >= 0
              ? Ecolors.greenColor
              : Ecolors.redColor
          }
          multilanguage={false}
          size={14}>
          {p.item.interestOrHoleAmount >= 0 && '+'}
          {convertNumber(Math.round(p.item.interestOrHoleAmount ?? 0))}
          {' ('}
          {p.item.interestOrHolePercent >= 0 && '+'}
          {`${convertPercent(p.item.interestOrHolePercent)}`}
          {')'}
        </Label>
      </RowSpaceItem>
      <Div height={18} />
    </Div>
  );
}

function ProgramList() {
  const productList = useAppSelector(state => getProductList(state));
  const [itemActive, setItemActive] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [assetManagement, setAssetManagement] = useState<any>({});
  const [tableManagement, setTableManagement] = useState<any>({});
  const [indexScroll, setIndexScroll] = useState<number>(0);
  const flatlistRef = useRef<any>(null);

  const onViewableItemsChanged = React.useRef((res: any) => {
    onChangeItemFocus(res?.viewableItems?.[0].index || 0);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  const onChangeItemFocus = (a: number) => {
    setIndexScroll(a + 1);
  };

  useEffect(() => {
    if (productList?.length > 0) {
      setItemActive(productList[0]);
    }
    return () => {};
  }, [productList]);

  useEffect(() => {
    if (itemActive?.id) {
      getData(itemActive);
    }
    return () => {};
  }, [itemActive]);

  const getData = async (i: any) => {
    try {
      setLoading(true);
      const table = await apiAsset.loadTableAsset({
        pagination: {
          currentPage: 1,
          itemsPerPage: 20,
        },
        queries: {
          productId: i.id,
        },
      });
      const asset = await apiAsset.loadAssetManagement({
        id: i.id,
      });
      if (asset.status == 200) {
        setAssetManagement(asset.data);
      }
      if (table.status == 200) {
        setTableManagement(table.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
      if (flatlistRef.current) {
        flatlistRef.current.scrollToOffset({
          offset: 0,
          animated: false,
        });
      }
    }
  };

  if (productList?.length == 0) {
    return <Div />;
  }

  return (
    <Div>
      {/* list */}
      <Div
        marginTop={21}
        flexDirection={'row'}
        borderBottomWidth={1}
        borderBottomColor={Ecolors.grayColor}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {productList.map((item: any, index: number) => {
            const isFocus = itemActive?.id == item.id;
            return (
              <Button
                onPress={() => setItemActive(item)}
                borderBottomWidth={2}
                borderBottomColor={
                  isFocus ? Ecolors.mainColor : Ecolors.transparent
                }
                width={73}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'center'}
                paddingBottom={10}
                key={index}>
                <Label
                  fontWeight={'500'}
                  color={isFocus ? Ecolors.textColor : Ecolors.grayColor}
                  multilanguage={false}>
                  {item.code}
                </Label>
              </Button>
            );
          })}
        </ScrollView>
      </Div>
      {/* content */}
      <Div
        marginTop={14}
        flexDirection={'row'}
        paddingHorizontal={16}
        alignItems={'center'}
        justifyContent={'flex-start'}>
        <Label
          fontWeight={'500'}>{`assetscreen.danhsachlenhmuadangnamgiu`}</Label>
        <Label fontWeight={'500'} multilanguage={false}>
          {` ${itemActive?.code || ''}`}
        </Label>
      </Div>
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        marginTop={12}
        justifyContent={'space-between'}
        paddingHorizontal={16}>
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'flex-start'}>
          <Label size={14}>{`assetscreen.tongsodanhsach`}</Label>
          <Label size={14} multilanguage={false}>{` ${
            tableManagement?.items?.orderList?.length || ''
          }`}</Label>
        </Div>
        <ProgressSpace
          currentValue={indexScroll}
          maxValue={tableManagement?.items?.orderList?.length || 0}
        />
      </Div>

      {/* assest && table */}
      <Div paddingTop={16}>
        {loading && (
          <Div
            style={StyleSheet.absoluteFillObject}
            alignItems={'center'}
            justifyContent={'center'}>
            <ActivityIndicator color={Ecolors.mainColor} size={'large'} />
          </Div>
        )}

        <FlatList
          onViewableItemsChanged={onViewableItemsChanged.current}
          ref={flatlistRef}
          data={tableManagement?.items?.orderList || []}
          extraData={[itemActive.id]}
          showsHorizontalScrollIndicator={false}
          viewabilityConfig={viewConfigRef.current}
          horizontal={true}
          ListHeaderComponent={() => <Div width={16} />}
          snapToAlignment={'start'}
          decelerationRate={'fast'}
          snapToInterval={widthScale(311) + widthScale(16)}
          bouncesZoom={true}
          keyExtractor={(item: any, index: number) => `key${item.id}${index}`}
          renderItem={(p: {item: any; index: number}) => {
            return <ItemTable item={p.item} />;
          }}
        />
        {/*  */}
        <Div
          flexDirection={'row'}
          marginTop={15}
          paddingHorizontal={16}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Div
            width={166}
            padding={10}
            height={92}
            borderRadius={8}
            borderColor={Ecolors.bordercolor}
            style={EStyle.shadowItem}
            backgroundColor={Ecolors.whiteColor}
            borderWidth={0.8}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Label
              size={14}
              textAlign={'center'}>{`assetscreen.tonggiatridangnamgiu`}</Label>
            <Label marginTop={13} fontWeight={'700'} multilanguage={false}>
              {convertNumber(Math.round(assetManagement?.sumOfAsset ?? 0)) || 0}
            </Label>
          </Div>
          <Div
            width={166}
            padding={10}
            height={92}
            borderRadius={8}
            style={EStyle.shadowItem}
            backgroundColor={Ecolors.whiteColor}
            borderColor={Ecolors.bordercolor}
            borderWidth={0.8}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Label
              size={14}
              textAlign={'center'}>{`assetscreen.tonggiatridangchokhop`}</Label>
            <Label fontWeight={'700'} multilanguage={false}>
              {convertNumber(Math.round(assetManagement?.sellValue ?? 0)) || 0}
            </Label>
          </Div>
        </Div>
      </Div>
      {/* buton */}
      <Div
        flexDirection={'row'}
        alignItems={'center'}
        width={'100%'}
        justifyContent={'center'}>
        <Div
          backgroundColor={Ecolors.mainColor}
          borderRadius={8}
          style={EStyle.shadowItem}
          width={344}
          height={48}
          alignItems={'center'}
          flexDirection={'row'}
          marginTop={12}
          paddingHorizontal={43}
          justifyContent={'space-between'}>
          <Label
            size={14}
            color={Ecolors.whiteColor}>{`assetscreen.tongtaisan`}</Label>
          <Label
            fontWeight={'700'}
            multilanguage={false}
            color={Ecolors.whiteColor}>
            {convertNumber(Math.round(assetManagement.sumOfAssetTemp ?? 0)) ||
              0}
          </Label>
        </Div>
      </Div>
      {/*  */}
    </Div>
  );
}

export default React.memo(ProgramList);
