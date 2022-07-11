import {useRoute} from '@react-navigation/core';
import {Div, HeaderBack, Label} from 'components';
import {Ecolors} from 'constant';
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {apiAsset} from 'services/apis/apiAsset';
import {useAppSelector} from 'store/hooks';
import {
  convertNav,
  convertNumber,
  convertPercent,
  convertTimestamp,
} from 'utils';

function RowSpaceItem(p: {
  marginTop?: number;
  paddingHorizontal?: number;
  children: any;
  borderColor?: any;
  isBorderBottom?: boolean;
}) {
  return (
    <>
      <Div
        paddingHorizontal={p.paddingHorizontal ?? 19}
        flexDirection={'row'}
        marginTop={p.marginTop ?? 0}
        alignItems={'center'}
        justifyContent={'space-between'}>
        {p.children && p.children}
      </Div>
      {p.isBorderBottom && (
        <Div
          width={'100%'}
          marginTop={10}
          height={1}
          backgroundColor={p.borderColor || Ecolors.spaceColor}
        />
      )}
    </>
  );
}

const ItemTable = (p: {item: any}) => {
  const {item} = p;
  const I18nState = useAppSelector(state => state.languages.I18nState);
  return (
    <Div
      minHeight={216}
      overflow={'hidden'}
      backgroundColor={Ecolors.whiteColor}>
      <Div backgroundColor={Ecolors.spaceColor}>
        <RowSpaceItem marginTop={10}>
          {/* <Label size={14}>{`assetscreen.quychuongtrinh`}</Label> */}
          <Label size={14}>{`assetscreen.phiengiaodich`}</Label>
          <Label multilanguage={false} size={14}>
            {convertTimestamp(p.item.buyDate)}
          </Label>
        </RowSpaceItem>
        <Div height={10} />
      </Div>

      <RowSpaceItem marginTop={10} isBorderBottom={true}>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`assetscreen.soluong`}</Label>
        <Label multilanguage={false} size={14}>
          {convertNav(p.item.holdingVolume, true)}
        </Label>
      </RowSpaceItem>

      <RowSpaceItem marginTop={10} isBorderBottom={true}>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`assetscreen.tongdautu`}</Label>
        <Label multilanguage={false} size={14}>
          {convertNumber(`${Math.round(p.item.lockAmount ?? 0)}`)}
        </Label>
      </RowSpaceItem>
      <RowSpaceItem marginTop={10} isBorderBottom={true}>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`assetscreen.giamua`}</Label>
        <Label multilanguage={false} size={14}>
          {convertNav(p.item.price)}
        </Label>
      </RowSpaceItem>
      <RowSpaceItem marginTop={10} isBorderBottom={true}>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`assetscreen.navkitruoc`}</Label>
        <Label multilanguage={false} size={14}>
          {convertNav(p.item.navCurrently)}
        </Label>
      </RowSpaceItem>
      <RowSpaceItem marginTop={10} isBorderBottom={true}>
        <Label
          color={Ecolors.grayColor}
          size={14}>{`assetscreen.giatrihientai`}</Label>
        <Label multilanguage={false} size={14}>
          {convertNumber(Math.round(p.item.sumOfValue ?? 0))}
        </Label>
      </RowSpaceItem>
      <RowSpaceItem marginTop={10}>
        <Label color={Ecolors.grayColor} size={14}>{`assetscreen.loilo`}</Label>
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
      <Div height={10} />
    </Div>
  );
};

function ListAssetDetailsModal() {
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState<boolean>(false);
  const [tableManagement, setTableManagement] = useState<any>({});
  const [assetManagement, setAssetManagement] = useState<any>({});

  const {data} = route.params;
  useEffect(() => {
    getData(data);
    return () => {};
  }, [data]);

  const getData = async (i: any) => {
    try {
      setLoading(true);
      const table = await apiAsset.loadTableAsset({
        pagination: {
          currentPage: 1,
          itemsPerPage: 1000,
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
      console.log('tale', table);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack type={'2'} title={`assetscreen.chitiet`} />
      <Div
        flexDirection={'row'}
        padding={15}
        paddingBottom={5}
        alignItems={'center'}
        justifyContent={'center'}>
        <Label
          fontWeight={'700'}>{`assetscreen.danhsachlenhmuadangnamgiu`}</Label>
        <Label fontWeight={'700'} multilanguage={false}>
          {` ${data?.code || ''}`}
        </Label>
      </Div>
      <Div flex={1}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => getData(data)}
              tintColor={Ecolors.mainColor}
            />
          }
          data={tableManagement?.items?.orderList || []}
          ListHeaderComponent={() => <Div height={16} />}
          ListFooterComponent={() => <Div height={16} />}
          keyExtractor={(item: any, index: number) => `key${item.id}${index}`}
          renderItem={(p: {item: any; index: number}) => {
            return <ItemTable item={p.item} />;
          }}
        />
      </Div>
      <Div
        borderTopWidth={1}
        backgroundColor={Ecolors.spaceColor}
        borderTopColor={Ecolors.bordercolor}>
        <RowSpaceItem marginTop={10}>
          <Div flex={1}>
            <Label size={14}>{`assetscreen.tonggiatridangnamgiu`}</Label>
          </Div>
          <Label fontWeight={'700'} multilanguage={false}>
            {convertNumber(Math.round(assetManagement?.sumOfAsset ?? 0)) || 0}
          </Label>
        </RowSpaceItem>
        <RowSpaceItem
          marginTop={10}
          borderColor={Ecolors.grayColor}
          isBorderBottom={true}>
          <Div flex={1}>
            <Label size={14}>{`assetscreen.tonggiatridangchokhop`}</Label>
          </Div>
          <Label fontWeight={'700'} multilanguage={false}>
            {convertNumber(Math.round(assetManagement?.sellValue ?? 0)) || 0}
          </Label>
        </RowSpaceItem>
        <RowSpaceItem marginTop={10}>
          <Div flex={1}>
            <Label size={14}>{`assetscreen.tongtaisan`}</Label>
          </Div>
          <Label fontWeight={'700'} multilanguage={false}>
            {convertNumber(Math.round(assetManagement?.sumOfAssetTemp ?? 0)) ||
              0}
          </Label>
        </RowSpaceItem>
        <Div height={insets.bottom + 20} />
      </Div>
    </Div>
  );
}

export default React.memo(ListAssetDetailsModal);
