import React, {useState} from 'react';
import Div from './Div';
import HeaderBack from './HeaderBack';
import {heightScreen, widthScreen} from 'utils';
import {Ecolors, Icons} from 'constant';
import Pdf from 'react-native-pdf';
import LoadingIndicator from './LoadingIndicator';
import {useRoute} from '@react-navigation/core';
const url =
  'file://storage/emulated/0/Download/6d6b4753-bc8b-4098-89a7-a6648aa2580a.pdf';
function ViewPDF() {
  const [stateHeight, setStateHeight] = useState<number>(heightScreen);
  const route = useRoute<any>();
  const {data} = route.params.data;
  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack
        onLayout={t => {
          setStateHeight(heightScreen - t.nativeEvent.layout.height);
        }}
        type={2}
        title={`digitalsignature.giaydkgd`}
      />
      <Pdf
        source={{
          uri: `file:/${data}`, // 'https://s3-ap-southeast-1.amazonaws.com/mio-3/pro/temp/2eb7a2cd-5883-441f-bba1-100fa387276a.pdf',
        }}
        style={{
          width: widthScreen,
          height: stateHeight,
        }}
        renderActivityIndicator={progress => {
          return <LoadingIndicator numdot={5} color={Ecolors.mainColor} />;
        }}
      />
    </Div>
  );
}

export default React.memo(ViewPDF);
