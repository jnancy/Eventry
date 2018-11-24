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

const default_avatars = ['data:image/png;base64,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', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjGMUtibQ5dpwZE2ksi26LG4AhN7ix8urTxTb2_4os8T6ucycb', 'data:image/png;base64,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', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKFywLFGZpIlGL4OH3ADorjBp5lZQXmTSizkC3fFnC5Xml1jtd', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-6wOL0HGj3DLwrc-fKSkw6BH5qmrW0Zqjy9MGF1wDdHGzP3ce',"https://www.shareicon.net/download/2016/07/05/791211_man_512x512.png" ]

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
    const avatar =  default_avatars[Math.floor(Math.random()*10)]
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
      </Header>
        <View style={{ backgroundColor: rcolor, flex: 0.3, }}></View>
        <Image style={styles.avatar} source={{uri: default_avatars[Math.floor(Math.random()*6)] }}/>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>First Last</Text>
            <SText style={{fontSize:16, color: rcolor,  marginTop:10, fontWeight:"bold"}}>Event Host / Attendee</SText>
            <Divider/>
            <SText style={{fontSize:16, textAlign: 'center'}}>Brief user description and whatever the user wants on their profile this is just to fill some space and make this look more and more and more and more legit.</SText>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Button styleName="stacked clear">
                <Icon name="trophy" />
                <SText>Hosted Events</SText>
              </Button>
              <Button styleName="stacked clear">
                <Icon name="users" />
                <SText>Attended Events</SText>
              </Button>
              <Button styleName="stacked clear">
                <Icon name="add-to-favorites-on" />
                <SText>Starred Events</SText>
              </Button>
           </View>
           <Divider styleName="line">
            <Caption>MOST RECENT EVENT</Caption>
          </Divider>
          <View style={{flex: 1, flexDirection: 'row', justifyContent:'center', marginBottom: 50}}>
              <Row>
                <SImage
                  styleName="small rounded-corners"
                  source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-10.png' }}
                />
                <View styleName="vertical stretch space-between">
                <Subtitle>The Please Send Help Event</Subtitle>
                <Caption>4 attendees</Caption>
                <Caption>20 hours ago</Caption>
              </View>
          </Row>
          </View>
          </View>
      </View>

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
