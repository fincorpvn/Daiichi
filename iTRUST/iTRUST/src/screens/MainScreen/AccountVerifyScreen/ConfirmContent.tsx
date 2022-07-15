import {Div, HTMLView, Label} from 'components';
import {Ecolors, Efonts} from 'constant';
import React, {useEffect, useState} from 'react';
import RenderHTML from 'react-native-render-html';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {apiMain} from 'services/apis/apiMain';
import {widthScreen} from 'utils';
function ConfirmContent(p: {email?: string}) {
  const [content, setContent] = useState<string>('');
  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const getData = async () => {
    try {
      const r = await apiMain.getConfirmContent();
      if (r.status == 200) {
        setContent(r.data.content);
        console.log('conten', r.data.content);
      }
    } catch (error) {}
  };

  return (
    <Div backgroundColor={Ecolors.bgtime}>
      <Div paddingHorizontal={16} paddingTop={16}>
        <Label>{`accountverify.titleconfirm`}</Label>
        <Label
          marginTop={5}
          color={Ecolors.mainColor}
          fontWeight={'700'}
          multilanguage={false}
          lineHeight={22}
          size={15}>
          <Label
            lineHeight={22}
            size={15}>{`accountverify.contentdiachi1`}</Label>
          {`${p.email || ''}`}
        </Label>
      </Div>
      <HTMLView
        source={{
          html: content,
        }}
      />
    </Div>
  );
}

export default React.memo(ConfirmContent);
