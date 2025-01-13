import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import tw from 'twrnc';
import API_URL from '../../environmentVariables';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useDispatch} from 'react-redux';
import {formatDate} from '../utils/dateFormater';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ArrowLeftSvg from '../components/arrowLeftSvg';
const TaskList = () => {
  const groupName = useSelector(state => state?.task?.activeTaskGroup);
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleTaskList = async () => {
    const token = await AsyncStorage.getItem('access_token');
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/tasks/${groupName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.status === 200) {
        setTaskList(response?.data?.data);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        `${error?.response?.data?.message || 'Failed to fetch task list.'}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsDone = async id => {
    const token = await AsyncStorage.getItem('access_token');
    try {
      await axios.post(
        `${API_URL}/tasks/complete-todo`,
        {taskItemId: id},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      handleTaskList(); // Refresh the task list
    } catch (error) {
      console.log('error while update ing:', error?.response?.data);
      Alert.alert('Error', 'Failed to mark the task as done.');
    }
  };

  const handleEditTask = async (id, updatedData) => {
    const token = await AsyncStorage.getItem('access_token');
    try {
      await axios.patch(`${API_URL}/tasks/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleTaskList(); // Refresh the task list
    } catch (error) {
      Alert.alert('Error', 'Failed to update the task.');
    }
  };

  const handleDeleteTask = async id => {
    const token = await AsyncStorage.getItem('access_token');
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleTaskList(); // Refresh the task list
    } catch (error) {
      Alert.alert('Error', 'Failed to delete the task.');
    }
  };

  useEffect(() => {
    handleTaskList();
  }, [groupName]);

  return (
    <View style={tw`w-full h-full bg-gray-100 `}>
      <ImageBackground
        source={require('../assets/images/backgound-img.png')}
        style={[tw`flex-1 p-4`]}
        resizeMode="cover">
        {loading ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" color="#4CAF50" />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} style={[tw``]}>
           
            {/**============ navbar ============= */}
            <View style={[tw`h-[50px] flex flex-row w-full justify-between items-center`]}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeftSvg />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'LexendDeca-Bold',
                  color: '#000',
                  fontSize: 20,
                }}>
                Task List
              </Text>
              <MaterialIcons name="bell-fill" size={20} color="#000" />
            </View>
            {Array.isArray(taskList) && taskList.length > 0 ? (
              taskList.map(task => (
                <TaskItem
                  data={task}
                  key={task?._id}
                  onMarkAsDone={handleMarkAsDone}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <Text style={tw`text-gray-500 text-center mt-4`}>
                No tasks available.
              </Text>
            )}
          </ScrollView>
        )}
      </ImageBackground>
    </View>
  );
};
const TaskItem = ({data, onMarkAsDone, onEdit, onDelete}) => {
  const getPriorityColor = priority => {
    switch (priority) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <View style={tw`bg-white rounded-lg shadow p-4 mb-4`}>
      <Text style={tw`text-lg font-semibold text-gray-800`}>
        {data?.taskName}
      </Text>
      <Text style={tw`text-sm text-gray-600 mt-1`}>{data?.description}</Text>
      <View style={tw`flex-row justify-between mt-3`}>
        <Text style={tw`text-sm text-gray-500`}>
          Start: {data?.startDate && formatDate(data?.startDate)}
        </Text>
        <Text style={tw`text-sm text-gray-500`}>
          End: {data?.endDate && formatDate(data?.endDate)}
        </Text>
      </View>
      <View style={tw`flex-row justify-between mt-3 items-center`}>
        <Text
          style={tw`text-sm ${getPriorityColor(data?.priority)} font-medium`}>
          Priority: {data?.priority}
        </Text>
        <Text
          style={tw`
            text-sm 
            ${data?.completed ? 'text-green-600' : 'text-red-600'}
            font-medium`}>
          {data?.completed ? 'Completed' : 'Pending'}
        </Text>
      </View>
      <View style={tw`flex flex-row justify-end mt-3 gap-[10px] items-center`}>
        {!data?.completed && (
          <TouchableOpacity
            style={tw``}
            onPress={() => onMarkAsDone(data?._id)}>
            <Ionicons
              name="checkmark-done-circle-outline"
              style={[tw`text-green-600`]}
              size={35}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={tw``}
          onPress={() => onEdit(data?._id, {taskName: 'New Task Name'})} // Pass your updated data here
        >
          <Feather name="edit" style={[tw`text-blue-600`]} size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={tw``} onPress={() => onDelete(data?._id)}>
          <AntDesign name="delete" style={[tw`text-red-600`]} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskList;
