import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Settings, AddProducts} from '../screens';
import RootStack from './RootStack';
import {ProductListScreen, UserListScreen} from '../screens';
import {Linking, Alert, BackHandler} from 'react-native';
import StorageManager from '../storageManager/StorageManager';
import {useNavigation} from '@react-navigation/native';
import {Globals} from '../constant';
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const logoutAction = () => {
    StorageManager.clearUserRelatedData().then(() => {
      console.log('Logged out');
      navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      });
    });
  };
  const logOut = () => {
    Alert.alert('Log out', 'Are you sure you want logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          logoutAction();
        },
      },
    ]);
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => logOut()} />
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      backBehavior={'history'}
      screenOptions={{headerShown: false}}
      initialRouteName="RootStack"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="RootStack"
        component={RootStack}
        options={{
          title: 'Home',
          headerShown: false,
          drawerItemStyle: {marginTop: 30},
        }}
      />

      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Products" component={ProductListScreen} />
      <Drawer.Screen name="Users" component={UserListScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
