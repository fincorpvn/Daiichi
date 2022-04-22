import {Button, Div, ImageView, Label} from 'components';
import {Ecolors, EStyle, Icons} from 'constant';
import React from 'react';
import {navigate} from 'services';

function CardSignature() {
  return (
    <Div
      width={343}
      marginVertical={15}
      paddingVertical={16}
      borderRadius={8}
      borderWidth={1}
      borderColor={Ecolors.grayColor}
      flexDirection={'row'}
      alignItems={'flex-start'}
      justifyContent={'space-between'}
      paddingLeft={20}
      paddingRight={17}
      backgroundColor={Ecolors.whiteColor}
      style={EStyle.shadowItem}>
      <Div
        widthHeight={40}
        alignItems={'center'}
        justifyContent={'center'}
        borderRadius={5}
        borderWidth={1}
        borderColor={Ecolors.grayColor}>
        <ImageView
          source={Icons.fincorplable}
          width={30}
          height={7}
          resizeMode={'contain'}
        />
      </Div>
      <Div
        flex={1}
        paddingHorizontal={10}
        flexDirection={'column'}
        alignItems={'flex-start'}>
        <Label
          size={16}
          color={Ecolors.mainColor}
          fontWeight={'700'}
          multilanguage={false}>
          FINCORP
        </Label>
        <Label
          marginTop={2}
          size={14}
          color={Ecolors.grayColor}
          multilanguage={false}>
          889C053988
        </Label>
        <Button
          onPress={() => {
            navigate('ViewPDF');
          }}>
          <Label marginTop={7} size={14} color={Ecolors.linkColor}>
            {`digitalsignature.xemgiaydkgd`}
          </Label>
        </Button>
      </Div>

      <Div
        flexDirection={'row'}
        paddingTop={12}
        alignItems={'center'}
        justifyContent={'center'}>
        <Label size={14} color={Ecolors.grayColor} multilanguage={false}>
          Chưa ký
        </Label>
        <ImageView
          marginLeft={10}
          widthHeight={17}
          resizeMode={'contain'}
          source={Icons.uncheck}
        />
      </Div>
    </Div>
  );
}

export default React.memo(CardSignature);
