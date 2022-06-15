import {Log} from 'utils';
import {setStoreToken} from 'utils/storage';
import {doGetAxios, doPostAxios, axiosMultipart} from './axios';

export const apiAuth = {
  login: async (params: IParamsLogin) => {
    try {
      const url = 'auth/token';
      const res = await doPostAxios(url, params);
      if (res.status == 200) {
        const objToken: IResAuthToken = res.data;
        if (objToken) {
          await setStoreToken(objToken.access_token);
        }
        return {
          ...res,
          data: objToken,
        };
      }
      throw res;
    } catch (error: any) {
      throw error;
    }
  },
  getInfo: async () => {
    const url = 'user/investment/load?menuParentCode=INVESTOR_INFO';
    return doGetAxios(url);
  },
  signupOtp: async (params: {
    email?: string;
    name?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    phonePostal?: string;
    username?: string;
    provinceId?: string | number;
    userRefCode?: string | null;
  }) => {
    try {
      const url = 'sign-up-otp/create';
      return doPostAxios(url, {
        email: params.email || '',
        name: params.name || '',
        phone: params.phone || '',
        username: params.username || '',
        password: params.password || '',
        confirmPassword: params.confirmPassword || '',
        // provinceId: params.provinceId || 0,
        phonePostal: params.phonePostal || '',
        userRefCode: params.userRefCode || null,
      });
    } catch (error: any) {
      throw error;
    }
  },
  resendOtp: async (params: {
    expiredDurationInMinutes?: number;
    expiredTime?: number;
    otpTransId?: string;
    time?: number;
    transId?: string;
  }) => {
    try {
      const url = 'otp/resend';
      return doPostAxios(url, {
        expiredTime: params.expiredTime || 0,
        expiredDurationInMinutes: params.expiredDurationInMinutes || 0,
        time: params.time || 0,
        otpTransId: params.otpTransId || '',
        transId: params.transId || '',
      });
    } catch (error: any) {
      throw error;
    }
  },
  confirm: async (params: {
    expiredDurationInMinutes?: number;
    expiredTime?: number;
    otpTransId?: string;
    time?: number;
    transId?: string;
    otp?: string;
  }) => {
    try {
      const url = 'sign-up-otp/confirm';
      return doPostAxios(url, {
        expiredTime: params.expiredTime || 0,
        expiredDurationInMinutes: params.expiredDurationInMinutes || 0,
        time: params.time || 0,
        otpTransId: params.otpTransId || '',
        transId: params.transId || '',
        otp: params.otp || '',
      });
    } catch (error: any) {
      throw error;
    }
  },
  // forgot password
  forgotPassSendOtp: async (params: {username?: string}) => {
    try {
      const url = 'forgot-password/send';
      return doPostAxios(url, {
        username: params.username || '',
      });
    } catch (error: any) {
      throw error;
    }
  },
  forgotPassConfirm: (params: {
    expiredDurationInMinutes?: number;
    expiredTime?: number;
    otpTransId?: string;
    time?: number;
    transId?: string;
    otp?: string;
  }) => {
    try {
      const url = 'forgot-password/confirm';
      return doPostAxios(url, params);
    } catch (error: any) {
      throw error;
    }
  },
  resetPassword: (params: {
    confirmPassword: string;
    otpTransId: string;
    password: string;
  }) => {
    const url = 'forgot-password/reset';
    return doPostAxios(url, params);
  },
  // change password in profile
  changePasswordCreate: (params: {
    oldPassword: string;
    newPassword: string;
  }) => {
    const url = 'user/update-password/create';
    return doPostAxios(url, params);
  },
  changePasswordConfirm: (params: {
    expiredDurationInMinutes?: number;
    expiredTime?: number;
    otpTransId?: string;
    time?: number;
    transId?: string;
    otp?: string;
  }) => {
    const url = 'user/update-password/confirm';
    return doPostAxios(url, params);
  },
  // change email
  changeEmailCreate: (params: {oldEmail: string; newEmail: string}) => {
    const url = 'user/update-email/create';
    return doPostAxios(url, params);
  },
  changeEmailConfirm: (params: {
    expiredDurationInMinutes?: number;
    expiredTime?: number;
    otpTransId?: string;
    time?: number;
    transId?: string;
    otp?: string;
  }) => {
    const url = 'user/update-email/confirm';
    return doPostAxios(url, params);
  },
  // change mailingAddress
  changeMailingAddressCreate: (params: {
    mailingAddress: string;
    mailingCountryId: string;
    mailingDistrictId: string;
    mailingProvinceId: string;
    mailingWardId: string;
  }) => {
    const url = 'user/update-mailing-address/create';
    return doPostAxios(url, params);
  },
  // update-permanent-address/create
  changePermanentAddressCreate: (params: {
    countryId: string;
    districtId: string;
    permanentAddress: string;
    provinceId: string;
    wardId: string;
  }) => {
    const url = 'user/update-permanent-address/create';
    return doPostAxios(url, params);
  },
  changePermanentAddressConfirm: (params: {
    expiredDurationInMinutes?: number;
    expiredTime?: number;
    otpTransId?: string;
    time?: number;
    transId?: string;
    otp?: string;
  }) => {
    const url = 'user/update-permanent-address/confirm';
    return doPostAxios(url, params);
  },
  changeMailingAddressConfirm: (params: {
    expiredDurationInMinutes?: number;
    expiredTime?: number;
    otpTransId?: string;
    time?: number;
    transId?: string;
    otp?: string;
  }) => {
    const url = 'user/update-mailing-address/create';
    return doPostAxios(url, params);
  },
  // update bank info
  updateInvestmentBank: (params: {
    bankId: string;
    branchId: string;
    name: string;
    number: string;
  }) => {
    const url = 'user/investment/bank-update';
    return doPostAxios(url, params);
  },
  // update address investment address info modal
  updateInvestmentAddress: (params: {
    countryId: string;
    districtId: string;
    mailingAddress: string;
    mailingCountryId: string;
    mailingDistrictId: string;
    mailingProvinceId: string;
    mailingWardId: string;
    permanentAddress: string;
    provinceId: string;
    wardId: string;
  }) => {
    const url = 'user/investment/address-update';
    return doPostAxios(url, params);
  },
  // confirm modal
  getConfirmProfile: () => {
    const url = 'news/content/load?code=CONFIRM_PROFILE';
    return doGetAxios(url);
  },
  approveUser: () => {
    const url = `user/investment/approve-by-user?fatca=false`;
    return doGetAxios(url);
  },
  updateInvestmentInfo: (params: {
    dateOfIssue: string;
    dob: string;
    gender: number;
    idNo: string;
    idTypeId: string;
    nationalityId: string;
    photoAfterFileName: string;
    photoAfterURL: string;
    photoBeforeFileName: string;
    photoBeforeURL: string;
    placeOfIssue: string;
  }) => {
    const url = 'user/investment/update';
    return doPostAxios(url, params);
  },
  createEKYC: (params: {
    name: string; // 'Nguyen Thanh Phong';
    email: string; //'po.ntp.19946@gmail.com';
    phone: string; //  '0327113114';
    userProfile: {
      gender: number; //gender id : nam: 1 , nũ !=1 1;
      dob: string; //date of birth '20180528';
      nationalityId: number; // default viet nam 234    234;
      idTypeId: number; // defailt cmnd , cccd : 1 khac 5     1;
      idNo: string; ///  '371646538';
      dateOfIssue: string; //ngay tao cmnd  '19941004';
      placeOfIssue: string; //place  'Kien Giang';
      photoBeforeURL: string; //image url callback  'https://s3-ap-southeast-1.amazonaws.com/mio-3/dev/8d6a242e-b241-49f9-8171-35cd4b5d5c01.png';
      photoBeforeFileName: string; //name cmnd  'cmnd-mat-truoc';
      photoAfterURL: string; // rul callbacl afteroim       'https://s3-ap-southeast-1.amazonaws.com/mio-3/dev/f2ac7df5-febc-4fae-bb79-81fe448b744d.png';
      photoAfterFileName: string; // name cmnd ma sau   'cmnd-mat-sau';
      avatarUrl: string; //avata url   '"https://s3-ap-southeast-1.amazonaws.com/mio-3/dev/70454e55-6340-407d-b51e-9eb8db96f4be.png"';
      avatarFileName: string; //name chan dun  'chan-dung';
    };
    riskInfoInDto: any;
    userAddress: {
      permanentAddress: string; //  '95/48 Huynh Văn Bánh';
      countryId: number; // viet nam default 234  234;
      provinceId: number; //   50;
      districtId: number; //  560;
      wardId: number; //  8811;
      mailingAddress: string; // '95/48 Huynh Văn Bánh';
      mailingCountryId: number; //viet nam deafault 234   234;
      mailingProvinceId: number; // 1;
      mailingDistrictId: number; //    560;
      mailingWardId: number; //   8811;
    };
    userBankAccount?: {
      number: number | string; //  '31232132131';
      name: string; //  'NGUYEN THANH PHONG';
      branchId: number; // 1;
      bankId: number; //  1;
    };
    isKYC: boolean; //  false : non kyc , auto approve isKyc true ;
  }) => {
    const url = 'user/investment/create-ekyc?fatca=false';
    return doPostAxios(url, params);
  },
  // notification
  updateDeviceInfo: async (params: {
    // deviceInfo: {
    //   OS: string;
    //   versionOS: string;
    // };
    deviceInfo: string;
    deviceToken: string;
  }) => {
    const url = `user/device-info/update`;
    return doPostAxios(url, params);
  },
  removeDeviceInfo: async () => {
    const url = `user/device-info/remove`;
    return doGetAxios(url);
  },
  activeAccount: async (params: {phone: string}) => {
    const url = `user/active-account-create`;
    return doPostAxios(url, params);
  },
  riskUpdate: async (params: {
    experienceInvestment: number;
    holdingTime: number;
    realized: number;
    requirement: number;
    totalAsset: number;
  }) => {
    const url = `user/investment/risk-update`;
    return doPostAxios(url, params);
  },
  createEsignature: (params: any) => {
    const url = `esignature/create`;
    return axiosMultipart(url, params);
  },

  confirmCreateEsignature: (params: {
    expiredDurationInMinutes?: number;
    expiredTime?: number;
    otpTransId?: string;
    time?: number;
    transId?: string;
    otp?: string;
  }) => {
    const url = 'esignature/confirm';
    return doPostAxios(url, params);
  },
  confirmCreateEsignatureRisk: (params: {
    expiredDurationInMinutes?: number;
    expiredTime?: number;
    otpTransId?: string;
    time?: number;
    transId?: string;
    otp?: string;
  }) => {
    const url = 'esignature-risk/confirm';
    return doPostAxios(url, params);
  },
  createEsignatureRisk: (params: any) => {
    const url = `esignature-risk/create`;
    return axiosMultipart(url, params);
  },
};
