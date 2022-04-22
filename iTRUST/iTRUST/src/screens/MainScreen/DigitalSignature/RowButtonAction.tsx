import {BottomSheetDialog, Button, Div, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useRef} from 'react';
import {navigate} from 'services';
import {getImageCamera, getImageLibrary} from 'utils';
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
  const bottomSheetUpload = useRef<any>(null);
  const hide = (cb?: () => void) => {
    if (bottomSheetUpload.current) {
      bottomSheetUpload.current.hide();
    }
    cb && cb();
  };

  return (
    <>
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
                  console.log(image);
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
                  console.log(image);
                });
              });
            } catch (error) {
            } finally {
            }
          }}
        />
      </BottomSheetDialog>
      {/* <BottomSheetDialog
        style={{
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        ref={bottomSheetUpload}>
        <SignatureDraw />
      </BottomSheetDialog> */}
      <Div
        flexDirection={'row'}
        width={'100%'}
        paddingHorizontal={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        marginTop={18}
        marginBottom={20}>
        <Btn
          onPress={() => {
            //   call action get image from library
            bottomSheetUpload.current.show();
          }}
          type={1}
          title={`digitalsignature.uploadanh`}
          icon={Icons.camera}
        />
        <Btn
          onPress={() => {
            navigate('SignatureDraw');
          }}
          type={2}
          title={`digitalsignature.kyso`}
          icon={Icons.signature}
        />
      </Div>
    </>
  );
}

export default React.memo(RowButtonAction);
