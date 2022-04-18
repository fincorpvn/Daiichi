import {Alert} from 'react-native';
import {doGetAxios, doPostAxios} from './axios';

export const apiMain = {
  getCountry: async () => {
    try {
      const url = 'country/list';
      const res: any = await doGetAxios(url);
      if (res.status == 200) {
        return res;
      }
      throw res?.response;
    } catch (error: any) {
      throw error;
    }
  },
  getProvince: async (p: {countryId: string | number}) => {
    try {
      const url = `province/list?countryId=${p.countryId}`;
      const res: any = await doGetAxios(url);
      if (res.status == 200) {
        return res;
      }
      throw res?.response;
    } catch (error: any) {
      throw error;
    }
  },
  getDistrict: async (p: {provinceId: string | number}) => {
    try {
      const url = `district/list?provinceId=${p.provinceId}`;
      const res: any = await doGetAxios(url);
      if (res.status == 200) {
        return res;
      }
      throw res?.response;
    } catch (error: any) {
      throw error;
    }
  },
  getWard: async (p: {districtId: string | number}) => {
    try {
      const url = `ward/list?districtId=${p.districtId}`;
      const res: any = await doGetAxios(url);
      if (res.status == 200) {
        return res;
      }
      throw res?.response;
    } catch (error: any) {
      throw error;
    }
  },
};
