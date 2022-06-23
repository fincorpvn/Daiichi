import {useRoute} from '@react-navigation/core';
import {
  Alert,
  ButtonBorder,
  Div,
  Dropdown,
  HeaderBack,
  InputItem,
  Label,
} from 'components';
import {Ecolors, Icons, stringApp} from 'constant';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {getInfo} from 'reducer/authen';
import {apiAuth, goBack, navigate} from 'services';
import {doGetAxios} from 'services/apis/axios';
import {useAppDispatch, useAppSelector} from 'store/hooks';
import {Log, removeUtf8, widthScale} from 'utils';

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

  const onConfirm = async () => {
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

      if (!bankAccountIsFull) {
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
        objAction[`annualIncome`] =
          annualIncome?.name || annualIncome?.nameEn || '';
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
      const res = await (bankAccountIsFull
        ? apiAuth.updateInvestmentBankTypeUpdate(objAction)
        : apiAuth.updateInvestmentBank(objAction));
      if (res.data && bankAccountIsFull) {
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

  const checkToSetdata = (e: string, func: (r: string) => void) => {
    if (e.length == 0) {
      func(e);
      return;
    }
    const t: string = e[e.length ? e.length - 1 : 0] || '';
    const reg = /^[0-9]*$/;
    if (reg.test(t)) {
      func(e);
    }
  };

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack
        type={2}
        loading={loading}
        titleRight={`accountverify.save`}
        onRightPress={() => {
          onConfirm();
        }}
        title={`accountverify.thongtinnganhang`}
      />
      <ScrollView>
        <Div paddingHorizontal={29}>
          <Lbl marginTop={16} content={`accountverify.tenchutaikhoan`} />
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
            onChangeText={a => checkToSetdata(a, r => setNumber(r))}
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
          {!bankAccountIsFull && (
            <>
              <Lbl marginTop={13} content={`accountverify.nghenghiep`} />
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
          <Div height={50} />
        </Div>
      </ScrollView>
    </Div>
  );
}

export default React.memo(EditBankInfoModal);
