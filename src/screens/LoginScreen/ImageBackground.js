/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  LogBox,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
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

const LoginScreen = ({navigation}) => {
  const [server, setServer] = useState('cloud');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [programNumber, setProgramNumber] = useState('api_login');
  const [numberPhone, setNumberPhone] = useState('');
  const [scaleAnimationModal, setScaleAnimationModal] = useState(false);

  useEffect(() => {
    getServer();

    DeviceInfo.getPhoneNumber().then(phoneNumber => {
      // console.log(phoneNumber);
      setNumberPhone(phoneNumber);
    });
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
        // console.log('URL : ', res.request.responseURL);
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
          setTimeout(() => {
            RNRestart.Restart();
          }, 29 * 60000);
        }
      })

      .catch(err => {
        // console.log('err : ', err);
        Alert.alert('Server Error !', 'Pastikan server yang anda pilih benar');
      });
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/Backgroud.png')}
        resizeMode="cover"
        style={{flex: 1, justifyContent: 'center'}}
        blurRadius={5}>
        {/* = START Top Server Container = */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: 10,
            backgroundColor: 'transparent',
          }}>
          <Text style={{fontSize: 18, color: '#252525', fontWeight: 'bold'}}>
            {server}.larona.id
          </Text>
          <TouchableOpacity onPress={() => setScaleAnimationModal(true)}>
            <Ionicons name="md-earth-sharp" color={'#252525'} size={32} />
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
                <Text style={{textTransform: 'lowercase'}}>devi.larona.id</Text>
              </Button>
            </ModalContent>
          </Modal>
          {/* FINISH Select Server */}
        </View>
        {/* = FINISH Top Server Container = */}

        {/* = START Form Container = */}
        <View
          style={{
            flex: 10,
            justifyContent: 'center',
            paddingHorizontal: 30,
            backgroundColor: 'transparent',
            width: '100%',
            height: '100%',
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
            secureTextEntry
            // editable={false}
            style={styles.textInput}
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
            theme={{
              roundness: 20,
              colors: {primary: '#757575', underlineColor: 'transparent'},
            }}
            value={company}
            onChangeText={value => setCompany(value)}
          />

          <Button mode="contained" onPress={submit} style={styles.button}>
            Login
          </Button>
        </View>
        {/* = FINISH Form Container = */}

        {/* = START Bottom Container = */}
        <View
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: 'transparent',
          }}></View>
        {/* = FINISH Bottom Container = */}
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 60,
    marginBottom: 40,
    alignSelf: 'center',
  },

  textInput: {
    height: 45,
    marginBottom: 20,
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
