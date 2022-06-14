import React, {useEffect, useImperativeHandle, useState} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, ViewStyle} from 'react-native';
import {Ecolors} from 'constant';
function BottomSheetDialog(
  p: {children: any; style?: ViewStyle; animationOut?: any; animationIn?: any},
  ref,
) {
  useImperativeHandle(ref, () => ({
    show: () => {
      setStateModal(true);
    },
    hide: () => {
      return new Promise(async (rs, rj) => {
        await setStateModal(false);
        rs(true);
      });
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
        backdropOpacity={0.2}
        backdropColor={Ecolors.black}
        animationIn={p.animationIn || 'slideInUp'}
        animationInTiming={200}
        animationOut={p.animationOut || 'slideOutDown'}
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
