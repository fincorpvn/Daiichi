import {Alert} from 'react-native';
import {setStoreToken} from 'utils/storage';
import {doGetAxios, doPostAxios} from './axios';

export const apiTransaction = {
  loadByStatus: async (params: {}) => {
    const url = 'investment/transactions/load-by-status';
    return doPostAxios(url, params);
  },
  deleteOrder: async (params: {orderId: number}) => {
    const url = 'investment/direct/delete-order';
    return doPostAxios(url, params);
  },
  getAutoInvest: async (params?: {orderId: number}) => {
    const url = 'investment/sip/load-scheme';
    return doGetAxios(url);
  },
  loadHistory: async (params: {
    pagination?: {
      currentPage?: number;
      itemsPerPage?: number;
      totalItemCount?: number;
    };
    queries?: {
      bdaCode?: any;
      clientId?: any;
      fromDate?: string;
      hash?: any;
      investmentNumber?: any;
      investorId?: any;
      orderCode?: string;
      orderTypeId?: number;
      orderTypeName?: any;
      productCode?: any;
      productProgramId?: number;
      programCode?: any;
      rmCode?: any;
      toDate?: string;
      userName?: any;
    };
  }) => {
    const pagination = {
      currentPage: 1,
      itemsPerPage: 10,
      ...(params.pagination || {}),
    };
    const queries = {
      fromDate: null,
      toDate: null,
      orderTypeId: null,
      productProgramId: null,
      orderCode: '',
      ...(params.queries || {}),
    };
    const url = 'investment/transactions/history-load';
    return doPostAxios(url, {
      pagination,
      queries,
    });
  },
};
