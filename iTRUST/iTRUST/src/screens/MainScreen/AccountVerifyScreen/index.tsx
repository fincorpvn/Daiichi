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
      {/* {userInfoIsFull && bankAccountIsFull && userAddressIsFull && (
        <ItemCard
          onPress={() => {
            navigate('RiskConfirmModal');
            // navigate('ReviewInfoModal', {
            //   data: {},
            // });
          }}
          isCheck={!!riskInfo}
          title={'accountverify.danhgiamucdoruiro'}
          isLine={true}
        />
      )} */}
      <ItemCard
        onPress={() => {
          navigate('RiskConfirmModal');
          // navigate('ReviewInfoModal', {
          //   data: {},
          // });
        }}
        isCheck={!!riskInfo}
        title={'accountverify.danhgiamucdoruiro'}
        isLine={true}
      />
      <ItemCard
        onPress={() => {
          if (
            userInfoIsFull &&
            bankAccountIsFull &&
            userAddressIsFull &&
            riskInfo
          ) {
            navigate('ConfirmModal');
            return;
          }
        }}
        isCheck={!!investmentProfile?.status}
        title={'accountverify.xacthuchoantat'}
        isLine={true}
        // isEnd={true}
      />
      {userInfoIsFull && bankAccountIsFull && userAddressIsFull && riskInfo && (
        <>
          {/* <ItemCard
            onPress={() => {
              navigate('ConfirmModal');
            }}
            isCheck={!!investmentProfile?.status}
            title={'accountverify.xacthuchoantat'}
            isLine={true}
            // isEnd={true}
          /> */}
          {/* {(investmentProfile?.status?.code == 'INVESTMENT_PROFILE_APPROVE' ||
            investmentProfile?.status?.code == 'INVESTMENT_PROFILE_ACCEPT') && (
            <ItemCard
              onPress={() => {
                navigate('DigitalSignatureScreen');
              }}
              isCheck={investmentProfile?.isReceivedHardProfile}
              title={'accountverify.hopdongdientu'}
              isLine={true}
              isEnd={true}
            />
          )} */}
          <ItemCard
            onPress={() => {
              navigate('DigitalSignatureScreen');
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
