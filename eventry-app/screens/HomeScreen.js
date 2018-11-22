import React from 'react';
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
import ImageLoad from 'react-native-image-placeholder';
import { ImageBackground, Tile, Title, Subtitle, Divider, Overlay, Caption, Heading, Button, Icon} from '@shoutem/ui'
import {View as SView, Text as SText} from '@shoutem/ui'
import {Header, Left, Right, Container, Body} from 'native-base'

import { MonoText } from '../components/StyledText';
let {width,height} = Dimensions.get('window');

const pics = ['https://shoutem.github.io/img/ui-toolkit/examples/image-7.png', 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png', 'https://shoutem.github.io/img/ui-toolkit/examples/image-5.png', 'https://shoutem.github.io/img/ui-toolkit/examples/image-9.png', 'https://shoutem.github.io/img/ui-toolkit/examples/image-4.png',
"https://shoutem.github.io/static/getting-started/restaurant-6.jpg", "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" ,  "https://shoutem.github.io/static/getting-started/restaurant-4.jpg" , "https://shoutem.github.io/static/getting-started/restaurant-3.jpg",  "https://shoutem.github.io/static/getting-started/restaurant-2.jpg",
"https://shoutem.github.io/static/getting-started/restaurant-1.jpg" ]

export default class HomeScreen extends React.Component {
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
          // HAVE TO CHANGE MOVIES
          EventJson: responseJson,
        }, function(){
          console.log('REFRESHIN');
        });

      }).then(() => {
        this.setState({refreshing: false});
      });
    }

  componentDidMount(){
    // CHANGE THE URL TO MACH WITH OURS!!
    return fetch('http://eventry-dev.us-west-2.elasticbeanstalk.com/events', {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          // HAVE TO CHANGE MOVIES
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
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}/>}
              data={this.state.EventJson}
              renderItem={({item}) =>
              <View>
                <Tile>
                  <ImageBackground
                    styleName="large-banner"
                    source={{ uri: pics[Math.floor(Math.random()*10)] }}
                  >
                  <Overlay styleName="rounded-small">
                    <Icon name="add-to-favorites-on" />
                  </Overlay>
                  </ImageBackground>
                  <SView styleName="content">

                    <SView styleName="horizontal space-between">
                      <Title>{item.event_name}</Title>
                      <Overlay styleName="solid-bright">
                      <Subtitle styleName="sm-gutter-horizontal">${item.event_price}</Subtitle>
                      </Overlay>
                    </SView>
                    <Subtitle>{item.event_description}</Subtitle>
                      <SView styleName="horizontal space-between">
                        <Subtitle>Location: {item.event_location}</Subtitle>
                        <Button styleName=""><Icon name="cart" /><SText>REGISTER FOR EVENT</SText></Button>
                      </SView>
                    </SView>
                  </Tile>
              <Divider styleName="section-header" />
              </View>
              }
              keyExtractor={(item, index) => index}
            />
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
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
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
  },
});
