import {doGetAxios, doPostAxios} from 'services/apis/axios';
export const apiInvestment = {
  loadProduct: async (params: {productCodeOrName}) => {
    const url = `product/active-list?productCodeOrName=${params.productCodeOrName}`;
    return doGetAxios(url);
  },
  loadnav: async (params: {
    fromDate: string; //  '20210518';
    isAllData?: number; //  0;
    productId: number; //   1;
    toDate: string; //  '20211118';
  }) => {
    const url = 'product/load-nav';
    return doPostAxios(url, params);
  },
  loadProductDetails: async (params: {id: string | number}) => {
    const url = `product/${params.id}`;
    return doGetAxios(url);
  },
  checkOverCurrentSession: async (params: {productId: string | number}) => {
    const url = 'product/check-over-current-session';
    return doPostAxios(url, params);
  },
  excuseTempVolume: async (params: {
    amount: string | number;
    productId: string | number;
    productProgramId: string | number;
  }) => {
    const url = 'investment/direct/excuse-temp-volume';
    return doPostAxios(url, params);
  },
  bankSuperVisory: async (params: {productId: string | number}) => {
    const url = `bank/supervisory/load?productProgramId=${params.productId}`;
    return doGetAxios(url);
  },
  createBuyOrder: async (params: {
    amount: number; // 132123123;
    beginBuyAutoStartDate?: any;
    closedBankNoteTime: number; // 1637143200000;
    closedBankNoteTimeString: string; //'17:00 17/11/2021';
    closedOrderBookTime: number; // 1637119800000;
    closedOrderBookTimeString: string; // '10:30 17/11/2021';
    createdDate: number; //  1636972631505;
    investmentNumber: string; //'911CL39541';
    isBuyAuto: number; //   0;
    productId: number; // 2;
    productName: string; // 'Quỹ Đầu tư Cổ phiếu FC2 (FFC2)';
    productProgramId: number; //  7;
    productSchemeCode: string; //  'F_FLEX';
    productSchemeIsAutoBuy: boolean; //   false;
    productSchemeNameEn: string; // 'FFlex';
    tradeCode: string; //   'FFC2N003';
    tradingTime: number; //  1636979826947;
    tradingTimeString: string; //   '18/11/2021';
  }) => {
    const url = 'investment/direct/buy-create';
    return doPostAxios(url, params);
  },
  buyConfirm: (params: {
    expiredDurationInMinutes?: number;
    expiredTime?: number;
    otpTransId?: string;
    time?: number;
    transId?: string;
    otp?: string;
  }) => {
    const url = 'investment/direct/buy-confirm';
    return doPostAxios(url, params);
  },
  // do order sell
  sellConfirm: (params: {
    expiredDurationInMinutes?: number;
    expiredTime?: number;
    otpTransId?: string;
    time?: number;
    transId?: string;
    otp?: string;
  }) => {
    const url = 'investment/direct/sell-confirm';
    return doPostAxios(url, params);
  },
  // do order sell
  investmentLoadScheme: async (params: {productId: number | string}) => {
    const url = 'investment/asset/load-scheme';
    return doPostAxios(url, params);
  },
  investmentExcuseTempMoney: async (params: {
    productId: number | string;
    productProgramId: number | string;
    volume: number | string;
  }) => {
    const url = 'investment/direct/excuse-temp-money';
    return doPostAxios(url, params);
  },
  createSellOrder: async (params: {
    amount: number; // 20
    closedBankNoteTime: number; // 1637143200000
    closedOrderBookTime: number; //  1637119800000
    closedOrderBookTimeString: string; //  "10:30 17/11/2021"
    createdDate: number; //  1637050424523
    navCurrently: number; // 15000
    productId: number | string; // 1
    productName: string; //  "Quỹ Đầu tư Trái phiếu FC1 (FFC1)"
    productProgramId: number | string; //   1
    productSchemeCode: string; //  "F_FLEX"
    productSchemeIsAutoBuy?: boolean; //   false
    productSchemeNameEn: string; //   "FFlex"
    tableFee: Array<any>; //  [{orderId: 53, fee: 6000, tax: 300, feeRate: 2, taxRate: 0.1, totalFee: 6000, volumSell: 20,…}]
    totalAmount: number; //   293700
    totalFee: number; //   6000
    tradeCode: string; //  "FFC1N003"
    tradingTime: number; //   1637056969048
    tradingTimeString: string; //   "18/11/2021"
    volume: number | string; //   20
    volumeAvailable: number; //   821.44
  }) => {
    console.log('params', params);
    const url = 'investment/direct/sell-create';
    return doPostAxios(url, params);
  },
  // create order transfer
  switchCheck: async (params: {
    destProductId: number; // 2
    destProductProgramId: number; //   7
    productId: number; //  1
    productProgramId: number; //  1
    volume: number | string; //  100
  }) => {
    const url = 'investment/direct/switch-check';
    return doPostAxios(url, params);
  },
  loadBuy: async (params: {id: number}) => {
    const url = `product-program/load-buy/${params.id}`;
    return doGetAxios(url);
  },
  switchCreate: async (params: {
    amount: string | number; // 100
    closedOrderBookTime: number; //  1637206200000
    closedOrderBookTimeString: string; //"10:30 18/11/2021"
    createdDate: number; // 1637121221745
    destProductId: number; //  2
    destProductProgramId: number; //  7
    productCode: string; //  "FFC1"
    productId: number; // 1
    productProgramCode: string; //  "FFC1N003 - FFlex"
    productProgramId: number; //  1
    tradingTime: number; //  1637128090910
    tradingTimeString: string; //  "19/11/2021"
    transferProductCode: string; //  "FFC2"
    transferProductProgramCode: string; //  "FFC2N003 - FFlex"
    volume: string | number; //  100
  }) => {
    const url = 'investment/direct/switch-create';
    return doPostAxios(url, params);
  },
  transferConfirm: (params: {
    expiredDurationInMinutes?: number;
    expiredTime?: number;
    otpTransId?: string;
    time?: number;
    transId?: string;
    otp?: string;
  }) => {
    const url = 'investment/direct/switch-confirm';
    return doPostAxios(url, params);
  },
  getProductDetails: (params: {id: string | number}) => {
    const url = `home/productDetail?programId=${params.id}`;
    return doGetAxios(url);
  },
};
