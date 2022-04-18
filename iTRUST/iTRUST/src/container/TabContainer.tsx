import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {mainTab} from 'screens';
import {translateXOptionsScreen} from './optionsNavigate';
import FooterApp from './FooterApp';

const Tab = createBottomTabNavigator();

function TabContainer() {
  return (
    <Tab.Navigator
      lazy={false}
      initialRouteName={'OverviewScreen'}
      screenOptions={translateXOptionsScreen}
      tabBar={props => <FooterApp {...props} />}>
      {mainTab.map((item, _) => {
        return (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
          />
        );
      })}
    </Tab.Navigator>
  );
}

export default React.memo(TabContainer);
