import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../constant';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import BackButton from '../../components/BackButton';
import LoadingIndicator from '../../components/LoadingIndicator';
import ProductListComponent from '../../components/ProductListComponent';
import UserComponent from '../../components/UserComponent';

const UserListScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [userList, setUserList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getUserList().then(res => {
        setUserList(res);
        setIsLoading(false);
        console.log('res', res);
      });

      return () => {};
    }, [refresh]),
  );
  const getUserList = async () => {
    console.log('get product func called');
    let array = [];
    const response = await firestore()
      .collection('sreeNandhas')
      .doc('Users')
      .collection('users')
      .get();

    console.log('user list', response);
    response?._docs?.map((item, index) => {
      let obj = {};
      let arr = item?._ref?._documentPath?._parts.slice(-1).pop();
      obj = item?._data;
      obj._id = arr;
      console.log('id', arr);
      array.push(obj);
    });
    return array;
  };

  const backAction = () => {
    navigation.goBack();
  };

  const addUserButtonAction = () => {
    navigation.navigate('AddUserScreen');
  };

  const renderItem = ({item, index}) => {
    console.log('item1', item);
    return (
      <UserComponent
        item={item}
        index={index}
        setRefresh={setRefresh}
        refresh={refresh}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, marginTop: responsiveHeight(4)}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <BackButton onPress={backAction} />
          <Text style={styles.header}>Users</Text>
        </View>
        <LoadingIndicator visible={isLoading} />
        <View style={{height: responsiveHeight(5)}} />
        <FlatList
          data={userList}
          renderItem={renderItem}
          keyExtractor={index => {
            `printer-items-${index}`;
          }}
        />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => addUserButtonAction()}>
        <Text style={styles.addButtonText}>Add New User</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserListScreen;

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
});
