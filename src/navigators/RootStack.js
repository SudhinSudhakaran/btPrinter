import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SelectBluetoothScreen,
  AddUserScreen,
  PreviewScreen,
  Home,
  BluetoothScreen,
  Bluetooth,
  HomeScreen,
  FindPrinter,
  ProductList,
  AddProducts,
  ProductListScreen,
  UserListScreen,
} from '../screens';

const Stack = createNativeStackNavigator();
const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}  >
      <Stack.Screen name="Home" component={Home} />
      {/* <Stack.Screen name="ProductList" component={ProductList} /> */}
      <Stack.Screen name="AddProducts" component={AddProducts} />
      <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
      <Stack.Screen name="BluetoothScreen" component={BluetoothScreen} />
      <Stack.Screen name="Bluetooth" component={Bluetooth} />
      <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
      <Stack.Screen name="ProductListScreen" component={ProductListScreen} />
      <Stack.Screen name="UserListScreen" component={UserListScreen} />
      <Stack.Screen
        name="SelectBluetoothScreen"
        component={SelectBluetoothScreen}
      />
      <Stack.Screen
        name="FindPrinter"
        options={{
          headerTitle: 'Find Printer',
        }}
        component={FindPrinter}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
