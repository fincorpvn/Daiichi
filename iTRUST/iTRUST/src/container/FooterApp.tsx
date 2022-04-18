import React from 'react';
import {Button, Div, ImageView, Label} from 'components';
import {Ecolors, Icons} from 'constant';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {navigate} from 'services';
import {widthScreen} from 'utils';

interface IPropsFooterApp {
  state: {
    routes: Array<any>;
    index: number;
  };
}

interface IPropsItemButotn {
  isFocus: boolean;
  index: number;
  title: string;
  icon: any;
  onPress: () => void;
}

function ItemButton(props: IPropsItemButotn) {
  return (
    <Button
      onPress={() => {
        if (props.isFocus) {
          return;
        }
        props.onPress && props.onPress();
      }}
      // flex={1}
      style={{
        width: widthScreen / 5,
      }}
      alignItems={'center'}
      justifyContent={'center'}>
      <ImageView
        heightWidth={22}
        tintColor={props.isFocus ? Ecolors.mainColor : Ecolors.grayColor}
        source={props.icon}
        resizeMode={'contain'}
      />
      <Label
        marginTop={3}
        marginBottom={4}
        size={12}
        color={props.isFocus ? Ecolors.mainColor : Ecolors.grayColor}>
        {props.title}
      </Label>
    </Button>
  );
}

function FooterApp(props: IPropsFooterApp) {
  const insest = useSafeAreaInsets();

  const ObjectAction: any = {
    0: {
      title: `footerapp.OverviewScreen`,
      icon: Icons.overview,
      onPress: () => {
        navigate('OverviewScreen', {}, true);
      },
    },
    1: {
      title: `footerapp.TransactionScreen`,
      icon: Icons.transaction,
      onPress: () => {
        navigate('TransactionScreen', {}, true);
      },
    },
    2: {
      title: `footerapp.InvestmentScreen`,
      icon: Icons.investment,
      onPress: () => {
        navigate('InvestmentScreen', {}, true);
      },
    },
    3: {
      title: `footerapp.AssetScreen`,
      icon: Icons.asset,
      onPress: () => {
        navigate('AssetScreen', {}, true);
      },
    },
    4: {
      title: `footerapp.ProfileScreen`,
      icon: Icons.profile,
      onPress: () => {
        navigate('ProfileScreen', {}, true);
      },
    },
  };
  return (
    <Div
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-evenly'}
      backgroundColor={Ecolors.whiteColor}
      borderTopColor={Ecolors.grayColor}
      borderTopWidth={0.5}
      style={{
        paddingBottom: insest.bottom,
      }}
      paddingTop={10}>
      {props.state.routes?.map((item: any, index: number) => {
        return (
          <ItemButton
            key={index}
            onPress={() => ObjectAction[index].onPress()}
            isFocus={index == props.state.index}
            index={index}
            title={ObjectAction[index].title}
            icon={ObjectAction[index].icon}
          />
        );
      })}
    </Div>
  );
}

export default React.memo(FooterApp);
