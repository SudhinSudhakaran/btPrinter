import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const CustomButton = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.captureSticker()}
      disabled={props.selectedItem === '' ? true : false}
      style={{
        alignSelf: 'center',
        backgroundColor: props.selectedItem === '' ? 'gray' : '#1E2349',
        marginTop: responsiveHeight(4),
      }}>
      <Text
        style={{
          marginHorizontal: 30,
          marginVertical: 10,
          color: '#fff',
        }}>
        {props?.title || 'Press'}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton

const styles = StyleSheet.create({})