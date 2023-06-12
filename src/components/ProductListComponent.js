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
import {isNetConnected} from '../helper/Utilities';
import NotConnectedScreen from './NotConnectedScreen';

const ProductListComponent = ({item, index, setRefresh, refresh}) => {
  const navigation = useNavigation();
  const updateAction = () => {
    navigation.navigate('AddProducts', {isFromEdit: true, item: item});
  };

  const deleteAlert = () => {
    Alert.alert('Remove', 'Are you sure, you want remove this product?', [
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
        .doc('Products')
        .collection('products')
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
      <>
        <View style={{flex: 1, paddingLeft: responsiveWidth(2)}}>
          <Text style={styles.title}>{item?.title}</Text>
        </View>
        {Globals?.USER_DETAILS.role === 'admin' ? (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => updateAction()}>
              <Image style={styles.buttonIcon} source={Images.EDIT} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => deleteAlert()}>
              <Image style={styles.buttonIcon} source={Images.DELETE} />
            </TouchableOpacity>
          </View>
        ) : null}
      </>
    </View>
  );
};

export default ProductListComponent;

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
