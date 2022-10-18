import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {LogBox, useColorScheme} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import HomeScreen from '../HomeScreen';
import LeaveRequest from '../LeaveRequest';
import PayrollSlip from '../PayrollSlip';
import PersonalData from '../PersonalData';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();

const Menu = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? Colors.white : Colors.black,
        tabBarStyle: {
          height: 60,
          paddingTop: 5,
          backgroundColor: isDarkMode ? Colors.darker : '#EAEAEA',
        },
        tabBarLabelStyle: {
          fontSize: 10,
          paddingBottom: 5,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="PayrollSlip"
        component={PayrollSlip}
        options={{
          headerShown: false,
          tabBarLabel: 'Payroll Slip',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="receipt-long" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="LeaveRequest"
        component={LeaveRequest}
        options={{
          headerShown: false,
          tabBarLabel: 'Leave Request',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="event-busy" color={color} size={26} />
          ),
          // tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="PersonalData"
        component={PersonalData}
        options={{
          headerShown: false,
          tabBarLabel: 'Personal Data',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="account-circle" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Menu;
