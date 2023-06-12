import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const SelectBluetoothScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {uri} = route?.params;
  const backAction = () => {
    navigation?.goBack();
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
        <Text style={styles.header}>Select Bluetooth type</Text>
      </View>
      <View style={{height: responsiveHeight(10)}} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('BluetoothScreen', {uri: uri});
        }}>
        <Text style={styles.buttonText}>Printer 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Bluetooth', {uri: uri});
        }}>
        <Text style={styles.buttonText}>Printer 2</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SelectBluetoothScreen;

const styles = StyleSheet.create({
  header: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    marginTop: 2,
    marginLeft: 10,
  },
  button: {
    backgroundColor: 'gray',
    alignSelf: 'center',
    marginTop: 40,
  },
  buttonText: {
    fontSize: responsiveFontSize(2),
    color: '#fff',
    marginHorizontal: 20,
    marginVertical: 8,
  },
});
