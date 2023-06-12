import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Data from '../constant/Data';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Colors} from '../constant';
import firestore from '@react-native-firebase/firestore';
import LoadingIndicator from '../components/LoadingIndicator';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import { isNetConnected } from '../helper/Utilities';
const ProductList = props => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      console.log('connected', isNetConnected())
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
  // eslint-disable-next-line react/no-unstable-nested-components
  const ItemComponent = ({item}) => (
    <TouchableOpacity
      onPress={() => props.selectAction(item)}
      style={{
        marginHorizontal: 20,
        marginTop: 10,
      }}>
      <View style={styles.container}>
        <View style={{flex: 1, paddingLeft: responsiveWidth(2)}}>
          <Text style={styles.title}>{item?.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item, index}) => {
    return <ItemComponent item={item} />;
  };

  return (
    <View
      style={{
        height: responsiveHeight(70),
        backgroundColor: '#fff',
        paddingTop: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}>
      { isLoading ?
        <View style={{alignItems: 'center', justifyContent: 'center',flex:1}}>
          <ActivityIndicator size={'large'} color={'green'} />
        </View> :
   <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 15,
        }}>
        <Text style={{fontSize: responsiveFontSize(2)}}>Select Item</Text>
        <TouchableOpacity
          onPress={() => props.setShowItemList(false)}
          style={{
            backgroundColor: '#CACBD3',
            width: 20,
            height: 20,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>X</Text>
        </TouchableOpacity>
      </View>
<View style={{height:responsiveHeight(2)}}    />
      <FlatList
        data={productList}
        renderItem={renderItem}
        keyExtractor={index => {
          `printer-items-${index}`;
        }}
      />
      </>   }
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(8),
    backgroundColor:Colors.BACKGROUND_COLOR,
    marginBottom: responsiveHeight(2),
    marginHorizontal: responsiveWidth(2),
  },
  title: {
    fontSize: responsiveFontSize(2),
    color: 'black',
  },
});
