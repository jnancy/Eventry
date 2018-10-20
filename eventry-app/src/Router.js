import React from "react";
import {
  Platform,
  StatusBar
} from "react-native";
import {
  StackNavigator,
  TabNavigator,
  SwitchNavigator
} from "react-navigation";

import AppNav from './navigation/AppNavigator';
import LoginScreen from "./screens/LoginScreen.js";

export const SignedIn = AppNav;

export const createRootNavigator = (signedIn = false, handleNotificaion) => {
  let _initialRouteName = null;
  if (signedIn) {
    _initialRouteName = "SignedIn";
  } else {
    _initialRouteName = "LoginScreen";
  }

  return SwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
    LoginScreen
    },
    {
      initialRouteName: _initialRouteName
    }
  );
};
