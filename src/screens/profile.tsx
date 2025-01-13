import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useDispatch} from 'react-redux';
import {handleIsAuthenticated} from '../redux/slices/authSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useEffect, useState} from 'react';

interface User {
  username: string;
  email: string;
  [key: string]: any; // For additional fields
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      dispatch(handleIsAuthenticated({isAuthenticated: false}));
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView style={tw`bg-[#fff] h-full w-full`}>
      <ScrollView
        style={tw`w-full h-full bg-white`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={tw`bg-[#7563F7] px-4 py-3`}>
          <View style={tw`w-full flex-row justify-between items-center`}>
            <AntDesign
              name="arrowleft"
              size={30}
              color={'#fff'}
              onPress={() => navigation.goBack()} // Navigate back
            />
            <Text
              style={tw`text-center w-11/12 text-lg font-semibold text-white`}>
              PROFILES
            </Text>
          </View>
          <View
            style={tw`flex flex-row items-center  mt-4 w-full relative py-6`}>
            <View style={tw`border border-white p-1 rounded-full`}>
              {/* <Image
                source={require('../assets/images/profile.png')}
                style={tw`h-[80px] w-[80px] rounded-full border-[3px] border-white`}
              /> */}
            </View>
            <View style={tw`ml-4`}>
              <Text style={tw`text-white text-xl font-bold`}>
                {user?.username || 'Guest User'}
              </Text>
              <Text style={tw`text-white text-sm`}>
                {user?.email || 'No email provided'}
              </Text>
            </View>
            <TouchableOpacity
              style={[tw`right-0 absolute`]}
              onPress={() => navigation.navigate('EditProfile')}>
              <FontAwesome name="edit" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[tw`px-3`]}>
          <TouchableOpacity
            style={[
              tw`flex flex-row border border-l-0 border-r-0 border-t-0 border-gray-300 p-3 items-center gap-[10px]`,
            ]}>
            <View style={[tw`w-[40px] flex-row justify-center items-center`]}>
              <Feather name="box" size={30} style={[tw`text-gray-700`]} />
            </View>
            <Text style={[tw`text-lg text-gray-700`]}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex flex-row border border-l-0 border-r-0 border-t-0 border-gray-300 p-3 items-center gap-[10px]`,
            ]}>
            <View style={[tw`w-[40px] flex-row justify-center items-center`]}>
              <Octicons
                name="checklist"
                size={30}
                style={[tw`text-gray-700`]}
              />
            </View>
            <Text style={[tw`text-lg text-gray-700`]}>My Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex flex-row border border-l-0 border-r-0 border-t-0 border-gray-300 p-3 items-center gap-[10px]`,
            ]}>
            <View style={[tw`w-[40px] flex-row justify-center items-center`]}>
              <Foundation
                name="clipboard-notes"
                size={30}
                style={[tw`text-gray-700`]}
              />
            </View>
            <Text style={[tw`text-lg text-gray-700`]}>My Prescription</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex flex-row border border-l-0 border-r-0 border-t-0 border-gray-300 p-3 items-center gap-[10px]`,
            ]}>
            <View style={[tw`w-[40px] flex-row justify-center items-center`]}>
              <AntDesign name="home" size={30} style={[tw`text-gray-700`]} />
            </View>
            <Text style={[tw`text-lg text-gray-700`]}>Addresses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex flex-row border border-l-0 border-r-0 border-t-0 border-gray-300 p-3 items-center gap-[10px]`,
            ]}>
            <View style={[tw`w-[40px] flex-row justify-center items-center`]}>
              <Octicons
                name="credit-card"
                size={30}
                style={[tw`text-gray-700`]}
              />
            </View>
            <Text style={[tw`text-lg text-gray-700`]}>Subscription</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex flex-row border border-l-0 border-r-0 border-t-0 border-gray-300 p-3 items-center gap-[10px]`,
            ]}>
            <View style={[tw`w-[40px] flex-row justify-center items-center`]}>
              <MaterialCommunityIcons
                name="account-multiple-plus-outline"
                size={30}
                style={[tw`text-gray-700`]}
              />
            </View>
            <Text style={[tw`text-lg text-gray-700`]}>Invite Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex flex-row border border-l-0 border-r-0 border-t-0 border-gray-300 p-3 items-center gap-[10px]`,
            ]}
            onPress={() => navigation.navigate('TermsAndCondition')}>
            <View style={[tw`w-[40px] flex-row justify-center items-center`]}>
              <MaterialIcons
                name="security"
                size={30}
                style={[tw`text-gray-700`]}
              />
            </View>
            <Text style={[tw`text-lg text-gray-700`]}>Terms Of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex flex-row border border-l-0 border-r-0 border-t-0 border-gray-300 p-3 items-center gap-[10px]`,
            ]}
            onPress={() => navigation.navigate('PrivacyPolicy')}>
            <View style={[tw`w-[40px] flex-row justify-center items-center`]}>
              <MaterialCommunityIcons
                name="shield-account-variant-outline"
                size={30}
                style={[tw`text-gray-700`]}
              />
            </View>
            <Text style={[tw`text-lg text-gray-700`]}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex flex-row border border-l-0 border-r-0 border-t-0 border-gray-300 p-3 items-center gap-[10px]`,
            ]}>
            <View style={[tw`w-[40px] flex-row justify-center items-center`]}>
              <FontAwesome
                name="support"
                size={30}
                style={[tw`text-gray-700`]}
              />
            </View>
            <Text style={[tw`text-lg text-gray-700`]}>
              Frequently Asked Questions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex flex-row border border-l-0 border-r-0 border-t-0 border-gray-300 p-3 items-center gap-[10px]`,
            ]}>
            <View style={[tw`w-[40px] flex-row justify-center items-center`]}>
              <Entypo name="globe" size={30} style={[tw`text-gray-700`]} />
            </View>
            <Text style={[tw`text-lg text-gray-700`]}>Language</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`flex flex-row  border-gray-300 p-3 items-center gap-[10px]`,
            ]}
            onPress={handleLogout}>
            <View style={[tw`w-[40px] flex-row justify-center items-center`]}>
              <MaterialIcons
                name="logout"
                size={30}
                style={[tw`text-gray-700`]}
              />
            </View>
            <Text style={[tw`text-lg text-gray-700`]}>Logout</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          onPress={handleLogout}
          style={tw`w-full py-4 mt-6 rounded-xl bg-[#FF3951] flex justify-center items-center`}>
          <Text style={tw`text-white text-xl`}>Logout</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
