import {Alert} from 'react-native';
import {setStoreToken} from 'utils/storage';
import {doGetAxios, doPostAxios} from './axios';

export const apiAsset = {
  loadDashboard: async (params: {}) => {
    const url = 'home/dashboard';
    return doGetAxios(url);
  },
  loadAssetManagement: async (params: {id: string | number}) => {
    const url = `asset-management/statistic/${params.id}`;
    return doPostAxios(url, {
      productId: params.id,
    });
  },
  loadTableAsset: async (params: {
    pagination: {
      currentPage: number;
      itemsPerPage: number;
    };
    queries: {
      productId: number;
    };
  }) => {
    const url = 'asset-management/table';
    return doPostAxios(url, params);
  },
  getBanner: (params?: {}) => {
    const url = `banner/load`;
    return doGetAxios(url);
  },
};
