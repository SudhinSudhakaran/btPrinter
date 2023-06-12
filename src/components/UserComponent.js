import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors, Images, Globals} from '../constant';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const UserComponent = ({item, index, setRefresh, refresh}) => {
  const name = ` ${item?.firstName}  ${item?.lastName}`;

  const navigation = useNavigation();
  const updateAction = () => {
    navigation.navigate('AddUserScreen', {isFromEdit: true, item: item});
  };

  const deleteAlert = () => {
    Alert.alert('Remove', 'Are you sure, you want remove this user?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteAction()},
    ]);
  };

  const deleteAction = async () => {
    try {
      await firestore()
        .collection('sreeNandhas')
        .doc('Users')
        .collection('users')
        .doc(item?._id)
        .delete()
        .then(() => {
          console.log('User deleted!');
          setRefresh(!refresh);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1, paddingLeft: responsiveWidth(2)}}>
        <Text style={styles.title}>{name}</Text>
        <Text style={[styles.title, {fontSize: 10, marginLeft: 5, color:'gray'}]}>
          {item?.role}
        </Text>
      </View>
      {Globals.USER_DETAILS?.role === 'admin' ? (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => updateAction()}>
            <Image style={styles.buttonIcon} source={Images.EDIT} />
          </TouchableOpacity>
          {item?.role !== 'admin' ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => deleteAlert()}>
              <Image style={styles.buttonIcon} source={Images.DELETE} />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default UserComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(8),
    backgroundColor: Colors.WHITE,
    marginBottom: responsiveHeight(2),
    marginHorizontal: responsiveWidth(4),
  },
  title: {
    fontSize: responsiveFontSize(2),
    color: 'black',
  },
  button: {
    height: responsiveHeight(5),
    width: responsiveHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: '60%',
    height: '60%',
  },
});
