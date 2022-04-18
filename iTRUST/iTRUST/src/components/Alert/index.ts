import {navigate, goBack} from 'services/navigation';
class Alert {
  static show(p: {
    title?: string;
    content: string;
    titleCancel?: string;
    titleClose?: string;
    titleConfirm?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    onClose?: () => void;
    multilanguage?: boolean;
    error?: boolean;
    type?: number;
  }) {
    navigate('AlertModal', {
      multilanguage: true,
      error: false,
      titleCancel: 'alert.huybo',
      titleConfirm: 'alert.dongy',
      titleClose: 'alert.dong',
      title: 'alert.thongbao',
      type: 1,
      onConfirm: () => {
        // goBack();
      },
      onCancel: () => {
        // goBack();
      },
      ...p,
    });
  }
  static hide() {
    goBack();
  }
  static showComponent(p: {component: any}) {
    navigate('AlertModal', {
      component: p.component,
      isShowComponent: true,
    });
  }
  static showError(p: {
    content: string;
    multilanguage?: boolean;
    onPress?: () => void;
  }) {
    navigate('AlertError', {
      multilanguage: true,
      error: false,
      titleCancel: 'alert.huybo',
      titleConfirm: 'alert.dongy',
      titleClose: 'alert.dong',
      title: 'alert.thongbao',
      onConfirm: () => {
        // goBack();
      },
      onCancel: () => {
        // goBack();
      },
      onPress: () => {},
      ...p,
    });
  }
}

export default Alert;
