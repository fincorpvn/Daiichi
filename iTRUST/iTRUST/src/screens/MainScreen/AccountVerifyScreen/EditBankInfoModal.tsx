import {useRoute} from '@react-navigation/core';
import {
  Alert,
  BottomSheetDialog,
  ButtonBorder,
  Div,
  Dropdown,
  HeaderBack,
  InputItem,
  Label,
  Toast,
} from 'components';
import {Ecolors, Icons, stringApp} from 'constant';
import React, {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ImageResizer from 'react-native-image-resizer';
import {useDispatch} from 'react-redux';
import {getInfo} from 'reducer/authen';
import {
  getStatusEditBankInfo,
  getStatusEditProfile,
} from 'reducer/authen/selector';
import ComActionUpload from 'screens/MainScreen/DigitalSignature/ComActionUpload';
import RowButtonAction from 'screens/MainScreen/DigitalSignature/RowButtonAction';
import {apiAuth, goBack, navigate} from 'services';
import {doGetAxios} from 'services/apis/axios';
import {useAppDispatch, useAppSelector} from 'store/hooks';
import {
  checkToSetNumber,
  getImageCamera,
  getImageLibrary,
  getUuid,
  Log,
  removeUtf8,
  widthScale,
} from 'utils';

function Lbl(p: {content: string; marginTop?: number}) {
  return (
    <Label marginTop={p.marginTop || 0} multilanguage={false}>
      <Label>{p.content}</Label>
      {` (`}
      <Label multilanguage={false} color={Ecolors.red}>
        *
      </Label>
      {`)`}
    </Label>
  );
}

function EditBankInfoModal() {
  const dispatch = useDispatch();
  const route = useRoute<any>();
  const currentUser = useAppSelector(state => state.authen.currentUser);
  const isEdit = useAppSelector(state => getStatusEditBankInfo(state));

  const {bankAccount, bankAccountIsFull} = currentUser;
  const [name, setName] = useState('');
  const [bank, setBank] = useState<any>(null);
  const [branch, setBranch] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [number, setNumber] = useState('');
  const [annualIncome, setAnnualIncome] = useState<any>(null);
  const [incomeSource, setIncomeSource] = useState<any>(null);
  const [job, setJob] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const bottomSheetUpload = useRef<any>(null);

  useEffect(() => {
    bindData(bankAccount, currentUser);
    return () => {};
  }, [bankAccount, currentUser]);

  const getDataBranch = async () => {
    const res = await doGetAxios(
      `bank/branch/list?bankId=${bankAccount?.bankId}`,
    );
    if (res.status == 200) {
      const t = res.data.find((a: any) => a.id == bankAccount?.branchId);
      if (t) {
        setBranch(t);
      }
    }
  };

  const hide = (cb?: () => void) => {
    if (bottomSheetUpload.current) {
      bottomSheetUpload.current.hide().then(() => {
        if (cb) {
          cb();
        }
      });
    }
  };

  const bindData = (
    e: {
      name?: string;
      number?: string;
      branchName?: string;
      branchName_en?: string;
      bankName?: string;
      bankName_en?: string;
      branchId?: string | number;
      bankId?: string | number;
    },
    currentUser: any,
  ) => {
    Promise.all([
      setName(
        removeUtf8(
          e?.name?.toLocaleUpperCase() ||
            currentUser?.name?.toLocaleUpperCase(),
        ),
      ),
      setNumber(e?.number || ''),
      getDataBranch(),
      setBank(
        e?.bankId
          ? {
              id: e.bankId || '1',
              name: e.bankName,
              nameEn: e.bankName_en,
            }
          : null,
      ),
    ]);
  };

  const onConfirm = async (file?: any) => {
    try {
      if (!name.length || !number.length || !bank || !branch) {
        Alert.showError({
          content: `alert.vuilongnhapdayduthongtintaikhoannganhang`,
          onPress: () => {},
        });
        return;
      }
      let objAction = {
        bankId: `${bank?.id}` || '0',
        branchId: `${branch?.id || bank?.id}` || '0',
        name: name,
        number: number,
      };
      if (isEdit) {
        if (!position.length || !job.length || !incomeSource || !annualIncome) {
          Alert.showError({
            content: `alert.vuilongnhapdayduthongtintaikhoannganhang`,
            onPress: () => {},
          });
          return;
        }
        objAction[`position`] = position || '';
        objAction[`job`] = job || '';
        objAction[`incomeSource`] = incomeSource?.id || 'SOURCE_OTHER';
        objAction[`annualIncome`] = annualIncome?.id || '1';
      }

      if (route.params?.onConfirm) {
        route.params?.onConfirm({
          userBankAccount: {
            bankId: `${bank?.id}` || '0',
            branchId: `${branch?.id || bank?.id}` || '0',
            name: name,
            number: number,
          },
        });
        return;
      }
      setLoading(true);
      const res = await (!isEdit
        ? apiAuth.updateInvestmentBankTypeUpdate(file)
        : apiAuth.updateInvestmentBank(objAction));
      if (res.data && !isEdit) {
        navigate('OtpRequestModal', {
          data: {
            requestOnSendOtp: res.data,
            flowApp: 'UpdateBankInfo',
          },
          onConfirm: () => {
            dispatch(getInfo({}));
            Alert.show({
              type: 2,
              titleClose: 'alert.dong',
              content: `alert.capnhatthongtintaikhoannganhangthanhcong`,
              onConfirm: () => {
                navigate('AccountVerifyScreen');
              },
              onClose: () => {
                navigate('AccountVerifyScreen');
              },
              onCancel: () => {
                navigate('AccountVerifyScreen');
              },
            });
            return;
          },
        });
        return;
      }
      if (res.status == 200) {
        dispatch(getInfo({}));
        Alert.show({
          type: 2,
          titleClose: 'alert.dong',
          content: `alert.capnhattaikhoannganhang`,
          onConfirm: () => {
            navigate('AccountVerifyScreen');
          },
          onClose: () => {
            navigate('AccountVerifyScreen');
          },
          onCancel: () => {
            navigate('AccountVerifyScreen');
          },
        });
        return;
      }
      Alert.showError({
        content: I18nState == 'vi' ? res.message : res.messageEn,
        multilanguage: false,
        onPress: () => {
          navigate('AccountVerifyScreen');
        },
      });
    } catch (error: any) {
      Alert.showError({
        content: I18nState == 'vi' ? error.message : error.messageEn,
        multilanguage: false,
        onPress: () => {},
      });
      return;
    } finally {
      setLoading(false);
    }
  };

  const doAction = async (image: any) => {
    ImageResizer.createResizedImage(image.uri, 800, 600, 'JPEG', 80, 0)
      .then(({uri}) => {
        const formdata = new FormData();
        const id = getUuid();
        const file = {
          uri: Platform.OS !== 'android' ? uri.replace('file://', '') : uri,
          name: `${id}.png`,
          filename: `${id}.png`,
          type: 'image/png',
        };
        formdata.append('file', file);
        formdata.append('bankId', `${bank?.id}` || '0');
        formdata.append('branchId', `${branch?.id || bank?.id}` || '0');
        formdata.append('name', name || '');
        formdata.append('number', number || '');
        onConfirm(formdata);
      })
      .catch(err => {
        Alert.showError({
          content: 'alert.dungluongtoida',
        });
        return;
      });
    return;
  };

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <BottomSheetDialog
        style={{
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        ref={bottomSheetUpload}>
        <ComActionUpload
          isDrawline={true}
          onDrawline={() => {
            hide(() => {
              navigate('SignatureDraw', {
                data: {
                  flowApp: 'EditBankInfo' || '',
                },
                callback: (t: string) => {
                  doAction({
                    uri: t,
                  });
                },
              });
            });
          }}
          onCancel={() => {
            hide();
          }}
          onCamera={async () => {
            try {
              if (Platform.OS === 'ios') {
                await getImageCamera()
                  .then((image: any) => {
                    hide();
                    if (image[0]) {
                      doAction(image[0]);
                    }
                  })
                  .catch(() => {
                    hide();
                  });
                return;
              }
              hide(async () => {
                getImageCamera()
                  .then((image: any) => {
                    if (image[0]) {
                      doAction(image[0]);
                    }
                  })
                  .catch(() => {
                    hide();
                  });
              });
            } catch (error) {
              if (!!error) {
                Toast.show({
                  content: 'alert.daxayraloi',
                  multilanguage: true,
                });
              }
            } finally {
              hide(async () => {});
            }
          }}
          onGallery={async () => {
            try {
              if (Platform.OS === 'ios') {
                await getImageLibrary().then((image: any) => {
                  hide();
                  if (image[0]) {
                    if (image[0].uri.endsWith('.gif')) {
                      Alert.showError({
                        content: 'alert.dinhdanganhkhongphuhop',
                      });
                      return;
                    }
                    doAction(image[0]);
                  }
                });
                return;
              }
              hide(() => {
                console.log('hideee');
                getImageLibrary().then((image: any) => {
                  if (image[0]) {
                    if (image[0].uri.endsWith('.gif')) {
                      Alert.showError({
                        content: 'alert.dinhdanganhkhongphuhop',
                      });
                      return;
                    }
                    doAction(image[0]);
                  }
                });
              });
            } catch (error) {
              if (!!error) {
                Toast.show({
                  content: 'alert.daxayraloi',
                  multilanguage: true,
                });
                return;
              }
            } finally {
              hide(async () => {});
            }
          }}
        />
      </BottomSheetDialog>
      <HeaderBack
        type={2}
        loading={loading}
        titleRight={`accountverify.save`}
        onRightPress={() => {
          if (isEdit) {
            onConfirm();
            return;
          }
          bottomSheetUpload.current.show();
          return;
        }}
        title={`accountverify.thongtinnganhang`}
      />
      <ScrollView>
        <Div paddingHorizontal={29}>
          <Lbl
            marginTop={23}
            content={`accountverify.thongtintaikhoannganhang`}
          />
          <Lbl marginTop={7} content={`accountverify.tenchutaikhoan`} />
          <InputItem
            isInput={false}
            marginTop={6}
            keyboardType={'name-phone-pad'}
            onChangeText={e => setName(removeUtf8(e.toLocaleUpperCase()))}
            value={name}
            marginHorizontal={0}
          />
          <Lbl marginTop={13} content={`accountverify.sotaikhoan`} />
          <InputItem
            keyboardType={'number-pad'}
            value={number}
            onChangeText={a => checkToSetNumber(a, r => setNumber(r))}
            marginHorizontal={0}
            marginTop={6}
          />
          <Lbl marginTop={13} content={`accountverify.tennganhang`} />
          <Dropdown
            multilanguage={true}
            url={'bank/list'}
            isActive={true}
            value={bank}
            marginTop={6}
            paddingHorizontal={0}
            content={`accountverify.vuilongchonnganhang`}
            onChange={a => {
              setBank(a);
              setBranch(null);
            }}
          />
          <Lbl marginTop={13} content={`accountverify.chinhanh`} />
          <Dropdown
            multilanguage={true}
            isActive={!!bank}
            content={`accountverify.vuilongchonchinhanh`}
            url={`bank/branch/list?bankId=${bank?.id || 0}`}
            marginTop={6}
            value={branch}
            paddingHorizontal={0}
            onChange={a => setBranch(a)}
          />
          {isEdit && (
            <>
              <Lbl marginTop={23} content={`accountverify.thongtinkhac`} />
              <Lbl marginTop={7} content={`accountverify.nghenghiep`} />
              <InputItem
                // keyboardType={'number-pad'}
                value={job}
                onChangeText={a => setJob(a)}
                marginHorizontal={0}
                marginTop={6}
              />
              <Lbl marginTop={13} content={`accountverify.chucvu`} />
              <InputItem
                // keyboardType={'number-pad'}
                value={position}
                onChangeText={a => setPosition(a)}
                marginHorizontal={0}
                marginTop={6}
              />
              <Lbl
                marginTop={13}
                content={`accountverify.mucthunhaphangthang`}
              />
              <Dropdown
                multilanguage={true}
                isActive={true}
                content={`accountverify.mucthunhaphangthang`}
                // url={`bank/branch/list?bankId=${bank?.id || 0}`}
                initData={stringApp.monthlyIncom || []}
                marginTop={6}
                value={annualIncome}
                paddingHorizontal={0}
                onChange={a => setAnnualIncome(a)}
              />
              <Lbl marginTop={13} content={`accountverify.nguontiendautu`} />
              <Dropdown
                multilanguage={true}
                isActive={true}
                content={`accountverify.nguontiendautu`}
                initData={stringApp.source || []}
                marginTop={6}
                value={incomeSource}
                paddingHorizontal={0}
                onChange={a => setIncomeSource(a)}
              />
            </>
          )}
        </Div>
        <Div height={300} />
      </ScrollView>
    </Div>
  );
}

export default React.memo(EditBankInfoModal);
