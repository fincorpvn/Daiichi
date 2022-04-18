import {Div, HeaderBack, Label, NonData} from 'components';
import {Ecolors} from 'constant';
import React, {useEffect} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {getAsset, loadAsset} from 'reducer/asset';
import {useAppSelector} from 'store/hooks';
import {convertNumber} from 'utils';
import PercentAsset from './PercentAsset';
import ProgramList from './ProgramList';

function AssetScreen() {
  const dispatch = useDispatch();
  const asset = useAppSelector(state => getAsset(state));
  const loadingAsset = useAppSelector(state => state.asset.loading);

  useEffect(() => {
    dispatch(loadAsset({}));
    return () => {};
  }, []);

  const onRefresh = () => {
    dispatch(loadAsset({}));
  };

  return (
    <Div height={'100%'} backgroundColor={Ecolors.whiteColor}>
      <HeaderBack type={3} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
            tintColor={Ecolors.mainColor}
          />
        }>
        {!loadingAsset && !asset.productList?.length ? (
          <NonData />
        ) : (
          <>
            <Div width={'100%'} alignItems={'center'} justifyContent={'center'}>
              <Label
                size={14}
                marginTop={14}>{`assetscreen.tongquantaisan`}</Label>
              <Label
                size={28}
                marginTop={2}
                fontWeight={'700'}
                color={Ecolors.mainColor}
                multilanguage={false}>
                {convertNumber(
                  `${asset?.sumOfValueCurrently || ''}`?.split('.')?.[0] ?? '',
                ) || ''}
              </Label>
            </Div>
            <PercentAsset />
            <ProgramList />
            <Div height={100} />
          </>
        )}
      </ScrollView>
    </Div>
  );
}

export default React.memo(AssetScreen);
