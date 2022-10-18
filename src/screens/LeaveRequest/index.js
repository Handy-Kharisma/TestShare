/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {LogBox, StyleSheet, useWindowDimensions, View} from 'react-native';
import {WebView} from 'react-native-webview';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const LeaveRequest = ({navigation}) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const id = await AsyncStorage.getItem('userId');
    const subdomain = await AsyncStorage.getItem('subServer');
    if (id !== null) {
      setUrl(
        `https://${subdomain}.larona.id/cgi-bin/lnweb?PSW210&LW_sesid=${id}&s_Rtype=L`,
      );
    }
  };

  const contentWidth = useWindowDimensions().width;
  const contentHeight = useWindowDimensions().height;

  return (
    <>
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

export default LeaveRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
