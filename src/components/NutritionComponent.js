import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const NutritionComponent = ({item}) => {
  // console.log('item==>', item);
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingTop: -1,
        height: responsiveHeight(2),
        
      }}>
      <View style={{flex: 1}}>
        <Text style={styles.nutritionText}>{item?.title || ''}</Text>
      </View>
      <View style={{flexDirection: 'row', width: '40%'}}>
        <View style={{flex: 1}}>
          <Text style={[styles.nutritionText, {textAlign: 'right'}]}>
            {item?.value || ''}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.nutritionText}>{item?.unit || ''}</Text>
        </View>
      </View>
    </View>
  );
};

export default NutritionComponent;

const styles = StyleSheet.create({
  nutritionText: {
    fontSize: 10,
    color: 'black',
    marginHorizontal: 4,
  },
});
