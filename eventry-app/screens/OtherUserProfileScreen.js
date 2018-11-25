import React, {Component} from 'react';
import { ImageBackground, Tile, Card, TouchableOpacity, InlineGallery, Title, Subtitle, Divider, Row, Overlay, Caption, Heading, Button, Icon} from '@shoutem/ui'
import {Header, Left, Right, Container, Body} from 'native-base'
import {View as SView, Text as SText, Image as SImage, Button as SButton} from '@shoutem/ui'
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
import ParallaxScrollView from 'react-native-parallax-scrollview';

import ActionButton from 'react-native-circular-action-menu';
import IonIcon from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class OtherUserProfileScreen extends React.Component {
    constructor(props){
      super(props);
    }

    static navigationOptions = {
      header: null,
    };

  render() {
    var rcolor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

    return (
      <View style={styles.container}>
      <ParallaxScrollView
        windowHeight={height * 0.4}
        backgroundSource={{uri: "https://www.androidcentral.com/sites/androidcentral.com/files/styles/larger/public/article_images/2016/06/midngiht-city-material-wall.jpg?itokx3ds_cbP4x7"}}
        navBarTitle='  '
        navBarTitleColor='black'
        navBarColor='white'
        userName="username"
        userTitle='Vancouver, BC'
        userImage='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKFywLFGZpIlGL4OH3ADorjBp5lZQXmTSizkC3fFnC5Xml1jtd'
        leftIcon={<Icon name="sidebar"/>}
      >
       <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{height: height*0.1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <SView styleName="horizontal">
            <Button styleName="confirmation secondary">
              <SText>MESSAGE</SText>
            </Button>
              </SView>
          </View>
          <View style={{height: height*0.4, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <Divider styleName="line"
                     style={{backgroundColor: 'white', marginRight: 10, marginLeft: 10}}>
              <Caption>USER BIO</Caption>
            </Divider>
            <Divider style={{height: 1}}/>
            <SText style={{marginLeft: 10, marginRight: 10}}>Bio bio bio bio bio userbio bio bio bion woohoo bio bio bio bleh bleh user bio is very nice great awesome fantastic incredible amazing fascinating revolutionary interesting good great nice clever insightful well-written.</SText>
            <Divider style={{height: 1}}/>
            <Divider styleName="line"
                     style={{backgroundColor: 'white', marginRight: 10, marginLeft: 10}}>
              <Caption>USER STATS</Caption>
            </Divider>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white'}}>
              <SButton styleName="stacked clear"
                        style={{marginTop: 15, marginRight:10 }}>
                <SText style={{fontSize: 60, color: "#5FACBE"}}>110</SText>
                <SText>Attended Events</SText>
              </SButton>
              <SButton styleName="stacked clear"
                        style={{marginTop: 15, marginLeft: 10}}>
              <SText style={{fontSize: 60, color: "#5FACBE"}}>5</SText>
              <SText>Hosted Events</SText>
              </SButton>
              </View>
          </View>
          <Divider styleName="line"
                   style={{backgroundColor: 'white', marginRight: 10, marginLeft: 10}}>
            <Caption>USER LINKS</Caption>
          </Divider>
          <View style={{height: height*0.25, marginLeft: 10, marginRight: 10}}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Button styleName="stacked clear">
                <Icon name="address" />
                <SText>Hosted Events</SText>
              </Button>
              <Button styleName="stacked clear">
                <Icon name="users" />
                <SText>Attending Events</SText>
              </Button>
              <Button styleName="stacked clear"
                      onPress={() => this.props.navigation.navigate('FavouritesPage')}>
                <Icon name="add-to-favorites-on" />
                <SText>Starred Event</SText>
              </Button>
              </View>
             </View>
         </ScrollView>
      </ParallaxScrollView>
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
      <ActionButton.Item buttonColor='#2181A1' title="Starred Events" onPress={() => this.props.navigation.navigate('FavouritesPage')}>
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
