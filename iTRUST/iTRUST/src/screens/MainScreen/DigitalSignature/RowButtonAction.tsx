import {
  Alert,
  BottomSheetDialog,
  Button,
  Div,
  ImageView,
  Label,
  LoadingIndicator,
  Toast,
} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useRef, useState} from 'react';
import {Platform} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  doUploadFileEsignatureRisk,
  doUploadFileSignature,
} from 'screens/MainScreen/DigitalSignature/func';
import {navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import {getImageCamera, getImageLibrary, Log, widthScreen} from 'utils';
import ComActionUpload from './ComActionUpload';
import SignatureDraw from './SignatureDraw';
const Btn = (p: {
  type: 1 | 2;
  title: string;
  icon: any;
  onPress: () => void;
}) => {
  return (
    <Button
      onPress={() => {
        p.onPress();
      }}
      width={166}
      height={48}
      flexDirection={'row'}
      alignItems={'center'}
      backgroundColor={p.type == 1 ? Ecolors.grayColor : Ecolors.mainColor}
      justifyContent={'center'}
      borderRadius={8}>
      <ImageView widthHeight={20} resizeMode={'contain'} source={p.icon} />
      <Label
        marginLeft={7}
        fontWeight={'500'}
        color={p.type == 1 ? Ecolors.textColor : Ecolors.whiteColor}>
        {p.title}
      </Label>
    </Button>
  );
};

function RowButtonAction(p: {flowApp?: string}) {
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const bottomSheetUpload = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const insets = useSafeAreaInsets();
  const [stateimage, setStateImage] = useState<any>(null);
  const hide = (cb?: (t?: any) => void) => {
    if (bottomSheetUpload.current) {
      bottomSheetUpload.current.hide((t: any) => {
        cb && cb(t);
      });
    }
  };

  const doAction = async image => {
    ImageResizer.createResizedImage(image.uri, 800, 600, 'JPEG', 80, 0)
      .then(({uri}) => {
        if (p.flowApp == 'CreateEsignatureRisk') {
          doUploadFileEsignatureRisk({
            link: uri,
            I18nState: I18nState,
            setLoading: setLoading,
          });
          return;
        }
        doUploadFileSignature({
          link: uri,
          I18nState: I18nState,
          setLoading: setLoading,
        });
      })
      .catch(err => {
        Alert.showError({
          content: 'alert.dungluongtoida',
        });
        return;
      });
    return;
  };

  return (
    <>
      {loading && (
        <Div
          width={'100%'}
          height={'100%'}
          alignItems={'center'}
          justifyContent={'center'}
          zIndex={99999}
          elevation={99999}
          backgroundColor={Ecolors.transparentLoading}
          position={'absolute'}>
          <LoadingIndicator color={Ecolors.mainColor} />
        </Div>
      )}
      <BottomSheetDialog
        style={{
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        ref={bottomSheetUpload}>
        <ComActionUpload
          onCancel={() => {
            hide();
          }}
          onCamera={async () => {
            try {
              if (Platform.OS === 'ios') {
                await getImageCamera()
                  .then((image: any) => {
                    hide();
                    if (image[0]) {
                      doAction(image[0]);
                    }
                  })
                  .catch(() => {
                    hide();
                  });
                return;
              }
              hide(async (t: any) => {
                getImageCamera()
                  .then((image: any) => {
                    if (image[0]) {
                      doAction(image[0]);
                    }
                  })
                  .catch(() => {
                    hide();
                  });
              });
            } catch (error) {
              if (!!error) {
                Toast.show({
                  content: 'alert.daxayraloi',
                  multilanguage: true,
                });
              }
            } finally {
              // hide(async () => {});
            }
          }}
          onGallery={async () => {
            try {
              if (Platform.OS === 'ios') {
                await getImageLibrary().then((image: any) => {
                  hide();
                  if (image[0]) {
                    if (image[0].uri.endsWith('.gif')) {
                      Alert.showError({
                        content: 'alert.dinhdanganhkhongphuhop',
                      });
                      return;
                    }
                    doAction(image[0]);
                  }
                });
                return;
              }
              hide(async (t: any) => {
                await getImageLibrary().then((image: any) => {
                  if (image[0]) {
                    if (image[0].uri.endsWith('.gif')) {
                      Alert.showError({
                        content: 'alert.dinhdanganhkhongphuhop',
                      });
                      return;
                    }
                    doAction(image[0]);
                  }
                });
              });
            } catch (error) {
              if (!!error) {
                Toast.show({
                  content: 'alert.daxayraloi',
                  multilanguage: true,
                });
                return;
              }
            } finally {
              // hide(async () => {});
            }
          }}
        />
      </BottomSheetDialog>
      <Div
        flexDirection={'row'}
        paddingHorizontal={16}
        width={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}
        marginTop={18}
        marginBottom={insets.bottom + 10}>
        <Btn
          onPress={() => {
            //   call action get image from library
            bottomSheetUpload.current.show();
          }}
          type={1}
          title={`digitalsignature.taichuky`}
          icon={Icons.camera}
        />
        <Btn
          onPress={() => {
            navigate('SignatureDraw', {
              data: {
                flowApp: p.flowApp || '',
              },
            });
          }}
          type={2}
          title={`digitalsignature.kydientu`}
          icon={Icons.signature}
        />
      </Div>
    </>
  );
}

export default React.memo(RowButtonAction);
