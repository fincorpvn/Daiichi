import {
  Button,
  ButtonBorder,
  Div,
  ImageView,
  Label,
  LoadingIndicator,
} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useRef, useState} from 'react';
import {doUploadFileSignature} from 'screens/MainScreen/DigitalSignature/func';
import {goBack} from 'services';
import {useAppSelector} from 'store/hooks';
import DrawLine from './DrawLine';

interface T {
  clear: () => void;
  accept: (t: (t: string) => void) => void;
}

function SignatureDraw() {
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const [loading, setLoading] = useState<boolean>(false);
  const drawlineRef = useRef<T>(null);
  const [image, setImage] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onAccept = () => {
    if (drawlineRef.current) {
      drawlineRef.current.accept((res: string) => {
        goBack().then(() => {
          doUploadFileSignature({
            link: res,
            setLoading: setLoading,
            I18nState: I18nState,
          });
        });
      });
    }
  };

  const onDelete = () => {
    if (drawlineRef.current) {
      drawlineRef.current.clear();
    }
  };

  return (
    <Div
      flex={1}
      alignItems={'center'}
      justifyContent={'center'}
      backgroundColor={Ecolors.transparentLoading}>
      {loading && (
        <Div
          position={'absolute'}
          zIndex={999}
          elevation={999}
          backgroundColor={Ecolors.transparentLoading}
          alignItems={'center'}
          justifyContent={'center'}
          width={'100%'}
          height={'100%'}>
          <LoadingIndicator color={Ecolors.mainColor} />
        </Div>
      )}
      <Div
        width={345}
        height={524}
        borderRadius={5}
        backgroundColor={Ecolors.whiteColor}
        // style={EStyle.shadowItem}
        flexDirection={'column'}
        alignItems={'center'}>
        {/* header */}
        <Div
          height={50}
          flexDirection={'row'}
          width={'100%'}
          alignItems={'center'}
          borderBottomWidth={1}
          borderBottomColor={Ecolors.spaceColor}
          justifyContent={'space-between'}>
          <Div widthHeight={50} />
          <Label fontWeight={'700'}>{`digitalsignature.chukycuaban`}</Label>
          <Button
            widthHeight={50}
            alignItems={'center'}
            justifyContent={'center'}
            onPress={() => {
              goBack();
            }}>
            <ImageView
              source={Icons.close}
              widthHeight={20}
              resizeMode={'contain'}
            />
          </Button>
        </Div>
        {/* view drawer */}
        <DrawLine setIsVisible={setIsVisible} ref={drawlineRef} />
        {/* footer */}
        <Div width={288} height={1} backgroundColor={Ecolors.spaceColor} />
        <Label
          marginHorizontal={40}
          marginTop={10}
          marginBottom={15}
          textAlign={'center'}>{`digitalsignature.contentnoti`}</Label>
        <Div
          flexDirection={'row'}
          alignItems={'center'}
          marginBottom={31}
          justifyContent={'space-between'}
          width={'100%'}
          paddingHorizontal={19}>
          <ButtonBorder
            onPress={() => {
              onDelete();
            }}
            width={148}
            height={48}
            type={2}
            title={'digitalsignature.xoa'}
          />
          <ButtonBorder
            loading={loading}
            isDisable={!isVisible}
            onPress={() => {
              onAccept();
            }}
            width={148}
            height={48}
            type={1}
            title={'digitalsignature.xacnhan'}
          />
        </Div>
      </Div>
    </Div>
  );
}

export default React.memo(SignatureDraw);
