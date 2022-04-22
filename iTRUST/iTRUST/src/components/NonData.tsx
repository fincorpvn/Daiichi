import {Icons} from 'constant';
import React from 'react';
import Div from './Div';
import ImageView from './ImageView';
import Label from './Label';

function NonData(p: {
  paddingTop?: number;
  content?: string;
  loading?: boolean;
}) {
  if (p.loading) {
    return <></>;
  }
  return (
    <Div
      paddingTop={p.paddingTop || 180}
      alignItems={'center'}
      justifyContent={'center'}>
      <ImageView
        source={Icons.nonassets}
        width={161}
        height={130}
        resizeMode={'contain'}
      />
      {p.content ? (
        <Label marginTop={28}>{p.content}</Label>
      ) : (
        <>
          <>
            <Label
              size={24}
              marginTop={28}
              fontWeight={'700'}>{`overviewscreen.banchuacotaisan`}</Label>
            <Label
              marginTop={9}
              size={14}
              textAlign={'center'}
              marginHorizontal={30}>{`overviewscreen.contentnondata`}</Label>
          </>
        </>
      )}
    </Div>
  );
}

export default React.memo(NonData);
