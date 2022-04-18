import {Div, ImageView} from 'components';
import {Ecolors, EStyle} from 'constant';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';

interface T {
  width: number;
  height: number;
}

const defaultSize = 153;

const Com = (p: {width?: number; marginTop?: number; height?: number}) => {
  return (
    <Div
      backgroundColor={Ecolors.spaceColor}
      height={p.height || 9}
      width={p.width || 78}
      marginTop={p.marginTop || 7}
    />
  );
};

function DemoSignature() {
  const [stateSizeImage, setStateSizeImage] = useState<T>({
    width: 153,
    height: 153,
  });
  // const uri =
  //   'file:///data/user/0/com.fplatform/cache/rn_image_picker_lib_temp_e502ba08-dcc9-44bc-b899-06bc08ba75aa.jpg';

  // useEffect(() => {
  //   getSizeImage();
  //   return () => {};
  // }, []);

  // const getSizeImage = () => {
  //   Image.getSize(uri, (width: number, height: number) => {
  //     console.log('res', {
  //       width,
  //       height,
  //     });
  //     setStateSizeImage({
  //       width: 153,
  //       height: Math.round((height / width) * defaultSize),
  //     });
  //   });
  // };

  return (
    <Div
      width={343}
      borderRadius={8}
      borderWidth={1}
      borderColor={Ecolors.grayColor}
      backgroundColor={Ecolors.whiteColor}
      paddingHorizontal={15}
      paddingVertical={18}
      style={EStyle.shadowItem}>
      <Div flexDirection={'row'} width={'100%'}>
        <Div flex={1}>
          <Com width={132} />
          <Com />
          <Com />
          <Com />
          <Com marginTop={22} />
          <Com />
          <Com />
          <Com marginTop={24} width={132} />
          <Com />
          <Com marginTop={19} width={132} />
          <Com />
        </Div>
        <Div flex={1}>
          <Com marginTop={17} />
          <Com />
          <Com />
          <Com marginTop={40} />
          <Com />
          <Com />
          <Com marginTop={19} width={132} />
        </Div>
      </Div>
      <Com marginTop={50} width={293} />
      <Com marginTop={8} width={293} />
      <Com marginTop={8} width={293} />
      <Div flexDirection={'row'} marginTop={20} width={'100%'}>
        <Div flex={1}>
          <Com marginTop={27} width={132} />
          <Com />
          {/* <Com marginTop={27} width={132} />
          <Com />
          <Com marginTop={27} width={132} />
          <Com /> */}
        </Div>
        <Div flex={1}>
          {/* <ImageView
            width={stateSizeImage.width}
            height={stateSizeImage.height}
            resizeMode={'cover'}
            source={{
              uri: uri,
            }}
          /> */}
        </Div>
      </Div>
      <Div flexDirection={'row'} marginTop={20} width={'100%'}>
        <Div flex={1}>
          <Com />
          <Com />
          <Com />
        </Div>
        <Div flex={1}>
          <Com height={48} width={153} />
        </Div>
      </Div>
    </Div>
  );
}

export default React.memo(DemoSignature);
