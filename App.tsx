import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider, useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {enableScreens} from 'react-native-screens';
import tw from 'twrnc';

import store from './src/redux/store';
import {handleIsAuthenticated} from './src/redux/slices/authSlice';

import Home from './src/screens/home';
import Login from './src/screens/login';
import Register from './src/screens/register';
import StartScreen from './src/screens/startScreen';
import BottomNavbar from './src/components/bottomNavbar';
import Layout from './src/screens/layout';
import Profile from './src/screens/profile';
import AddTask from './src/screens/addTask';
// Enable react-native-screens for better performance
enableScreens();

// Define navigation types
export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  EditProfile: undefined;
  Offers: undefined;
  Pharmacy: undefined;
  Doctors: undefined;
  UploadPrescription:undefined;
  TermsAndCondition: undefined;
  PrivacyPolicy: undefined;
  Login: undefined;
  Register: undefined;
  StartScreen: undefined;
  Layout: undefined;
  AddTask:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppContent() {
  const dispatch = useDispatch();
  const [authInitialRouteName, setAuthInitialRouteName] = useState<
    keyof RootStackParamList | undefined
  >(undefined);

  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );

  // Handle token fetch
  const handleFetchToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('access_token');
      if (storedToken) {
        dispatch(handleIsAuthenticated({isAuthenticated: true}));
        setAuthInitialRouteName('Layout');
      } else {
        dispatch(handleIsAuthenticated({isAuthenticated: false}));
        setAuthInitialRouteName('StartScreen');
      }
    } catch (error) {
      console.error('Error fetching token:', error);
      setAuthInitialRouteName('StartScreen');
    }
  };

  useEffect(() => {
    handleFetchToken();
  }, []);

  useEffect(() => {
    setAuthInitialRouteName(isAuthenticated ? 'Layout' : 'StartScreen');
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      <SafeAreaView style={tw`flex-1 bg-white`}>
        {authInitialRouteName && (
          <Stack.Navigator initialRouteName={authInitialRouteName}>
             <Stack.Screen
              name="StartScreen"
              component={StartScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Layout"
              component={Layout}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            
            <Stack.Screen
              name="AddTask"
              component={AddTask}
              options={{headerShown: false}}
            />
            
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  // Add styles if needed later
});

export default App;
