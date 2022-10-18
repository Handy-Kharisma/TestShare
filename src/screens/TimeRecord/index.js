/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const TimeRecord = ({navigation}) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const id = await AsyncStorage.getItem('userId');
    const subdomain = await AsyncStorage.getItem('subServer');
    if (id !== null) {
      setUrl(
        `https://${subdomain}.larona.id/cgi-bin/lnweb?ORW520&LW_sesid=${id}`,
      );
    }
  };

  const contentWidth = useWindowDimensions().width;
  const contentHeight = useWindowDimensions().height;

  return (
    <>
      {/* = START Navigation Bar Container = */}
      {/* <View style={styles.navBarContainer}>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Image
            source={require('../../assets/icons/Back.png')}
            style={styles.iconNavBar}
          />
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/LogoB.png')}
          style={styles.logoNavBar}
        />
        <View style={styles.iconNavBar} />
      </View> */}
      {/* = FINISH Navigation Bar Container = */}

      {/* = START HTML Container = */}
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={{uri: url}}
          contentWidth={contentWidth}
          contentHeight={contentHeight}
        />
      </View>
      {/* = FINISH HTML Container = */}
    </>
  );
};

export default TimeRecord;

const styles = StyleSheet.create({
  navBarContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 999,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.75,
    elevation: 5,
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

  container: {
    flex: 1,
  },
});
