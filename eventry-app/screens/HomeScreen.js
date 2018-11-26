import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  Alert
} from 'react-native';

import { AsyncStorage } from "react-native"
import { Constants, Location, Permissions } from 'expo';
import { ImageBackground, Tile, Title, Subtitle, Divider, Overlay, Caption, Heading, Button, Icon, TouchableOpacity} from '@shoutem/ui'
import {View as SView, Text as SText} from '@shoutem/ui'
import { Header, Left, Right, Container, Body} from 'native-base'

import { SearchBar } from 'react-native-elements'

import ActionButton from 'react-native-circular-action-menu';
import IonIcon from 'react-native-vector-icons/Ionicons';

let {width,height} = Dimensions.get('window');

const pics = ['https://shoutem.github.io/img/ui-toolkit/examples/image-7.png', 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png', 'https://shoutem.github.io/img/ui-toolkit/examples/image-5.png', 'https://shoutem.github.io/img/ui-toolkit/examples/image-9.png', 'https://shoutem.github.io/img/ui-toolkit/examples/image-4.png',
"https://shoutem.github.io/static/getting-started/restaurant-6.jpg", "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" ,  "https://shoutem.github.io/static/getting-started/restaurant-4.jpg" , "https://shoutem.github.io/static/getting-started/restaurant-3.jpg",  "https://shoutem.github.io/static/getting-started/restaurant-2.jpg",
"https://shoutem.github.io/static/getting-started/restaurant-1.jpg" ]

import { Notifications } from 'expo';


async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  console.log("here");
  console.log(token);

}

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      refreshing: false,
      gotID: false,
      Authkey: '',
      location: null,
      errorMessage: null,
    };
  }

    static navigationOptions = {
      header: null,
    };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Try it on your device!',
        });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  async _onRefresh() {

    this.setState({refreshing: true});
    let Authkey = await this._getID();
    this.setState({Authkey: Authkey});
    console.log("PRINT" + Authkey);
    fetch('http://eventry-dev.us-west-2.elasticbeanstalk.com/events/', {
      method: 'GET',
      headers: {
        'Authorization': "Token " + Authkey,
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
          //console.log(responseJson);
          console.log('REFRESHIN');
        });

      }).then(() => {
        this.setState({refreshing: false});

      }).catch((error) =>{
        console.error(error);
      });
    }

  componentDidMount(){
    this._onRefresh();
  }

  _onSearchPressed(item){
    const event = item;
    console.log(item);
    this.props.navigation.navigate('UserProfilePage',
      {value: event});
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

  _onEventPressed(item){
   //registerForPushNotificationsAsync();
    const event = item;
    this.props.navigation.navigate('EventDescriptionPage',
      {
        value: event,
        Authkey: this.state.Authkey
      });
  };

  _register(item){
    let regURL =  'http://eventry-dev.us-west-2.elasticbeanstalk.com/events/' + item.id + "/register/"
    console.log(regURL);
    fetch(regURL, {
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
        Alert.alert(
          "Status",
          responseJson.status,
          [{text: 'Ok', onPress: () => {}}],
          { cancelable: false }
        );
        console.log(responseJson);
        this.setState({isLoading: false});
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
          <SearchBar
            containerStyle={{backgroundColor: '#f2f2f2', borderColor: 'white', borderWidth: 1, borderRadius: 5}}
            inputStyle={{backgroundColor: 'white'}}
            lightTheme
            round
            clearIcon={{ color: 'gray' }}
            searchIcon={false}
            //onChangeText={someMethod}
            //onClear={someMethod}
            placeholder='Type Here...'>
            </SearchBar>
          <FlatList
            refreshControl={
              <RefreshControl
                colors={['darkviolet']}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}/>}

              data={this.state.EventJson}
              renderItem={({item}) =>
              <View>
              <TouchableOpacity onPress={() => this._onEventPressed(item) }>
                <Tile>
                    {(item.event_media.length == 0 || item.event_media == null || item.event_media == undefined)?
                      <ImageBackground
                        styleName="large-banner"
                        source={{ uri: pics[Math.floor(Math.random()*10)] }}>
                        <Overlay styleName="rounded-small">
                          <Icon name="add-to-favorites-on" />
                        </Overlay>
                        </ImageBackground>
                        :
                        <ImageBackground
                          styleName="large-banner"
                          source={{ uri: item.event_media[0].image }}>
                          <Overlay styleName="rounded-small">
                            <Icon name="add-to-favorites-on" />
                          </Overlay>
                          </ImageBackground>
                        }
                  <View>
                    <View style={{ backgroundColor: 'white', height: height*0.25, width: width,
                                  borderTopWidth: 5, borderTopColor: '#D3D3D3', borderBottomRightRadius: 10, borderBottomLeftRadius: 10}}>

                      <View style= {{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between',
                                      marginTop: 15,  borderBottomWidth: 2, borderBottomColor: '#F8F8F8'}}>
                        <View style={{backgroundColor: 'white', flexDirection: 'column', flex: 5, marginLeft: 10}}>
                            <Heading style={{marginLeft: 5, marginRight: 5}}>{item.event_name.toUpperCase()}</Heading>
                          <Text style={{ padding: 5}}>{item.event_description} {item.event_description} {item.event_description}</Text>
                        </View>
                        {(item.event_max_capacity <=  item.number_of_registered)?
                        <View style={{ backgroundColor: '#ff3232', borderRadius: 20, marginTop: 15, marginRight: 10, borderWidth: 2,
                                       borderColor: '#808080', flex: 1, height: 25, padding: 5}}>
                          <SText style={{color: '#F8F8F8' , fontSize: 12, fontWeight: 'bold', alignSelf: 'center'}}>EVENT FULL</SText>
                        </View> :
                        <View style={{ backgroundColor: '#3CB371', borderRadius: 20, marginTop: 15, marginRight: 10, borderWidth: 2,
                                       borderColor: '#808080', flex: 1, height: 25, padding: 5}}>
                          <SText style={{color: '#F8F8F8' , fontSize: 12, fontWeight: 'bold', alignSelf: 'center'}}>AVAILABLE</SText>
                        </View>
                      }
                      </View>

                      <View style= {{ backgroundColor: 'transparent', flexDirection: 'row', flex: 2, padding: 5, justifyContent: 'space-around', alignItems:'center',
                                      borderBottomWidth: 2, borderBottomColor: '#F8F8F8'}}>
                              <View style={{flexDirection: 'row', backgroundColor: 'transparent',justifyContent: 'space-between',
                                            padding: 15}}>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                  <IonIcon name="md-clock" size={30} />
                                  <SText style={{padding: 10, color: '#696969'}}>{new Date(item.event_start_time).toString().substring(0,21)}</SText>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'flex-end'}}>
                                  <IonIcon name="md-cash" size={30} />
                                  <SText style={{padding: 10, color: 'gray', fontWeight:'bold'}}>${item.event_price}</SText>
                                </View>
                              </View>
                      </View>

                      <View style= {{ backgroundColor: 'transparent', flexDirection: 'row', flex: 2, padding: 5, justifyContent: 'space-around', alignItems:'center',
                                      borderBottomRightRadius: 10, borderBottomLeftRadius: 10,}}>
                                      <View style={{flexDirection: 'row', backgroundColor: 'transparent',justifyContent: 'space-between',
                                                    padding: 15}}>
                                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                          <IonIcon name="md-pin" size={30} />
                                          <SText style={{padding: 10, color: '#696969'}}>{item.event_address}</SText>
                                        </View>
                                        <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'flex-end'}}>
                                          <IonIcon name="md-plane" size={30} color="red"/>
                                            <View style={{flexDirection: 'column'}}>
                                            <SText style={{marginLeft: 10}}>Distance Away</SText>
                                            <SText style={{marginLeft: 10, color: 'gray', fontWeight:'bold'}}>? km</SText>
                                            </View>
                                          </View>
                                      </View>
                      </View>
                    </View>
                  </View>
                  </Tile>
                  </TouchableOpacity>
              <Divider styleName="section-header" />
              </View>
              }
              keyExtractor={(item, index) => index}
            />
            <ActionButton buttonColor="rgba(76,127,178,0.68)">
            <ActionButton.Item buttonColor='#B1D8ED' title="New Event" onPress={() => this.props.navigation.navigate('LinksPage')}>
              <IonIcon name="md-add" size={20} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#95C8DB' title="New Chat"
            onPress={() => this.props.navigation.navigate('Home')}>
              <IonIcon name="ios-chatbubbles-outline" size={20} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#5FACBE' title="QR Camera"
            onPress={() => this.props.navigation.navigate('QRCameraPage')}>
              <IonIcon name="ios-camera-outline" size={20} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#2181A1' title="Starred Events" onPress={() => this.props.navigation.navigate('FavouritesPage')}>
              <IonIcon name="md-star" size={20}/>
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#035D75' title="My Profile" onPress={() => {}}>
              <IonIcon name="md-person" size={20}/>
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
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  logo: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  list: {
    backgroundColor: '#C6E9ED',
    width: width - 20,
    padding: 10,
    marginTop: 20,
    marginRight:10,
    marginLeft:10,
    borderRadius: 15,
  },
  registerButton: {
    alignItems: 'center',
    padding: 30,
  },  wrapper: {
    flex: 1
  },
  row: {
    padding: 10,
    height: 125,
    backgroundColor: '#dccdc8',
    borderTopWidth: 1,
    marginBottom:-1,
    borderBottomColor: '#E5EDF5',
    borderTopColor: '#E5EDF5',
    borderBottomWidth: 1,
  },
  text: {
    textAlign: 'center',
    color: 'black'
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 100/2,
    backgroundColor: 'white',
    opacity: .7
  },
  circle2: {
    width: 45,
    height: 25,
    left: 175,
    borderRadius: 50,
    backgroundColor: 'black',
    transform: [
      {scaleX: 2}
    ]
  }
});
