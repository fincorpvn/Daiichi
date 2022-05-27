import {apiMain} from './apis/apiMain';
import {uploadFile} from 'services';
import {convertStringTime, getAddressRejectWard} from './../utils/utils';
import RNTrueId from 'react-native-true-id';
import {getStoreToken} from 'utils/storage';
import {Platform} from 'react-native';
import {urlApp, Ecolors} from 'constant';

var stringJsonColor = `{\"main_color\":\"${Ecolors.mainColor}\",\"second_color\":\"${Ecolors.spaceColor}\",\"text_color\":\"${Ecolors.textColor}\",\"border_input_color\":\"${Ecolors.bordercolor}\",\"background_color\":\"${Ecolors.whiteColor}\",\"close_color\":\"${Ecolors.textColor}\"}`;
var PublicFaceScanEncryptionKey =
  '-----BEGIN PUBLIC KEY-----\n' +
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtYdqkDpAE9umyJDfapTa\n' +
  'z+nIs3f8Qzc15v268pXGO1lNdRa5Qi1QtxNkfh9D043/8ySNbLWt6zpFEFi98geU\n' +
  'kMLrqEA9UeeRHBvxjfBl+8DMsP1QtOsgbukyNHZIDRNDcn0nnSvxdjzvTsnYrR6N\n' +
  'YHJ2jyrObKR9bGBPInjfNGjz0L2jFcWYNmO//5wA2Wza4uqOZS28sjMHmTcmiWfX\n' +
  'tW9oUQTTKcFA9uZu2A+3hvwjWsAxg4cP1B7BLRZQDhvKfgs2IQKfcbwTDqKZunK/\n' +
  'ooH/fMuPZLFnevxlyFAsC+RJ1Tb355gaAmkFDiVKZJzOzY8gWjVpA6fxXrJe1V9o\n' +
  '/wIDAQAB\n' +
  '-----END PUBLIC KEY-----';

var configInfo = {
  domain: `${urlApp.APIURL}api`,
  domainPath: '/ekyc/v1.2',
  authDomain: 'https://api.trueid.ai',
  authDomainPath: '/v1/oauth',
  appId: 'ea8df9ebff8d38479058d7f1d235e097',
  appSecret: '+xzqA0O4GScV2dSiaB2cDiYVDY7hE0pG6rqN0TTNbU4=',
  zoomLicenseKey: 'dSERDnSNV8KzqajJJMEfA353JgNV27jb',
  zoomServerBaseURL: 'https://liveness-test.trueid.ai',
  zoomPublicKey: PublicFaceScanEncryptionKey,
  zoomAuthURL: 'https://onboard-liveness.trueid.ai/liveness/key',
  language: 'vi',
  themeColor: stringJsonColor,
};

export function startScan(
  startLoading?: () => void,
  endLoading?: () => void,
  config?: {
    language?: string;
    accessToken?: string;
  },
) {
  return new Promise(
    async (resolve: (e: any) => void, reject: (e: any) => void) => {
      try {
        const token = await getStoreToken();
        await RNTrueId.configure({
          ...configInfo,
          accessToken: token,
          ...config,
        });
        console.log('RNTrueId', RNTrueId);
        return RNTrueId.start(async (cardInfo: any) => {
          startLoading && startLoading();
          const {
            person,
            backCardImage,
            frontCardImage,
            result: {
              kyc_result: {front, decision},
            },
          } = cardInfo;
          const listCountry = await apiMain.getCountry();
          const country = listCountry.data.find((a: any) => a.id == '234');
          const listProvince = await apiMain.getProvince({
            countryId: 234,
          });
          const province = listProvince.data.find(
            (a: any) => a.administrativeCode == front.id_address_province.code,
          );
          const listDistrict = await apiMain.getDistrict({
            provinceId: province.id,
          });

          const district = listDistrict.data.find(
            (a: any) => a.administrativeCode == front.id_address_district.code,
          );
          const listWard = await apiMain.getWard({
            districtId: district.id,
          });
          const ward = listWard.data.find(
            (a: any) => a.administrativeCode == front.id_address_ward?.code,
          );
          const userProfile = {
            gender: person.gender == 'MALE' ? 1 : 2,
            dob: convertStringTime(person.dob || ''),
            nationalityId: 234,
            idTypeId: 1,
            idNo: person.idNumber,
            dateOfIssue: convertStringTime(person.doi),
            placeOfIssue: person.givenPlace,
            // photoBeforeURL,
            // photoBeforeFileName: 'cmnd-mat-truoc',
            // photoAfterURL,
            // photoAfterFileName: 'cmnd-mat-sau',
            // avatarUrl,
            // avatarFileName: 'chan-dung',
          };
          const userAddress = {
            // permanentAddress: getAddressRejectWard(
            //   ward,
            //   front.id_address.value,
            // ),
            permanentAddress: front.id_address.value,
            countryId: 234,
            provinceId: province.id,
            districtId: district.id,
            wardId: ward?.id || 0,
            //
            // mailingAddress: getAddressRejectWard(ward, front.id_address.value),
            mailingAddress: front.id_address.value,
            mailingCountryId: 234,
            mailingProvinceId: province.id,
            mailingDistrictId: district.id,
            mailingWardId: ward?.id || 0,
            country,
            province,
            district,
            ward,
          };
          resolve({
            userProfile,
            userAddress,
            isKYC: !!decision?.code,
            name: person.fullname,
            person,
            backCardImage,
            frontCardImage,
            cardInfo,
          });
          return {
            userProfile,
            userAddress,
            isKYC: !!decision?.code,
            name: person.fullname,
            person,
            backCardImage,
            frontCardImage,
            cardInfo,
          };

          // if (decision.code == -1) {
          //   // yeu cau nhap laij, toi da 3 lan
          //   //
          //   reject(null);
          // } else {
          //   const photoAfterURL = await uploadFile({
          //     fileBase64:
          //       Platform.OS === 'android'
          //         ? backCardImage.replace(/\n/g, '')
          //         : backCardImage,
          //   });
          //   const photoBeforeURL = await uploadFile({
          //     fileBase64:
          //       Platform.OS === 'android'
          //         ? frontCardImage.replace(/\n/g, '')
          //         : frontCardImage,
          //   });
          //   const avatarUrl = await uploadFile({
          //     fileBase64:
          //       Platform.OS === 'android'
          //         ? person.selfie.replace(/\n/g, '')
          //         : person.selfie,
          //   });
          //   const listProvince = await apiMain.getProvince({
          //     countryId: 234,
          //   });
          //   const province = listProvince.data.find(
          //     (a: any) =>
          //       a.administrativeCode == front.id_address_province.code,
          //   );
          //   const listDistrict = await apiMain.getDistrict({
          //     provinceId: province.id,
          //   });

          //   const district = listDistrict.data.find(
          //     (a: any) =>
          //       a.administrativeCode == front.id_address_district.code,
          //   );
          //   const listWard = await apiMain.getWard({
          //     districtId: district.id,
          //   });
          //   const ward = listWard.data.find(
          //     (a: any) => a.administrativeCode == front.id_address_ward?.code,
          //   );
          //   const userProfile = {
          //     gender: person.gender == 'MALE' ? 1 : 2,
          //     dob: convertStringTime(person.dob || ''),
          //     nationalityId: 234,
          //     idTypeId: 1,
          //     idNo: person.idNumber,
          //     dateOfIssue: convertStringTime(person.doi),
          //     placeOfIssue: person.givenPlace,
          //     photoBeforeURL,
          //     photoBeforeFileName: 'cmnd-mat-truoc',
          //     photoAfterURL,
          //     photoAfterFileName: 'cmnd-mat-sau',
          //     avatarUrl,
          //     avatarFileName: 'chan-dung',
          //   };
          //   const userAddress = {
          //     permanentAddress: getAddressRejectWard(
          //       ward,
          //       front.id_address.value,
          //     ),
          //     countryId: 234,
          //     provinceId: province.id,
          //     districtId: district.id,
          //     wardId: ward?.id || 0,
          //     //
          //     mailingAddress: getAddressRejectWard(
          //       ward,
          //       front.id_address.value,
          //     ),
          //     mailingCountryId: 234,
          //     mailingProvinceId: province.id,
          //     mailingDistrictId: district.id,
          //     mailingWardId: ward?.id || 0,
          //   };
          //   console.log('callback', {
          //     photoAfterURL,
          //     photoBeforeURL,
          //     avatarUrl,
          //   });
          //   resolve({
          //     userProfile,
          //     userAddress,
          //     isKYC: !!decision?.code,
          //     name: person.fullname,
          //   });
          //   return null;
          // }
        });
      } catch (error) {
        console.log('errror', error);
        endLoading && endLoading();
        reject(null);
        throw null;
      } finally {
        endLoading && endLoading();
      }
    },
  );
}
