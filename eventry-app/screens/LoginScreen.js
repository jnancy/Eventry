import React from 'react';
import {TextInput, Image, ImageBackground, Dimensions, TouchableHighlight, Text, View, AsyncStorage, ActivityIndicator, StatusBar} from 'react-native';
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
      username:'',
      password:''
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
      return (
        <View style = { styles.container } >
          <ActivityIndicator / >
          <StatusBar barStyle = "default" / >
        </View>
      );
    }

    return (
      <ImageBackground source = {require('../img/login2.jpg')} style = {{ width: '100%', height: '100%'}} >
      <View style = {{ flex: 1 }} >
        <View style = {{flexDirection: 'row', justifyContent: 'center', height: 60, alignItems: 'center', marginTop: height / 5 }} >
          <Image source = {require('../img/e.jpg')} style={{width: 70, height: 70}}/>
          <Text style = {{ color: '#ffffff', fontSize: 50, /* fontWeight: '100', fontFamily: 'lucida grande'*/ }} >
            Eventry
          </Text>
        </View >

        <View style = {{flexDirection: 'column', alignItems: 'center', marginTop: height/20}} >
          <TextInput
            style={{
              height: 40,
              color: 'white',
              borderColor: 'white',
              borderBottomWidth: 1,
              width: width*7/10,
              fontSize: 15,
            }}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            placeholder='Username'
            placeholderTextColor='#fff'
          />
          <TextInput
            style={{
              height: 40,
              color: 'white',
              borderColor: 'white',
              borderBottomWidth: 1,
              width: width*7/10,
              fontSize: 15,
            }}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            placeholder='Password'
            placeholderTextColor='#fff'
          />
          <TouchableHighlight
            style = {{
              backgroundColor: "rgba(255, 255, 255, 0.51)",
              width: width * (7 / 10),
              padding: 10,
              marginTop: 20,
              borderRadius: 15,
            }}
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
            underlayColor = "rgba(115, 115, 115, 0.63)" >
            <Text style={{textAlign: 'center', color: '#425187', fontSize: 15, fontWeight: 'bold'}}> LOGIN </Text>
          < /TouchableHighlight >
        </View>


        <View style = {{flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: height * (1 / 5),
        }} >


          <TouchableHighlight style = {{
          backgroundColor: "#de1f00",
          width: width * (8 / 10),
          padding: 10,
        }}
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
      underlayColor = "#CA1D00" >
      <LoginButton icon = {"logo-google" }/>
      < /TouchableHighlight >
      < TouchableHighlight style = {
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
      <LoginButton icon = {"logo-facebook"}/>
      < /TouchableHighlight >
      </View>
      < /View >
      </ImageBackground>
    );
  }
}
