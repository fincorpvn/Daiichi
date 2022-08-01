import {Button, Div, Label} from 'components';
import {Ecolors} from 'constant';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function ComActionUpload(p: {
  onCamera: () => void;
  onGallery: () => void;
  onCancel: () => void;
  isDrawline?: boolean;
  onDrawline?: () => void;
}) {
  const insest = useSafeAreaInsets();
  return (
    <Div>
      {p.isDrawline && (
        <Div
          borderRadius={8}
          flexDirection={'column'}
          marginBottom={14}
          alignItems={'center'}
          backgroundColor={Ecolors.whiteColor}>
          <Button
            onPress={() => {
              p.onDrawline && p.onDrawline();
            }}
            width={345}
            height={48}
            alignItems={'center'}
            justifyContent={'center'}>
            <Label
              color={Ecolors.linkColor}>{`digitalsignature.kydientu`}</Label>
          </Button>
        </Div>
      )}
      <Div
        borderRadius={8}
        flexDirection={'column'}
        marginBottom={14}
        alignItems={'center'}
        backgroundColor={Ecolors.whiteColor}>
        {!p.isDrawline && (
          <Label
            marginVertical={8}
            size={14}
            color={Ecolors.gray}>{`digitalsignature.chonhinhanh`}</Label>
        )}
        <Button
          onPress={() => {
            p.onCamera && p.onCamera();
          }}
          width={345}
          height={48}
          alignItems={'center'}
          justifyContent={'center'}>
          <Label color={Ecolors.linkColor}>{`digitalsignature.mayanh`}</Label>
        </Button>
        <Button
          onPress={() => {
            p.onGallery && p.onGallery();
          }}
          width={345}
          height={48}
          alignItems={'center'}
          justifyContent={'center'}>
          <Label color={Ecolors.linkColor}>{`digitalsignature.thuvien`}</Label>
        </Button>
      </Div>

      <Button
        onPress={() => {
          p.onCancel && p.onCancel();
        }}
        marginBottom={insest.bottom + 30}
        width={345}
        height={48}
        borderRadius={8}
        backgroundColor={Ecolors.whiteColor}
        alignItems={'center'}
        justifyContent={'center'}>
        <Label color={Ecolors.linkColor}>{`digitalsignature.huy`}</Label>
      </Button>
    </Div>
  );
}

export default React.memo(ComActionUpload);
