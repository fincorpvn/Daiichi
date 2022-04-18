import {Button, Div, Label} from 'components';
import React, {useEffect, useRef, useState} from 'react';
import {widthScale, widthScreen} from 'utils';
import {Ecolors} from 'constant';
import ViewPager from '@react-native-community/viewpager';
import {FlatList, StyleSheet} from 'react-native';

interface IData {
  component: (a?: any) => any;
  title: string;
  key: string;
}

function Tabbar(p: {
  activeTab: number;
  multilanguage?: boolean;
  data: Array<IData>;
  goToPage?: (e: number) => void;
}) {
  const flatlistRef = useRef<any>(null);
  const size =
    p.data?.length <= 3 ? widthScreen / p.data.length : widthScreen / 3;

  useEffect(() => {
    gotoActiveHeader(p.activeTab);
    return () => {};
  }, [p.activeTab]);

  const gotoActiveHeader = (index: number) => {
    if (flatlistRef.current) {
      flatlistRef.current.scrollToOffset({
        offset: (index > 0 ? index - 1 : index) * size,
        animated: true,
      });
    }
  };

  const renderItem = (t: {item: IData; index: number}) => {
    const {item, index} = t;
    const isFocus = p.activeTab == index;
    return (
      <Button
        onPress={() => {
          p.goToPage && p.goToPage(index);
        }}
        height={50}
        borderBottomWidth={2}
        borderBottomColor={isFocus ? Ecolors.mainColor : Ecolors.grayColor}
        style={{
          width: size,
        }}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'row'}
        key={item.title}>
        <Label
          textAlign={'center'}
          multilanguage={p.multilanguage}
          size={16}
          fontWeight={'700'}
          color={isFocus ? Ecolors.mainColor : Ecolors.grayColor}>
          {item.title}
        </Label>
      </Button>
    );
  };

  return (
    <Div backgroundColor={Ecolors.white}>
      <FlatList
        ref={flatlistRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: IData, index: number) => `key${item.key}`}
        data={p.data}
        extraData={p.data}
        renderItem={renderItem}
        getItemLayout={(data, index) => ({
          length: index * size,
          offset: index,
          index: index,
        })}
      />
    </Div>
  );
}

function TabViewComp(Props: {
  data: Array<IData>;
  initPage?: number;
  multilanguage?: boolean;
}) {
  const TabViewRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState(Props.initPage || 0);

  const onPageSelected = (e: any) => {
    setActiveTab(e.nativeEvent.position);
  };

  const goToPage = (index: number) => {
    if (TabViewRef.current) {
      TabViewRef.current?.setPage(index);
    }
  };

  return (
    <>
      <Tabbar
        activeTab={activeTab}
        multilanguage={Props.multilanguage}
        data={Props.data}
        goToPage={goToPage}
      />
      <ViewPager
        scrollEnabled={false}
        onPageSelected={e => onPageSelected(e)}
        ref={TabViewRef}
        style={styles.viewPager}>
        {Props.data.map((item: IData, index: number) => {
          return (
            <Div key={item.title}>
              {item.component({
                activeTab,
              })}
            </Div>
          );
        })}
      </ViewPager>
    </>
  );
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
});

export default React.memo(TabViewComp);
