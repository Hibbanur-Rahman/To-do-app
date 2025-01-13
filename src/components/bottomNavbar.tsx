import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome6';
import OctIcons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

const BottomNavbar = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [token, setToken] = useState<string | null>(null);

  //handle fetch token
  const handleFetchToken = async () => {
    const storedToken = await AsyncStorage.getItem('access_token');
    setToken(storedToken);
  };

  //fetch token when component mounts
  useEffect(() => {
    handleFetchToken();
  }, []);

  //fetch token when component mounts
  useEffect(() => {
    handleFetchToken();
    console.log("is authenticated in navbar:",isAuthenticated)
  }, [isAuthenticated]);

  
  //if no token, hide the navbar
  if (!token) {
    return null;
  }
  return (
    <SafeAreaView style={[tw`w-full  items-center`]}>
      <View
        style={tw`w-11/12 flex flex-row justify-between bg-black rounded-2xl py-4 px-8 my-2`}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <OctIcons name="home" size={30} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <EvilIcons name="location" size={30} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Trip')}>
          <EvilIcons name="heart" size={30} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <FeatherIcons name="user" size={30} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BottomNavbar;
