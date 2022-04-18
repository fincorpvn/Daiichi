import {Div, Label, NonData} from 'components';
import {Ecolors} from 'constant';
import React, {useCallback, useEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loadAutoInvest} from 'reducer/transaction';
import {useAppSelector} from 'store/hooks';
import ItemAutoinvestTransaction from './ItemAutoinvestTransaction';

function AutoInvestTranasction() {
  const dispatch = useDispatch();
  const listAutoInvest = useAppSelector(
    state => state.transaction.listAutoInvest,
  );
  const loading = useAppSelector(state => state.transaction.loadingAutoInvest);

  useEffect(() => {
    dispatch(loadAutoInvest({}));
    return () => {};
  }, []);

  const ListHeaderComponent = () => {
    return (
      <Div
        height={10}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'flex-start'}>
        {/* <Label>{`transactionscreen.tongsolenh`}</Label> */}
      </Div>
    );
  };

  const ItemSeparatorComponent = () => {
    return <Div height={10} />;
  };

  const onRefresh = () => {
    dispatch(loadAutoInvest({}));
  };

  const ListFooterComponent = () => {
    return (
      <Div
        height={50}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}></Div>
    );
  };

  const keyExtractor = (item: any, index: number) =>
    `key${item.productProgramId}${index}`;

  const renderItem = (p: {item: any; index: number}) => {
    return <ItemAutoinvestTransaction data={p.item} />;
  };

  const ListEmptyComponent = useCallback(() => {
    return (
      <NonData
        loading={loading}
        content={`transactionscreen.chuacogiaodich`}
        paddingTop={30}
      />
    );
  }, [loading]);
  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <FlatList
        data={listAutoInvest}
        extraData={listAutoInvest}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
            tintColor={Ecolors.mainColor}
          />
        }
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        onEndReachedThreshold={0.4}
      />
    </Div>
  );
}

export default React.memo(AutoInvestTranasction);
