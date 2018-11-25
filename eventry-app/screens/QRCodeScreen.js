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
  FlatList,
  Alert
} from 'react-native';
import QRCode from 'react-native-qrcode';
import { AsyncStorage } from "react-native"

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class QRCodeScreen extends React.Component {
    constructor(props){
      super(props);

      this.state ={ 
        Authkey: ''
      };
    }

    static navigationOptions = {
      header: null,
    };

  async _unregister(id){
    let Authkey = await this._getID();
    this.setState({Authkey: Authkey});
    let unregURL =  'http://eventry-dev.us-west-2.elasticbeanstalk.com/events/' + id + "/unregister/"
    console.log(unregURL);
    fetch(unregURL, {
      method: 'POST',
      headers: {
        'Authorization': "Token " + this.state.Authkey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        },
        credentials: 'include'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        //const {goBack} = this.props.navigation;
        // Alert.alert(
        //   "Status",
        //   responseJson.status,
        //   {text: 'Ok', onPress: () => goBack()},
        //   {cancelable: false }
        // );
        Alert.alert(
          "Status",
          responseJson.status
          );
        //console.log(responseJson);
        this.setState({
          isLoading: false,
          AlertMess : responseJson.status});
      })
      .catch((error) =>{
        console.error(error);
      });
  }

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

  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
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
                value={("{\"event_id\": " + this.props.navigation.state.params.value.id + ", \"attendee\": \"" + this.props.navigation.state.params.Authkey + "\" }").toString()}
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
            <Button styleName="confirmation" style={{ borderColor: 'black', borderWidth: 1}} 
                    onPress = {() => {
                                this._unregister(this.props.navigation.state.params.value.id);
                                }} >
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
