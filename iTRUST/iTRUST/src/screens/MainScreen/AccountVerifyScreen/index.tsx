import {Div, HeaderBack} from 'components';
import {Ecolors, Icons} from 'constant';
import React from 'react';
import {getInvestmentProfile} from 'reducer/authen/selector';
import {navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import ItemCard from './ItemCard';

function AccountVerifyScreen() {
  const currentUser = useAppSelector(state => state.authen.currentUser);
  const investmentProfile = useAppSelector(state =>
    getInvestmentProfile(state),
  );
  const {email, phone, bankAccountIsFull, userInfoIsFull, userAddressIsFull} =
    currentUser;

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack type={2} title={`profile.thongtintaikhoan`} />
      <ItemCard
        title={'accountverify.sodienthoai'}
        isLine={true}
        content={phone}
      />
      <ItemCard title={'accountverify.email'} content={email} />
      <ItemCard
        title={'accountverify.thongtincanhan'}
        isLine={true}
        isCheck={userInfoIsFull}
        onPress={() => {
          navigate('AccountInfoModal');
        }}
      />
      <ItemCard
        title={'accountverify.thongtinnganhang'}
        isLine={true}
        isCheck={bankAccountIsFull}
        onPress={() => {
          navigate('BankInfoModal');
        }}
      />
      <ItemCard
        onPress={() => {
          navigate('AddressInfoModal');
        }}
        isCheck={userAddressIsFull}
        title={'accountverify.thongtindiachi'}
        isLine={true}
      />
      {userInfoIsFull && bankAccountIsFull && userAddressIsFull && (
        <ItemCard
          onPress={() => {
            navigate('ConfirmModal');
          }}
          isCheck={!!investmentProfile}
          title={'accountverify.xacthuchoantat'}
          isLine={true}
          isEnd={true}
        />
      )}
    </Div>
  );
}

export default React.memo(AccountVerifyScreen);
