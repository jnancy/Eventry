import React from 'react';
import {Alert, KeyboardAvoidingView, TextInput, Image, ImageBackground, Dimensions, TouchableHighlight, Text, View, AsyncStorage, ActivityIndicator, StatusBar} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import LoginButton from '../components/LoginButton';
import FBLoginButton from '../components/FBLoginButton'
import { onSignIn, storeUserID } from '../auth/fakeAuth';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ANDROID_CLIENT_ID = '';
const IOS_CLIENT_ID = '';

import {Permissions, Notifications} from 'expo';

const FBSDK = require('react-native-fbsdk');
const {LoginManager} = FBSDK;

let {width,height} = Dimensions.get('window');

export default class SignupScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      successfulAuth: false,
      screenLoading: false,
      Username:'',
      FirstName:'',
      LastName:'',
      Email:'',
      Password1:'',
      Password2: '',
    };

    this.onSignUp = this.onSignUp.bind(this);
    this.checkResp = this.checkResp.bind(this);
  }

  onSignUp = () => {
    let data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username' : this.state.Username,
        'email' : this.state.Email,
        'password1' : this.state.Password1,
        'password2' : this.state.Password2,
      }),
    }
    fetch('http://eventry-dev.us-west-2.elasticbeanstalk.com/rest-auth/registration/', data).then(response => response.json()).then(json => this.checkResp(json));
  }

  checkResp = (json) => {
    console.log("Resp:" + JSON.stringify(json) );
    if(json.hasOwnProperty('key')){
      this.props.navigation.navigate("LoginScreen");
    }
    else{
      Alert.alert(
        "Signup Failed",
        JSON.stringify(json),
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        { cancelable: false }
      );
    }
  }

  render() {
    if (this.state.screenLoading) {
      return (
        <View style = { styles.container } >
          <ActivityIndicator />
          <StatusBar barStyle = "default" />
        </View>
      );
    }

    return (
      <ImageBackground source = {require('../img/login2.jpg')} style = {{ width: '100%', height: '100%'}} >
      <KeyboardAwareScrollView>
      <View style = {{ flex: 1 }} >
        <View style = {{flexDirection: 'row', justifyContent: 'center', height: 60, alignItems: 'center', marginTop: height / 7 }} >
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
              marginTop: 10,
              borderBottomWidth: 1,
              width: width*7/10,
              fontSize: 15,
            }}
            onChangeText={(Username) => this.setState({Username})}
            value={this.state.Username}
            placeholder='Username'
            placeholderTextColor='#fff'
          />
          <TextInput
            style={{
              height: 40,
              color: 'white',
              borderColor: 'white',
              marginTop: 10,
              borderBottomWidth: 1,
              width: width*7/10,
              fontSize: 15,
            }}
            onChangeText={(FirstName) => this.setState({FirstName})}
            value={this.state.FirstName}
            placeholder='First Name'
            placeholderTextColor='#fff'
          />
          <TextInput
            style={{
              height: 40,
              color: 'white',
              borderColor: 'white',
              marginTop: 10,
              borderBottomWidth: 1,
              width: width*7/10,
              fontSize: 15,
            }}
            onChangeText={(lastName) => this.setState({lastName})}
            value={this.state.lastName}
            placeholder='Last Name'
            placeholderTextColor='#fff'
          />
          <TextInput
            style={{
              height: 40,
              color: 'white',
              borderColor: 'white',
              marginTop: 10,
              borderBottomWidth: 1,
              width: width*7/10,
              fontSize: 15,
            }}
            onChangeText={(Email) => this.setState({Email})}
            value={this.state.Email}
            placeholder='Email'
            placeholderTextColor='#fff'
          />
          <TextInput
            style={{
              height: 40,
              marginTop: 10,
              color: 'white',
              borderColor: 'white',
              borderBottomWidth: 1,
              width: width*7/10,
              fontSize: 15,
            }}
            onChangeText={(Password1) => this.setState({Password1})}
            value={this.state.password}
            placeholder='Password'
            secureTextEntry={true}
            placeholderTextColor='#fff'
          />
          <TextInput
            style={{
              height: 40,
              marginTop: 10,
              color: 'white',
              borderColor: 'white',
              borderBottomWidth: 1,
              width: width*7/10,
              fontSize: 15,
            }}
            onChangeText={(Password2) => this.setState({Password2})}
            value={this.state.Password2}
            placeholder='Re-enter Password'
            secureTextEntry={true}
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
                this.onSignUp();
              }
            }
            underlayColor = "rgba(115, 115, 115, 0.63)" >
            <Text style={{textAlign: 'center', color: '#425187', fontSize: 15, fontWeight: 'bold'}}> SIGNUP </Text>
          </TouchableHighlight >
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
                this.props.navigation.navigate("LoginScreen");
              }
            }
            underlayColor = "rgba(115, 115, 115, 0.63)" >
            <Text style={{textAlign: 'center', color: '#425187', fontSize: 15, fontWeight: 'bold'}}> LOGIN </Text>
          </TouchableHighlight >
        </View>
      </View >
      </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}
