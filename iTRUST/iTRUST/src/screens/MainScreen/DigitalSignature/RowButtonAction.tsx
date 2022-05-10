import {
  BottomSheetDialog,
  Button,
  Div,
  ImageView,
  Label,
  LoadingIndicator,
} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useRef, useState} from 'react';
import {doUploadFileSignature} from 'screens/MainScreen/DigitalSignature/func';
import {navigate} from 'services';
import {useAppSelector} from 'store/hooks';
import {getImageCamera, getImageLibrary, widthScreen} from 'utils';
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

function RowButtonAction() {
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const bottomSheetUpload = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const hide = (cb?: () => void) => {
    if (bottomSheetUpload.current) {
      bottomSheetUpload.current.hide();
    }
    cb && cb();
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
              hide(async () => {
                await getImageCamera().then((image: any) => {
                  doUploadFileSignature({
                    link: image[0].uri,
                    I18nState: I18nState,
                    setLoading: setLoading,
                  });
                });
              });
            } catch (error) {
            } finally {
            }
          }}
          onGallery={async () => {
            try {
              hide(async () => {
                await getImageLibrary().then((image: any) => {
                  doUploadFileSignature({
                    link: image[0].uri,
                    I18nState: I18nState,
                    setLoading: setLoading,
                  });
                });
              });
            } catch (error) {
            } finally {
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
        marginBottom={80}>
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
            navigate('SignatureDraw');
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
