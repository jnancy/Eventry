import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { onSignOut } from '../auth/fakeAuth.js';
import LoginButton from '../components/LoginButton.js';
import { ImageBackground, Dimensions, TouchableHighlight, Text, View, AsyncStorage, ActivityIndicator, StatusBar} from 'react-native';

let {width,height} = Dimensions.get('window');

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    // return <ExpoConfigView />;
    return <View>
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
        onSignOut().then(() => {
          this.props.navigation.navigate("LoginScreen");
          this.setState({
            screenLoading: false,
          });
        });
      }
    }
    underlayColor = "#34508C" >
    <LoginButton icon = {"logo-facebook"} loginText = {"Sign in with Facebook"}/>
    < /TouchableHighlight >
    </View>
  }
}
