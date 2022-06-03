import {Linking, NativeModules, Platform} from 'react-native';
import I18n from 'languages/i18n';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Clipboard from '@react-native-community/clipboard';
import {Alert, Toast} from 'components';
import moment from 'moment';
import RNFS from 'react-native-fs';
import {stringApp} from 'constant';

const regEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9|#?!@$%^&*-]).{6,}$/;
const regPhone = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;

export const converRistInfoInDto = (t: any) => {
  const obj = {};
  Object.keys(t).map((item: any, index: number) => {
    obj[item] = t[item].id;
  });
  return obj;
};
export function convertReceiveAmount(
  status: boolean,
  I18nState: 'en' | 'vi' | string,
) {
  if (status) {
    if (I18nState == 'vi') {
      return `Đã nhận tiền`;
    }
    return `Received money confirm`;
  }
  if (I18nState == 'vi') {
    return `Chờ xác nhận tiền`;
  }
  return `Waiting to confirm receiving money`;
}
export const convertDataDownloadFile = (
  r: any,
): {
  name: string;
  type: string;
  urlFile: string;
} => {
  const link =
    Platform.OS === 'android'
      ? `${RNFS.DownloadDirectoryPath}/${stringApp.appLink}/`
      : `${RNFS.DocumentDirectoryPath}/`;
  const name = r.respInfo.headers?.[`content-disposition`]
    .replace('attachment; filename="', '')
    .replace(/"/g, '');
  const i = new Date().getTime();
  const type = `application/pdf`;
  // const type = r.respInfo.headers?.[`content-type`];
  const urlFile = `${link}${i}-${name}`;
  return {
    name: `${i}-${name}`,
    type,
    urlFile,
  };
};

export const convertNumber = (num: number | string, hideD?: boolean) => {
  if (!num) return `${num}${hideD ? '' : ` (VNĐ)`}`;
  const strhead = parseInt(`${num}`.replace(/[,]/g, '')) >= 0 ? '' : '-';
  const ar = Math.abs(
    typeof num == 'string' ? parseInt(num.replace(/[,]/g, '')) : num,
  )
    .toString()
    .split('.');
  const str = [...ar[0]]
    .reverse()
    .map((item, index) => {
      if (index % 3 == 2 && index < ar[0].length - 1) {
        return `,${item}`;
      }
      return item;
    })
    .reverse()
    .join('');
  return `${strhead}${str}${ar[1] ? `.${ar[1]}` : ''}${
    !!hideD ? '' : ' (VNĐ)'
  }`;
};

export const convertAmount = (num: number | string, hideD?: boolean) => {
  if (!num) return `${num}${hideD ? '' : ` (VNĐ)`}`;
  if (!parseInt(`${num}`)) {
    return '';
  }

  const strhead = parseInt(`${num}`.replace(/[,]/g, '')) >= 0 ? '' : '-';
  const ar = Math.abs(
    typeof num == 'string' ? parseInt(num.replace(/[,]/g, '')) : num,
  )
    .toString()
    .split('.');
  const isDot = `${num}`.indexOf('.');
  let last = '';
  if (isDot != -1) {
    last = `${num}`.slice(isDot + 1, `${num}`.length)?.slice(0, 2);
  } else {
    last = '';
  }
  const str = [...ar[0]]
    .reverse()
    .map((item, index) => {
      if (index % 3 == 2 && index < ar[0].length - 1) {
        return `,${item}`;
      }
      return item;
    })
    .reverse()
    .join('');
  return `${strhead}${str}${isDot != -1 ? `.${last ?? ''}` : ''}${
    !!hideD ? '' : ' (VNĐ)'
  }`;
};

export const convertNav = (num: number | string, hideD?: boolean) => {
  if (!num) return `${num}${hideD ? '' : ' (VNĐ)'}`;
  const strhead = parseInt(`${num}`.replace(/[,]/g, '')) >= 0 ? '' : '-';
  const ar = Math.abs(
    typeof num == 'string' ? parseInt(num.replace(/[,]/g, '')) : num,
  )
    .toString()
    .split('.');
  const last =
    ar[1]?.length == 2
      ? `.${ar[1]}`
      : ar[1]?.length == 1
      ? `.${ar[1]}0`
      : `.00`;
  const str = [...ar[0]]
    .reverse()
    .map((item, index) => {
      if (index % 3 == 2 && index < ar[0].length - 1) {
        return `,${item}`;
      }
      return item;
    })
    .reverse()
    .join('');
  return `${strhead}${str}${last}${!!hideD ? '' : ' (VNĐ)'}`;
};

export const convertPercent = (num: string | number | any) => {
  if (!`${num}`.length) {
    return '';
  }
  const per = Math.round(num * 100) / 100;
  const la = `${per}`?.split('.')?.[1] || '';
  const st = la?.length == 2 ? '' : la?.length == 1 ? '0' : '.00';
  return `${per}${st}%`;
};

export const isvalidEmail = (email: string) => {
  if (!email?.length) {
    return false;
  }
  return regEmail.test(email.toLocaleLowerCase());
};

export const isValidPassword = (password: string) => {
  return regPassword.test(password);
};

export const isvalidPhone = (phone: string) => {
  if (!phone?.length) {
    return false;
  }
  return regPhone.test(phone.toLocaleLowerCase());
};

export const parseMultilanguage = (text: string) => {
  return I18n.t(`${text}`);
};

export const checkRegisterValue = (p: {
  name: string;
  email: string;
  phone: string;
  province?: any;
}) => {
  if (
    !p.name.length ||
    !isvalidEmail(p.email) ||
    !isvalidPhone(p.phone)
    // || !p.province
  ) {
    return false;
  }
  return true;
};

export const checkPassword = (p: {
  oldPassword: string;
  newPassword: string;
  reNewPassword: string;
}) => {
  if (!p.oldPassword.length) {
    return false;
  }
  if (p.oldPassword == p.newPassword) {
    Alert.showError({
      content: `alert.matkhaucuphaikhacmatkhaumoi`,
    });
    return false;
  }
  if (p.newPassword !== p.reNewPassword) {
    return false;
  }

  if (!regPassword.test(p.newPassword)) {
    return false;
  }
  // regex check password;
  return true;
};
export const checkCreatePassword = (p: {
  password: string;
  confirmPassword: string;
}) => {
  if (!p.password || !p.confirmPassword) {
    return false;
  }
  if (p.password != p.confirmPassword) {
    return false;
  }
  if (!regPassword.test(p.password)) {
    Alert.showError({
      content: `setpasswordscreen.rule`,
    });
    return false;
  }
  return true;
};

export const checkEmail = (p: {
  oldEmail: string;
  newEmail: string;
  reNewEmail: string;
}) => {
  if (!p.oldEmail.length) {
    return false;
  }
  if (p.oldEmail == p.newEmail) {
    Alert.showError({
      content: `alert.emailcuphaikhacemailmoi`,
    });
    return false;
  }
  if (!isvalidEmail(p.newEmail)) {
    return false;
  }

  if (p.newEmail !== p.reNewEmail) {
    return false;
  }
  // regex check password;
  return true;
};

export const checkAddress = (p: {
  valueNation: any;
  valueProvince: any;
  valueDistrict: any;
  valueCommune: any;
  address: string;
}) => {
  if (p.address?.length == 0) {
    return false;
  }
  if (!p.valueNation?.id) {
    return false;
  }
  if (!p.valueProvince?.id) {
    return false;
  }
  if (!p.valueDistrict?.id) {
    return false;
  }
  if (!p.valueCommune?.id) {
    return false;
  }
  return true;
};

export const getNumdateCalenda = (p: {
  date?: number | string;
  month: number | string;
  year: number | string;
}) => {
  const gmonth =
    typeof p.month == 'string' ? parseInt(p.month || '0') : p.month;
  const gyear = typeof p.year == 'string' ? parseInt(p.year || '0') : p.year;
  if (gmonth == 2) {
    if ((gyear % 4 == 0 && gyear % 100 != 0) || gyear % 400 == 0) {
      return 29;
    }
    return 28;
  }
  if (gmonth == 4 || gmonth == 6 || gmonth == 9 || gmonth == 11) {
    return 30;
  }
  return 31;
};

export const parseArrayNum = (num: number, isYear?: boolean) => {
  const curryear = new Date().getFullYear();
  return Array(num)
    .fill(0)
    .map((item, index) => {
      const i = isYear ? curryear - num + index : index;
      return {
        id: `${i < 10 ? '0' : ''}${i + 1}`,
        name: `${i + 1}`,
        nameen: `${i + 1}`,
      };
    });
};

export const getUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const parseToFormData = (p: any) => {
  if (typeof p == 'object') {
    return Object.keys(p)?.map(item => {
      if (item == 'fileUpload') {
        return p[`${item}`];
      }
      return {
        name: item,
        data: typeof p[item] == 'string' ? p[item] : `${p[item]}`,
      };
    });
  }
  return [];
};

export const getImageCamera = async () => {
  return new Promise((resolve, reject) => {
    return requestPermisson(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA,
      async () => {
        return launchCamera(
          {
            mediaType: 'photo',
            quality: 1,
            cameraType: 'back',
            includeBase64: true,
            saveToPhotos: true,
          },
          async (res: any) => {
            if (res.assets) {
              resolve(res.assets);
            }
            reject();
          },
        ).catch((err: any) => {
          reject();
          throw err;
        });
      },
    );
  });
};

export const getImageLibrary = async () => {
  return new Promise((resolve, reject) => {
    return requestPermisson(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY,
      async () => {
        return launchImageLibrary(
          {
            mediaType: 'photo',
            quality: 1,
            includeBase64: true,
          },
          (res: any) => {
            if (res.assets) {
              resolve(res.assets);
            }
            reject();
          },
        ).catch((err: any) => {
          reject();
          throw err;
        });
      },
    );
  });
};

export const requestPermisson = (permissions: any, callback: () => void) => {
  if (Platform.OS === 'android') {
    check(permissions)
      .then(result => {
        if (result == RESULTS.BLOCKED || result == RESULTS.UNAVAILABLE) {
          Alert.show({
            content: 'Không có quyền truy cập\nVui lòng vào cài đặt',
            multilanguage: false,
            onConfirm: () => {
              Linking.openSettings();
            },
          });
          throw null;
        }
        if (result == RESULTS.DENIED) {
          request(permissions).then(r => {
            if (
              r == RESULTS.BLOCKED ||
              r == RESULTS.UNAVAILABLE ||
              r == RESULTS.DENIED
            ) {
              throw null;
            }
            callback && callback();
          });
          return;
        }
        return callback && callback();
      })
      .catch(error => {
        throw error;
      });
  } else {
    request(permissions).then(r => {
      console.log('reuquas', r);
      if (r == 'granted' || r == 'unavailable') {
        callback && callback();
        return;
      }
      Alert.show({
        content: 'Không có quyền truy cập\nVui lòng vào cài đặt',
        multilanguage: false,
        onConfirm: () => {
          Linking.openSettings();
        },
      });
      return;
    });
    return;
    check(permissions).then(r => {
      if (r == 'unavailable') {
        Alert.show({
          content: 'Không có quyền truy cập\nVui lòng vào cài đặt',
          multilanguage: false,
          onConfirm: () => {
            Linking.openSettings();
          },
        });
      } else if (r != 'granted') {
        request(permissions).then(r => {
          if (r == 'granted') {
            callback && callback();
            return;
          }
          Alert.show({
            content: 'Không có quyền truy cập\nVui lòng vào cài đặt',
            multilanguage: false,
            onConfirm: () => {
              Linking.openSettings();
            },
          });
          return;
        });
      } else {
        callback && callback();
        return;
      }
    });
    return;
  }
};

export const joinObjectCalendar = (a: {
  date: number;
  month: number;
  year?: number;
}) => {
  return `${a.year}${`${a.month}`.length < 2 ? `0${a.month}` : a.month}${
    `${a.date}`.length < 2 ? `0${a.date}` : a.date
  }`;
};

export const reJoinObjectCalendar = (a: string) => {
  const arr = a?.split('/');
  return {
    date: arr?.[1],
    month: arr?.[0],
    year: arr?.[2],
  };
};

export const convertTimestamp = (
  a: number | string,
  format?: string,
  localZone?: boolean,
) => {
  if (!a) {
    return '';
  }
  if (localZone) {
    return `${moment(a).format(format || 'DD/MM/yyyy')}`;
  }
  return `${moment(a)
    .utcOffset('+07:00')
    .format(format || 'DD/MM/yyyy')}`;
};

export const removeUtf8 = (s: string) => {
  let str = `${s}`;
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/(VNĐ)/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/(VNĐ)/g, 'D');
  return str;
};

export const removeAllSpace = (s: string) => {
  return s.replace(/\s/g, '');
};

export const objectToArray = (a: Object) => {
  if (!a) {
    return [];
  }
  return Object.keys(a)?.map((item: any, index: number) => {
    return a[item] || null;
  });
};

export const timeoutFromNow = (
  timeOut: number,
  I18nState: 'en' | 'vi' | string,
) => {
  let abc = timeOut;
  const h = Math.floor(abc / 3600);
  abc = abc % 3600;
  const m = Math.floor(abc / 60);
  abc = abc % 60;
  const s = abc;
  if (I18nState == 'vi') {
    return `${h} giờ ${m} phút ${s} giây`;
  }
  return `${h} h ${m} m ${s} s`;
};

export const convertStringTime = (time: string) => {
  return time
    .split('/')
    .reverse()
    .map((item: any) => {
      return parseInt(item) < 10 && item.length < 2
        ? `0${parseInt(item)}`
        : item;
    })
    .join('');
};

export const getAddressRejectWard = (address: string) => {
  const a = removeUtf8(address?.toLocaleLowerCase());
  const index = a.indexOf('xa');
  const indexgg = a.indexOf('phuong');
  if (index != -1) {
    return address.slice(0, index).replace(/,/g, '');
  } else if (indexgg != -1) {
    return address.slice(0, indexgg).replace(/,/g, '');
  }
  return '';
};

export const callPhone = (phone: string) => {
  const phoneNumber =
    Platform.OS === 'android' ? `tel:${phone}` : `telprompt:${phone}`;
  return Linking.openURL(phoneNumber);
};

export const linkToWeb = (t: string) => {
  Linking.canOpenURL(t)
    .then((e: any) => {
      Linking.openURL(t);
    })
    .catch((e: any) => {
      Toast.show({
        content: `alert.daxayraloi`,
        multilanguage: true,
      });
    });
};

export const copyToClipboard = (text: string) => {
  Clipboard.setString(text);
  Toast.show({
    content: `alert.dasaochepvaobonhodem`,
    multilanguage: true,
  });
};

export const checkLogin = (p: {name: string; pass: string}) => {
  if (p.name.length == 0) {
    Alert.showError({
      content: `alert.vuilongnhaptendangnhap`,
    });
    return false;
  }
  if (p.pass.length == 0) {
    Alert.showError({
      content: `alert.vuilongnhapmatkhau`,
    });
    return false;
  }
  return true;
};

// export function getMaxMinNAV(t: Array<any>) {
//   let max = null;
//   let min = null;
//   t.map((item: any, index: number) => {
//     if (!max) {
//       max = item.y;
//     } else if (item.y >= max) {
//       max = item.y;
//     }
//     if (!min) {
//       min = item.y;
//     } else if (item.y <= min) {
//       min = item.y;
//     }
//   });
//   return {
//     max: max || 10000,
//     min: min || 0,
//     space: (max || 10000) / 3,
//   };
// }

export function Log(t?: string | object, r?: any) {
  if (__DEV__) {
    if (typeof t == 'string') {
      return console.log(t, r || '');
    } else if (typeof t == 'object') {
      return console.log(t);
    } else {
      return console.log(t || '', r || '');
    }
  }
  return;
}

export function convertStringFeeSell(p: {
  beginValue?: number;
  endValue?: number;
  I18nState?: 'vi' | 'en';
}) {
  let content = '';
  if (p.beginValue == 0) {
    content = `${p.I18nState == 'vi' ? 'Dưới' : 'Under'} ${p.endValue} ${
      p.I18nState == 'vi' ? 'ngày' : 'days'
    }`;
  } else if (p.beginValue == 730) {
    content = `${p.I18nState == 'vi' ? 'Trên' : 'Above'} ${p.beginValue} ${
      p.I18nState == 'vi' ? 'ngày' : 'days'
    }`;
  } else {
    content = `${p.beginValue} - ${p.endValue} ${
      p.I18nState == 'vi' ? 'ngày' : 'days'
    }`;
  }
  return content;
}
export function convertStringFeeBuy(p: {
  beginValue?: number;
  endValue?: number;
  I18nState?: 'vi' | 'en';
}) {
  const {beginValue, endValue, I18nState} = p;
  if (beginValue == 0) {
    return `Dưới ${convertNumber(endValue || 0, true)}`;
  }
  if (endValue == -1) {
    return `Từ ${convertNumber(beginValue || 0, true)}`;
  }
  return `${convertNumber(beginValue || 0, true)} - ${convertNumber(
    endValue || 0,
    true,
  )}`;

  // if (p.beginValue == 0) {
  //   content = `${p.I18nState == 'vi' ? 'Dưới' : 'Under'} ${p.endValue} ${
  //     p.I18nState == 'vi' ? 'ngày' : 'days'
  //   }`;
  // } else if (p.beginValue == 730) {
  //   content = `${p.I18nState == 'vi' ? 'Trên' : 'Above'} ${p.beginValue} ${
  //     p.I18nState == 'vi' ? 'ngày' : 'days'
  //   }`;
  // } else {
  //   content = `${p.beginValue} - ${p.endValue} ${
  //     p.I18nState == 'vi' ? 'ngày' : 'days'
  //   }`;
  // }
  // return content;
}

export function hidePhoneNumberOTP(t?: string) {
  if (!t?.length) {
    return '';
  }
  return [...t]
    .map((item: any, index: number) => {
      if (index <= 3 || index >= t.length - 2) {
        return item;
      }
      return '*';
    })
    .join('');
}

export function convertProductCode(p: {
  code?: string;
  I18nState?: 'vi' | 'en';
}) {
  let content = '';
  if (p.code === 'VFF') {
    content = `${
      p.I18nState == 'vi' ? 'Quỹ Trái phiếu' : 'Fixed Income Fund'
    } `;
  } else if (p.code === 'VEOF') {
    content = `${p.I18nState == 'vi' ? 'Quỹ Cổ phiếu' : 'Equity Fund'} `;
  } else if (p.code === 'VESAF') {
    content = `${p.I18nState == 'vi' ? 'Quỹ Cổ phiếu' : 'Equity Fund'} `;
  } else if (p.code === 'VIBF') {
    content = `${p.I18nState == 'vi' ? 'Quỹ Cân bằng' : 'Balanced Fund'} `;
  } else if (p.code === 'VLBF') {
    content = `${
      p.I18nState == 'vi' ? 'Quỹ Thị trường Tiền tệ' : 'Money Market Fund'
    } `;
  } else {
    content = `${p.I18nState == 'vi' ? 'dfdf' : 'fdfd'} `;
  }
  return content;
}
