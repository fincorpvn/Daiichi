import {Alert, Div, HeaderBack, ImageView} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {changeStatusScreen} from 'reducer/authen/reducer';
import {goBack, navigate, startScan, uploadFile} from 'services';
import {img} from 'services/test';
import {useAppDispatch, useAppSelector} from 'store/hooks';
import {callPhone, getAddressRejectWard, getUuid} from 'utils';
import CardProfile from './CardProfile';
import ItemCardProfile from './ItemCardProfile';
import {apiAuth} from 'services/apis';
import {getInfo} from 'reducer/authen';
import {useDispatch} from 'react-redux';
import PushNotification, {Importance} from 'react-native-push-notification';

interface IItem {
  title?: string;
  content?: string;
  icon?: any;
  type?: string;
  color?: string;
  isForward?: boolean;
  isLine?: boolean;
  onPress?: () => void;
}

function ProfileScreen() {
  const dispath = useDispatch();
  const currentUser = useAppSelector<any>(state => state.authen.currentUser);
  const [loading, setLoading] = useState<boolean>(false);
  const I18nState = useAppSelector(state => state.languages.I18nState);

  const hardProfile = !!currentUser.investmentProfile?.isReceivedHardProfile;

  const listData = [
    {
      title: `profile.hosogoc`,
      icon: Icons.digitalsignature,
      iconRight: !hardProfile ? Icons.uncheck : Icons.check,
      iconRightColor: !hardProfile ? Ecolors.grayColor : Ecolors.greenColor,
      iconRightSize: 20,
      content: !hardProfile
        ? I18nState == 'vi'
          ? 'Chưa nhận'
          : 'Not received'
        : I18nState == 'vi'
        ? 'Đã nhận'
        : 'Complete',
      contentColor: !hardProfile ? Ecolors.redColor : Ecolors.greenColor,
      isForward: true,
      isLine: true,
    },
    {
      type: 'space',
    },
    {
      title: `profile.thongtintaikhoan`,
      icon: Icons.profileinfo,
      onPress: async () => {
        onPressProfileInfo();
        return;
      },
      isForward: true,
      isLine: true,
    },
    {
      title: `profile.thaydoimatkhau`,
      icon: Icons.changepass,
      onPress: () => {
        navigate('ChangePasswordScreen');
      },
      isForward: true,
      isLine: true,
    },
    {
      title: `profile.thaydoiemail`,
      icon: Icons.changeemail,
      onPress: () => {
        navigate('ChangeEmailScreen');
      },
      isForward: true,
    },
    {
      type: 'space',
    },
    {
      title: `profile.hotrokhachhang`,
      icon: Icons.support,
      onPress: () => {
        navigate('SupportScreen');
      },
      isLine: true,
      isForward: true,
    },
    {
      title: `profile.hotline`,
      content: '1900636553',
      icon: Icons.hotline,
      onPress: () => {
        Alert.show({
          content: I18nState == 'vi' ? `Gọi 1900636553` : `Call 1900636553`,
          multilanguage: false,
          onConfirm: () => {
            callPhone('1900636553');
          },
        });
      },
      isForward: true,
      isLine: true,
    },
    {
      title: `profile.caidatvabaomat`,
      icon: Icons.setting,
      onPress: () => {
        navigate('SettingScreen');
      },
      isForward: true,
    },
    {
      type: 'space',
    },
    {
      title: `profile.logout`,
      color: Ecolors.red,
      icon: Icons.logout,
      onPress: async () => {
        Alert.show({
          title: 'alert.logout',
          content: 'alert.contentlogout',
          titleCancel: 'alert.dong',
          titleConfirm: 'alert.dangxuat',
          onConfirm: () => {
            dispath(changeStatusScreen('unAuthorized'));
          },
        });
      },
    },
  ];

  const onPressProfileInfo = () => {
    navigate('AccountVerifyScreen');
    return;
  };

  const EKYC = async () => {
    try {
      const scanData = await startScan(
        () => {
          setLoading(true);
        },
        () => {
          setLoading(false);
        },
        {
          language: I18nState,
        },
      );
      navigate('EditBankInfoModal', {
        onConfirm: async (e: any) => {
          try {
            goBack();
            setLoading(true);
            if (e && scanData) {
              const res = await apiAuth.createEKYC({
                ...scanData,
                ...e,
                phone: currentUser.phone || '',
                email: currentUser.email || '',
              });
              Alert.show({
                multilanguage: false,
                content: res.message,
              });
              dispath(getInfo({}));
            }
            return;
          } catch (error: any) {
            Alert.show({
              multilanguage: false,
              content: error.message,
            });
          } finally {
            setLoading(false);
          }
        },
      });
    } catch (error: any) {
      Alert.show({
        multilanguage: false,
        content: error.message,
      });
    } finally {
    }
  };

  const keyExtractor = (_: any, index: number) => `key${index}`;

  const renderItem = (p: {item: IItem; index: number}) => {
    if (p.item.type == 'space') {
      return <Div height={7} backgroundColor={Ecolors.spaceColor} />;
    }
    return <ItemCardProfile item={p.item} />;
  };

  const ListHeaderComponent = () => {
    return <CardProfile />;
  };

  const onRefresh = () => {
    dispath(getInfo({}));
  };

  return (
    <>
      {loading && (
        <Div
          screen={true}
          style={StyleSheet.absoluteFillObject}
          zIndex={999}
          elevation={999}
          backgroundColor={Ecolors.transparentLoading}
          alignItems={'center'}
          justifyContent={'center'}>
          <ActivityIndicator color={Ecolors.mainColor} size={'small'} />
        </Div>
      )}
      <Div flex={1} backgroundColor={Ecolors.whiteColor}>
        <HeaderBack title={`profile.taikhoan`} />
        <FlatList
          data={listData}
          extraData={listData}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
              tintColor={Ecolors.mainColor}
            />
          }
        />
      </Div>
    </>
  );
}

export default React.memo(ProfileScreen);