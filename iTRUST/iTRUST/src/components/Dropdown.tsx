import {
  Alert,
  Button,
  Div,
  ImageView,
  Input,
  InputItem,
  Label,
} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {doGetAxios, doPostAxios} from 'services/apis/axios';
import {useAppSelector} from 'store/hooks';
import {
  heightScale,
  heightScreen,
  Log,
  removeAllSpace,
  removeUtf8,
  widthScale,
  widthScreen,
} from 'utils';
import Modal from 'react-native-modal';
import {goBack, navigate} from 'services';

const ITEM_HEIGHT = heightScale(40);

function SBtn(Props: {
  ItemRef?: any;
  onPressButton?: () => void;
  title?: string;
  backgroundColor?: string;
  multilanguage?: boolean;
}) {
  const Wrapper = !!Props.onPressButton ? Button : Div;
  return (
    <Wrapper
      onPress={() => Props.onPressButton && Props.onPressButton()}
      buttonRef={Props.ItemRef}
      height={48}
      borderRadius={5}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderWidth={0.5}
      backgroundColor={Props.backgroundColor || 'transparent'}
      borderColor={Ecolors.grayColor}
      paddingLeft={18}
      paddingRight={16}>
      <Div flex={1}>
        <Label numberOfLines={1} multilanguage={Props.multilanguage || false}>
          {Props.title || ''}
        </Label>
      </Div>
      <ImageView
        marginLeft={5}
        width={8}
        height={14}
        resizeMode={'contain'}
        source={Icons.down}
      />
    </Wrapper>
  );
}

function Dropdown(p: {
  content?: string;
  value?: any;
  isActive?: boolean;
  multiline?: boolean;
  multilanguage?: boolean;
  url?: string;
  onChange?: (a: any) => void;
  width?: number;
  paddingHorizontal?: number;
  marginTop?: number;
  initData?: Array<{
    id: string;
    name: string;
    nameen: string;
  }>;
}) {
  const buttonRef = useRef(null);
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    if (p?.initData && p?.initData?.length > 0) {
      setData(p.initData || []);
    }
    return () => {};
  }, [p.initData]);

  useEffect(() => {
    if (p.isActive) {
      getData();
    }
    return () => {};
  }, [p.isActive, p.url]);

  const onPressButton = () => {
    navigate('DropdownModal', {
      data: {
        url: p.url,
        value: p.value,
        multiline: p.multiline,
        initData: data?.length > 0 ? data : p.initData || p.initData,
        onChange: (a: any) => p.onChange && p.onChange(a),
        content: p.content,
        multilanguage: p.multilanguage,
        isSearch: !p.initData,
      },
    });
  };

  const getData = async () => {
    try {
      const res = await doGetAxios(p.url || '');
      if (res.status == 200) {
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
    } finally {
    }
  };

  const title = p.value
    ? I18nState == 'en'
      ? `${p.value.code ? `${p.value.code} - ` : ''}${
          p.value.nameEn || p.value.name
        }` || `${p.value.code ? `${p.value.code} - ` : ''}${p.value.name || ''}`
      : `${p.value.code ? `${p.value.code} - ` : ''}${p.value.name || ''}`
    : p.content;

  return (
    <>
      <Div
        marginTop={p.marginTop || 0}
        width={p.width}
        paddingHorizontal={p.paddingHorizontal ?? 10}>
        <SBtn
          backgroundColor={
            p.isActive ? Ecolors.white : 'rgba(73, 85, 163, 0.1)'
          }
          title={title}
          multilanguage={p.multilanguage && !p.value}
          ItemRef={buttonRef}
          onPressButton={() => {
            if (!p.isActive) {
              return;
            }
            onPressButton();
          }}
        />
      </Div>
    </>
  );
}

const s = StyleSheet.create({
  containerModal: {
    padding: 0,
    margin: 0,
    width: widthScreen,
    height: heightScreen,
  },
  screen: {
    width: widthScreen,
    height: heightScreen,
  },
  abs: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default React.memo(Dropdown);
