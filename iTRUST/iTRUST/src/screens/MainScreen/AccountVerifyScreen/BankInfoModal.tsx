import {Div, HeaderBack, Label} from 'components';
import {Ecolors, Icons} from 'constant';
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

  const {bankAccount} = currentUser;

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
        content={
          removeUtf8(
            bankAccount?.name?.toLocaleUpperCase() ||
              currentUser?.name?.toLocaleUpperCase() ||
              '',
          ) || ''
        }
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
    </Div>
  );
}

export default React.memo(BankInfoModal);
