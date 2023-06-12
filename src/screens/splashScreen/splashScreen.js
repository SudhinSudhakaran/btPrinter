import {ImageBackground, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import DrawerNavigator from '../../navigators/DrawerNavigator';
import StorageManager from '../../storageManager/StorageManager';
import {Globals, Images} from '../../constant';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    //   navigation.reset({
    //     index: 0,
    //     routes: [{name: 'DrawerNavigator'}],
    //   });
    // navigation.navigate('LoginScreen')

    getIsUserLoggedIn().then(res => {
      Globals.IS_AUTHORIZED = res === 'true' ? true : false;

      if (Globals.IS_AUTHORIZED === true) {
        getStoreData().then(data => {
          if (data) {
            Globals.STORE_NAME = data;
          } else {
            Globals.NEED_STORE_DETAILS_UPDATE = true;
          }
        });
        console.log('Globals.IS_AUTHORIZED', Globals.IS_AUTHORIZED);
        getUserDetails().then(userIfo => {
          Globals.USER_DETAILS = userIfo;
        });
        navigationAction();
      } else {
        //Check stand alone build to fetch business info
        navigationAction();
      }
    });

    return () => {};
  }, []);

  const getIsUserLoggedIn = async () => {
    return await StorageManager.getIsAuthorized();
  };
  const getUserDetails = async () => {
    return await StorageManager.getUserDetails();
  };
  const getStoreData = async () => {
    return await StorageManager.getStoreData();
  };
  const navigationAction = () => {
    console.log('Navigation action called', Globals?.IS_AUTHORIZED);
    if (Globals?.IS_AUTHORIZED === true) {
      console.log('splash user details', Globals.USER_DETAILS);
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'DrawerNavigator'}],
        });
      }, 3000);
    } else {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      }, 3000);
    }
  };

  return (
    <ImageBackground style={styles.container} source={Images.SPLASHSCREEN}>
      <Image source={Images.LOGO} style={styles.logo} />
      <Text style={styles.appName}>Printer</Text>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appName: {
    textAlign: 'center',
    fontSize: responsiveFontSize(5),
    marginTop: -responsiveHeight(20),
    fontWeight: 'bold',
  },
  logo: {
    width: responsiveWidth(20),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
