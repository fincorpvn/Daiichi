import React, {useImperativeHandle, useState} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, ViewStyle} from 'react-native';
import {Ecolors} from 'constant';
function BottomSheetDialog(p: {children: any; style?: ViewStyle}, ref) {
  useImperativeHandle(ref, () => ({
    show: () => {
      setStateModal(true);
    },
    hide: () => {
      setStateModal(false);
    },
  }));
  const [stateModal, setStateModal] = useState<boolean>(false);

  return (
    <>
      <Modal
        useNativeDriver={true}
        useNativeDriverForBackdrop={true}
        isVisible={stateModal}
        style={[s.modalcontaier, (p.style && p.style) || {}]}
        backdropOpacity={1}
        backdropColor={Ecolors.transparentLoading}
        animationIn={'slideInUp'}
        animationInTiming={200}
        animationOut={'slideOutDown'}
        animationOutTiming={200}
        onBackdropPress={() => {
          setStateModal(false);
        }}>
        {p.children && p.children}
      </Modal>
    </>
  );
}

const s = StyleSheet.create({
  modalcontaier: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
});

export default React.forwardRef(BottomSheetDialog);
