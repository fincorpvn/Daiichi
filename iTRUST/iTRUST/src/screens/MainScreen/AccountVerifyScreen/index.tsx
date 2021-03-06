import {Div, HeaderBack, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React from 'react';
import {getInvestmentProfile} from 'reducer/authen/selector';
import {navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import ItemCard from './ItemCard';

function AccountVerifyScreen() {
  const currentUser = useAppSelector(state => state.authen.currentUser);
  const {investmentProfile} = currentUser;
  const {
    email,
    phone,
    riskInfo,
    bankAccountIsFull,
    userInfoIsFull,
    userAddressIsFull,
  } = currentUser;
  const I18nState = useAppSelector(state => state.languages.I18nState);

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
      <ItemCard
        onPress={() => {
          navigate('RiskConfirmModal');
        }}
        isCheck={!!riskInfo}
        title={'accountverify.danhgiamucdoruiro'}
        isLine={true}
      />
      <ItemCard
        onPress={() => {
          if (userInfoIsFull && bankAccountIsFull && userAddressIsFull) {
            navigate('ConfirmModal');
            return;
          }
        }}
        isCheck={
          !!investmentProfile?.status &&
          investmentProfile?.status?.code != 'INVESTMENT_PROFILE_REJECT'
        }
        title={'accountverify.xacthuchoantat'}
        isLine={true}
        // isEnd={true}
      />
      {userInfoIsFull &&
        bankAccountIsFull &&
        investmentProfile?.status?.code != 'INVESTMENT_PROFILE_REJECT' &&
        userAddressIsFull &&
        investmentProfile?.status && (
          <>
            <ItemCard
              onPress={() => {
                navigate('DigitalSignatureScreen');
                // navigate('ReviewInfoModal', {
                //   data: {},
                // });
              }}
              isCheck={investmentProfile?.isReceivedHardProfile}
              title={'accountverify.hopdongdientu'}
              isLine={true}
              isEnd={true}
            />
          </>
        )}
    </Div>
  );
}

export default React.memo(AccountVerifyScreen);
