import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {Colors} from '../../constant';
import BackButton from '../../components/BackButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useFocusEffect} from '@react-navigation/native';
import {Images} from '../../constant';
import {isEmptyValue} from '../../helper/Utilities';
const AddUserScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  let updateButtonText = route?.params?.isFromEdit ? 'Update' : 'Save';
  const disabled = route?.params?.isFromEdit ? true : false;
  let titleText = route?.params?.isFromEdit ? 'Update User' : 'Add User';
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('admin');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSecurity, setPasswordSecurity] = useState(true);
  const [cPasswordSecurity, setCPasswordSecurity] = useState(true);
  //validation texts
  const [firstNameValidationText, setFirstNameValidationText] = useState('');
  const [lastNameValidationText, setLastNameValidationText] = useState('');
  const [phoneValidationText, setPhoneValidationText] = useState('');
  const [passwordValidationText, setPasswordValidationText] = useState('');
  const [cPasswordValidationText, setCPasswordValidationText] = useState('');

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneRef = useRef();
  const roleRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const backAction = () => {
    navigation?.goBack();
  };

  const passwordEyeButtonAction = () => {
    setPasswordSecurity(passwordSecurity => !passwordSecurity);
  };
  const cPasswordEyeButtonAction = () => {
    setCPasswordSecurity(cPasswordSecurity => !cPasswordSecurity);
  };
  useFocusEffect(
    React.useCallback(() => {
      if (route?.params?.isFromEdit) {
        configData();
      }

      return () => {};
    }, [route?.params?.isFromEdit]),
  );

  const configData = () => {
    let password = route?.params?.item?.password;
    console.log('route?.params?.item', route?.params?.item?.password);
    setFirstName(route?.params?.item?.firstName);
    setLastName(route?.params?.item?.lastName);
    setPhone(route?.params?.item?.phone);
    setRole(route?.params?.item?.role);
    setPassword(password);
    setConfirmPassword(password);
  };

  const validateField = () => {
    let isValidFirstName = 0;
    let isValidLastName = 0;
    let isValidPhone = 0;
    let isValidPassword = 0;
    let isValidCPassword = 0;
    if (isEmptyValue(firstName)) {
      isValidFirstName = 0;
      setFirstNameValidationText('First name is required');
    } else {
      isValidFirstName = 1;
      setFirstNameValidationText('');
    }
    if (isEmptyValue(lastName)) {
      isValidLastName = 0;
      setLastNameValidationText('Last name is required');
    } else {
      isValidLastName = 1;
      setLastNameValidationText('');
    }

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
    if (isEmptyValue(confirmPassword)) {
      isValidCPassword = 0;
      setCPasswordValidationText('Confirm password is required');
    } else if (confirmPassword !== password) {
      isValidCPassword = 0;
      setCPasswordValidationText('Password is not matching');
    } else {
      isValidCPassword = 1;
      setCPasswordValidationText('');
    }
    if (
      isValidFirstName === 1 &&
      isValidLastName === 1 &&
      isValidPhone === 1 &&
      isValidPassword === 1 &&
      isValidCPassword === 1
    ) {
      if (route?.params?.isFromEdit === true) {
        updateAction();
      } else {
        addUserAction();
      }
    }
  };
  const updateAction = () => {
    try {
      firestore()
        .collection('sreeNandhas')
        .doc('Users')
        .collection('users')
        .doc(route?.params?.item?._id)
        .update({
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          password: password,
          role: role,
        })
        .then(() => {
          Alert.alert('Success', 'Successfully updated user details', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
        });
    } catch (error) {
      console.log('error', error);
    }
  };
  const addUserAction = () => {
    try {
      firestore()
        .collection('sreeNandhas')
        .doc('Users')
        .collection('users')
        .add({
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          password: password,
          role: role,
        })
        .then(() => {
          Alert.alert('Success', 'Successfully created new user', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
        });
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: responsiveHeight(2)}} />
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <BackButton onPress={backAction} />
        <Text style={styles.header}>{titleText}</Text>
      </View>

      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{height: responsiveHeight(5)}} />
          <View style={[styles.inputContainer, {}]}>
            <TextInput
              style={[styles.inputField]}
              placeholder={'First name'}
              ref={firstNameRef}
              onChangeText={value => setFirstName(value)}
              onSubmitEditing={() => lastNameRef?.current?.focus()}
              value={firstName}
            />
          </View>
          <Text style={styles.errorText}>{firstNameValidationText}</Text>
          <View style={[styles.inputContainer, {}]}>
            <TextInput
              style={[styles.inputField]}
              placeholder={'Last name'}
              ref={lastNameRef}
              onChangeText={value => setLastName(value)}
              onSubmitEditing={() => phoneRef?.current?.focus()}
              value={lastName}
            />
          </View>
          <Text style={styles.errorText}>{lastNameValidationText}</Text>
          <View style={[styles.inputContainer, {}]}>
            <TextInput
              style={[styles.inputField]}
              placeholder={'Phone'}
              ref={phoneRef}
              keyboardType="phone-pad"
              onChangeText={value => setPhone(value)}
              onSubmitEditing={() => passwordRef?.current?.focus()}
              value={phone}
            />
          </View>
          <Text style={styles.errorText}>{phoneValidationText}</Text>
          <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
            <TextInput
              style={[styles.inputField]}
              placeholder={'Password'}
              value={password}
              ref={passwordRef}
              onChangeText={value => setPassword(value)}
              secureTextEntry={passwordSecurity}
              onSubmitEditing={() => passwordRef?.current?.focus()}
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
          <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
            <TextInput
              style={[styles.inputField]}
              placeholder={'Confirm password'}
              ref={confirmPasswordRef}
              secureTextEntry={cPasswordSecurity}
              onChangeText={value => setConfirmPassword(value)}
              onSubmitEditing={() => {}}
              value={confirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => cPasswordEyeButtonAction()}>
              <Image
                style={styles.eyeButtonIcon}
                source={cPasswordSecurity ? Images.EYE_CLOSE : Images.EYE_OPEN}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.errorText}>{cPasswordValidationText}</Text>
          <View
            style={[
              styles.inputContainer,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <Text style={{marginLeft: 15, color: disabled ? 'gray' : 'black'}}>
              Role
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                disabled={disabled}
                onPress={() => {
                  setRole('admin');
                }}
                style={styles.radioButton}>
                <Image
                  style={{
                    width: 20,
                    aspectRatio: 1.1,
                    tintColor: disabled ? 'gray' : 'black',
                  }}
                  source={
                    role === 'admin'
                      ? Images.RADIO_BUTTON_ON
                      : Images.RADIO_BUTTON
                  }
                />
                <Text style={{color: disabled ? 'gray' : 'black'}}>Admin</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={disabled}
                onPress={() => {
                  setRole('employee');
                }}
                style={styles.radioButton}>
                <Image
                  style={{
                    width: 20,
                    aspectRatio: 1.1,
                    tintColor: disabled ? 'gray' : 'black',
                  }}
                  source={
                    role === 'employee'
                      ? Images.RADIO_BUTTON_ON
                      : Images.RADIO_BUTTON
                  }
                />
                <Text style={{marginLeft: 10}}>Employee</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => validateField()}>
            <Text style={styles.saveButtonText}>{updateButtonText}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: 'gray',
    justifyContent: 'center',
    height: responsiveHeight(7),
  },
  addButtonText: {
    color: Colors.WHITE,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  header: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    marginTop: 2,
    marginLeft: 10,
  },
  inputContainer: {
    height: responsiveHeight(6),
    borderWidth: 1,
    marginHorizontal: responsiveWidth(3),
    marginTop: responsiveHeight(2),
    marginBottom: 4,
    borderColor: Colors.TEXT_INPUT_BORDER_COLOR,
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
    backgroundColor: 'blue',
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 6,
  },
  eyeButtonIcon: {width: 20, height: 20},
  eyeButton: {
    width: responsiveHeight(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: 'gray',
    alignSelf: 'center',
    marginTop: responsiveHeight(5),
    width: responsiveWidth(40),
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    marginHorizontal: responsiveWidth(4),
    marginVertical: 10,
  },
  radioButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
