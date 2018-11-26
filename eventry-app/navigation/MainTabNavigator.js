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
import UserProfileScreen from '../screens/UserProfileScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import EventDescriptionScreen from '../screens/EventDescriptionScreen';
import SignOutScreen from '../screens/SignOutScreen';
import ChatScreen from '../screens/ChatScreen';
import OtherUserProfileScreen from '../screens/OtherUserProfileScreen';
import UserListScreen from '../screens/UserListScreen';
import HostedEventsScreen from '../screens/HostedEventsScreen';
import EditUserScreen from '../screens/EditUserScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  EventDescriptionPage: EventDescriptionScreen,
  UserScreen: OtherUserProfileScreen,
  UserList: UserListScreen,
});

const QRStack = createStackNavigator({
  QRPage: QRScreen,
  QRCodePage: QRCodeScreen,
  LinksPage: LinksScreen,
  QRCameraPage: QRCameraScreen,
  //Chat
  HomePage: HomeScreen,
  SignOutPage: SignOutScreen,
  ChatPage: ChatScreen,
  EventDescriptionPage: EventDescriptionScreen,
}, {
  initialRouteName: "QRPage",
});


const ProfileStack = createStackNavigator({
  UserProfilePage: UserProfileScreen,
  LinksPage: LinksScreen,
  QRCameraPage: QRCameraScreen,
  FavouritesPage: FavouritesScreen,
  SignOutPage: SignOutScreen,
  EditPage: EditUserScreen,
  ChatPage: ChatScreen
}, {
  initialRouteName: "UserProfilePage",
});

const SignOutStack = createStackNavigator({
  UserProfilePage: UserProfileScreen,
  LinksPage: LinksScreen,
  QRCameraPage: QRCameraScreen,
  FavouritesPage: FavouritesScreen,
  SignOutPage: SignOutScreen,
  ChatPage: ChatScreen
}, {
  initialRouteName: "SignOutPage",
});

const ChatStack = createStackNavigator({
  UserProfilePage: UserProfileScreen,
  LinksPage: LinksScreen,
  QRCameraPage: QRCameraScreen,
  FavouritesPage: FavouritesScreen,
  SignOutPage: SignOutScreen,
  ChatPage: ChatScreen
}, {
  initialRouteName: "ChatPage",
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
  'Registered Events': QRStack,
  Profile: ProfileStack,
  Chat: ChatStack,
  SignOut: SignOutStack,
  UserList: UserListScreen,
  HostedList: HostedEventsScreen,
},
{
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    activeTinyColor: 'white'
  }
});
