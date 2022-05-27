import {Button, Div, Label} from 'components';
import {Ecolors} from 'constant';
import React from 'react';

function Btn(p: {
  value: number;
  onPress: (e: number) => void;
  keycheck: number;
  title: string;
}) {
  const isFocus = p.keycheck == p.value;
  return (
    <Button
      width={162}
      height={48}
      borderRadius={5}
      borderColor={Ecolors.grayColor}
      borderWidth={0.7}
      flexDirection={'row'}
      alignItems={'center'}
      paddingLeft={20}
      onPress={() => p.onPress && p.onPress(p.keycheck)}>
      <Div
        alignItems={'center'}
        justifyContent={'center'}
        widthHeight={20}
        borderRadius={20}
        borderWidth={1}
        borderColor={isFocus ? Ecolors.mainColor : Ecolors.mainColor}>
        <Div
          widthHeight={12}
          borderRadius={12}
          backgroundColor={isFocus ? Ecolors.mainColor : Ecolors.transparent}
        />
      </Div>
      <Label marginLeft={12}>{p.title}</Label>
    </Button>
  );
}

function GenderCheckbox(Props: {value: number; onChange: (a: number) => void}) {
  return (
    <Div
      flexDirection={'row'}
      marginTop={13}
      paddingHorizontal={16}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <Btn
        title={`accountverify.nam`}
        keycheck={1}
        onPress={a => Props.onChange && Props.onChange(a)}
        value={Props.value}
      />
      <Btn
        title={`accountverify.nu`}
        keycheck={2}
        onPress={a => Props.onChange && Props.onChange(a)}
        value={Props.value}
      />
    </Div>
  );
}

export default React.memo(GenderCheckbox);
