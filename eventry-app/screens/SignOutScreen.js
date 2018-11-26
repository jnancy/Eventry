import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { onSignOut } from '../auth/fakeAuth.js';
import LoginButton from '../components/LoginButton.js';
import {Header, Left, Right, Container, Body} from 'native-base'
import { Tile, TouchableOpacity, Title, Subtitle, Divider, Row, Overlay, Caption, Heading, Button, Icon} from '@shoutem/ui'
import { ImageBackground, Dimensions, TouchableHighlight, Text, View, AsyncStorage, ActivityIndicator, StatusBar} from 'react-native';

let {width,height} = Dimensions.get('window');

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  render() {
    return <View>
    <Header style={{backgroundColor: 'white'}}>
    <Left>
      <Icon name="sidebar" onPress={()=>this.props.navigation.openDrawer()}/>
    </Left>
    <Body>
    <Title>EVENTRY</Title>
    </Body>
    <Right></Right>
    </Header>
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
        console.log("signed out" + AsyncStorage.getItem("userID"));
        onSignOut().then(() => {
          this.props.navigation.navigate("LoginScreen");
          this.setState({
            screenLoading: false,
          });
        });
      }
    }
    underlayColor = "#222" >
    <LoginButton icon = {"ios-star"} loginText = {"Confirm Sign Out"}/>
    </TouchableHighlight >
    </View>
  }
}
