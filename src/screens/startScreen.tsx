import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import tw from 'twrnc';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import SlideImg1 from '../assets/images/start-screen-1.svg';
import SlideImg2 from '../assets/images/start-screen-2.svg';
import SlideImg3 from '../assets/images/start-screen-3.svg';

const { height } = Dimensions.get('window');
const homeImgHeight = height * 0.6;

// Reusable Slide Component
const Slide = ({
  image: ImageComponent,
  title,
  description,
  isActive,
  onNext,
}: {
  image: React.ComponentType<any>;
  title: string;
  description: string;
  isActive: boolean;
  onNext: () => void;
}) => (
  <View style={[tw`flex w-full justify-between items-center`]}>
    <Image
      source={require('../assets/images/shape.png')}
      style={[tw`absolute w-[300px] h-[230px] left-0 top-0`]}
    />
    <ImageComponent width="100%" height="300" style={[tw`mt-[80px]`]} />
    <View style={[tw`w-full px-6 mt-6`]}>
      <Text style={[tw`text-center text-3xl font-semibold text-black`]}>
        {title}
      </Text>
      <Text style={[tw`text-center text-gray-500 text-base mt-2`]}>
        {description}
      </Text>
      <ProgressIndicator activeIndex={isActive} />
    </View>
    <View
      style={[
        tw`bg-[#7563F7] h-[300px] w-[300px] flex justify-center items-center rounded-full absolute right-[-120px] bottom-[-380px]`,
      ]}
    >
      <TouchableOpacity onPress={onNext}>
        <AntDesign
          name="arrowright"
          style={tw`text-white text-[60px] relative right-[30px] top-[-50px]`}
        />
      </TouchableOpacity>
    </View>
  </View>
);

// Reusable ProgressIndicator Component
const ProgressIndicator = ({ activeIndex }: { activeIndex: number }) => (
  <View style={[tw`flex flex-row justify-center items-center gap-2 my-4`]}>
    {[1, 2, 3].map((index) => (
      <View
        key={index}
        style={[
          tw`p-1 rounded-full`,
          activeIndex === index
            ? tw`bg-[#7563F7] px-4`
            : tw`bg-gray-300`,
        ]}
      />
    ))}
  </View>
);

const StartScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [slideActive, setSlideActive] = useState(1);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('access_token');
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      navigation.navigate('Layout');
    }
  }, [token]);

  const handleSlideActive = () => {
    if (slideActive < 3) {
      setSlideActive(slideActive + 1);
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView
        contentContainerStyle={tw`flex-grow`}
        style={tw`w-full`}
        showsVerticalScrollIndicator={false}
      >
        {slideActive === 1 && (
          <Slide
            image={SlideImg1}
            title="Task Management & To-Do List"
            description="This productive tool is designed to help you better manage your task project-wise conveniently!"
            isActive={1}
            onNext={handleSlideActive}
          />
        )}
        {slideActive === 2 && (
          <Slide
            image={SlideImg2}
            title="Get things done with Todo."
            description="Just a Click away from planning your tasks"
            isActive={2}
            onNext={handleSlideActive}
          />
        )}
        {slideActive === 3 && (
          <Slide
            image={SlideImg3}
            title="Get things done with Todo."
            description="Just a Click away from planning your tasks"
            isActive={3}
            onNext={handleSlideActive}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StartScreen;
