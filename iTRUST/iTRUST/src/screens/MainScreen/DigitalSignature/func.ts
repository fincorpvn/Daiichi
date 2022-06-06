import {apiAuth, navigate} from 'services';
import {Platform} from 'react-native';
import {getUuid} from 'utils';
import {Alert} from 'components';
export const doUploadFileSignature = async (p: {
  link: string;
  setLoading: (t: boolean) => void;
  I18nState: 'en' | 'vi';
}) => {
  try {
    const id = getUuid();
    p.setLoading(true);
    const formdata = new FormData();
    const file = {
      uri: Platform.OS !== 'android' ? p.link.replace('file://', '') : p.link,
      name: `${id}.png`,
      filename: `${id}.png`,
      type: 'image/png',
    };
    formdata.append('file', file);
    const res = await apiAuth.createEsignature(formdata);
    if (res.status == 200 && !!res.data.otpInfo) {
      navigate('OtpRequestModal', {
        data: {
          requestOnSendOtp: res.data.otpInfo,
          flowApp: 'CreateEsignature',
        },
      });
      return;
    }
    Alert.showError({
      content: p.I18nState == 'vi' ? res.message : res.messageEn,
      multilanguage: false,
    });
    return;
  } catch (error: any) {
    Alert.showError({
      content: p.I18nState == 'vi' ? error.message : error.messageEn,
      multilanguage: false,
    });
  } finally {
    p.setLoading(false);
  }
};
