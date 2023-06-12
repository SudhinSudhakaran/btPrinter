import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const SecondView = props => (
  <View
    style={{
      flexDirection: 'row',
      height: responsiveHeight(6),
      alignItems: 'center',
      marginTop: responsiveHeight(3),
    }}>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text style={[styles.text, {marginLeft: 10}]}>{props?.title} </Text>
      <Text style={[styles.text, {}]}> : </Text>
    </View>

    <View
      style={{
        flex: 1,
      }}>
      <Text style={[styles.text, {}]}> {props?.value || ''}</Text>
    </View>
  </View>
);

export default SecondView

const styles = StyleSheet.create({
  text: {
    fontSize: responsiveFontSize(3),
    color: 'black',
    fontWeight: 'bold',
  },
});
