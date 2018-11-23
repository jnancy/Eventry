import React from 'react';
import { Platform , StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import QRScreen from  '../screens/QRScreen';
import QRCodeScreen from '../screens/QRCodeScreen';
import QRCameraScreen from '../screens/QRCameraScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  // Event: EventDescriptionScreen
});

const QRStack = createStackNavigator({
  QRPage: QRScreen,
  QRCodePage: QRCodeScreen,
  LinksPage: LinksScreen,
  QRCameraPage: QRCameraScreen,
  //CameraPage:
  //Chat
  HomePage: HomeScreen,
}, {
  initialRouteName: "QRPage",
});

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{flex: 1}}>
    <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center' }}>
      <Image source={require('../assets/images/e.png')} style={{height:120 , width:120, borderRadius:100, marginTop: 20}} />
    </View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
);

export default AppDrawerNavigator = createDrawerNavigator({
  Home: HomeStack,
  QRPage: QRStack,
},
{
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    activeTinyColor: 'white'
  }
});
