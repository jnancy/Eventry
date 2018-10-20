import React from 'react';
import { ImageBackground, Dimensions, TouchableHighlight, Text, View, AsyncStorage, ActivityIndicator, StatusBar} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import LoginButton from '../components/LoginButton.js';
import { onSignIn, storeUserID } from '../auth/fakeAuth.js';

/*import {
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID
} from 'react-native-dotenv';*/

import {Permissions, Notifications} from 'expo';

let {width,height} = Dimensions.get('window');

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      successfulAuth: false,
      screenLoading: false,
    };
  }


  /*    signInWithGoogleAsync = async () => {
          this.setState({
              screenLoading: true,
          })
          console.log("loading screen...");
          try {
            const result = await Expo.Google.logInAsync({
              androidClientId:ANDROID_CLIENT_ID,
              iosClientId:IOS_CLIENT_ID,
              scopes: ["profile", "email"]
            });

            if (result.type === "success") {
              const { idToken, accessToken } = result;
              const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
              this.setState({
                  successfulAuth: true,
              });
              const firebaseRes = await firebase
                .auth()
                .signInAndRetrieveDataWithCredential(credential)
                .catch(error => {
                  console.log("firebase cred err:", error);
                });
              onSignIn();
              userid = firebaseRes.user.uid;
              if(firebaseRes.additionalUserInfo.isNewUser) {
                  newUserStoreData(userid);
              }
              console.log(userid);
              storeUserID(userid);
              await this.registerForPushNotificationsAsync(userid);
            } else {
              return { cancelled: true };
            }
          } catch (err) {
            console.log("err:", err);
          }
        };*/

  render() {
    if (this.state.screenLoading) {
      return ( <
        View style = {
          styles.container
        } >
        <
        ActivityIndicator / >
        <
        StatusBar barStyle = "default" / >
        <
        /View>
      );
    }

    return ( <
      ImageBackground source = {
        require('../img/login.jpg')
      }
      style = {
        {
          width: '100%',
          height: '100%'
        }
      } >
      <
      View style = {
        {
          flex: 1
        }
      } >
      <
      View style = {
        {
          flexDirection: 'row',
          justifyContent: 'center',
          height: 50,
          alignItems: 'center',
          marginTop: height / 5
        }
      } >
      <
      Ionicons name = "ios-pin"
      size = {
        50
      }
      color = "#1f5fa5"
      style = {
        {
          marginRight: 5
        }
      }
      /> <
      Text style = {
        {
          color: '#1f5fa5',
          fontSize: 50,
  //        fontFamily: 'Roboto',
        }
      } >
      Naloxone <
      /Text> < /
      View > <
      View style = {
        {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: height * (1 / 5),
        }
      } >
      <TouchableHighlight style = {
        {
          backgroundColor: "#de1f00",
          width: width * (8 / 10),
          padding: 10,
        }
      }
/*      onPress = {
        () => {
          this.signInWithGoogleAsync().then(() => {
            if (this.state.successfulAuth === true) {
              console.log("auth successful");
              this.props.navigation.navigate("SignedIn");
            } else {
              console.log("failed auth");
              this.setState({
                screenLoading: false,
              });
            }
          });
        }
      }*/
      underlayColor = "#CA1D00" >
      <
      LoginButton icon = {
        "logo-google"
      }
      loginText = {
        "Sign in with Google"
      }
      /> < /
      TouchableHighlight > <
      TouchableHighlight style = {
        {
          backgroundColor: "#39579a",
          width: width * (8 / 10),
          padding: 10,
          marginTop: 10,
        }
      }
      onPress = {
        () => {
          onSignIn().then(() => {
            this.props.navigation.navigate("SignedIn");
            this.setState({
              screenLoading: false,
            });
          });
        }
      }
      underlayColor = "#34508C" >
      <
      LoginButton icon = {
        "logo-facebook"
      }
      loginText = {
        "Sign in with Facebook"
      }
      /> < /
      TouchableHighlight > <
      /View> < /
      View > <
      /ImageBackground>
    );
  }
}
