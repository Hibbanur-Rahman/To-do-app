import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Animated,
  ImageBackground,
} from 'react-native';
import tw from 'twrnc';
// import ProfileImg from '../assets/images/profile.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Octicons';
import IconIntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome6';
import CircularProgress from '../components/circularProgress';

const Home = () => {
  const [username, setUsername] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('username');
        if (storedName) {
          setUsername(storedName);
        } else {
          setUsername('Guest'); // Default value if no username is found
        }
      } catch (error) {
        console.error('Error retrieving username:', error);
      }
    };

    fetchName();
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/backgound-img.png')}
        style={styles.backgroundImg}
        resizeMode="cover">
        <ScrollView style={{padding: 0}} showsVerticalScrollIndicator={false}>
          {/** =============== top navbar ============== */}
          <View
            style={[
              tw`w-full relative bg-[#888af1] px-4 h-auto py-8 overflow-y-hidden`,
            ]}>
            <View
              style={[
                tw`h-[150px] w-[150px] rounded-full absolute left-[-40px] bottom-[-30px] bg-[#FFFFFF20]`,
              ]}></View>
            <View
              style={[tw`w-full flex flex-row justify-between items-center`]}>
              <View style={[tw`w-1/12`]}>
                <MaterialCommunityIcons
                  name="view-dashboard-outline"
                  style={[tw`text-2xl text-white`]}
                />
               
              </View>
              <View style={[tw`relative w-9/12 flex flex-row items-center`]}>
                <EvilIcons
                  name="search"
                  style={[tw`text-3xl text-gray-600 absolute z-10 left-[10px]`]}
                />
                <TextInput
                  style={[
                    tw`w-full border border-[1px] border-white rounded-full bg-white z-2 relative pl-[40px] text-black`,
                  ]}
                />
              </View>
              <View style={[tw`w-1/12 flex flex-row justify-end`]}>
                <Icon name="bell-fill" size={20} color="#fff" />
              </View>
            </View>
            <View>
            <Text style={[styles.navbarTextPara, tw`text-white`]}>
                  Hello!
                </Text>
                <Text style={[styles.navbarProfileName, tw`text-white`]}>
                  {username}
                </Text>
            </View>
          </View>
          <View style={{padding: 15}}>
            {/** =============== progressbar ============== */}
            <View style={styles.progressCard}>
              <View
                style={{
                  width: '40%',
                  padding: 5,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}>
                <Text style={styles.progressCardText}>
                  Your today's task almost done
                </Text>
                <TouchableOpacity style={styles.progressCardButton}>
                  <Text style={styles.progressCardButtonText}>View Task</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CircularProgress
                  size={80}
                  percentage={85}
                  donutColor="#fff"
                  fillColor="#5F33E1"
                  blankColor="#8764ff"
                  progressWidth={33}
                  fontSize={16}
                  fontColor="#fff"
                />
              </View>
              <TouchableOpacity>
                <IconIntypo
                  name="dots-three-horizontal"
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            {/** =============== InProgress section ============== */}
            <View>
              <Text style={styles.progressHeadText}>In Progress</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View
                  style={[
                    styles.progressTaskCard,
                    {backgroundColor: '#e7f3ff'},
                  ]}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'LexendDeca-Regular',
                        fontSize: 12,
                        color: '#726e80',
                      }}>
                      Office Project
                    </Text>
                    <View
                      style={{
                        backgroundColor: '#ffe9e1',
                        borderRadius: 6,
                        padding: 5,
                      }}>
                      <IconFontAwesome
                        name="briefcase"
                        size={15}
                        color="#f478b8"
                      />
                    </View>
                  </View>
                  <Text style={styles.progressTaskCardText}>
                    Grocery shopping app design
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      height: 6,
                      backgroundColor: '#fff',
                      borderRadius: 4,
                      marginTop: 15,
                    }}>
                    <View
                      style={{
                        width: '80%',
                        height: 6,
                        backgroundColor: '#0087ff',
                        borderRadius: 6,
                      }}></View>
                  </View>
                </View>
                <View
                  style={[
                    styles.progressTaskCard,
                    {backgroundColor: '#ffe9e1'},
                  ]}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'LexendDeca-Regular',
                        fontSize: 12,
                        color: '#726e80',
                      }}>
                      Personal Project
                    </Text>
                    <View
                      style={{
                        backgroundColor: '#ede4ff',
                        borderRadius: 6,
                        padding: 5,
                      }}>
                      <IconFontAwesome
                        name="house-chimney-user"
                        size={15}
                        color="#9260f4"
                      />
                    </View>
                  </View>
                  <Text style={styles.progressTaskCardText}>
                    Uber Eats redesign challenges
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      height: 6,
                      backgroundColor: '#fff',
                      borderRadius: 4,
                      marginTop: 15,
                    }}>
                    <View
                      style={{
                        width: '80%',
                        height: 6,
                        backgroundColor: '#ff7d53',
                        borderRadius: 6,
                      }}></View>
                  </View>
                </View>
                <View
                  style={[
                    styles.progressTaskCard,
                    {backgroundColor: '#ede4ff'},
                  ]}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'LexendDeca-Regular',
                        fontSize: 12,
                        color: '#726e80',
                      }}>
                      Daily Study
                    </Text>
                    <View
                      style={{
                        backgroundColor: '#ffe6d4',
                        borderRadius: 6,
                        padding: 5,
                      }}>
                      <IconFontAwesome
                        name="book-open"
                        size={15}
                        color="#ff9142"
                      />
                    </View>
                  </View>
                  <Text style={styles.progressTaskCardText}>
                    Complete the React Native course
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      height: 6,
                      backgroundColor: '#fff',
                      borderRadius: 4,
                      marginTop: 15,
                    }}>
                    <View
                      style={{
                        width: '80%',
                        height: 6,
                        backgroundColor: '#A28CC7',
                        borderRadius: 6,
                      }}></View>
                  </View>
                </View>
              </ScrollView>
            </View>

            {/** =============== Task Groups section ============== */}
            <View>
              <Text style={styles.progressHeadText}>Task Groups</Text>
              <View style={[styles.taskGroupCard, {}]}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <View
                    style={{
                      backgroundColor: '#ffe9e1',
                      borderRadius: 10,
                      padding: 7,
                      marginRight: 10,
                    }}>
                    <IconFontAwesome
                      name="briefcase"
                      size={30}
                      color="#f478b8"
                    />
                  </View>
                  <View>
                    <Text style={styles.taskGroupCardHeadText}>
                      Office Project
                    </Text>
                    <Text style={styles.taskGroupCardParaText}>23 Tasks</Text>
                  </View>
                </View>
                <CircularProgress
                  size={50}
                  percentage={67}
                  donutColor="#f478b8"
                  fillColor="#fff"
                  blankColor="#ffe4f2"
                  progressWidth={22}
                  fontSize={12}
                  fontColor="#000"
                />
              </View>
              <View style={[styles.taskGroupCard, {}]}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <View
                    style={{
                      backgroundColor: '#ede4ff',
                      borderRadius: 10,
                      padding: 7,
                      marginRight: 10,
                    }}>
                    <IconFontAwesome
                      name="house-chimney-user"
                      size={30}
                      color="#9260f4"
                    />
                  </View>
                  <View>
                    <Text style={styles.taskGroupCardHeadText}>
                      Personal Project
                    </Text>
                    <Text style={styles.taskGroupCardParaText}>30 Tasks</Text>
                  </View>
                </View>
                <CircularProgress
                  size={50}
                  percentage={52}
                  donutColor="#9260f4"
                  fillColor="#fff"
                  blankColor="#ede4ff"
                  progressWidth={22}
                  fontSize={12}
                  fontColor="#000"
                />
              </View>
              <View style={[styles.taskGroupCard, {}]}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <View
                    style={{
                      backgroundColor: '#ffe6d4',
                      borderRadius: 10,
                      padding: 7,
                      marginRight: 10,
                    }}>
                    <IconFontAwesome
                      name="book-open"
                      size={30}
                      color="#ff9142"
                    />
                  </View>
                  <View>
                    <Text style={styles.taskGroupCardHeadText}>
                      Daily Study
                    </Text>
                    <Text style={styles.taskGroupCardParaText}>18 Tasks</Text>
                  </View>
                </View>
                <CircularProgress
                  size={50}
                  percentage={87}
                  donutColor="#ffa15e"
                  fillColor="#fff"
                  blankColor="#ffe6d4"
                  progressWidth={22}
                  fontSize={12}
                  fontColor="#000"
                />
              </View>

              <View style={[styles.taskGroupCard, {}]}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <View
                    style={{
                      backgroundColor: '#ffe9e1',
                      borderRadius: 10,
                      padding: 7,
                      marginRight: 10,
                    }}>
                    <IconFontAwesome
                      name="briefcase"
                      size={30}
                      color="#f478b8"
                    />
                  </View>
                  <View>
                    <Text style={styles.taskGroupCardHeadText}>
                      Office Project
                    </Text>
                    <Text style={styles.taskGroupCardParaText}>23 Tasks</Text>
                  </View>
                </View>
                <CircularProgress
                  size={50}
                  percentage={67}
                  donutColor="#f478b8"
                  fillColor="#fff"
                  blankColor="#ffe4f2"
                  progressWidth={22}
                  fontSize={12}
                  fontColor="#000"
                />
              </View>
              <View style={[styles.taskGroupCard, {}]}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <View
                    style={{
                      backgroundColor: '#ede4ff',
                      borderRadius: 10,
                      padding: 7,
                      marginRight: 10,
                    }}>
                    <IconFontAwesome
                      name="house-chimney-user"
                      size={30}
                      color="#9260f4"
                    />
                  </View>
                  <View>
                    <Text style={styles.taskGroupCardHeadText}>
                      Personal Project
                    </Text>
                    <Text style={styles.taskGroupCardParaText}>30 Tasks</Text>
                  </View>
                </View>
                <CircularProgress
                  size={50}
                  percentage={52}
                  donutColor="#9260f4"
                  fillColor="#fff"
                  blankColor="#ede4ff"
                  progressWidth={22}
                  fontSize={12}
                  fontColor="#000"
                />
              </View>
              <View style={[styles.taskGroupCard, {}]}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <View
                    style={{
                      backgroundColor: '#ffe6d4',
                      borderRadius: 10,
                      padding: 7,
                      marginRight: 10,
                    }}>
                    <IconFontAwesome
                      name="book-open"
                      size={30}
                      color="#ff9142"
                    />
                  </View>
                  <View>
                    <Text style={styles.taskGroupCardHeadText}>
                      Daily Study
                    </Text>
                    <Text style={styles.taskGroupCardParaText}>18 Tasks</Text>
                  </View>
                </View>
                <CircularProgress
                  size={50}
                  percentage={87}
                  donutColor="#ffa15e"
                  fillColor="#fff"
                  blankColor="#ffe6d4"
                  progressWidth={22}
                  fontSize={12}
                  fontColor="#000"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  textView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    // paddingHorizontal: 10,
    // marginTop: 20,
  },
  imageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    borderWidth: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  navbarTextPara: {
    fontFamily: 'LexendDeca-Regular',
    color: '#000',
    fontSize: 16,
  },
  navbarProfileName: {
    fontFamily: 'LexendDeca-SemiBold',
    color: '#000',
    fontSize: 18,
  },
  progressCard: {
    backgroundColor: '#5F33E1',
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    padding: 25,
    justifyContent: 'space-between',
    marginTop: 30,
  },
  progressCardText: {
    color: '#fff',
    fontFamily: 'LexendDeca-Regular',
    fontSize: 14,
  },
  progressCardButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    padding: 0,
    paddingTop: 6,
    paddingBottom: 6,
    marginTop: 40,
  },
  progressCardButtonText: {
    fontFamily: 'LexendDeca-SemiBold',
    fontSize: 15,
    color: '#5F33E1',
  },
  progressHeadText: {
    fontFamily: 'LexendDeca-SemiBold',
    fontSize: 20,
    color: '#000',
    marginTop: 15,
    marginBottom: 15,
  },
  progressTaskCard: {
    width: 250,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginEnd: 20,
  },
  progressTaskCardText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'LexendDeca-Medium',
  },
  taskGroupCard: {
    padding: 20,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.2,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  taskGroupCardHeadText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'LexendDeca-Medium',
  },
  taskGroupCardParaText: {
    fontSize: 13,
    fontFamily: 'LexendDeca-Regular',
    color: '#858687',
  },
  loginButton: {
    backgroundColor: '#5F33E1',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 19,
    fontFamily: 'LexendDeca-SemiBold',
    width: '100%',
    textAlign: 'center',
  },
});
export default Home;
