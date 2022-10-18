/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  BackHandler,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch} from 'react-redux';
import RNRestart from 'react-native-restart';

import {Logout} from '../../store/actions';

import PayrollSlip from '../../assets/icons/PayrollSlip.svg';
import LeaveRequest from '../../assets/icons/LeaveRequest.svg';
import AnnualTax from '../../assets/icons/AnnualTax.svg';
import PayrollHistory from '../../assets/icons/PayrollHistory.svg';
import PersonalData from '../../assets/icons/PersonalData.svg';
import TimeRecord from '../../assets/icons/TimeRecord.svg';
import ToDo from '../../assets/icons/ToDo.svg';
import EmployeeReport from '../../assets/icons/EmployeeReport.svg';
import EmployeeRecord from '../../assets/icons/EmployeeRecord.svg';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const {width} = Dimensions.get('window');
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {
  const [url, setUrl] = useState('');

  const isDarkMode = useColorScheme() === 'dark';

  const dispatch = useDispatch();

  const removeData = async () => {
    const id = await AsyncStorage.getItem('userId');
    const subdomain = await AsyncStorage.getItem('subServer');
    if (id !== null) {
      Axios.get(
        `https://${subdomain}.larona.id/cgi-bin/lnweb?logout&LW_sesid=${id}`,
      );
      RNRestart.Restart();
    }
  };

  const submit = () => {
    Alert.alert('Logging out', 'Do you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => [dispatch(Logout()), removeData()],
      },
    ]);
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('HomeScreen');

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View
      style={{flex: 1, backgroundColor: isDarkMode ? '#05437c' : '#05437c'}}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View
          style={{
            // backgroundColor: 'transparent',
            // backgroundColor: '#646464',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          {/* <View style={styles.iconNavBar} /> */}
          <View
            style={{
              // backgroundColor: '#ffffff',
              // padding: 5,
              // borderRadius: 10,
              marginHorizontal: 15,
              marginTop: 10,
              marginBottom: 5,
            }}>
            <Image
              source={require('../../assets/images/LogoP.png')}
              style={{width: 90, height: 52.5}}
            />
          </View>
          <TouchableOpacity onPress={submit}>
            <Image
              source={require('../../assets/icons/Logout.png')}
              style={{width: 26, height: 26, marginHorizontal: 15}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
          }}>
          {/* <Text
            style={{
              fontSize: 14,
              color: '#ffffff',
              fontWeight: '400',
              marginHorizontal: 15,
            }}>
            PT. Larona Prima Solusi
          </Text> */}
          <Text
            style={{
              fontSize: 22,
              color: '#ffffff',
              fontWeight: 'bold',
              marginHorizontal: 15,
            }}>
            Welcome!
          </Text>
        </View>
      </View>

      <View style={{flex: 4}}>
        <View
          style={[
            styles.menuItemContainer1,
            {backgroundColor: isDarkMode ? '#ffffff' : '#ffffff'},
          ]}>
          {/* = Payroll Slip = */}
          <TouchableOpacity onPress={() => navigation.jumpTo('PayrollSlip')}>
            <View style={styles.itemContainer}>
              <View
                style={{
                  backgroundColor: '#05437c',
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 60,
                }}>
                <PayrollSlip width={30} height={30} />
              </View>
              {/* <Image
                source={require('../../assets/icons/PayrollSlip.png')}
                style={styles.icon}
              /> */}
              <Text
                style={[
                  styles.itemTitle,
                  {color: isDarkMode ? Colors.black : Colors.black},
                ]}>
                Payroll Slip{'\n'}{' '}
              </Text>
            </View>
          </TouchableOpacity>

          {/* = Leave Request = */}
          <TouchableOpacity onPress={() => navigation.jumpTo('LeaveRequest')}>
            <View style={styles.itemContainer}>
              <View
                style={{
                  backgroundColor: '#05437c',
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 60,
                }}>
                <LeaveRequest width={30} height={30} />
              </View>
              {/* <Image
                source={require('../../assets/icons/LeaveRequest.png')}
                style={styles.icon}
              /> */}
              <Text
                style={[
                  styles.itemTitle,
                  {color: isDarkMode ? Colors.black : Colors.black},
                ]}>
                Leave{'\n'}Request
              </Text>
            </View>
          </TouchableOpacity>

          {/* = Annual Tax = */}
          <TouchableOpacity onPress={() => navigation.push('AnnualTax')}>
            <View style={styles.itemContainer}>
              <View
                style={{
                  backgroundColor: '#05437c',
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 60,
                }}>
                <AnnualTax width={30} height={30} />
              </View>
              {/* <Image
                source={require('../../assets/icons/AnnualTax.png')}
                style={styles.icon}
              /> */}
              <Text
                style={[
                  styles.itemTitle,
                  {color: isDarkMode ? Colors.black : Colors.black},
                ]}>
                Annual Tax{'\n'}(SPT)
              </Text>
            </View>
          </TouchableOpacity>

          {/* = Payroll History = */}
          <TouchableOpacity onPress={() => navigation.push('PayrollHistory')}>
            <View style={styles.itemContainer}>
              <View
                style={{
                  backgroundColor: '#05437c',
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 60,
                }}>
                <PayrollHistory width={30} height={30} />
              </View>
              {/* <Image
                source={require('../../assets/icons/PayrollHistory.png')}
                style={styles.icon}
              /> */}
              <Text
                style={[
                  styles.itemTitle,
                  {color: isDarkMode ? Colors.black : Colors.black},
                ]}>
                {/* PAYROLL{'\n'}HISTORY */}
                Payroll{'\n'}History
              </Text>
            </View>
          </TouchableOpacity>

          {/* = Personal Data = */}
          <TouchableOpacity onPress={() => navigation.jumpTo('PersonalData')}>
            <View style={styles.itemContainer}>
              <View
                style={{
                  backgroundColor: '#05437c',
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 60,
                }}>
                <PersonalData width={30} height={30} />
              </View>
              {/* <Image
                source={require('../../assets/icons/PersonalData.png')}
                style={styles.icon}
              /> */}
              <Text
                style={[
                  styles.itemTitle,
                  {color: isDarkMode ? Colors.black : Colors.black},
                ]}>
                {/* PERSONAL{'\n'}DATA */}
                Personal Data{'\n'}{' '}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* = Line = */}
        <View
          style={[
            styles.line,
            {backgroundColor: isDarkMode ? '#05437c' : '#05437c'},
          ]}
        />

        <View
          style={[
            styles.menuItemContainer2,
            {backgroundColor: isDarkMode ? '#ffffff' : '#ffffff'},
          ]}>
          {/* = TimeRecord = */}
          <TouchableOpacity onPress={() => navigation.push('TimeRecord')}>
            <View style={styles.itemContainer}>
              <View
                style={{
                  backgroundColor: '#05437c',
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 60,
                }}>
                <TimeRecord width={30} height={30} />
              </View>
              {/* <Image
                source={require('../../assets/icons/TimeRecord.png')}
                style={styles.icon}
              /> */}
              <Text
                style={[
                  styles.itemTitle,
                  {color: isDarkMode ? Colors.black : Colors.black},
                ]}>
                Time Record{'\n'}{' '}
              </Text>
            </View>
          </TouchableOpacity>

          {/* = Job To Do = */}
          <TouchableOpacity onPress={() => navigation.push('ToDo')}>
            <View style={styles.itemContainer}>
              <View
                style={{
                  backgroundColor: '#05437c',
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 60,
                }}>
                <ToDo width={30} height={30} />
              </View>
              {/* <Image
                source={require('../../assets/icons/ToDo.png')}
                style={styles.icon}
              /> */}
              <Text
                style={[
                  styles.itemTitle,
                  {color: isDarkMode ? Colors.black : Colors.black},
                ]}>
                Job To Do{'\n'}{' '}
              </Text>
            </View>
          </TouchableOpacity>

          {/* = Employee Report = */}
          <TouchableOpacity onPress={() => navigation.push('EmployeeReport')}>
            <View style={styles.itemContainer}>
              <View
                style={{
                  backgroundColor: '#05437c',
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 60,
                }}>
                <EmployeeReport width={30} height={30} />
              </View>
              {/* <Image
                source={require('../../assets/icons/EmployeeReport.png')}
                style={styles.icon}
              /> */}
              <Text
                style={[
                  styles.itemTitle,
                  {color: isDarkMode ? Colors.black : Colors.black},
                ]}>
                Employee{'\n'}Report
              </Text>
            </View>
          </TouchableOpacity>

          {/* = EmployeeRecord = */}
          <TouchableOpacity onPress={() => navigation.push('EmployeeRecord')}>
            <View style={styles.itemContainer}>
              <View
                style={{
                  backgroundColor: '#05437c',
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 60,
                }}>
                <EmployeeRecord width={30} height={30} />
              </View>
              {/* <Image
                source={require('../../assets/icons/EmployeeRecord.png')}
                style={styles.icon}
              /> */}
              <Text
                style={[
                  styles.itemTitle,
                  {color: isDarkMode ? Colors.black : Colors.black},
                ]}>
                Employee{'\n'}Record
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  navBarContainer: {},
  logoNavBar: {
    // marginVertical: 10,
  },
  iconNavBar: {
    // marginHorizontal: 15,
  },

  avatar: {
    width: 52,
    height: 100,
    borderRadius: 100,
  },

  allItemContainer: {
    flex: 1,
  },

  menuItemContainer1: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
    width: windowWidth,
    height: windowHeight,
    // backgroundColor: '#ccc',
    // borderRadius: 50,
    // borderTopStartRadius: 50,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  line: {
    height: 2,
    marginHorizontal: 15,
    marginTop: -25,
  },

  menuItemContainer2: {
    flex: 1.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
    width: windowWidth,
    height: windowHeight,
    // backgroundColor: '#bbb',
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    // marginTop: -25,
  },

  itemContainer: {
    backgroundColor: 'transparent',
    width: windowWidth / 5.5,
    height: windowHeight / 7.5,
    marginHorizontal: windowWidth / 37,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
  },

  icon: {
    width: 60,
    height: 60,
  },

  itemTitle: {
    // padding: 2,
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
  slideShowContainer: {
    borderRadius: 5,
    height: 40,
  },
});
