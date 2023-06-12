import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import BarcodeCreatorViewManager, {
  BarcodeFormat,
} from 'react-native-barcode-creator';
import {Globals, Images} from '../constant';
import NutritionComponent from '../components/NutritionComponent';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
const StickerComponent = props => {
  const renderItem = ({item, index}) => {
    return <NutritionComponent item={item} />;
  };
  return (
    <View style={{}}>
      <View
        style={{
          position: 'absolute',
          width: 40,
          height: 40,
        }}>
        <Image
          source={Images.STICKER_LOG}
          style={{
            height: 45,
            aspectRatio: 1.1,
            resizeMode: 'center',
            // transform: [{rotate: '-30deg'}],
            marginLeft: 15,
            // marginTop: 5,
          }}
        />
      </View>
      <View
        style={{
          borderWidth: 1.5,
          width: 20,
          height: 20,
          position: 'absolute',
          right: 10,
          top: 10,
          borderColor: 'green',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: 10,
            height: 10,
            backgroundColor: 'green',
            borderRadius: 10,
          }}
        />
      </View>
      <Text style={[styles.headerTitle, {textAlign: 'center', marginTop: 5}]}>
      {Globals.STORE_NAME?.toUpperCase() || ''}
      </Text>
      <View>
        {/* <Image
        source={Images.STICKER_LOG}
        style={{
          height: 40,
          aspectRatio: 1.1,
          resizeMode: 'center',
          alignSelf: 'center',
        }}
      /> */}
        <BarcodeCreatorViewManager
          value={props.selectedItem?._id}
          background={'#FFFFFF'}
          foregroundColor={'#000000'}
          format={props.selectedCodeType}
          style={styles.box}
        />
      </View>
      <Text
        style={[
          styles.headerTitle,
          {fontSize: 16, marginTop: 2, textAlign: 'center'},
        ]}>
        {props.selectedItem?.product?.toUpperCase()}
      </Text>

      <View style={styles.containerTwo}>
        <View style={{flex: 1}}>
          <Text style={[styles.headerTitle, {marginLeft: 15}]}>
            WT/QTY : {props.selectedItem?.quantity}
          </Text>

          <View
            style={{flexDirection: 'row', paddingLeft: 15, paddingRight: 8}}>
            <Text style={styles.headerTitle}>
              MRP : {props.selectedItem?.mrp}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 10,
                color: 'black',
                marginTop: 4,
                marginLeft: 10,
              }}>{`[incl of all taxes]`}</Text>
          </View>
{props?.selectedItem?.ingredients?.length > 0 ?
          <View
            style={{
              paddingLeft: 15,
              paddingRight: 8,
              height: '20%',
              paddingTop: 2,
            }}>
            <FlatList
              data={props?.selectedItem?.ingredients}
              showsVerticalScrollIndicator={false}
              horizontal={false}
              numColumns={4}
              keyExtractor={index => {
                `printer-item-${index}`;
              }}
              renderItem={({item, index}) => {
                return (
                  <Text
                    style={{
                      fontSize: 8,
                      color: 'black',
                    }}>
                    {index === 0 ? 'ING :' : null} {item?.value}
                    {index !== props.selectedItem?.ingredients.length - 1
                      ? ','
                      : null}
                  </Text>
                );
              }}
            />
          </View> : null}

          <Text style={[styles.headerTitle, {fontSize: 12, marginLeft: 15}]}>
            Pkd Date : {moment().format('DD-MM-YYYY')}
          </Text>
          <Text
            style={{
              fontSize: 9,
              color: 'black',
              marginLeft: 15,

              fontWeight: 'bold',
            }}>
            Batch No : {props.batchNo}
          </Text>
          <Text
            style={{
              fontSize: 8,
              color: 'black',
              marginLeft: 15,
            }}>
            {`Best Before ${props?.selectedItem?.dateBeforeUse} Day From Pkd`}
          </Text>
        </View>
        <View style={styles.containerThree}>
          <Text style={styles.nutritionText}>
            Nutritional Facts <Text style={{fontSize: 7}}>per 100 gm</Text>
          </Text>
          <View style={{height: 1, backgroundColor: 'black'}} />

          <FlatList
            data={props.selectedItem?.nutritionalFacts}
            renderItem={renderItem}
            keyExtractor={item => {
              `printer-item-${item?.id}`;
            }}
          />
        </View>
      </View>
      <View
        style={{
          height: 2,
          backgroundColor: 'black',
          marginHorizontal: 10,
          marginTop: -responsiveHeight(2),
        }}
      />
      <Text
        style={{
          color: 'black',
          fontWeight: '700',
          fontSize: 8,
          textAlign: 'center',
          marginTop: 2,
          zIndex: 5,
        }}>
        MFD By : SREE NANDAAS FOODS INDIA PVT.LTD. ULLOOR, THIRUVANANTHAPURAM
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '82%',
          alignSelf: 'center',
          marginLeft: 5,
        }}>
        <View style={{flexDirection: 'row', marginLeft: -7}}>
          <Image
            source={Images.FSSAI_ICON}
            style={{
              width: 20,
              height: 15,
              resizeMode: 'center',
              backgroundColor: '#fff',
              marginTop: -1,
            }}
          />
          <Text
            style={{
              color: 'black',
              fontWeight: '700',
              fontSize: 7,
              textAlign: 'center',
              marginTop: 2,
              marginLeft: 5,
            }}>
            Lic No: 11322001000379
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginLeft: -7}}>
          <Image
            source={Images.PHONE}
            style={{width: 7, height: 7, marginTop: 3.5, marginRight: 2}}
          />
          <Text
            style={{
              color: 'black',
              fontWeight: '700',
              fontSize: 7,
              textAlign: 'center',
              marginTop: 2,
            }}>
            {' '}
            96330 33000
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginLeft: -7}}>
          <Image
            source={Images.EMAIL}
            style={{width: 7, height: 7, marginTop: 3.5, marginRight: 2}}
          />
          <Text
            style={{
              color: 'black',
              fontWeight: '700',
              fontSize: 7,
              textAlign: 'center',
              marginTop: 2,
            }}>
            {' '}
            info@sreenandhaas.com
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StickerComponent;

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
    marginTop: 5,
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
    fontSize: 16,
    color: 'black',
  },
  containerTwo: {
    flexDirection: 'row',
  },
  containerThree: {
    borderWidth: 1,
    borderColor: 'black',
    paddingBottom: 5,
    marginRight: 5,
    height: '80%',
  },
  nutritionText: {
    fontSize: 10,
    color: 'black',
    marginHorizontal: 4,
    fontWeight: 'bold',
  },
});
