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


const pics = ['https://shoutem.github.io/img/ui-toolkit/examples/image-7.png', 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png', 'https://shoutem.github.io/img/ui-toolkit/examples/image-5.png', 'https://shoutem.github.io/img/ui-toolkit/examples/image-9.png', 'https://shoutem.github.io/img/ui-toolkit/examples/image-4.png',
"https://shoutem.github.io/static/getting-started/restaurant-6.jpg", "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" ,  "https://shoutem.github.io/static/getting-started/restaurant-4.jpg" , "https://shoutem.github.io/static/getting-started/restaurant-3.jpg",  "https://shoutem.github.io/static/getting-started/restaurant-2.jpg",
"https://shoutem.github.io/static/getting-started/restaurant-1.jpg" ]


export default class QRPage extends React.Component {
    constructor(props){
      super(props);
      this.state ={ isLoading: true, refreshing: false};
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

  _onSearchPressed(item){
    const event = item;
    console.log(item);
    this.props.navigation.navigate('QRCodePage',
      {value: event});
  };

  renderRow(item){
    //console.log(item);
    return (
      <TouchableOpacity
        onPress={() => this._onSearchPressed(item) }>
      <Row>
        <SImage
          styleName="medium rounded-corners"
          source={{ uri: pics[Math.floor(Math.random()*10)]  }}
        />
        <View styleName="vertical stretch space-between">
          <Subtitle>{item.event_name}</Subtitle>
          <View styleName="horizontal space-between">
            <Caption>In 3 days</Caption>
            <Caption>{item.event_location}</Caption>
          </View>
        </View>
      </Row>
      </TouchableOpacity>
    )
  }

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
            <ActionButton.Item buttonColor='#00a5e5' title="New Event" onPress={() => this.props.navigation.navigate('LinksPage')}>
              <IonIcon name="ios-add-circle-outline" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#0093cc' title="Chat"
            onPress={() => this.props.navigation.navigate('Home')}>
              <IonIcon name="ios-chatboxes" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#0080b2' title="Add Friends"
            onPress={() => this.props.navigation.navigate('Home')}>
              <IonIcon name="ios-person-add" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#006e99' title="Notifications" onPress={() => {}}>
              <IonIcon name="ios-notifications-outline" style={styles.actionButtonIcon} />
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
