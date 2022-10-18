/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import Axios from 'axios';
import React, {useRef, useState, useEffect} from 'react';
import {StatusBar, AppState, useColorScheme, LogBox, View} from 'react-native';
import {ModalPortal} from 'react-native-modals';
import {ActivityIndicator} from 'react-native-paper';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import RNRestart from 'react-native-restart';
import BackgroundTimer from 'react-native-background-timer';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {Provider, useDispatch, useSelector} from 'react-redux';

import {store} from './src/store';
import {Logout} from './src/store/actions';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import OtpScreen from './src/screens/OtpScreen';
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

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

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
    <Stack.Navigator
      backBehavior="initialRoute"
      initialRouteName="Menu"
      screenOptions={{headerShown: false}}>
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
    <Stack.Navigator
      backBehavior="initialRoute"
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [loading, setLoading] = useState(true);

  const userId = useSelector(state => state.Reducers.authUserId);
  const token = useSelector(state => state.Reducers.authToken);
  const subServer = useSelector(state => state.Reducers.authSubServer);
  const corporate = useSelector(state => state.Reducers.authCorporate);
  const cookie = useSelector(state => state.Reducers.authCookie);
  // console.log('token : ', token);
  // console.log('email : ', userId);
  // console.log('server : ', subServer);
  // console.log('server : ', corporate);

  let timeoutId = null;

  // start function
  const onStart = () => {
    timeoutId = BackgroundTimer.setTimeout(() => {
      console.log('Set Timeout');
      RNRestart.Restart();
    }, 300000); // 5 Minute
  };

  // stop function
  const onStop = () => {
    BackgroundTimer.stop(timeoutId);
    BackgroundTimer.stopBackgroundTimer(timeoutId);
    BackgroundTimer.clearInterval(timeoutId);
    BackgroundTimer.clearTimeout(timeoutId);
    console.log('Clear Timeout');
  };

  useEffect(() => {
    onStop();

    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log(appState.current);

      if (appState.current !== 'background') {
        onStop();
        console.log('Clear Timeout');
      } else {
        onStart();
        console.log('Set Timeout');
      }
    });

    return () => {
      if (timeoutId) {
        BackgroundTimer.stop(timeoutId);
        BackgroundTimer.stopBackgroundTimer(timeoutId);
        BackgroundTimer.clearInterval(timeoutId);
        BackgroundTimer.clearTimeout(timeoutId);
        console.log('Clear Timeout');
        subscription.remove();
      }
    };
  }, []);

  useEffect(() => {
    init();

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
      // RNRestart.Restart();
    }
  };

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
      {/* {userId == null && cookie === null ? <AuthStack /> : <MyStack />} */}
      {cookie === undefined ||
      cookie === 'undefined' ||
      cookie === null ||
      cookie === 'null' ||
      cookie === '' ||
      userId === undefined ||
      userId === 'undefined' ||
      userId === null ||
      userId === 'null' ||
      userId === '' ? (
        <AuthStack />
      ) : (
        <MyStack />
      )}
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
