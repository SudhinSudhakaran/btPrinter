import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
const LoadingIndicator = ({visible}) => {
  return (
   <Modal style={{flex:1,}} visible={visible}>
   <ActivityIndicator size={'large'} color={'green'} />

   </Modal>
  )
}

export default LoadingIndicator

const styles = StyleSheet.create({})