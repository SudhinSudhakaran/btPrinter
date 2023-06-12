import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Picker} from '@react-native-picker/picker';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
     const PickerComponent = ({value,setValue}) => {
    return (
      <Picker
        selectedValue={value}
        onValueChange={(itemValue, _itemIndex) => setValue(itemValue)}
        style={{
          flex: 1,
          height: responsiveHeight(4),
          marginTop: -6,
          
        }}>
        <Picker.Item style={styles.pickerItem} label="mg" value="mg" />
        <Picker.Item style={styles.pickerItem} label="g" value="g" />
        <Picker.Item style={styles.pickerItem} label="kg" value="kg" />
        <Picker.Item style={styles.pickerItem} label="nos" value="nos" />
      </Picker>
    );
}

export default PickerComponent

const styles = StyleSheet.create({})