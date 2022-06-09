import {
  Alert,
  Button,
  ButtonBorder,
  Div,
  HeaderBack,
  HTMLView,
  Label,
} from 'components';
import {Ecolors, stringApp} from 'constant';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {getInfo} from 'reducer/authen';
import {getInvestmentProfile} from 'reducer/authen/selector';
import {apiAuth, navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import {heightScreen, Log, widthScreen} from 'utils';

function QQ(p: {
  data: any;
  control: any;
  onSelect: (t: any) => void;
  I18nState: 'vi' | 'en';
}) {
  const {data, onSelect, I18nState, control} = p;
  return (
    <Div paddingHorizontal={12}>
      <Label multilanguage={false}>
        {I18nState == 'vi' ? data.content : data.contentEn}
      </Label>
      {data.data.map((item: any, index: number) => {
        const size = 18;
        return (
          <Div
            paddingVertical={10}
            key={index}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'flex-start'}>
            <Button
              onPress={() => {
                onSelect(item);
              }}
              widthHeight={size}
              borderWidth={1}
              marginRight={10}
              borderRadius={size}
              borderColor={
                control == item.id ? Ecolors.redColor : Ecolors.mainColor
              }
              alignItems={'center'}
              justifyContent={'center'}>
              <Div
                widthHeight={size - 5}
                borderRadius={size - 5}
                backgroundColor={
                  control == item.id ? Ecolors.redColor : Ecolors.whiteColor
                }
              />
            </Button>
            <Div flex={1}>
              <Button
                onPress={() => {
                  onSelect(item);
                }}>
                <Label multilanguage={false} size={14}>
                  {I18nState == 'vi' ? item.name : item.nameEn}
                </Label>
              </Button>
            </Div>
          </Div>
        );
      })}
    </Div>
  );
}

function RiskConfirmModal() {
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const currentUser = useAppSelector(state => state.authen.currentUser);
  const [listSelect, setListSelect] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const investmentProfile = useAppSelector(state =>
    getInvestmentProfile(state),
  );

  const {email, riskInfo} = currentUser;

  useEffect(() => {
    let objjj = {};
    stringApp.riskAssessment.map((item: any, index: number) => {
      objjj[item.id] = item.data[0].id;
    });
    setListSelect({...objjj, ...currentUser?.riskInfo} || {});
    return () => {};
  }, [currentUser]);

  const confirm = async () => {
    try {
      setLoading(true);
      const res = await apiAuth.riskUpdate(listSelect);
      if (res.status == 200) {
        dispatch(getInfo({}));
        Alert.show({
          type: 2,
          content: 'alert.capnhatmucdoruirothanhcong',
          onConfirm: () => {
            navigate('AccountVerifyScreen');
          },
        });
        return;
      }
    } catch (error: any) {
      Alert.showError({
        multilanguage: false,
        content: I18nState == 'vi' ? error.message : error.messageEn,
        onPress: () => {
          navigate('AccountVerifyScreen');
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const renderItem = (p: {item: any; index: number}) => {
    return (
      <QQ
        control={listSelect[p.item.id] || {}}
        data={p.item}
        I18nState={I18nState}
        onSelect={(s: any) => {
          if (currentUser?.investmentProfile?.status) {
            return;
          }
          setListSelect(t => {
            return {
              ...t,
              [p.item.id]: s.id,
            };
          });
        }}
      />
    );
  };

  const ItemSeparatorComponent = useCallback(() => {
    return <Div widthHeight={10} />;
  }, []);
  const ListHeaderComponent = useCallback(() => {
    return <Div widthHeight={10} />;
  }, []);
  const ListFooterComponent = useCallback(() => {
    return <Div widthHeight={30} />;
  }, []);

  const keyExtractor = (item: any, index: number) => `key${item.id}`;

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack type={2} title={`accountverify.danhgiamucdoruiro`} />
      <FlatList
        data={stringApp.riskAssessment}
        extraData={[stringApp.riskAssessment]}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        keyExtractor={keyExtractor}
      />
      {!currentUser?.investmentProfile?.status && (
        <Div
          marginBottom={insets.bottom + 15}
          width={'100%'}
          alignItems={'center'}
          justifyContent={'center'}>
          <ButtonBorder
            width={343}
            loading={loading}
            onPress={() => confirm()}
            title={`accountverify.guithongtin`}
          />
        </Div>
      )}
    </Div>
  );
}

export default React.memo(RiskConfirmModal);
