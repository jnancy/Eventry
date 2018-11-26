import React, {Component} from 'react';
import { ImageBackground, Tile, TouchableOpacity, Title, Subtitle, Divider, Row, Overlay, Caption, Heading, Button, Icon} from '@shoutem/ui'
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

import ActionButton from 'react-native-circular-action-menu';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { AsyncStorage } from "react-native"

const pics = ['https://shoutem.github.io/img/ui-toolkit/examples/image-7.png', 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png', 'https://shoutem.github.io/img/ui-toolkit/examples/image-5.png', 'https://shoutem.github.io/img/ui-toolkit/examples/image-9.png', 'https://shoutem.github.io/img/ui-toolkit/examples/image-4.png',
"https://shoutem.github.io/static/getting-started/restaurant-6.jpg", "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" ,  "https://shoutem.github.io/static/getting-started/restaurant-4.jpg" , "https://shoutem.github.io/static/getting-started/restaurant-3.jpg",  "https://shoutem.github.io/static/getting-started/restaurant-2.jpg",
"https://shoutem.github.io/static/getting-started/restaurant-1.jpg" ]

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class HostedEventsScreen extends React.Component {
    constructor(props){
      super(props);
      this.state ={
        isLoading: true,
        refreshing: false,
        gotID: false,
        Authkey: ''
      };
    }

  static navigationOptions = {
    header: null,
  };

  _getID = async () =>{
    var value = await AsyncStorage.getItem('userID');
    console.log("here" + value);
    if (value != null){
      console.log(value);
      return value;
    }
    else{
      //default key
      return "6dda5d77c06c4065e60c236b57dc8d7299dfa56f";
    }
  }

  async _onRefresh() {
    this.setState({refreshing: true});
    if(!this.state.gotID){
      let Authkey = await this._getID();
      this.setState({Authkey: Authkey, gotID: true});
    }
    let hosting = 'http://eventry-dev.us-west-2.elasticbeanstalk.com/events/hosting/';
    fetch(hosting, {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + this.state.Authkey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include'
    })
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
    this._onRefresh();
  }

  _onSearchPressed(item){
    const event = item;
    console.log(item);
    this.props.navigation.navigate('QRCodePage',
      {value: event});
  };

  _onEventPressed(item){
    const event = item;
    console.log(item);
    this.props.navigation.navigate('EventDescriptionPage',
      {value: event});
  };

  _onDeletePressed(item){
    console.log("Need to add to this function");
  };

  renderRow(item){
    //console.log(item);
    return (
      <TouchableOpacity
        onPress={() => this._onEventPressed(item) }>
      <Row>
        {(item.event_media.length == 0 || item.event_media == null || item.event_media == undefined)?
        <SImage
          styleName="medium rounded-corners"
          source={{ uri: pics[Math.floor(Math.random()*10)]  }}
        />
        :
        <SImage
          styleName="medium rounded-corners"
          source={{ uri: item.event_media[0].image}}
        />
        }
        <View style={{flexDirection:'row', flex: 1, justifyContent: 'space-around'}}>
        <View style={{alignSelf: 'flex-start', flexDirection: 'row',  flex: 2}}>
            <View style={{flexDirection:'column', justifyContent:'space-around', width: width*0.7}}>
              <Subtitle>{item.event_name}</Subtitle>
              <View style={{flexDirection:'column', alignItems:'flex-start', justifyContent:'space-around'}}>
                <Caption>{new Date(item.event_start_time).toString().substring(4,21)}</Caption>
                <Caption>{item.event_address}</Caption>
              </View>
            </View>
        </View>
        </View>
      </Row>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
          <Header style={{backgroundColor: 'white'}}>
          <Left>
            <Icon name="sidebar" onPress={()=>this.props.navigation.openDrawer()}/>
          </Left>
          <Body>
          <Title>EVENTRY</Title>
          <Subtitle>My Hosted Events</Subtitle>
          </Body>
          <Right></Right>
          </Header>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}/>}
              data={this.state.EventJson}
              renderItem={({item}) => this.renderRow(item)}
              keyExtractor={(item, index) => index}
            />
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
});
