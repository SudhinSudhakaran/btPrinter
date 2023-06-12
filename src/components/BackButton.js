import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import Images from '../constant/Images';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const BackButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress?.()}>
      <Image source={Images.BACK_ARROW} style={styles.buttonIcon} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    width: responsiveWidth(7),
   
    height: responsiveWidth(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    resizeMode: 'cover',
  },
});
