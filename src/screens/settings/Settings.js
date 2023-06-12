import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useRef} from 'react';
import BackButton from '../../components/BackButton';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import StorageManager from '../../storageManager/StorageManager';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {isEmptyValue} from '../../helper/Utilities';
import {Globals} from '../../constant';
const Settings = () => {
  const navigation = useNavigation();
  const [storeName, setStoreName] = useState('');
  const [storeNameValidationText, setStoreNameValidationText] = useState('');
  const [update, setUpdate] = useState(true);
  const [refresh,setRefresh] = useState(false)
  const storeNameRef = useRef();

  const backAction = () => {
    navigation?.goBack();
  };
  useFocusEffect(
    React.useCallback(() => {
      getData().then(res => {
        setStoreName(res?.storeName);
        Globals.STORE_NAME = res?.storeName;
        StorageManager.setStoreData(res?.storeName);
        // setIsLoading(false);
        if (!res?.storeName) {
          setUpdate(false);
        }
        console.log('res', res);
      });

      return () => {};
    }, [refresh]),
  );
  const validation = () => {
    let isValidStoreName = 0;
    if (isEmptyValue(storeName)) {
      isValidStoreName = 0;
      setStoreNameValidationText('Store name required');
    } else {
      isValidStoreName = 1;
      setStoreNameValidationText('');
    }
    if (isValidStoreName === 1) {
      if (update === false) {
        saveAction();
      } else {
        updateAction();
      }
    }
  };
  const getData = async () => {
    const response = await firestore()
      .collection('sreeNandhas')
      .doc('storeData')
      .get();

    console.log('user list', response);
    return response?._data;
  };
  const saveAction = () => {
    try {
      firestore()
        .collection('sreeNandhas')
        .doc('storeData')
        .add({
          storeName: storeName,
        })
        .then(() => {
          setRefresh(!refresh)
          Alert.alert('Success', 'Successfully created storeData', [
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
  const updateAction = () => {
    console.log('Update function called')
    try {
      firestore()
        .collection('sreeNandhas')
        .doc('storeData')

        .update({
          storeName: storeName,
        })
        .then(() => {
       setRefresh(!refresh);
          Alert.alert('Success', 'Successfully updated store details', [
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
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginTop: 20,
        }}>
        <BackButton onPress={backAction} />
        <Text style={styles.header}>Settings</Text>
      </View>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            marginLeft: 15,
            marginTop: responsiveHeight(3),
          }}>
          Store Details
        </Text>
        <View style={[styles.inputContainer, {}]}>
          <TextInput
            style={[styles.inputField]}
            placeholder={'Store Name'}
            ref={storeNameRef}
            onChangeText={value => setStoreName(value)}
            onSubmitEditing={() => {}}
            value={storeName}
          />
        </View>
        <Text style={styles.errorText}>{storeNameValidationText}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => validation()}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    width: responsiveWidth(40),
    alignSelf: 'center',
    marginBottom: responsiveHeight(3),
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    marginVertical: 10,
  },
  header: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    marginTop: 2,
    marginLeft: 10,
  },
});
