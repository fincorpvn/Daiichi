import {Button, Div, Label, Toast} from 'components';
import {Ecolors} from 'constant';
import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {heightScale, widthScreen} from 'utils';

interface IParams {}

function ToastRoot(p: IParams, ref) {
  const [isShow, setIsShow] = useState(false);
  const [content, setContent] = useState('');
  const [multilanguage, setMultiLanguage] = useState(false);
  const timeoutRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    show: (a: any) => {
      show(a);
    },
    hide: () => {
      hide();
    },
  }));

  const show = async (a?: any) => {
    if (isShow) {
      return;
    }
    setIsShow(true);
    if (a?.content) {
      setContent(a.content);
    }
    if (a?.multilanguage) {
      setMultiLanguage(a.multilanguage);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      hide();
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const hide = () => {
    setIsShow(false);
  };

  if (!isShow) return <></>;
  return (
    <Div
      position={'absolute'}
      zIndex={9999999}
      elevation={9999999}
      style={{
        width: widthScreen,
        left: 1,
        right: 1,
      }}
      left={1}
      right={1}
      alignItems={'center'}
      justifyContent={'center'}
      bottom={heightScale(70)}>
      <Div
        maxWidth={'90%'}
        paddingHorizontal={25}
        paddingVertical={10}
        backgroundColor={'rgba(0,0,0,0.8)'}
        borderRadius={8}
        alignItems={'center'}
        justifyContent={'center'}>
        <Label
          textAlign={'center'}
          fontWeight="400"
          color={Ecolors.whiteColor}
          multilanguage={multilanguage}>
          {content || ''}
        </Label>
      </Div>
    </Div>
  );
}

export default React.forwardRef(ToastRoot);
