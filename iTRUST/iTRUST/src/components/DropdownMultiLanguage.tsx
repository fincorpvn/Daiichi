import {Button, Div, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import React from 'react';
import {changeLanguage} from 'reducer/languages/reducer';
import {useAppDispatch, useAppSelector} from 'store/hooks';

function DropdownMultiLanguage(P: {}) {
  const activeLanguage = useAppSelector(
    state => state.languages.activeLanguage,
  );
  const dispatch = useAppDispatch();

  const doChangeLanguage = () => {
    dispatch(
      changeLanguage(
        activeLanguage.code == 'vi'
          ? {
              code: 'en',
              name: 'Eng',
              icons: Icons.english,
            }
          : {
              code: 'vi',
              name: 'Vie',
              icons: Icons.vietnam,
            },
      ),
    );
  };

  return (
    <Button
      onPress={() => doChangeLanguage()}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      paddingLeft={4}
      maxWidth={63}
      minWidth={55}
      borderRadius={30}
      paddingVertical={5}
      backgroundColor={Ecolors.redColor}>
      <ImageView
        source={activeLanguage.icons || Icons.vietnam}
        height={22}
        width={22}
        resizeMode={'contain'}
      />
      <Label
        marginLeft={4}
        marginBottom={3}
        marginRight={4}
        size={14}
        color={Ecolors.whiteColor}
        multilanguage={false}>
        {activeLanguage.name}
      </Label>
    </Button>
  );
}

export default React.memo(DropdownMultiLanguage);
