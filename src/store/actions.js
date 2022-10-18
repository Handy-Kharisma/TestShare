import AsyncStorage from '@react-native-async-storage/async-storage';

export const Init = () => {
  return async dispatch => {
    let userId = await AsyncStorage.getItem('userId');
    let token = await AsyncStorage.getItem('token');
    let subServer = await AsyncStorage.getItem('subServer');
    let corporate = await AsyncStorage.getItem('corporate');
    let cookie = await AsyncStorage.getItem('cookie');
    let link = await AsyncStorage.getItem('link');
    let email = await AsyncStorage.getItem('email');
    if (userId !== null) {
      // console.log('token fetched');
      dispatch({
        type: 'LOGIN',
        payloadUserId: userId,
        payloadToken: token,
        payloadSubServer: subServer,
        payloadCorporate: corporate,
        payloadCookie: cookie,
        payloadLink: link,
        payloadEmail: email,
      });
    }
  };
};

export const Login = (
  url,
  id,
  accessToken,
  apiCookie,
  account,
  office,
  subdomain,
) => {
  return async dispatch => {
    let link = null;
    let userId = null;
    let token = null;
    let cookie = null;
    let email = null;
    let corporate = null;
    let subServer = null;
    if (id !== null) {
      link = url;
      userId = id;
      token = accessToken;
      cookie = apiCookie;
      email = account;
      corporate = office;
      subServer = subdomain;

      await AsyncStorage.setItem('link', link);
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('cookie', cookie);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('corporate', corporate);
      await AsyncStorage.setItem('subServer', subServer);
      // console.log('token stored');
    }
    dispatch({
      type: 'LOGIN',
      payloadLink: link,
      payloadUserId: userId,
      payloadToken: token,
      payloadCookie: cookie,
      payloadEmail: email,
      payloadCorporate: corporate,
      payloadSubServer: subServer,
    });
  };
};

export const Logout = () => {
  return async dispatch => {
    // await AsyncStorage.clear();

    await AsyncStorage.removeItem('link');
    await AsyncStorage.removeItem('userId');
    // await AsyncStorage.removeItem('token');
    // await AsyncStorage.removeItem('cookie');
    await AsyncStorage.removeItem('email');
    // await AsyncStorage.removeItem('corporate');
    // await AsyncStorage.removeItem('subServer');

    // let link = await AsyncStorage.getItem('link');
    // let userId = await AsyncStorage.getItem('userId');
    let token = await AsyncStorage.getItem('token');
    let cookie = await AsyncStorage.getItem('cookie');
    // let email = await AsyncStorage.getItem('email');
    let corporate = await AsyncStorage.getItem('corporate');
    let subServer = await AsyncStorage.getItem('subServer');
    dispatch({
      type: 'LOGOUT',
      payloadLink: null,
      payloadUserId: null,
      payloadToken: token,
      payloadCookie: cookie,
      payloadEmail: null,
      payloadCorporate: corporate,
      payloadSubServer: subServer,
    });
  };
};
