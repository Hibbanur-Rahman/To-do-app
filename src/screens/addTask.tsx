import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import Icon from 'react-native-vector-icons/Octicons';

import ArrowLeftSvg from '../components/arrowLeftSvg';
import ArrowDownSvg from '../components/arrowDownSvg';
import DropdownComponent from '../components/dropDown';
import CalendarIconSvg from '../components/calendarIconSvg';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import tw from 'twrnc';
import axios from 'axios';
import API_URL from '../../environmentVariables';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AddTask = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [chosenStartDate, setChosenStartDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [startDateHeadText, setStartDateHeadText] = useState('Select the date');
  const [chosenEndDate, setChosenEndDate] = useState(new Date());
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [endDateHeadText, setEndDateHeadText] = useState('Select the date');
  const [taskGroup,setTaskGroup]=useState(null);
  const [loader, setLoader] = useState(false);
  const handleStartDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    const currentDate = selectedDate || chosenStartDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setChosenStartDate(currentDate);
    setStartDateHeadText(
      currentDate
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
        .replace(/ /g, ', '),
    );
  };

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };

  const handleEndDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    const currentDate = selectedDate || chosenEndDate;
    setShowEndDatePicker(Platform.OS === 'ios');
    setChosenEndDate(currentDate);
    setEndDateHeadText(
      currentDate
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
        .replace(/ /g, ', '),
    );
  };

  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
  };

  const handleAddTask = async () => {
    setLoader(true);
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await axios.post(
        `${API_URL}/tasks`,
        {
          taskName: projectName,
          description: projectDescription,
          completed: false,
          tags: taskGroup,
          priority: 'high',
          startDate: chosenStartDate,
          endDate: chosenEndDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response?.status === 201) {
        Alert.alert('Task Added Successfully');
        setProjectName('');
        setProjectDescription('');
        setChosenStartDate(new Date());
        setChosenEndDate(new Date());
        setShowStartDatePicker(false);
      }
    } catch (error) {
      console.log('error in adding task:', error);
      Alert?.alert(
        'Error in Add',
        `${
          error?.response?.data?.message ||
          'Something went wrong while adding task'
        } `,
      );
    } finally {
      setLoader(false);
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/backgound-img.png')}
        style={styles.backgroundImg}
        resizeMode="cover">
        <ScrollView style={{padding: 20}} showsVerticalScrollIndicator={false}>
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
              Add Task
            </Text>
            <Icon name="bell-fill" size={20} color="#000" />
          </View>
          {/**============= task group drop down ============ */}
          <View style={[{width: '100%', display: 'flex', marginTop: 20}, tw``]}>
            <DropdownComponent value={taskGroup} setValue={setTaskGroup}/>
          </View>
          {/**============= project name input ============ */}
          <View
            style={[
              styles.taskGroupCard,
              {
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: 10,
                paddingStart: 20,
              },
              tw`rounded-2xl shadow-sm border-gray-500`,
            ]}>
            <Text style={[styles.taskGroupCardParaText, {}]}>Project Name</Text>
            <TextInput
              placeholder="Write project name"
              value={projectName}
              onChangeText={setProjectName}
              style={styles.taskGroupInput}
              placeholderTextColor="#000"
              allowFontScaling={true}
              autoCorrect={true}
            />
          </View>
          <View
            style={[
              styles.taskGroupCard,
              {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              },
              tw`rounded-2xl shadow-sm border-gray-500`,
            ]}>
            <Text style={[styles.taskGroupCardParaText, {}]}>Description</Text>

            <TextInput
              placeholder="write the description"
              value={projectDescription}
              onChangeText={setProjectDescription}
              style={[
                styles.taskGroupTextArea,
                {
                  fontSize: 14,
                  fontFamily: 'LexendDeca-Regular',
                  textAlignVertical: 'top',
                  color: '#000',
                },
              ]}
              placeholderTextColor="#000"
              allowFontScaling={true}
              autoCorrect={true}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          {/**============= project start date input ============ */}
          <View
            style={[
              styles.taskGroupCard,
              {display: 'flex', flexDirection: 'row'},
              tw`rounded-2xl shadow-sm border-gray-500`,
            ]}>
            <TouchableOpacity
              onPress={() => showStartDatePickerModal()}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CalendarIconSvg />
              <View style={{marginStart: 15}}>
                <Text style={[styles.taskGroupCardParaText, {}]}>
                  Start Date
                </Text>
                <Text style={[styles.taskGroupCardHeadText, {}]}>
                  {startDateHeadText}
                </Text>
              </View>
            </TouchableOpacity>
            <ArrowDownSvg />
          </View>
          {showStartDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={chosenStartDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleStartDateChange}
              minimumDate={new Date()} // Ensures only current or future dates can be selected
            />
          )}
          {/**============= project end date input ============ */}

          <View
            style={[
              styles.taskGroupCard,
              {display: 'flex', flexDirection: 'row'},
              tw`rounded-2xl shadow-sm border-gray-500`,
            ]}>
            <TouchableOpacity
              onPress={() => showEndDatePickerModal()}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CalendarIconSvg />
              <View style={{marginStart: 15}}>
                <Text style={[styles.taskGroupCardParaText, {}]}>End Date</Text>
                <Text style={[styles.taskGroupCardHeadText, {}]}>
                  {endDateHeadText}
                </Text>
              </View>
            </TouchableOpacity>
            <ArrowDownSvg />
          </View>
          {showEndDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={chosenEndDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleEndDateChange}
              minimumDate={new Date()} // Ensures only current or future dates can be selected
            />
          )}
          <View
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {loader ? (
              <TouchableOpacity style={styles.addProjectButton}>
                <ActivityIndicator size={30} color={'#fff'} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.addProjectButton}
                onPress={handleAddTask}>
                <Text style={styles.addProjectButtonText}>Add Project</Text>
              </TouchableOpacity>
            )}
          </View>
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
  addProjectButton: {
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
    textAlign: 'left',
    width: '100%',
    color: '#726e80',
  },
  taskGroupInput: {
    width: '100%',
    height: 40,
    fontSize: 14,
    fontFamily: 'LexendDeca-Regular',
    color: '#000',
  },
  taskGroupTextArea: {
    width: '100%',
    fontFamily: 'LexendDeca-Medium',
    fontSize: 16,
    height: 100,
  },
  addProjectButtonText: {
    color: '#FFF',
    fontSize: 19,
    fontFamily: 'LexendDeca-SemiBold',
    width: '100%',
    textAlign: 'center',
  },
});

export default AddTask;
