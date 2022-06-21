import {
  Alert,
  BottomSheetDialog,
  Button,
  Div,
  ImageView,
  Label,
} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useCallback, useRef} from 'react';
import {goBack} from 'services';
import {heightScreen, Log, widthScreen} from 'utils';

function DropdownWarningAlert() {
  const showCombo = useCallback(() => {
    Alert.showComponent({
      component: () => {
        return (
          <Button
            onPress={() => {
              goBack();
            }}
            isScale={false}
            style={{
              width: widthScreen,
              height: heightScreen,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Div
              marginHorizontal={40}
              borderRadius={5}
              paddingHorizontal={20}
              paddingVertical={15}
              backgroundColor={Ecolors.whiteColor}
              alignItems={'center'}
              justifyContent={'center'}>
              <Label size={14}>{`loginscreen.warning`}</Label>
            </Div>
          </Button>
        );
      },
    });
  }, []);
  return (
    <>
      <Div>
        <Button onPress={showCombo} marginLeft={10}>
          <ImageView
            marginTop={2}
            widthHeight={15}
            resizeMode={'contain'}
            source={Icons.warninglogin}
          />
        </Button>
      </Div>
    </>
  );
}

export default React.memo(DropdownWarningAlert);
