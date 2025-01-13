import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome6';

import tw from 'twrnc';
import Home from './home';
import Profile from './profile';
import AddTask from './addTask';

const Tab = createBottomTabNavigator();

const RenderTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={[tw`w-full flex flex-row justify-center pb-1 bg-white border border-gray-100`]}>
      <View
        style={[
          tw`flex flex-row justify-between items-center w-11/12 p-2 py-4 bg-white `,
        ]}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[tw`flex-1 items-center justify-center`]}>
              {renderIcon(route.name, isFocused)}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const renderIcon = (routeName, isFocused) => {
  let iconName;

  switch (routeName) {
    case 'Home':
      return (
        <SimpleLineIcon
          name="home"
          size={25}
          color={isFocused ? '#5F48E6' : '#222'}
        />
      );

      break;
    case 'Profile':
      return (
        <SimpleLineIcon
          name="user"
          size={25}
          color={isFocused ? '#5F48E6' : '#222'}
        />
      );

      break;
    case 'AddTask':
      return (
        <View
          style={[
            tw` relative mt-[-50px] bg-[#5f33e1] rounded-full h-[50px] w-[50px] flex items-center justify-center shadow-2xl`,
          ]}>
          <IconFontAwesome name="plus" size={25} color="#fff" />
        </View>
      );

      break;

    default:
      iconName = 'question';
      break;
  }

  return (
    <SimpleLineIcon
      name={iconName}
      size={25}
      color={isFocused ? '#5F48E6' : '#222'}
    />
  );
};

const Layout = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <RenderTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="AddTask" component={AddTask} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Layout;
