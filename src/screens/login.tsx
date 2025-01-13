import React, {useEffect, useState} from 'react';

import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'twrnc';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import logo from '../assets/images/logo.png';
// import googleLogo from '../assets/images/googleLogo.png';

import API_URL from '../../environmentVariables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useDispatch} from 'react-redux';
import {handleIsAuthenticated} from '../redux/slices/authSlice';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<String | null>(null);

  const handleLogin = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        setLoader(false);
        console.log(response.data);
        const userJson = JSON.stringify(response.data.data.User); // Convert the user object to a JSON string
        await AsyncStorage.setItem('user', userJson);
        await AsyncStorage.setItem('access_token', response.data.data.token);
        await AsyncStorage.setItem('username', response.data.data.User.username);
        dispatch(handleIsAuthenticated({isAuthenticated: true}));
        navigation.navigate('Layout');
      }
    } catch (error) {
      setLoader(false);
      console.error(error);
      Alert.alert('Failed Login', 'Email or Password is incorrect');
    }
  };
  //handle fetch token
  const handleFetchToken = async () => {
    const storedToken = await AsyncStorage.getItem('access_token');
    setToken(storedToken);
  };

  //fetch token when component mounts
  useEffect(() => {
    handleFetchToken();
    if (token) {
      navigation.navigate('Layout');
    }
  });
  return (
    <View style={[tw`w-full h-full bg-white flex `]}>
      <ScrollView
        style={[tw`h-full w-full py-4 px-3`,{flex:1}]}
        showsVerticalScrollIndicator={false}>
        <View style={[tw`w-full flex justify-center items-center`]}>
          <Image source={require('../assets/images/logo.png')} style={[tw`h-[100px] w-[80px]`]} />
          <Text style={[tw`text-lg font-bold`]}>To-Do</Text>
        </View>
        <Text style={[tw`text-center text-3xl font-bold mt-5`]}>
          Welcome Back!
        </Text>
        <Text style={[tw`text-center mt-2 text-lg text-gray-400`]}>
          Use Credentials to access your account
        </Text>

        <View style={[tw`w-full flex mt-6`]}>
          <View
            style={[tw`relative w-full my-2 flex items-center justify-center`]}>
            <TextInput
              style={[
                tw`w-full border-[1px] border-[#D2D2D2] rounded-2xl bg-[rgb(247, 247, 247)] text-[rgba(0,0,0,0.5)] px-4 py-4 text-lg`,
              ]}
              placeholder="Enter your email"
              placeholderTextColor="rgba(0,0,0,0.5)"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <EvilIcons
              name="envelope"
              style={[
                tw` text-[rgba(0,0,0,0.5)] absolute right-[10px] top-[10px]`,
              ]}
              size={40}
            />
          </View>
          <View
            style={[tw`relative w-full mt-4 flex items-center justify-center`]}>
            <TextInput
              style={[
                tw`w-full border-[1px] border-[#D2D2D2] rounded-2xl bg-[rgb(255, 255, 255)]  text-[rgba(0,0,0,0.5)] px-4 py-4 text-lg`,
              ]}
              placeholder="Enter your password"
              placeholderTextColor="rgba(0,0,0,0.5)"
              autoCapitalize="none"
              secureTextEntry={!isPasswordShow}
              value={password}
              onChangeText={setPassword}
            />
            <Ionicons
              onPress={() => setIsPasswordShow(!isPasswordShow)}
              name={isPasswordShow ? 'eye-outline' : 'eye-off-outline'}
              style={[
                tw` text-[rgba(0,0,0,0.5)] absolute right-[14px] top-[10px]`,
              ]}
              size={35}
            />
          </View>
        </View>
        <View style={[tw`w-full flex flex-row justify-end px-0 my-3`]}>
          <Text style={[tw`text-[#7D6CF8] text-lg`]}>Forgot password?</Text>
        </View>

        {loader ? (
          <TouchableOpacity
            style={[
              tw`flex w-full flex justify-center items-center bg-[#7563F7] p-4 rounded-xl shadow-md mt-6`,
            ]}>
            <Text style={[tw`text-white text-center text-xl`]}>
              Logining...
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleLogin()}
            style={[
              tw`flex w-full flex justify-center items-center bg-[#7563F7] p-4 rounded-xl shadow-md mt-6`,
            ]}>
            <Text style={[tw`text-white text-center text-xl`]}>Login</Text>
          </TouchableOpacity>
        )}

        <View
          style={[
            tw`flex flex-row justify-between items-center gap-[10px] my-5`,
          ]}>
          <View style={[tw`w-5/12 h-[2px] bg-gray-300`]}></View>
          <Text>Or</Text>
          <View style={[tw`w-5/12 h-[2px] bg-gray-300`]}></View>
        </View>
        <TouchableOpacity
          style={[
            tw` rounded-xl border border-gray-300 p-3 flex flex-row justify-between items-center`,
          ]}>
          {/* <Image source={require('../assets/images/googleLogo.png')} style={[tw`h-[30px] w-[30px]`]} /> */}
          <View style={[tw`w-11/12`]}>
            <Text style={[tw`text-center text-lg`]}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>
        <View style={[tw`flex flex-row gap-[5px] justify-center mt-10`]}>
          <Text style={[tw`text-lg`]}>Don't have an account ?</Text>
          <Text
            style={[tw`text-lg text-[#7563F7]`]}
            onPress={() => navigation.navigate('Register')}>
            Sign Up
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
