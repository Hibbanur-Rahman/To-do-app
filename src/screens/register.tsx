import React, {useEffect, useState} from 'react';

import {
  ActivityIndicator,
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
import Feather from 'react-native-vector-icons/Feather';
// import logo from '../assets/images/logo.png';
// import googleLogo from '../assets/images/googleLogo.png';

import API_URL from '../../environmentVariables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useDispatch} from 'react-redux';
import {handleIsAuthenticated} from '../redux/slices/auth/authSlice';
import axios from 'axios';

const Register = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [token, setToken] = useState<String | null>(null);

  const handleRegister = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username: fullName,
        email: email,
        password: password,
      });
      if (response.status === 201) {
        setLoader(false);
        console.log(response.data);
        setFullName('');
        setEmail('');
        setPassword('');
        // await AsyncStorage.setItem('access_token', response.data.data.token);
        navigation.navigate('Login');
      }
    } catch (error) {
      setLoader(false);
      console.error(error);
      Alert.alert("Failed to register",`${error?.response?.data?.message} || email or username already exist`)
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
      navigation.navigate('Home');
    }
  });
  return (
    <View style={[tw`w-full h-full bg-white flex `]}>
      <ScrollView
        style={[tw`h-full w-full py-4 px-3`]}
        showsVerticalScrollIndicator={false}>
        <View style={[tw`w-full flex justify-center items-center`]}>
          <Image source={require('../assets/images/logo.png')} style={[tw`h-[100px] w-[80px]`]} />
          <Text style={[tw`text-lg font-bold`]}>To-do</Text>
        </View>
        <Text style={[tw`text-center text-3xl font-bold mt-5`]}>
          Create an Account
        </Text>
        <Text style={[tw`text-center mt-2 text-lg text-gray-400`]}>
          Please fill this details to create an account
        </Text>

        <View style={[tw`w-full flex mt-6`]}>
          <View
            style={[tw`relative w-full my-2 flex items-center justify-center`]}>
            <TextInput
              style={[
                tw`w-full border-[1px] border-[#D2D2D2] rounded-2xl bg-[rgb(247, 247, 247)] text-[rgba(0,0,0,0.5)] px-4 py-4 text-lg`,
              ]}
              placeholder="Enter Full name"
              placeholderTextColor="rgba(0,0,0,0.5)"
              autoCapitalize="none"
              value={fullName}
              onChangeText={setFullName}
            />
            <Feather
              name="user"
              style={[
                tw` text-[rgba(0,0,0,0.5)] absolute right-[15px] top-[10px]`,
              ]}
              size={30}
            />
          </View>
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
              placeholder="Enter Password"
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

        {loader ? (
          <TouchableOpacity
            
            style={[
              tw`flex w-full flex justify-center items-center bg-[#7563F7] p-4 rounded-xl shadow-md mt-6`,
            ]}>
              <ActivityIndicator size={30} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleRegister()}
            style={[
              tw`flex w-full flex justify-center items-center bg-[#7563F7] p-4 rounded-xl shadow-md mt-6`,
            ]}>
            <Text style={[tw`text-white text-center text-xl`]}>Sign up</Text>
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
          <Text style={[tw`text-lg`]}>Already have an account ?</Text>
          <Text
            style={[tw`text-lg text-[#7563F7]`]}
            onPress={() => navigation.navigate('Login')}>
            Sign in
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
