import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
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
import MaterialIcons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useEffect, useState} from 'react';
import ArrowLeftSvg from '../components/arrowLeftSvg';
import Icon from 'react-native-vector-icons/Octicons';
import IconIntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome6';
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
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/backgound-img.png')}
        style={styles.backgroundImg}
        resizeMode="cover">
        <ScrollView style={{padding: 15}} showsVerticalScrollIndicator={false}>
          {/**============ navbar ============= */}
          <View style={styles.navbar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeftSvg />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'LexendDeca-Bold',
                color: '#000',
                fontSize: 20,
              }}>
              Profile
            </Text>
            <MaterialIcons name="bell-fill" size={20} color="#000" />
          </View>

          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Image
              source={require('../assets/images/profile-img.png')}
              style={styles.profileImg}
            />
            <Text style={[styles.headText, {marginTop: 15, marginBottom: 5}]}>
              {user?.username}
            </Text>
            <Text style={[styles.paraText, {}]}>{user?.email}</Text>
          </View>
          <View
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              ,
              {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 40,
                borderTopWidth: 0.5,
                paddingVertical: 10,
                borderBottomWidth: 0.5,
                borderColor: '#BEBEC3',
              },
            ]}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                width: 'auto',
              }}>
              <View
                style={{
                  backgroundColor: '#f6f7f7',
                  padding: 8,
                  borderRadius: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IconFontAwesome name="headset" size={25} color="#000" />
              </View>
              <Text style={[styles.headText, {fontSize: 16, marginStart: 10}]}>
                Help Center
              </Text>
            </View>
            <IconFontAwesome name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              ,
              {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                borderTopWidth: 0.5,
                paddingVertical: 10,
                borderBottomWidth: 0.5,
                borderColor: '#BEBEC3',
              },
            ]}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                width: 'auto',
              }}>
              <View
                style={{
                  backgroundColor: '#f6f7f7',
                  padding: 8,
                  borderRadius: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IconFontAwesome name="star" size={25} color="#000" />
              </View>
              <Text style={[styles.headText, {fontSize: 16, marginStart: 10}]}>
                Rate the App
              </Text>
            </View>
            <IconFontAwesome name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              ,
              {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                borderTopWidth: 0.5,
                paddingVertical: 10,
                borderBottomWidth: 0.5,
                borderColor: '#BEBEC3',
              },
            ]}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                width: 'auto',
              }}>
              <View
                style={{
                  backgroundColor: '#f6f7f7',
                  padding: 8,
                  borderRadius: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IconFontAwesome name="eye" size={25} color="#000" />
              </View>
              <Text style={[styles.headText, {fontSize: 16, marginStart: 10}]}>
                Privacy Policy
              </Text>
            </View>
            <IconFontAwesome name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            style={[
              ,
              {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                borderTopWidth: 0.5,
                paddingVertical: 10,
                borderBottomWidth: 0.5,
                borderColor: '#BEBEC3',
              },
            ]}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                width: 'auto',
              }}>
              <View
                style={{
                  backgroundColor: '#f6f7f7',
                  padding: 8,
                  borderRadius: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IconFontAwesome
                  name="arrow-right-from-bracket"
                  size={25}
                  color="#ff7f74"
                />
              </View>
              <Text
                style={[
                  styles.headText,
                  {fontSize: 16, marginStart: 10, color: '#ff7f74'},
                ]}>
                Log Out
              </Text>
            </View>
            <IconFontAwesome name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
        </ScrollView>
       
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImg: {
    flex: 1,
  },
  navbar: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#000',
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 30, height: 40}, // iOS shadow
    shadowOpacity: 1, // iOS shadow
    shadowRadius: 10, // iOS shadow
  },
  headText: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'LexendDeca-Medium',
    textAlign: 'center',
  },
  paraText: {
    fontSize: 13,
    fontFamily: 'LexendDeca-Regular',
    textAlign: 'center',
    width: '100%',
    color: '#726e80',
  },
  editProfileButton: {
    backgroundColor: '#5F33E1',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 20,
  },
  editProfileButtonText: {
    color: '#FFF',
    fontSize: 19,
    fontFamily: 'LexendDeca-SemiBold',
    width: '100%',
    textAlign: 'center',
  },
});

export default Profile;
