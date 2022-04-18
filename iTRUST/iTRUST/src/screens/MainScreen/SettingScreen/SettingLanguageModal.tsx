import {Button, Div, HeaderBack, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React from 'react';
import {useDispatch} from 'react-redux';
import {changeLanguage} from 'reducer/languages';
import {useAppDispatch, useAppSelector} from 'store/hooks';

const BT = (p: {
  onPress: () => void;
  title: string;
  image: any;
  isCheck?: boolean;
}) => {
  return (
    <Button
      height={53}
      paddingHorizontal={20}
      width={'100%'}
      onPress={() => p.onPress()}
      flexDirection={'row'}
      borderBottomWidth={1}
      borderBottomColor={Ecolors.spaceColor}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <Div flexDirection={'row'} alignItems={'center'}>
        <ImageView
          marginRight={16}
          source={p.image}
          widthHeight={20}
          resizeMode={'contain'}
        />
        <Label multilanguage={false}> {p.title}</Label>
      </Div>
      {p.isCheck && <ImageView widthHeight={20} source={Icons.checklanguage} />}
    </Button>
  );
};

function SettingLanguageModal() {
  const I18nState = useAppSelector(state => state.languages.I18nState);
  const dispatch = useDispatch();
  const doChangeLanguage = (t: 'vi' | 'en') => {
    dispatch(
      changeLanguage(
        t == 'vi'
          ? {
              code: 'vi',
              name: 'Vie',
              icons: Icons.vietnam,
            }
          : {
              code: 'en',
              name: 'Eng',
              icons: Icons.english,
            },
      ),
    );
  };
  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack type={2} title={'settingscreen.ngonngu'} />
      <BT
        image={Icons.vietnam}
        title={'Vietnamese'}
        onPress={() => {
          doChangeLanguage('vi');
        }}
        isCheck={I18nState == 'vi'}
      />
      <BT
        image={Icons.english}
        title={'English'}
        onPress={() => {
          doChangeLanguage('en');
        }}
        isCheck={I18nState == 'en'}
      />
    </Div>
  );
}

export default SettingLanguageModal;
