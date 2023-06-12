import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Modal from 'react-native-modal';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import BarcodeCreatorViewManager, {
  BarcodeFormat,
} from 'react-native-barcode-creator';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Data from '../../constant/Data';
import ViewShot from 'react-native-view-shot';
import SecondView from '../../components/SecondView';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import ImgToBase64 from 'react-native-image-base64';

import {Colors, Globals, Images} from '../../constant';
import ProductList from '../../components/ProductList';
import StickerComponent from '../../components/StickerComponent';
import CustomButton from '../../components/CustomButton';

const Home = () => {
  const navigation = useNavigation();
  const ref = useRef();
  const [selectedItem, setSelectedItem] = useState('');
  const [batchNo, setBatchNo] = useState('');
  const [showItemList, setShowItemList] = useState(false);
  const [itemValidationText, setItemValidationText] = useState('');
  const [batchNoValidationtext, setBatchNoValidationtext] = useState('');
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => false,
    });
   
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      console.log(Globals.USER_DETAILS)
    setBatchNo('');
    setSelectedItem('');
      return () => {};
    }, []),
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const List = () => {
    return (
      <Modal
        visible={showItemList}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
          backgroundColor: '#DADBE0',
        }}>
        <ProductList
          setShowItemList={setShowItemList}
          selectAction={selectAction}
        />
      </Modal>
    );
  };
  const selectAction = _item => {
    console.log('SelectedItem', _item);
    setSelectedItem(_item);
    setShowItemList(false);
  };
  const validation = () => {
    var isValidProduct = 0;
    var isValidBatchNo = 0;
    if (selectedItem !== '') {
      isValidProduct = 1;
      setItemValidationText('');
    } else {
      isValidProduct = 0;
      setItemValidationText('Please select a product');
    }
    if (batchNo !== '') {
      isValidBatchNo = 1;
      setBatchNoValidationtext('');
    } else {
      isValidBatchNo = 0;
      setBatchNoValidationtext('batch number is required');
    }

    if (isValidProduct === 1 && isValidBatchNo === 1) {
      navigation.navigate('PreviewScreen', {
        selectedItem,
        batchNo,
      });
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#D2D4DE'}}>
      <View style={{marginHorizontal: 15}}>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: responsiveWidth(7),
              height: responsiveHeight(3),
              marginTop: responsiveHeight(1.5),
              marginRight: 10,
            }}>
            <Image
              source={Images.MENU}
              style={{width: responsiveWidth(8), height: responsiveWidth(8)}}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: responsiveFontSize(4),
              color: 'black',
              fontWeight: 'bold',
            }}>
            BT Printer
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => setShowItemList(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              marginTop: 20,
              borderColor: 'black',
              backgroundColor: '#fff',
            }}>
            <TextInput
              placeholder="Select Product"
              editable={false}
              style={{
                flex: 1,
                paddingLeft: 10,
                color: 'black',
                fontSize: responsiveFontSize(2),
              }}
              value={selectedItem?.title || ''}
            />
            <Image
              source={Images.DROP_DOWN_ARROW}
              style={{width: 15, height: 15, marginRight: 20}}
            />
          </TouchableOpacity>
          <Text style={styles.errorText}>{itemValidationText}</Text>
        </View>
        <View style={{height: responsiveHeight(3)}} />
        {/* <View style={{flexDirection: 'row', marginTop: 20}}>
          <TouchableOpacity
            onPress={() => {
              codeSelectedAction(BarcodeFormat.CODE128);
            }}
            style={styles.button}>
            <Image
              style={{width: 20, aspectRatio: 1.1}}
              source={
                selectedCodeType === BarcodeFormat.CODE128
                  ? require('../assets/radio.png')
                  : require('../assets/radio-button.png')
              }
            />
            <Text>BARCODE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              codeSelectedAction(BarcodeFormat.QR);
            }}
            style={styles.button}>
            <Image
              style={{width: 20, aspectRatio: 1.1}}
              source={
                selectedCodeType === BarcodeFormat.QR
                  ? require('../assets/radio.png')
                  : require('../assets/radio-button.png')
              }
            />
            <Text style={{marginLeft: 10}}>OR</Text>
          </TouchableOpacity>
        </View> */}
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              marginTop: 20,
              borderColor: 'black',
              backgroundColor: '#fff',
            }}>
            <TextInput
              placeholder="Batch No"
              onChangeText={val => setBatchNo(val)}
              style={{
                flex: 1,
                paddingLeft: 10,
                color: 'black',
                fontSize: responsiveFontSize(2),
              }}
              value={batchNo}
              onSubmitEditing={() => {
                validation();
              }}
            />
          </View>
          <Text style={styles.errorText}>{batchNoValidationtext}</Text>
        </>
        <TouchableOpacity
          style={styles.previewButton}
          onPress={() => validation()}>
          <Text style={styles.previewButtonText}>Preview</Text>
        </TouchableOpacity>

        <List />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  sticker: {
    height: responsiveHeight(30),
    marginTop: responsiveHeight(6),
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  box: {
    width: responsiveWidth(60),
    height: responsiveHeight(3),
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  text: {
    fontSize: responsiveFontSize(3),
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 16,
    color: 'black',
  },
  containerTwo: {
    flexDirection: 'row',
    marginTop: 5,
  },
  containerThree: {
    borderWidth: 1,
    borderColor: 'black',
    paddingBottom: 5,
    marginRight: 5,
  },
  nutritionText: {
    fontSize: 10,
    color: 'black',
    marginHorizontal: 4,
  },
  previewButton: {
    backgroundColor: 'gray',
    width: responsiveWidth(50),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(20),
  },
  previewButtonText: {
    marginVertical: 10,
    color: Colors.WHITE,
    fontSize: responsiveFontSize(2),
  },
  errorText: {
    color: 'red',
    textAlign: 'right',
    fontSize: 12,
  },
});
