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

export default class QRCodeScreen extends React.Component {
    constructor(props){
      super(props);
    }

    static navigationOptions = {
      header: null,
    };


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
                value={this.props.navigation.state.params.value.event_name}
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
              <SText>UNREGISTER EVENT</SText>
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
