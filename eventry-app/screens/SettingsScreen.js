import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { onSignOut } from '../auth/fakeAuth.js';
import LoginButton from '../components/LoginButton.js';
import { ImageBackground, Dimensions, TouchableHighlight, Text, View, AsyncStorage, ActivityIndicator, StatusBar} from 'react-native';

let {width,height} = Dimensions.get('window');

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    //title: 'app.json',
    header:null
  };

  render() {
    return <View>
    < TouchableHighlight style = {
      {
        backgroundColor: "#39579a",
        width: width * (8 / 10),
        padding: 10,
        marginLeft: width * (1/10),
        marginTop: 30,
      }
    }
    onPress = {
      () => {
        onSignOut().then(() => {
          this.props.navigation.navigate("LoginScreen");
          this.setState({
            screenLoading: false,
          });
        });
      }
    }
    underlayColor = "#34508C" >
    <LoginButton icon = {"logo-facebook"} loginText = {"SIGN mE THE fuck Out"}/>
    </TouchableHighlight >
    </View>
  }
}
