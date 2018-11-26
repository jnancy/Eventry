import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
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
  FlatList,
  Alert
} from 'react-native';
import QRCode from 'react-native-qrcode';
import ParallaxScrollView from 'react-native-parallax-scrollview';

import ActionButton from 'react-native-circular-action-menu';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { StatusBar, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../carousel/SliderEntry.style';
import SliderEntry from '../carousel/SliderEntry';
import styles, { colors } from '../carousel/index.style';
import { ENTRIES1, ENTRIES2 } from '../carousel/entries';
import { scrollInterpolators, animatedStyles } from '../carousel/animations';

import {MapView} from 'expo';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;


export default class EventDescriptionScreen extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
          registered: false,
          favourited: false,
          pk: '',
          gotPK: false
        }
    }

    static navigationOptions = {
      header: null,
    };

    _renderItem ({item, index}) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }

    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }

    _register(id){
      let regURL =  'http://eventry-dev.us-west-2.elasticbeanstalk.com/events/' + id + "/register/"
      console.log(regURL);
      fetch(regURL, {
        method: 'POST',
        headers: {
          'Authorization': "Token " + this.props.navigation.state.params.Authkey,
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
          this.setState({registered: true});
          console.log(responseJson);
          this.setState({isLoading: false});
        })
        .catch((error) =>{
          console.error(error);
        });
    }

    _unregister(id){
      let regURL =  'http://eventry-dev.us-west-2.elasticbeanstalk.com/events/' + id + "/unregister/"
      console.log(regURL);
      fetch(regURL, {
        method: 'POST',
        headers: {
          'Authorization': "Token " + this.props.navigation.state.params.Authkey,
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
          this.setState({registered: false});
          console.log(responseJson);
          this.setState({isLoading: false});
        })
        .catch((error) =>{
          console.error(error);
        });
    }

    _unfavourite(id){
      let unfavURL =  'http://eventry-dev.us-west-2.elasticbeanstalk.com/events/' + id + "/unfavourite/"
      console.log(unfavURL);
      fetch(unfavURL, {
        method: 'POST',
        headers: {
          'Authorization': "Token " + this.props.navigation.state.params.Authkey,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          },
          credentials: 'include'
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({favourited: false});
          console.log(responseJson);
          this.setState({isLoading: false});
        })
        .catch((error) =>{
          console.error(error);
        });
    }

    _favourite(id){
      let unfavURL =  'http://eventry-dev.us-west-2.elasticbeanstalk.com/events/' + id + "/favourite/"
      console.log(unfavURL);
      fetch(unfavURL, {
        method: 'POST',
        headers: {
          'Authorization': "Token " + this.props.navigation.state.params.Authkey,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          },
          credentials: 'include'
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({favourited: true});
          console.log(responseJson);
          this.setState({isLoading: false});
        })
        .catch((error) =>{
          console.error(error);
        });
    }

    componentDidMount(){
      console.log("In EventDescriptionScreen");
      let ISfavURL =  'http://eventry-dev.us-west-2.elasticbeanstalk.com/events/' + this.props.navigation.state.params.value.id + "/is_favourite/"
      console.log(ISfavURL);
      fetch(ISfavURL, {
        method: 'GET',
        headers: {
          'Authorization': "Token " + this.props.navigation.state.params.Authkey,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          },
          credentials: 'include'
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({favourited: responseJson.is_favourite});
          console.log(responseJson.is_favourite);
        })
        .catch((error) =>{
          console.error(error);
        });
        let ISregisterURL =  'http://eventry-dev.us-west-2.elasticbeanstalk.com/events/' + this.props.navigation.state.params.value.id + "/is_registered/"
      console.log(ISregisterURL);
      fetch(ISregisterURL, {
        method: 'GET',
        headers: {
          'Authorization': "Token " + this.props.navigation.state.params.Authkey,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          },
          credentials: 'include'
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({favourited: responseJson.is_registered});
          console.log(responseJson.is_registered);
        })
        .catch((error) =>{
          console.error(error);
        });
    }

    _renderLightItem ({item, index}) {
        return <SliderEntry data={item} even={false} />;
    }

    _renderDarkItem ({item, index}) {
        return <SliderEntry data={item} even={true} />;
    }

    mainExample (number, title) {
         const { slider1ActiveSlide } = this.state;

         return (
             <View style={styles.exampleContainer}>
                 <Text style={styles.subtitle}>{title}</Text>
                 <Carousel
                   ref={c => this._slider1Ref = c}
                   data={ENTRIES1}
                   renderItem={this._renderItemWithParallax}
                   sliderWidth={sliderWidth}
                   itemWidth={itemWidth}
                   hasParallaxImages={true}
                   firstItem={SLIDER_1_FIRST_ITEM}
                   inactiveSlideScale={0.94}
                   inactiveSlideOpacity={0.7}
                   // inactiveSlideShift={20}
                   containerCustomStyle={styles.slider}
                   contentContainerCustomStyle={styles.sliderContentContainer}
                   loop={true}
                   loopClonesPerSide={2}
                   autoplay={true}
                   autoplayDelay={500}
                   autoplayInterval={3000}
                   onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                 />
                 <Pagination
                   dotsLength={ENTRIES1.length}
                   activeDotIndex={slider1ActiveSlide}
                   containerStyle={styles.paginationContainer}
                   dotColor={'rgba(255, 255, 255, 0.92)'}
                   dotStyle={styles.paginationDot}
                   inactiveDotColor={colors.black}
                   inactiveDotOpacity={0.4}
                   inactiveDotScale={0.6}
                   carouselRef={this._slider1Ref}
                   tappableDots={!!this._slider1Ref}
                 />
             </View>
         );
     }

     get gradient () {
         return (
             <LinearGradient
               colors={[colors.background1, colors.background2]}
               startPoint={{ x: 1, y: 0 }}
               endPoint={{ x: 0, y: 1 }}
               style={styles.gradient}
             />
         );
     }

  render() {    
    const example1 = this.mainExample(1, 'Event photos uploaded by host');
    var rcolor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

    return (
      <View style={styles.container}>
      {(this.props.navigation.state.params.value.event_media.length == 0 || this.props.navigation.state.params.value.event_media == undefined)?
      <ParallaxScrollView
        windowHeight={height * 0.4}
        backgroundSource={{uri: "https://avatars.mds.yandex.net/get-pdb/49816/f72a1ec0-94d4-426c-be58-b74f61094680/orig"}}
        navBarTitle='  '
        navBarTitleColor='black'
        navBarColor='white'
        userName={this.props.navigation.state.params.value.event_name}
        userTitle='Event Tags'
        userImage='https://tickera-wpsalad.netdna-ssl.com/wp-content/themes/tickera/style/img/freebies/icons/events/6.png'
        leftIcon={<Icon name="sidebar"/>}
      >
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
       <View style={{height: height*0.1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
           <SView styleName="horizontal">
               <SButton styleName="confirmation" style={{ borderColor: 'black', borderWidth: 1}}
               onPress= {() =>
                 {
                   if(this.state.registered){
                     this._unregister(this.props.navigation.state.params.value.id);
                   }
                   else{
                     this._register(this.props.navigation.state.params.value.id);
                   }
                 }}>
                 <SText>{this.state.registered?'UNREGISTER':'REGISTER'}</SText>
               </SButton>
               <SButton styleName="confirmation secondary"
               onPress= {() => this.props.navigation.navigate('UserList')}>
                 <SText>SEE ATTENDEES</SText>
               </SButton>
             </SView>
         </View>
         <View style={{height: height*0.45, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
           <Divider styleName="section-header"
                    style={{backgroundColor: 'white'}}>
             <Caption>EVENT INFORMATION</Caption>
           </Divider>
           <Divider style={{height: 3}}/>
           <Subtitle styleName='bold'>Host: {this.props.navigation.state.params.value.host}</Subtitle>
           <Subtitle styleName='bold'>{this.props.navigation.state.params.value.event_address}</Subtitle>
           <Subtitle styleName='bold'>{new Date(this.props.navigation.state.params.value.event_start_time).toString().substring(0,21)} - {new Date(this.props.navigation.state.params.value.event_end_time).toString().substring(0,21)}</Subtitle>
           <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white'}}>
             <Button styleName="stacked clear">
               <SText style={{fontSize: 30, color: "#5FACBE"}}>110</SText>
               <SText>Attendees</SText>
             </Button>
             <Button styleName="stacked clear">
             <SText style={{fontSize: 30, color: "#5FACBE"}}>${this.props.navigation.state.params.value.event_price}</SText>
             <SText>Price in CAD</SText>
             </Button>
             <Button styleName="stacked clear">
             <SText style={{fontSize: 30, color: "#5FACBE"}}>27</SText>
             <SText>Days Away</SText>
             </Button>
             </View>
             <Divider styleName="section-header"
                      style={{backgroundColor: 'white'}}>
               <Caption>EVENT DESCRIPTION</Caption>
             </Divider>
             <Divider style={{height: 3}}/>
           <SText style={{fontSize:16, textAlign: 'center', marginLeft: 20, marginRight: 20}}>{this.props.navigation.state.params.value.event_description} {this.props.navigation.state.params.value.event_description}</SText>
         </View>
         <Divider styleName="section-header"
                  style={{backgroundColor: 'white'}}>
           <Caption>EVENT LOCATION</Caption>
         </Divider>
         <View style={{height: height*0.3, marginLeft: 10, marginRight: 10}}>
            <MapView
              style={{ height: height*0.3}}
              initialRegion={{
                latitude: this.props.navigation.state.params.value.event_point_location.latitude,
                longitude: this.props.navigation.state.params.value.event_point_location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
               <MapView.Marker
               coordinate= {{latitude: this.props.navigation.state.params.value.event_point_location.latitude,
                             longitude: this.props.navigation.state.params.value.event_point_location.longitude}}
               title={this.props.navigation.state.params.value.event_name}
               description={this.props.navigation.state.params.value.event_address}
               />
              </MapView>
            </View>
            <Divider/>
         <View style={{height: height*0.55, justifyContent: 'center', alignItems: 'center'}}>
         {this.gradient}
             <ScrollView
               style={styles.scrollview}
               scrollEventThrottle={200}
               directionalLockEnabled={true}
             >
             { example1 }
         </ScrollView>
         </View>

         <Divider styleName="section-header"
                  style={{backgroundColor: 'white'}}>
           <Caption>ADDITIONAL INFORMATION</Caption>
         </Divider>
         <View style={{height: height*0.25, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>

           <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
           <Button styleName="stacked clear">
             <Icon name="email" />
             <SText>Host Profile</SText>
           </Button>
           <Button styleName="stacked clear"
             onPress={() => AsyncStorage.getItem("pk").then(res => this.props.navigation.navigate('ChatPage',{pk: res, value: this.props.navigation.state.params.value}))}>
             <Icon name="users" />
             <SText>Message Attendees</SText>
           </Button>
           <Button styleName="stacked clear"
                   onPress={() => {
                     if(this.state.favourited){
                       this._unfavourite(this.props.navigation.state.params.value.id);
                     }
                     else{
                       this._favourite(this.props.navigation.state.params.value.id);
                     }
                     }}>
             <Icon name={this.state.favourited? "add-to-favorites-on" : "add-to-favorites-off"} />
             <SText>{this.state.favourited ?'Starred': 'Star Event'}</SText>
           </Button>
        </View>
         </View>
        </ScrollView>
     </ParallaxScrollView>
      :
      <ParallaxScrollView
        windowHeight={height * 0.4}
        backgroundSource={{uri: this.props.navigation.state.params.value.event_media[0].image }}
        navBarTitle='  '
        navBarTitleColor='black'
        navBarColor='white'
        userName={this.props.navigation.state.params.value.event_name}
        userTitle='Event Tags'
        userImage='https://tickera-wpsalad.netdna-ssl.com/wp-content/themes/tickera/style/img/freebies/icons/events/6.png'
        leftIcon={<Icon name="sidebar"/>}
      >
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
       <View style={{height: height*0.1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
           <SView styleName="horizontal">
               <SButton styleName="confirmation" style={{ borderColor: 'black', borderWidth: 1}}
               onPress= {() =>
                 {
                   if(this.state.registered){
                     this._unregister(this.props.navigation.state.params.value.id);
                   }
                   else{
                     this._register(this.props.navigation.state.params.value.id);
                   }
                 }}>
                 <SText>{this.state.registered?'UNREGISTER':'REGISTER'}</SText>
               </SButton>
               <SButton styleName="confirmation secondary"
               onPress= {() => this.props.navigation.navigate('UserList')}>
                 <SText>SEE ATTENDEES</SText>
               </SButton>
             </SView>
         </View>
         <View style={{height: height*0.45, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
           <Divider styleName="section-header"
                    style={{backgroundColor: 'white'}}>
             <Caption>EVENT INFORMATION</Caption>
           </Divider>
           <Divider style={{height: 3}}/>
           <Subtitle styleName='bold'>Host: {this.props.navigation.state.params.value.host}</Subtitle>
           <Subtitle styleName='bold'>{this.props.navigation.state.params.value.event_address}</Subtitle>
           <Subtitle styleName='bold'>{new Date(this.props.navigation.state.params.value.event_start_time).toString().substring(0,21)} - {new Date(this.props.navigation.state.params.value.event_end_time).toString().substring(0,21)}</Subtitle>
           <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white'}}>
             <Button styleName="stacked clear">
               <SText style={{fontSize: 30, color: "#5FACBE"}}>110</SText>
               <SText>Attendees</SText>
             </Button>
             <Button styleName="stacked clear">
             <SText style={{fontSize: 30, color: "#5FACBE"}}>${this.props.navigation.state.params.value.event_price}</SText>
             <SText>Price in CAD</SText>
             </Button>
             <Button styleName="stacked clear">
             <SText style={{fontSize: 30, color: "#5FACBE"}}>27</SText>
             <SText>Days Away</SText>
             </Button>
             </View>
             <Divider styleName="section-header"
                      style={{backgroundColor: 'white'}}>
               <Caption>EVENT DESCRIPTION</Caption>
             </Divider>
             <Divider style={{height: 3}}/>
           <SText style={{fontSize:16, textAlign: 'center', marginLeft: 20, marginRight: 20}}>{this.props.navigation.state.params.value.event_description} {this.props.navigation.state.params.value.event_description}</SText>
         </View>
         <Divider styleName="section-header"
                  style={{backgroundColor: 'white'}}>
           <Caption>EVENT LOCATION</Caption>
         </Divider>
         <View style={{height: height*0.3, marginLeft: 10, marginRight: 10}}>
            <MapView
              style={{ height: height*0.3}}
              initialRegion={{
                latitude: this.props.navigation.state.params.value.event_point_location.latitude,
                longitude: this.props.navigation.state.params.value.event_point_location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
               <MapView.Marker
               coordinate= {{latitude: this.props.navigation.state.params.value.event_point_location.latitude,
                             longitude: this.props.navigation.state.params.value.event_point_location.longitude}}
               title={this.props.navigation.state.params.value.event_name}
               description={this.props.navigation.state.params.value.event_address}
               />
              </MapView>
            </View>
            <Divider/>
         <View style={{height: height*0.55, justifyContent: 'center', alignItems: 'center'}}>
         {this.gradient}
             <ScrollView
               style={styles.scrollview}
               scrollEventThrottle={200}
               directionalLockEnabled={true}
             >
             { example1 }
         </ScrollView>
         </View>

         <Divider styleName="section-header"
                  style={{backgroundColor: 'white'}}>
           <Caption>ADDITIONAL INFORMATION</Caption>
         </Divider>
         <View style={{height: height*0.25, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>

           <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
           <Button styleName="stacked clear">
             <Icon name="email" />
             <SText>Host Profile</SText>
           </Button>
           <Button styleName="stacked clear"
             onPress={() => AsyncStorage.getItem("pk").then(res => this.props.navigation.navigate('ChatPage',{pk: res, value: this.props.navigation.state.params.value}))}>
             <Icon name="users" />
             <SText>Message Attendees</SText>
           </Button>
           <Button styleName="stacked clear"
                   onPress={() => {
                     if(this.state.favourited){
                       this._unfavourite(this.props.navigation.state.params.value.id);
                     }
                     else{
                       this._favourite(this.props.navigation.state.params.value.id);
                     }
                     }}>
             <Icon name={this.state.favourited? "add-to-favorites-on" : "add-to-favorites-off"} />
             <SText>{this.state.favourited ?'Starred': 'Star Event'}</SText>
           </Button>
        </View>
         </View>
        </ScrollView>
     </ParallaxScrollView>}

      <ActionButton buttonColor="rgba(76,127,178,0.68)">
      <ActionButton.Item buttonColor='#B1D8ED' title="New Event" onPress={() => this.props.navigation.navigate('LinksPage')}>
        <IonIcon name="md-add" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#95C8DB' title="New Chat"
      onPress={() => this.props.navigation.navigate('Home')}>
        <IonIcon name="ios-chatbubbles-outline" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#5FACBE' title="QR C
      amera"
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
