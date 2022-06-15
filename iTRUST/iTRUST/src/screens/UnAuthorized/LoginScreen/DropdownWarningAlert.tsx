import {BottomSheetDialog, Button, Div, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React, {useRef} from 'react';
import {heightScreen, Log, widthScreen} from 'utils';

function DropdownWarningAlert() {
  const dropdownref = useRef<any>();

  return (
    <Div>
      <BottomSheetDialog
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: heightScreen,
        }}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        ref={dropdownref}>
        <Button
          flex={1}
          isScale={false}
          alignItems={'center'}
          onPress={() => {
            dropdownref.current.hide();
          }}
          justifyContent={'center'}>
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
      </BottomSheetDialog>
      <Button
        onPress={() => {
          dropdownref.current.show();
        }}
        marginLeft={10}>
        <ImageView
          marginTop={2}
          widthHeight={15}
          resizeMode={'contain'}
          source={Icons.warninglogin}
        />
      </Button>
    </Div>
  );
}

export default React.memo(DropdownWarningAlert);
