/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch} from 'react-redux';
import RNRestart from 'react-native-restart';

import {Logout} from '../../store/actions';

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

  return (
    <View
      style={{flex: 1, backgroundColor: isDarkMode ? '#ffffff' : '#ffffff'}}>
      {/* = Navigation Bar Container = */}
      <View style={styles.navBarContainer}>
        <View style={styles.iconNavBar} />
        <Image
          source={require('../../assets/images/LogoB.png')}
          style={styles.logoNavBar}
        />
        <TouchableOpacity onPress={submit}>
          <Image
            source={require('../../assets/icons/Logout.png')}
            style={styles.iconNavBar}
          />
        </TouchableOpacity>
      </View>

      {/* <View style={{flex: 1, alignItems: 'center', padding: 20}}>
        <Image
          source={require('../../assets/images/Avatar.png')}
          style={styles.avatar}
        />
        <Text
          style={[
            styles.itemTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
              fontSize: 20,
              marginTop: 20,
            },
          ]}>
          Hi, Nama Lengkap
        </Text>
        <Text
          style={[
            styles.itemTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
              fontSize: 20,
            },
          ]}>
          Software Engineer
        </Text>
      </View> */}

      <View style={{flex: 1}}>
        <View
          style={[
            styles.menuItemContainer1,
            {backgroundColor: isDarkMode ? '#666666' : '#dddddd'},
          ]}>
          {/* = Payroll Slip = */}
          <TouchableOpacity onPress={() => navigation.jumpTo('PayrollSlip')}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../assets/icons/PayrollSlip.png')}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.itemTitle,
                  {color: isDarkMode ? Colors.white : Colors.black},
                ]}>
                PAYROLL SLIP
              </Text>
            </View>
          </TouchableOpacity>

          {/* = Leave Request = */}
          <TouchableOpacity onPress={() => navigation.jumpTo('LeaveRequest')}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../assets/icons/LeaveRequest.png')}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.itemTitle,
                  {color: isDarkMode ? Colors.white : Colors.black},
                ]}>
                LEAVE REQUEST
              </Text>
            </View>
          </TouchableOpacity>

          {/* = Annual Tax = */}
          <TouchableOpacity onPress={() => navigation.push('AnnualTax')}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../assets/icons/AnnualTax.png')}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.itemTitle,
                  {color: isDarkMode ? Colors.white : Colors.black},
                ]}>
                ANNUAL TAX (SPT)
              </Text>
            </View>
          </TouchableOpacity>

          {/* = Payroll History = */}
          <TouchableOpacity onPress={() => navigation.push('PayrollHistory')}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../assets/icons/PayrollHistory.png')}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.itemTitle,
                  {color: isDarkMode ? Colors.white : Colors.black},
                ]}>
                PAYROLL HISTORY
              </Text>
            </View>
          </TouchableOpacity>

          {/* = Personal Data = */}
          <TouchableOpacity onPress={() => navigation.jumpTo('PersonalData')}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../assets/icons/PersonalData.png')}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.itemTitle,
                  {color: isDarkMode ? Colors.white : Colors.black},
                ]}>
                PERSONAL DATA
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* = Line = */}
        {/* <View
          style={[
            styles.line,
            {backgroundColor: isDarkMode ? Colors.white : Colors.black},
          ]}
        /> */}

        <View
          style={[
            styles.menuItemContainer2,
            {backgroundColor: isDarkMode ? '#555555' : '#cccccc'},
          ]}>
          {/* = TimeRecord = */}
          <TouchableOpacity onPress={() => navigation.push('TimeRecord')}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../assets/icons/TimeRecord.png')}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.itemTitle,
                  {color: isDarkMode ? Colors.white : Colors.black},
                ]}>
                TIME RECORD
              </Text>
            </View>
          </TouchableOpacity>

          {/* = ToDo = */}
          <TouchableOpacity onPress={() => navigation.push('ToDo')}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../assets/icons/ToDo.png')}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.itemTitle,
                  {color: isDarkMode ? Colors.white : Colors.black},
                ]}>
                JOB{'\n'}
                TO DO
              </Text>
            </View>
          </TouchableOpacity>

          {/* = Employee Report = */}
          <TouchableOpacity onPress={() => navigation.push('EmployeeReport')}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../assets/icons/EmployeeReport.png')}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.itemTitle,
                  {color: isDarkMode ? Colors.white : Colors.black},
                ]}>
                EMPLOYEE REPORT
              </Text>
            </View>
          </TouchableOpacity>

          {/* = EmployeeRecord = */}
          <TouchableOpacity onPress={() => navigation.push('EmployeeRecord')}>
            <View style={styles.itemContainer}>
              <Image
                source={require('../../assets/icons/EmployeeRecord.png')}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.itemTitle,
                  {color: isDarkMode ? Colors.white : Colors.black},
                ]}>
                EMPLOYEE RECORD
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
  navBarContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoNavBar: {
    width: 52,
    height: 30,
    marginVertical: 10,
  },
  iconNavBar: {
    width: 26,
    height: 26,
    marginHorizontal: 15,
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
    flex: 1,
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
  },

  menuItemContainer2: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
    width: windowWidth,
    height: windowHeight,
    // backgroundColor: '#bbb',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -25,
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
    width: 40,
    height: 40,
  },

  itemTitle: {
    padding: 2,
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
});
