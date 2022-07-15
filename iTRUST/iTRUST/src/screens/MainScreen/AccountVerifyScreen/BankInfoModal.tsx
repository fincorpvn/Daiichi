import {Div, HeaderBack, Label} from 'components';
import {Ecolors, Icons, stringApp} from 'constant';
import React, {useEffect, useState} from 'react';
import {
  getInvestmentProfile,
  getStatusEditProfile,
} from 'reducer/authen/selector';
import {navigate} from 'services';
import {doGetAxios} from 'services/apis/axios';
import {useAppSelector} from 'store/hooks';
import {Log, removeUtf8} from 'utils';
import ItemCard from './ItemCard';

function BankInfoModal() {
  const currentUser = useAppSelector(state => state.authen.currentUser);
  const investmentProfile = useAppSelector(state =>
    getInvestmentProfile(state),
  );
  const [branch, setBranch] = useState<any>(null);
  const isEdit = useAppSelector(state => getStatusEditProfile(state));
  const [incomeSourceString, setIncomeSourceString] = useState<string>('');
  const [annualIncomeString, setAnnualIncomeString] = useState<string>('');

  const {bankAccount} = currentUser;

  useEffect(() => {
    bindStringApp();

    return () => {};
  }, []);

  useEffect(() => {
    getDataBranch(bankAccount?.branchId);
    return () => {};
  }, [bankAccount?.branchId]);

  const getDataBranch = async (r: number | string) => {
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

  const bindStringApp = () => {
    setIncomeSourceString(
      stringApp.source.find(a => a.id == bankAccount.incomeSource)?.name || '',
    );
    setAnnualIncomeString(
      stringApp.monthlyIncom.find(a => a.id == bankAccount.incomeSource)
        ?.name || '',
    );
  };

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack
        type={2}
        iconRight={Icons.edit}
        title={`accountverify.thongtinnganhang`}
        onRightPress={() => {
          navigate('EditBankInfoModal');
        }}
      />
      <ItemCard
        title={`accountverify.tenchutaikhoan`}
        content={removeUtf8(
          bankAccount?.name?.toLocaleUpperCase() ||
            currentUser?.name?.toLocaleUpperCase(),
        )}
        isLine={true}
      />
      <ItemCard
        title={`accountverify.sotaikhoan`}
        content={bankAccount?.number || ' '}
        isLine={true}
      />
      <ItemCard
        title={`accountverify.tennganhang`}
        content={bankAccount?.bankName || ' '}
        isLine={true}
      />
      <ItemCard
        title={`accountverify.chinhanh`}
        content={
          bankAccount?.branchId
            ? branch?.name || ''
            : bankAccount?.bankName || ' '
        }
        isLine={true}
      />
      {currentUser?.bankAccountIsFull && (
        <>
          <ItemCard
            title={`accountverify.nghenghiep`}
            content={bankAccount?.job || '_'}
            isLine={true}
          />
          <ItemCard
            title={`accountverify.chucvu`}
            content={bankAccount?.jobLocation || '_'}
            isLine={true}
          />
          <ItemCard
            title={`accountverify.mucthunhaphangthang`}
            content={annualIncomeString || '_'}
            isLine={true}
          />
          <ItemCard
            title={`accountverify.nguontiendautu`}
            content={incomeSourceString || '_'}
            isLine={true}
          />
        </>
      )}
    </Div>
  );
}

export default React.memo(BankInfoModal);
