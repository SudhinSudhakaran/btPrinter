import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const Input = React.forwardRef((props, ref) => {
  const {placeHolder, errorText, style, onSubmitEdit, onChangeText, autoFocus} =
    props;
  console.log('ref=>', ref);
  const _setState = value => {
    onChangeText(value);
  };
  useEffect(() => {}, []);

  return (
    <View style={{marginTop: 8, paddingTop: 2}}>
      <View style={[styles.inputContainer, {}]}>
        <TextInput
          style={[styles.inputField, style]}
          placeholder={placeHolder}
          ref={ref}
          onChangeText={value => _setState(value)}
          onSubmitEditing={() => setTimeout(() => onSubmitEdit(), 200)}
          autoFocus={autoFocus}
        />
        {/* <TouchableOpacity>
          <Image />
        </TouchableOpacity> */}
      </View>

      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  );
});

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    height: responsiveHeight(6),
    borderWidth: 0.5,

    backgroundColor: 'black',
  },
  inputField: {
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    textAlign: 'right',
    fontSize: 12,
    marginRight: responsiveWidth(5),
  },
});
