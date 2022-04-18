import {Button, Div, Label} from 'components';
import {Ecolors} from 'constant';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  onCancel: () => void;
  onAccept: () => void;
}

function FooterActionDelete({onCancel, onAccept}: Props) {
  const inset = useSafeAreaInsets();

  return (
    <Div
      width={'100%'}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      paddingHorizontal={50}
      paddingBottom={inset.bottom}>
      <Button paddingVertical={16} onPress={() => onCancel && onCancel()}>
        <Label color={Ecolors.linkColor}>{`notificationscreen.huy`}</Label>
      </Button>
      <Button paddingVertical={16} onPress={() => onAccept && onAccept()}>
        <Label
          color={Ecolors.linkColor}>{`notificationscreen.xoamucdachon`}</Label>
      </Button>
    </Div>
  );
}

export default React.memo(FooterActionDelete);
