/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  LogBox,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Slideshow from 'react-native-image-slider-show';
import Modal, {
  ModalButton,
  ModalContent,
  ModalTitle,
  ScaleAnimation,
} from 'react-native-modals';
import {Button, TextInput} from 'react-native-paper';
import RNRestart from 'react-native-restart';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {Login} from '../../store/actions';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const backgroundColorValue = '#ffffff';

const dataSource = [
  {
    url:
      'https://devi.larona.id/index_css/LoginAndroid/img/banner_1.png' +
      '?' +
      new Date(),
  },
  {
    url:
      'https://devi.larona.id/index_css/LoginAndroid/img/banner_2.png' +
      '?' +
      new Date(),
  },
  {
    url:
      'https://devi.larona.id/index_css/LoginAndroid/img/banner_3.png' +
      '?' +
      new Date(),
  },
  {
    url:
      'https://devi.larona.id/index_css/LoginAndroid/img/banner_4.png' +
      '?' +
      new Date(),
  },
];

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');

  const programNumber = 'API_Login';
  const [server, setServer] = useState('cloud');

  const [linkUrl, setLinkUrl] = useState('');
  const [sesid, setSesid] = useState('');
  const [otp, setOtp] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [api, setApi] = useState('');

  const [numberPhone, setNumberPhone] = useState('');
  const [scaleAnimationModal, setScaleAnimationModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const toggle = setInterval(() => {
      setPosition(position === dataSource.length - 1 ? 0 : position + 1);
    }, 3000);

    return () => clearInterval(toggle);
  });

  useEffect(() => {
    getServer();

    DeviceInfo.getPhoneNumber().then(phoneNumber => {
      // console.log(phoneNumber);
      setNumberPhone(phoneNumber);
    });

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const getServer = async () => {
    try {
      const url = await AsyncStorage.getItem('link');
      const id = await AsyncStorage.getItem('userId');
      const accessToken = await AsyncStorage.getItem('token');
      const apiCookie = await AsyncStorage.getItem('cookie');
      const account = await AsyncStorage.getItem('email');
      const office = await AsyncStorage.getItem('corporate');
      const subdomain = await AsyncStorage.getItem('subServer');

      console.log(' ');
      console.log(' ');
      console.log(' + + + Login Get Data + + + ');
      console.log(' ');
      console.log('url (url)          : ', url);
      console.log('sesid (id)         : ', id);
      console.log('otp (accessToken)  : ', accessToken);
      console.log('api (apiCookie)    : ', apiCookie);
      console.log('email (account)    : ', account);
      console.log('company (office)   : ', office);
      console.log('server (subdomain) : ', subdomain);
      console.log(' ');

      if (subdomain === null && apiCookie === null) {
        // setLinkUrl(url);
        // setSesid(id);
        // setOtp(accessToken);
        setApi('');
        // setEmail(account);
        // setCompany(office);
        // setServer(subdomain);
        console.log('subdomain === null && apiCookie === null');
      } else if (subdomain !== null && apiCookie === null) {
        // setLinkUrl(url);
        // setSesid(id);
        setOtp('');
        setApi('');
        // setEmail(account);
        setCompany(office);
        setServer(subdomain);
        console.log('subdomain !== null && apiCookie === null');
      } else if (subdomain !== null && apiCookie !== null) {
        // setLinkUrl(url);
        // setSesid(id);
        setOtp(accessToken);
        setApi(apiCookie);
        // setEmail(account);
        setCompany(office);
        setServer(subdomain);
        console.log('subdomain !== null && apiCookie !== null');
      }
    } catch (err) {
      console.log('err : ', err);
    }
  };

  const dispatch = useDispatch();
  const submit = () => {
    if (api === '') {
      Axios.get(
        `https://${server}.larona.id/cgi-bin/lnweb?LW_usrEmail=${email}&LW_user=${username}&LW_pass=${password}&LW_comp=${company}&LW_prgno=${programNumber}&API_id=${api}&LW_phone=${numberPhone}`,
      )
        .then(res => {
          console.log(' ');
          console.log(' ');
          console.log(' + + + Login Post Data Without Cookie + + + ');
          // console.log('');
          // console.log('data : ', res.data);
          console.log('');
          console.log('url (url)          : ', res.request.responseURL);
          console.log('sesid (id)         : ', res.data.sesid);
          console.log('otp (accessToken)  : ', res.data.OTP);
          console.log('api (apiCookie)    : ', api);
          console.log('email (account)    : ', email);
          console.log('company (office)   : ', company);
          console.log('server (subdomain) : ', server);
          console.log('');

          const url = res.request.responseURL;
          const id = res.data.sesid;
          const accessToken = res.data.OTP;
          // const accessToken = otp;
          const apiCookie = api;
          const account = email;
          const office = company;
          const subdomain = server;

          if (
            id === undefined ||
            id === 'undefined' ||
            id === null ||
            id === 'null' ||
            id === ''
          ) {
            Alert.alert(
              'Wrong Credentials !',
              'Pastikan data yang anda masukan benar',
            );
          } else {
            dispatch(
              Login(
                url,
                id,
                accessToken,
                apiCookie,
                account,
                office,
                subdomain,
              ),
            );
            if (
              apiCookie === undefined ||
              apiCookie === 'undefined' ||
              apiCookie === null ||
              apiCookie === 'null' ||
              apiCookie === ''
            ) {
              navigation.navigate('OtpScreen');
            }
          }
        })
        .catch(err => {
          console.log('err : ', err);
          Alert.alert(
            'Server Error !',
            'Pastikan server yang anda pilih benar',
          );
        });
    } else if (api !== null) {
      Axios.get(
        `https://${server}.larona.id/cgi-bin/lnweb?LW_usrEmail=${email}&LW_user=${username}&LW_pass=${password}&LW_comp=${company}&LW_prgno=${programNumber}&API_id=${api}&LW_phone=${numberPhone}`,
      )
        .then(res => {
          if (
            res.data.OTP === undefined ||
            res.data.OTP === 'undefined' ||
            res.data.OTP === null ||
            res.data.OTP === 'null' ||
            res.data.OTP === ''
          ) {
            console.log(' ');
            console.log(' ');
            console.log(' + + + Login Post Data With Cookie and Token + + + ');
            // console.log('');
            // console.log('data : ', res.data);
            console.log('');
            console.log('url (url)          : ', res.request.responseURL);
            console.log('sesid (id)         : ', res.data.sesid);
            console.log('otp (accessToken)  : ', otp);
            console.log('api (apiCookie)    : ', api);
            console.log('email (account)    : ', email);
            console.log('company (office)   : ', company);
            console.log('server (subdomain) : ', server);
            console.log('');

            const url = res.request.responseURL;
            const id = res.data.sesid;
            // const accessToken = res.data.OTP;
            const accessToken = otp;
            const apiCookie = api;
            const account = email;
            const office = company;
            const subdomain = server;

            if (
              id === undefined ||
              id === 'undefined' ||
              id === null ||
              id === 'null' ||
              id === ''
            ) {
              Alert.alert(
                'Wrong Credentials !',
                'Pastikan data yang anda masukan benar',
              );
            } else {
              dispatch(
                Login(
                  url,
                  id,
                  accessToken,
                  apiCookie,
                  account,
                  office,
                  subdomain,
                ),
              );
              if (
                apiCookie === undefined ||
                apiCookie === 'undefined' ||
                apiCookie === null ||
                apiCookie === 'null' ||
                apiCookie === ''
              ) {
                navigation.navigate('OtpScreen');
              }
            }
          } else {
            console.log(' ');
            console.log(' ');
            console.log(' + + + Login Post Data With New User + + + ');
            // console.log('');
            // console.log('data : ', res.data);
            console.log('');
            console.log('url (url)          : ', res.request.responseURL);
            console.log('sesid (id)         : ', res.data.sesid);
            console.log('otp (accessToken)  : ', res.data.OTP);
            console.log('api (apiCookie)    : ', api);
            console.log('email (account)    : ', email);
            console.log('company (office)   : ', company);
            console.log('server (subdomain) : ', server);
            console.log('');

            const url = res.request.responseURL;
            const id = res.data.sesid;
            const accessToken = res.data.OTP;
            // const accessToken = otp;
            const apiCookie = '';
            const account = email;
            const office = company;
            const subdomain = server;

            if (
              id === undefined ||
              id === 'undefined' ||
              id === null ||
              id === 'null' ||
              id === ''
            ) {
              Alert.alert(
                'Wrong Credentials !',
                'Pastikan data yang anda masukan benar',
              );
            } else {
              dispatch(
                Login(
                  url,
                  id,
                  accessToken,
                  apiCookie,
                  account,
                  office,
                  subdomain,
                ),
              );
              if (
                apiCookie === undefined ||
                apiCookie === 'undefined' ||
                apiCookie === null ||
                apiCookie === 'null' ||
                apiCookie === ''
              ) {
                navigation.navigate('OtpScreen');
              }
            }
          }
        })
        .catch(err => {
          console.log('err : ', err);
          Alert.alert(
            'Server Error !',
            'Pastikan server yang anda pilih benar',
          );
        });
    } else {
      Alert.alert(
        'Wrong Credentials !',
        'Pastikan OTP yang anda masukan benar',
      );
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <StatusBar backgroundColor={backgroundColorValue} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {/* = START Wrapper Container = */}
          <View style={styles.wrapper}>
            {/* = START Slideshow Container = */}
            {!isKeyboardVisible && (
              <Slideshow
                dataSource={dataSource}
                height={150}
                position={position}
                indicatorSize={12}
                arrowSize={14}
                onPositionChanged={positionValue => setPosition(positionValue)}
              />
            )}
            {/* = FINISH Slideshow Container = */}

            <Image
              source={require('../../assets/images/LogoB.png')}
              style={styles.logo}
            />

            {/* = START Form Container = */}
            <View style={styles.formContainer}>
              <TextInput
                label="Email"
                mode="outlined"
                autoComplete="email"
                style={styles.textInput}
                onSubmitEditing={submit}
                theme={{
                  roundness: 20,
                  colors: {primary: '#555555', underlineColor: 'transparent'},
                }}
                value={email}
                onChangeText={value => setEmail(value)}
              />
              <TextInput
                label="Password"
                mode="outlined"
                autoComplete="password"
                secureTextEntry={passwordVisible}
                style={styles.textInput}
                onSubmitEditing={submit}
                right={
                  <TextInput.Icon
                    name={passwordVisible ? 'eye' : 'eye-off'}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                }
                theme={{
                  roundness: 20,
                  colors: {primary: '#555555', underlineColor: 'transparent'},
                }}
                value={password}
                onChangeText={value => setPassword(value)}
              />
              <TextInput
                label="Company"
                mode="outlined"
                style={styles.textInput}
                onSubmitEditing={submit}
                theme={{
                  roundness: 20,
                  colors: {primary: '#555555', underlineColor: 'transparent'},
                }}
                value={company}
                onChangeText={value => setCompany(value)}
              />

              {/* = START Select Server Container = */}
              <View style={styles.serverContainer}>
                <Text style={styles.textServer}>{server}.larona.id | </Text>
                <TouchableOpacity onPress={() => setScaleAnimationModal(true)}>
                  <Ionicons name="md-earth-sharp" color={'#252525'} size={26} />
                </TouchableOpacity>

                {/* START Select Server */}
                <Modal
                  width={0.9}
                  visible={scaleAnimationModal}
                  onTouchOutside={() => setScaleAnimationModal(false)}
                  onSwipeOut={() => setScaleAnimationModal(false)}
                  modalAnimation={new ScaleAnimation()}
                  onHardwareBackPress={() => {
                    setScaleAnimationModal(false);
                    return true;
                  }}
                  modalTitle={
                    <ModalTitle title="Select Server" hasTitleBar={false} />
                  }
                  actions={[
                    <ModalButton
                      text="DISMISS"
                      onPress={() => {
                        setScaleAnimationModal(false);
                      }}
                      key="button-1"
                    />,
                  ]}>
                  <ModalContent>
                    <Button
                      mode="contained"
                      onPress={() => {
                        setServer('cloud');
                        setScaleAnimationModal(false);
                      }}
                      style={[styles.button, {marginTop: 10}]}>
                      <Text style={{textTransform: 'lowercase'}}>
                        cloud.larona.id
                      </Text>
                    </Button>
                    <Button
                      mode="contained"
                      onPress={() => {
                        setServer('cloud2');
                        setScaleAnimationModal(false);
                      }}
                      style={[styles.button, {marginTop: 10}]}>
                      <Text style={{textTransform: 'lowercase'}}>
                        cloud2.larona.id
                      </Text>
                    </Button>
                    <Button
                      mode="contained"
                      onPress={() => {
                        setServer('cloud3');
                        setScaleAnimationModal(false);
                      }}
                      style={[styles.button, {marginTop: 10}]}>
                      <Text style={{textTransform: 'lowercase'}}>
                        cloud3.larona.id
                      </Text>
                    </Button>
                    <Button
                      mode="contained"
                      onPress={() => {
                        setServer('cloud4');
                        setScaleAnimationModal(false);
                      }}
                      style={[styles.button, {marginTop: 10}]}>
                      <Text style={{textTransform: 'lowercase'}}>
                        cloud4.larona.id
                      </Text>
                    </Button>
                    <Button
                      mode="contained"
                      onPress={() => {
                        setServer('devi');
                        setScaleAnimationModal(false);
                      }}
                      style={[
                        styles.button,
                        {marginTop: 25, backgroundColor: '#003f80'},
                      ]}>
                      <Text style={{textTransform: 'lowercase'}}>
                        devi.larona.id
                      </Text>
                    </Button>
                  </ModalContent>
                </Modal>
                {/* FINISH Select Server */}
              </View>
              {/* = FINISH Select Server Container = */}

              <Button mode="contained" onPress={submit} style={styles.button}>
                Login
              </Button>
            </View>
            {/* = FINISH Form Container = */}

            {/* = START Footer Container = */}
            {!isKeyboardVisible && (
              <View style={styles.footerContainer}>
                <Text
                  style={{fontSize: 12, color: '#252525', fontWeight: '500'}}>
                  v1.22 {'\u00A9'} 2022 - Larona.ID | Payroll Employee Self
                  Service
                </Text>
              </View>
            )}
            {/* = FINISH Footer Container = */}
          </View>
          {/* = FINISH Wrapper Container = */}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColorValue,
  },
  wrapper: {
    backgroundColor: backgroundColorValue,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    // width: 170,
    height: 87,
    // height: 99,
    // marginVertical: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 25,
    flex: 10,
  },
  textInput: {
    height: 45,
    marginBottom: 10,
    fontSize: 16,
  },
  textServer: {
    fontSize: 18,
    color: '#252525',
    fontWeight: 'bold',
  },
  serverContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#0277ED',
    width: 200,
    marginTop: 10,
    borderRadius: 50,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
