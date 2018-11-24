import React, {Component} from 'react';
import { ImageBackground, Tile, Card, TouchableOpacity, Title, Subtitle, Divider, Row, Overlay, Caption, Heading, Button, Icon} from '@shoutem/ui'
import {Header, Left, Right, Container, Body} from 'native-base'
import {View as SView, Text as SText, Image as SImage} from '@shoutem/ui'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
  View,
  ListView,
  RefreshControl,
  ActivityIndicator,
  FlatList
} from 'react-native';
import QRCode from 'react-native-qrcode';

import ActionButton from 'react-native-circular-action-menu';
import IonIcon from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class QRCodeScreen extends React.Component {
    constructor(props){
      super(props);
      this.state ={ isLoading: true};
    }

    static navigationOptions = {
      header: null,
    };


  _onRefresh() {
    this.setState({refreshing: true});
    fetch('http://eventry-dev.us-west-2.elasticbeanstalk.com/events', {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          EventJson: responseJson,
        }, function(){
          console.log('REFRESHIN');
        });

      }).then(() => {
        this.setState({refreshing: false});
      });
    }

  componentDidMount(){
    return fetch('http://eventry-dev.us-west-2.elasticbeanstalk.com/events', {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          EventJson: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    var rcolor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    return (
      <View style={styles.container}>
        <Header style={{backgroundColor: 'white'}}>
        <Left>
          <Icon name="sidebar" onPress={()=>this.props.navigation.openDrawer()}/>
        </Left>
        <Body>
        <Title>EVENTRY</Title>
        </Body>
        <Right></Right>
      </Header>1
      <FlatList>
              <View style={{ backgroundColor: rcolor, flex: 0.3, }}></View>
              
      </FlatList>
      <ActionButton buttonColor="rgba(76,127,178,0.68)">
      <ActionButton.Item buttonColor='#B1D8ED' title="New Event" onPress={() => this.props.navigation.navigate('LinksPage')}>
        <IonIcon name="md-add" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#95C8DB' title="New Chat"
      onPress={() => this.props.navigation.navigate('Home')}>
        <IonIcon name="ios-chatbubbles-outline" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#5FACBE' title="QR Camera"
      onPress={() => this.props.navigation.navigate('QRCameraPage')}>
        <IonIcon name="ios-camera-outline" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#2181A1' title="Starred Events" onPress={() => {}}>
        <IonIcon name="md-star" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#035D75' title="My Profile" onPress={() => {}}>
        <IonIcon name="md-person" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
    </View>
    );
  }
}


const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      header:{
          backgroundColor: '#fff',
          flex: 0.35,
        },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:140
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
      flex: 1,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#00BFFF",
    },
});
