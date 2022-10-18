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

const dataSource = [
  {url: 'https://devi.larona.id/index_css/LoginAndroid/img/banner_1.png'},
  {url: 'https://devi.larona.id/index_css/LoginAndroid/img/banner_2.png'},
  {url: 'https://devi.larona.id/index_css/LoginAndroid/img/banner_3.png'},
  {url: 'https://devi.larona.id/index_css/LoginAndroid/img/banner_4.png'},
];

const LoginScreen = ({navigation}) => {
  const [server, setServer] = useState('cloud');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [programNumber, setProgramNumber] = useState('api_login');
  const [numberPhone, setNumberPhone] = useState('');
  const [scaleAnimationModal, setScaleAnimationModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [backgroundColorValue, setBackgroundColorValue] = useState('#ffffff');
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
      const subdomain = await AsyncStorage.getItem('subServer');
      const office = await AsyncStorage.getItem('corporate');
      if (subdomain !== null) {
        setServer(subdomain);
        setCompany(office);
      }
      // else {
      //   Alert.alert('Select Server', 'Please setup server for the first time', [
      //     {text: 'OK', onPress: () => setScaleAnimationModal(true)},
      //   ]);
      // }
    } catch (err) {}
  };

  const dispatch = useDispatch();
  const submit = () => {
    Axios.get(
      `https://${server}.larona.id/cgi-bin/lnweb?LW_usrEmail=${email}&LW_user=${username}&LW_pass=${password}&LW_comp=${company}&LW_prgno=${programNumber}&LW_phone=${numberPhone}`,
    )
      .then(res => {
        // console.log('');
        // console.log('Token : ', res.data.sesid);
        console.log('URL : ', res.request.responseURL);
        // console.log('Email : ', email);
        // console.log('Server : ', server);
        const accessToken = res.data.sesid;
        const id = email;
        const subdomain = server;
        const office = company;
        if (
          accessToken === undefined ||
          accessToken === 'undefined' ||
          accessToken === null ||
          accessToken === 'null'
        ) {
          // console.log('URL : ', res.request.responseURL);
          Alert.alert(
            'Wrong Credentials !',
            'Pastikan data yang anda masukan benar',
          );
        } else {
          dispatch(Login(accessToken, id, subdomain, office));
          // setTimeout(() => {
          //   RNRestart.Restart();
          // }, 29 * 60000);
        }
      })
      .catch(err => {
        console.log('err : ', err);
        // Alert.alert('Server Error !', 'Pastikan server yang anda pilih benar');
      });
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={{
          backgroundColor: `${backgroundColorValue}`,
          height: isKeyboardVisible ? windowHeight - 275 : windowHeight - 24,
        }}>
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

        {/* = START Form Container = */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              backgroundColor: `${backgroundColorValue}`,
              flex: 14,
              padding: 30,
            }}>
            <Image
              source={require('../../assets/images/LogoB.png')}
              style={styles.logo}
            />

            <TextInput
              label="Email"
              mode="outlined"
              autoComplete="email"
              // editable={false}
              style={styles.textInput}
              onSubmitEditing={submit}
              theme={{
                roundness: 20,
                colors: {primary: '#757575', underlineColor: 'transparent'},
              }}
              value={email}
              onChangeText={value => setEmail(value)}
            />
            <TextInput
              label="Password"
              mode="outlined"
              autoComplete="password"
              secureTextEntry={passwordVisible}
              // editable={false}
              style={styles.textInput}
              onSubmitEditing={submit}
              right={
                <TextInput.Icon
                  name={passwordVisible ? 'eye' : 'eye-off'}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
              // right={<TextInput.Icon icon="eye" />}
              theme={{
                roundness: 20,
                colors: {primary: '#757575', underlineColor: 'transparent'},
              }}
              value={password}
              onChangeText={value => setPassword(value)}
            />
            <TextInput
              label="Company"
              mode="outlined"
              // editable={false}
              style={styles.textInput}
              onSubmitEditing={submit}
              theme={{
                roundness: 20,
                colors: {primary: '#757575', underlineColor: 'transparent'},
              }}
              value={company}
              onChangeText={value => setCompany(value)}
            />

            {/* = START Select Server Container = */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: 10,
              }}>
              <Text
                style={{fontSize: 18, color: '#252525', fontWeight: 'bold'}}>
                {server}.larona.id |{' '}
              </Text>
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
        </TouchableWithoutFeedback>
        {/* = FINISH Form Container = */}

        {/* = START Bottom Container = */}
        {!isKeyboardVisible && (
          <View
            style={{
              backgroundColor: `${backgroundColorValue}`,
              flex: 1,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 12, color: '#252525', fontWeight: '500'}}>
              {'\u00A9'} 2022 - Larona.ID | Payroll Employee Self Service
            </Text>
          </View>
        )}
        {/* = FINISH Bottom Container = */}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 87,
    marginBottom: 10,
    alignSelf: 'center',
  },

  textInput: {
    height: 45,
    marginBottom: 10,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#0277ED',
    width: 200,
    marginTop: 20,
    borderRadius: 50,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
