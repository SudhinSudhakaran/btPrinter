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
import {useNavigation, useRoute} from '@react-navigation/native';
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
import BackButton from '../../components/BackButton';
import {Images} from '../../constant';
import ProductList from '../../components/ProductList';
import StickerComponent from '../../components/StickerComponent';
import CustomButton from '../../components/CustomButton';
const PreviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const ref = useRef();
  const {selectedItem, batchNo} = route?.params;
  const [selectedCodeType, setSelectedCodeType] = useState(
    BarcodeFormat.CODE128,
  );

  const captureSticker = () => {
    ref.current.capture().then(uri => {
      ImgToBase64.getBase64String(uri)
        .then(base64String => {
          console.log('do something with ', base64String);
          navigation.navigate('SelectBluetoothScreen', {
            uri: base64String,
          });
        })
        .catch(err => console.log('error', err));
    });
  };
  const backAction = () => {
    navigation?.goBack();
  };
  return (
    <SafeAreaView style={{backgroundColor: '#D2D4DE', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginTop: 20,
        }}>
        <BackButton onPress={backAction} />
        <Text style={styles.header}>Preview Screen</Text>
      </View>
      {selectedItem === '' ? (
        <View
          style={[
            styles.sticker,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <Text>Select Item</Text>
        </View>
      ) : (
        <ViewShot
          ref={ref}
          options={{fileName: '_sudhin1234', format: 'jpg', quality: 0.9}}>
          <View style={styles.sticker}>
            <>
              <StickerComponent
                selectedItem={selectedItem}
                selectedCodeType={selectedCodeType}
                batchNo={batchNo}
              />
            </>
          </View>
        </ViewShot>
      )}
      <CustomButton
        title={'Continue'}
        selectedItem={selectedItem}
        captureSticker={captureSticker}
      />
    </SafeAreaView>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({
  sticker: {
    height: responsiveHeight(30),
    marginTop: responsiveHeight(6),
    backgroundColor: '#fff',
    borderRadius: 6,
    marginHorizontal: 15,
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
  header: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    marginTop: 2,
    marginLeft: 10,
  },
});
