/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import Axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {AppState, StatusBar, useColorScheme, View} from 'react-native';
import {ModalPortal} from 'react-native-modals';
import {ActivityIndicator} from 'react-native-paper';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import RNRestart from 'react-native-restart';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {Provider, useDispatch, useSelector} from 'react-redux';

import {store} from './src/store';
import {Logout} from './src/store/actions';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import Menu from './src/screens/Menu';

import AnnualTax from './src/screens/AnnualTax';
import LeaveRequest from './src/screens/LeaveRequest';
import PayrollHistory from './src/screens/PayrollHistory';
import PayrollSlip from './src/screens/PayrollSlip';
import PersonalData from './src/screens/PersonalData';

import ClientMaster from './src/screens/ClientMaster';
import EmployeeMaster from './src/screens/EmployeeMaster';
import EmployeeRecord from './src/screens/EmployeeRecord';
import EmployeeReport from './src/screens/EmployeeReport';
import JobCode from './src/screens/JobCode';
import TimeRecord from './src/screens/TimeRecord';
import ToDo from './src/screens/ToDo';

const Stack = createSharedElementStackNavigator();

const options = {
  gestureEnabled: false,
  transitionSpec: {
    open: {animation: 'timing', config: {duration: 300}},
    close: {animation: 'timing', config: {duration: 300}},
  },
  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />

      <Stack.Screen
        name="PayrollSlip"
        component={PayrollSlip}
        options={options}
      />
      <Stack.Screen
        name="LeaveRequest"
        component={LeaveRequest}
        options={options}
      />
      <Stack.Screen name="AnnualTax" component={AnnualTax} options={options} />
      <Stack.Screen
        name="PayrollHistory"
        component={PayrollHistory}
        options={options}
      />
      <Stack.Screen
        name="PersonalData"
        component={PersonalData}
        options={options}
      />

      <Stack.Screen
        name="TimeRecord"
        component={TimeRecord}
        options={options}
      />
      <Stack.Screen name="ToDo" component={ToDo} options={options} />
      <Stack.Screen
        name="EmployeeReport"
        component={EmployeeReport}
        options={options}
      />
      <Stack.Screen
        name="EmployeeRecord"
        component={EmployeeRecord}
        options={options}
      />

      <Stack.Screen name="JobCode" component={JobCode} options={options} />
      <Stack.Screen
        name="EmployeeMaster"
        component={EmployeeMaster}
        options={options}
      />
      <Stack.Screen
        name="ClientMaster"
        component={ClientMaster}
        options={options}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

let timerId;
const RootNavigation = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [loading, setLoading] = useState(true);

  const token = useSelector(state => state.Reducers.authToken);
  const userId = useSelector(state => state.Reducers.authUserId);
  const subServer = useSelector(state => state.Reducers.authSubServer);
  const corporate = useSelector(state => state.Reducers.authCorporate);
  // console.log('token : ', token);
  // console.log('email : ', userId);
  // console.log('server : ', subServer);
  // console.log('server : ', corporate);

  useEffect(() => {
    init();
    // stopTimer();

    requestMultiple([
      PERMISSIONS.ANDROID.READ_PHONE_STATE,
      PERMISSIONS.ANDROID.READ_PHONE_NUMBERS,
      PERMISSIONS.ANDROID.READ_SMS,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]).then(statuses => {
      // console.log('READ_PHONE_STATE', statuses[PERMISSIONS.ANDROID.READ_PHONE_STATE]);
      // console.log('READ_PHONE_NUMBERS', statuses[PERMISSIONS.ANDROID.READ_PHONE_NUMBERS]);
      // console.log('READ_SMS', statuses[PERMISSIONS.ANDROID.READ_SMS]);
      // console.log('READ_EXTERNAL_STORAGE', statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]);
      // console.log('WRITE_EXTERNAL_STORAGE', statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]);
    });

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // console.log('App has come to the foreground!');
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      // console.log('AppState', appState.current);
      if (appState.current === 'background') {
        startTimer();
        console.log('background', appState.current);
      } else {
        stopTimer();
        console.log('active', appState.current);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const dispatch = useDispatch();

  const init = async () => {
    await dispatch(Logout());
    removeData();
    setLoading(false);
  };

  const removeData = async () => {
    const id = await AsyncStorage.getItem('userId');
    const subdomain = await AsyncStorage.getItem('subServer');
    if (id !== null) {
      Axios.get(
        `https://${subdomain}.larona.id/cgi-bin/lnweb?logout&LW_sesid=${id}`,
      );
    }
  };

  const startTimer = () => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      RNRestart.Restart();
    }, 5000);
  };
  const stopTimer = () => clearTimeout(timerId);

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#0277ED" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {token === null && userId === null ? <AuthStack /> : <MyStack />}
      <ModalPortal />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
