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
// import QRCode from 'react-native-qrcode';
// import QRCodeScanner from 'react-native-qrcode-scanner';

export default class QRCameraScreen extends React.Component {
    constructor(props){
      super(props);
      this.state ={ isLoading: true};
    }

    static navigationOptions = {
      header: null,
    };

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
          <Header style={{backgroundColor: 'white'}}>
          <Left>
            <Icon name="sidebar" onPress={()=>this.props.navigation.openDrawer()}/>
          </Left>
          <Body>
          <Title>EVENTRY</Title>
          <Subtitle>My Events</Subtitle>
          </Body>
          <Right></Right>
          </Header>

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
