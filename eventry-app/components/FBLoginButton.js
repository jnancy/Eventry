import PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, View} from "react-native";
//import styles from "../Style/Style.js";
import { Ionicons } from "@expo/vector-icons";
import { LoginButton } from "react-native-fbsdk";

export default class FBLoginButton extends Component {
  render() {
    return (
      <View>
        <LoginButton
          publishPermissions={["email", "user_friends", "user_location"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + error.message);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions)
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
};

module.exports = FBLoginButton;
