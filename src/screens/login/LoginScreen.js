import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Images,Globals} from '../../constant';
import firestore from '@react-native-firebase/firestore';
import {isEmptyValue, isNetConnected} from '../../helper/Utilities';
import StorageManager from '../../storageManager/StorageManager';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
const LoginScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecurity, setPasswordSecurity] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [phoneValidationText, setPhoneValidationText] = useState('');
  const [passwordValidationText, setPasswordValidationText] = useState('');
  const passwordRef = useRef();
  const phoneRef = useRef();

  /**
 * Purpose:manage eye button action
 * Created/Modified By:Sudhin
 * Created/Modified Date: 9 Nov 2022
 * Steps:
     1.check the previous value of the state and change its value 
*/
  const passwordEyeButtonAction = () => {
    setPasswordSecurity(passwordSecurity => !passwordSecurity);
  };

  const validationAction = () => {
    let isValidPhone = 0;
    let isValidPassword = 0;

    if (isEmptyValue(phone)) {
      isValidPhone = 0;
      setPhoneValidationText('Phone number is required');
    } else if (phone?.length < 10 || phone?.length > 10) {
      isValidPhone = 0;
      setPhoneValidationText('Invalid phone number');
    } else {
      isValidPhone = 1;
      setPhoneValidationText('');
    }
    if (isEmptyValue(password)) {
      isValidPassword = 0;
      setPasswordValidationText(' Password is required');
    } else if (password?.length < 8) {
      isValidPassword = 0;
      setPasswordValidationText(
        'Password length must be atleast 8 characters ',
      );
    } else {
      isValidPassword = 1;
      setPasswordValidationText(' ');
    }

    if (isValidPhone === 1 && isValidPassword === 1) {
      loginButtonAction();
    }
  };
  const loginButtonAction = () => {
  console.log('isConnected', isNetConnected())
    firestore()
      .collection('sreeNandhas')
      .doc('Users')
      .collection('users')
      .where('phone', '==', phone)
      .where('password', '==', password)
      .get()
      .then(querySnapshot => {
        console.log('querySnapshot', querySnapshot?._docs[0]);
        const data = querySnapshot?._docs[0];

        if (data?._exists === true) {
          console.log('login success');
          StorageManager.saveUserDetails(data?._data);
          Globals.USER_DETAILS = data?._data;
          navigation.reset({
            index: 0,
            routes: [{name: 'DrawerNavigator'}],
          });
        } else {
          console.log('login failed');
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
          }, 3000);
        }
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.header}>BT Printer</Text>
      <Text style={styles.registerText}>Login</Text>
      <View style={[styles.inputContainer, {}]}>
        <TextInput
          style={[styles.inputField]}
          placeholder={'Phone'}
          ref={phoneRef}
          onChangeText={value => setPhone(value)}
          onSubmitEditing={() => passwordRef?.current?.focus()}
        />
      </View>
      <Text style={styles.errorText}>{phoneValidationText}</Text>
      <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
        <TextInput
          style={[styles.inputField]}
          placeholder={'Password'}
          ref={passwordRef}
          onChangeText={value => setPassword(value)}
          secureTextEntry={passwordSecurity}
          onSubmitEditing={() => {
            validationAction();
          }}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => passwordEyeButtonAction()}>
          <Image
            style={styles.eyeButtonIcon}
            source={passwordSecurity ? Images.EYE_CLOSE : Images.EYE_OPEN}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.errorText}>{passwordValidationText}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          validationAction();
        }}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        transparent={true}
        backdropOpacity={0.2}
        style={{}}>
        <View
          style={{
            height: responsiveHeight(8),
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: responsiveHeight(50),
            borderRadius: 5,
          }}>
          <Text style={{fontSize: responsiveFontSize(1.5)}}>
            Phone number or password is incorrect
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    marginTop: responsiveHeight(8),
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
    color: 'black',
  },
  registerText: {
    textAlign: 'left',
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    marginLeft: responsiveWidth(3),
  },
  inputContainer: {
    height: responsiveHeight(6),
    borderWidth: 1,
    marginHorizontal: responsiveWidth(3),
    marginTop: responsiveHeight(5),
    marginBottom: 4,
  },
  inputField: {
    paddingLeft: 15,
    color: 'black',
    flex: 1,
  },
  errorText: {
    color: 'red',
    textAlign: 'right',
    fontSize: 12,
    marginRight: responsiveWidth(5),
  },
  button: {
    backgroundColor: 'gray',
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 6,
  },
  eyeButtonIcon: {width: 25, height: 25},
  eyeButton: {
    width: responsiveHeight(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
