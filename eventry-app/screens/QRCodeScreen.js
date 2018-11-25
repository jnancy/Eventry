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
import QRCode from 'react-native-qrcode';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// RETRIEVE ID!!!!

export default class QRCodeScreen extends React.Component {
    constructor(props){
      super(props);

      this.state ={ 
        isLoading: true,
        Authkey: ''
      };
    }

    static navigationOptions = {
      header: null,
    };

  _onRefresh() {
    this.setState({refreshing: true});
    fetch('http://eventry-dev.us-west-2.elasticbeanstalk.com/events', {
      method: 'GET',
      headers: {
        'Authorization': "Token " + this.state.Authkey
      },
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
    return fetch('http://eventry-dev.us-west-2.elasticbeanstalk.com/events', {
      method: 'GET',
      headers: {
        'Authorization': "Token " + this.state.Authkey
      }
    })
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

  _getID = async () =>{
    
    var value = await AsyncStorage.getItem('userID');
    if (value != null){
      console.log(value);
      return value;
    }
  }

  render() {
    
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          {this._getID()}
          <ActivityIndicator/>
        </View>
      )
    }

    const {goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
       {this._getID()}
      <Header style={{backgroundColor: 'white'}}>
          <Left>
            <Icon name="sidebar" onPress={()=>this.props.navigation.openDrawer()}/>
          </Left>
          <Body>
          <Title>EVENTRY</Title>
          <Subtitle>QR CODE</Subtitle>
          </Body>
          <Right></Right>
      </Header>
      <Divider />
      <SView style={{flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around', alignSelf: 'center'}}>
      <View style={{flex: 1,alignItems: 'center'}}>
      <Divider />
              <QRCode
                value={("{\"event_id\": " + this.props.navigation.state.params.value.id + ", \"attendee\": \"" + this.props.navigation.state.params.value.event_name + "\" }").toString()}
                size={width*0.7}
                bgColor='grey'
                fgColor='white'
              />
          <Divider />
          <Divider />
          <Divider />
          <Title styleName="bold" >EVENTRY TICKET</Title>
          <Divider />
          <SView styleName="horizontal">
            <Button styleName="confirmation" style={{ borderColor: 'black', borderWidth: 1}}>
              <SText>UNREGISTER</SText>
            </Button>
            <Button styleName="confirmation secondary"
                    onPress={() => goBack()}>
              <SText>DONE</SText>
            </Button>
          </SView>
          <Divider />
          <SView styleName="vertical">
          <Button styleName="stacked clear">
            <Icon name="social-wall" />
            <SText>Chat with other Attendees</SText>
          </Button>

          </SView>
        <Divider />
      </View>
      </SView>
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
