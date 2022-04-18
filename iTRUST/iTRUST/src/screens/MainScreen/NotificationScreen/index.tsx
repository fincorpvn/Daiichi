import {Div, HeaderBack} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {objectToArray} from 'utils';
import FooterActionDelete from './FooterActionDelete';
import ItemNotification from './ItemNotification';

function NotificationScreen() {
  const [loading, setLoading] = useState(false);
  const [actionDelete, setActionDelete] = useState(false);
  const [itemSelect, setItemSelect] = useState({});

  const keyExtractor = (item: any, index: number) => `key${index}`;

  const renderItem = (p: {item: any; index: number}) => {
    return (
      <ItemNotification
        actionDelete={actionDelete}
        onSelectItem={() => {
          onSelectItem(p.item);
        }}
        data={p.item}
      />
    );
  };

  const ListHeaderComponent = () => {
    return <Div height={21} />;
  };
  const ListFooterComponent = () => {
    return <Div height={100} />;
  };
  const ItemSeparatorComponent = () => {
    return <Div height={10} />;
  };

  const onRefresh = async () => {};

  const onLoadMore = async () => {};

  const onAcceptDelete = async () => {};

  const onSelectItem = (item: any) => {};

  return (
    <Div flex={1} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack
        type={2}
        title={`notificationscreen.thongbao`}
        iconRight={Icons.delete}
        onRightPress={() => {
          setActionDelete(true);
        }}
      />
      <FlatList
        data={Array(10).fill(0)}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor={Ecolors.mainColor}
          />
        }
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        onEndReachedThreshold={0.4}
        onEndReached={onLoadMore}
      />
      {actionDelete && (
        <FooterActionDelete
          onCancel={() => {
            setActionDelete(false);
          }}
          onAccept={() => {
            onAcceptDelete();
          }}
        />
      )}
    </Div>
  );
}

export default React.memo(NotificationScreen);
