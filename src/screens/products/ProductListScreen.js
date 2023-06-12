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
const ProductListScreen = () => {
  const navigation = useNavigation();
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const addProductButtonAction = () => {
    navigation.navigate('AddProducts');
  };

  useFocusEffect(
    React.useCallback(() => {
     
      getProducts().then(res => {
        setProductList(res);
        setIsLoading(false);
        console.log('res', res);
      });

      return () => {};
    }, [refresh]),
  );
  const getProducts = async () => {
    console.log('get product func called');
    let array = [];
    const response = await firestore()
      .collection('sreeNandhas')
      .doc('Products')
      .collection('products')
      .get();
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
  const checkData = () => {
    console.log('pro', productList);
  };

  const renderItem = ({item, index}) => {
    console.log('item1', item);
    return (
      <ProductListComponent
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
          <Text style={styles.header}>Products</Text>
        </View>
        <LoadingIndicator visible={isLoading} />
        <View style={{height: responsiveHeight(5)}} />
        <FlatList
          data={productList}
          renderItem={renderItem}
          keyExtractor={index => {
            `printer-items-${index}`;
          }}
        />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => addProductButtonAction()}>
        <Text style={styles.addButtonText}>Add New Product</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProductListScreen;

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
