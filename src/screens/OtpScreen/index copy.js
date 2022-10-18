/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  Keyboard,
  View,
  ScrollView,
} from 'react-native';
import Slideshow from 'react-native-image-slider-show';
import {Button, TextInput} from 'react-native-paper';

const dataSource = [
  {url: 'https://devi.larona.id/index_css/LoginAndroid/img/banner_1.png'},
  {url: 'https://devi.larona.id/index_css/LoginAndroid/img/banner_2.png'},
  {url: 'https://devi.larona.id/index_css/LoginAndroid/img/banner_3.png'},
  {url: 'https://devi.larona.id/index_css/LoginAndroid/img/banner_4.png'},
];

const OtpScreen = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const toggle = setInterval(() => {
      setPosition(position === dataSource.length - 1 ? 0 : position + 1);
    }, 3000);

    return () => clearInterval(toggle);
  });

  useEffect(() => {
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

  const submit = () => {
    Axios.get(
      `https://${email}.larona.id/cgi-bin/lnweb?LW_usrEmail=${email}&LW_user=${email}&LW_pass=${email}&LW_comp=${email}&LW_prgno=${email}&LW_phone=${email}`,
    )
      .then(res => {
        // console.log('');
        // console.log('Token : ', res.data.sesid);
        console.log('URL : ', res.request.responseURL);
        // console.log('Email : ', email);
        // console.log('Server : ', server);
        const accessToken = res.data.sesid;
        // const id = email;
        // const subdomain = server;
        // const office = company;
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
          //   dispatch(Login(accessToken, id, subdomain, office));
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
    <View
      style={{
        flex: 1,
        // backgroundColor: '#555555',
        // margin: 10,
        // padding: 10,
      }}>
      <KeyboardAvoidingView>
        <StatusBar backgroundColor="#555555" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              width: '100%',
              height: '100%',
              padding: 10,
              alignItems: 'center',
              backgroundColor: '#ffffff',
            }}>
            <Image
              source={require('../../assets/images/LogoB.png')}
              style={{
                width: 170,
                height: 99,
                marginVertical: 30,
              }}
            />
            <Text style={{fontSize: 25, color: '#000000', marginBottom: 5}}>
              Welcome
            </Text>
            <Text style={{fontSize: 14, color: '#000000', marginBottom: 15}}>
              Please enter your mobile number and email to continue
            </Text>

            {/* = START Form Container = */}
            <View
              style={{width: '100%', paddingHorizontal: 15, marginBottom: 120}}>
              <TextInput
                label="Phone Number"
                mode="outlined"
                style={{height: 45, marginBottom: 10, fontSize: 16}}
                placeholder="87654321234"
                onSubmitEditing={submit}
                theme={{
                  roundness: 20,
                  colors: {primary: '#555555', underlineColor: 'transparent'},
                }}
                value={phone}
                onChangeText={value => setPhone(value)}
                keyboardType="number-pad"
              />
              <TextInput
                label="Email"
                mode="outlined"
                style={{height: 45, marginBottom: 10, fontSize: 16}}
                placeholder="yourname@email.com"
                onSubmitEditing={submit}
                theme={{
                  roundness: 20,
                  colors: {primary: '#555555', underlineColor: 'transparent'},
                }}
                value={email}
                onChangeText={value => setEmail(value)}
              />
              <Button
                mode="contained"
                onPress={submit}
                style={{
                  backgroundColor: '#0277ED',
                  width: 200,
                  marginTop: 20,
                  borderRadius: 50,
                  fontWeight: 'bold',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                Login
              </Button>
            </View>
            {/* = FINISH Form Container = */}
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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({});
