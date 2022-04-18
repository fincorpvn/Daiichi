import {useRoute} from '@react-navigation/core';
import {Button, Div, ImageView, Input, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {goBack} from 'services';
import {doGetAxios} from 'services/apis/axios';
import {useAppSelector} from 'store/hooks';
import {heightScale, Log, removeAllSpace, removeUtf8} from 'utils';

const ITEM_HEIGHT = heightScale(40);
function DropdownModal() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const flatlistRef = useRef<any>(null);
  const [textsearch, setTextsearch] = useState('');

  const route = useRoute<any>();
  const {
    value,
    url,
    initData,
    onChange,
    content,
    multilanguage,
    isSearch,
    multiline,
  } = route.params.data;

  useEffect(() => {
    if (initData?.length > 0) {
      setData(initData);
    } else {
      getData();
    }
    return () => {};
  }, [initData]);

  useEffect(() => {
    setTimeout(() => {
      if (flatlistRef.current && data.length > 0 && !multiline) {
        flatlistRef.current.scrollToIndex({
          index: value?.index || 0,
          animated: true,
        });
      }
    }, 100);

    return () => {};
  }, []);

  const onRefresh = () => {
    if (initData?.length > 0) {
      return;
    }
    getData();
  };

  const getData = async () => {
    try {
      setLoading(true);
      const res = await doGetAxios(url || '');
      if (res.status == 200) {
        // console.log('ressss', res);
        setData(
          res.data.map((item: any, index: number) => {
            return {
              ...item,
              textsearch: removeAllSpace(
                removeUtf8(item.name),
              ).toLocaleLowerCase(),
            };
          }),
        );
      }
    } catch (error) {
      console.log('error', {error, url});
    } finally {
      setLoading(false);
    }
  };

  // console.log('dropdown', data);

  const onPressItem = (item: any) => {
    onChange && onChange(item);
    goBack();
  };

  useEffect(() => {
    if (textsearch?.length == 0) {
      return;
    }
    filterData(textsearch);
    return () => {};
  }, [textsearch]);

  const filterData = (e: string) => {
    setData(a =>
      initData.filter((x: {textsearch: string}) =>
        x.textsearch?.includes(
          removeAllSpace(removeUtf8(e).toLocaleLowerCase()),
        ),
      ),
    );
  };

  const keyExtractor = (item: any, index: number) => ` key${item.id}`;

  const renderItem = (params: {item: any; index: number}) => {
    const isFocus = params.item.id == value?.id;
    const ob = multiline
      ? {
          paddingVertical: 10,
        }
      : {
          height: 40,
        };
    return (
      <Button
        onPress={() => onPressItem({...params.item, index: params.index})}
        flexDirection={'row'}
        alignItems={'center'}
        {...ob}
        marginRight={20}
        borderBottomWidth={1}
        borderBottomColor={Ecolors.spaceColor}
        paddingLeft={22}>
        <Label
          numberOfLines={!multiline ? 1 : undefined}
          color={isFocus ? Ecolors.blue : Ecolors.textColor}
          multilanguage={false}>
          {params.item.code ? `${params.item.code} - ` : ''}
          {I18nState == 'en'
            ? params.item.nameEn || params.item.name
            : params.item.name || params.item.name}
        </Label>
      </Button>
    );
  };

  const ListFooterComponent = () => {
    return <Div height={330} />;
  };

  const title = content || '';

  const objControl = multiline
    ? {}
    : {
        getItemLayout: (data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        }),
      };

  return (
    <Button isScale={false} onPress={() => goBack()}>
      <Div
        height={'100%'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'flex-end'}>
        <Div
          backgroundColor={Ecolors.whiteColor}
          height={'80%'}
          flexDirection={'column'}
          borderTopLeftRadius={5}
          width={'100%'}
          borderTopRightRadius={5}
          borderWidth={0.8}
          borderColor={Ecolors.bordercolor}>
          <Div
            flexDirection={'row'}
            alignItems={'center'}
            paddingLeft={14}
            justifyContent={'space-between'}>
            <Label fontWeight={'700'} multilanguage={multilanguage || false}>
              {title}
            </Label>
            <Button
              onPress={() => {
                goBack();
              }}
              paddingVertical={15}
              paddingHorizontal={18}>
              <ImageView
                widthHeight={15}
                source={Icons.close}
                resizeMode={'contain'}
              />
            </Button>
          </Div>
          {isSearch && (
            <Div
              marginHorizontal={10}
              height={36}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'flex-start'}
              borderRadius={5}
              borderWidth={0.8}
              marginBottom={10}
              borderColor={Ecolors.bordercolor}>
              <Input
                value={textsearch}
                onChangeText={(e: string) => setTextsearch(e)}
                paddingHorizontal={10}
                paddingVertical={0}
                autoFocus={true}
              />
            </Div>
          )}
          <FlatList
            keyboardShouldPersistTaps={'handled'}
            ref={flatlistRef}
            data={data}
            extraData={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListFooterComponent={ListFooterComponent}
            {...objControl}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
          />
        </Div>
      </Div>
    </Button>
  );
}

export default React.memo(DropdownModal);
