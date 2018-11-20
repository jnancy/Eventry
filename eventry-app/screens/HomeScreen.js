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

import { MonoText } from '../components/StyledText';
let {width,height} = Dimensions.get('window');
export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true, refreshing: false}
  }
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
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <View style = {{flexDirection: 'row', justifyContent: 'center', height: 60, alignItems: 'center', marginTop: height / 100 }} >
              <Image source = {require('../assets/images/e.png')} style={{width: 70, height: 70}}/>
              <Text style = {{ color: '#525EAE', fontSize: 50 }}>Eventry</Text>
            </View>
          </View>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}/>}
              data={this.state.EventJson}
              renderItem={({item}) =>
                //<Text>help</Text>

                 <TouchableHighlight
                     style = {styles.list}
                     onPress = {() => {
                     }}
                     underlayColor = '#A9D9DE' >
                 <View>
                 <ImageLoad
                      style={{marginLeft: 0, width: width / 10, height: height / 15, flex : 1.00 }}
                      loadingStyle={{ size: 'small', color: 'blue' }}
                     source={{ uri: 'https://4.bp.blogspot.com/-lYq2CzKT12k/VVR_atacIWI/AAAAAAABiwk/ZDXJa9dhUh8/s0/Convict_Lake_Autumn_View_uhd.jpg' }}/>
                 <Text style={{fontWeight: "bold", fontSize: 18}}>{item.event_name}</Text>
                 <Text style={{fontSize: 16}}>{item.event_description}</Text>
                </View>
               </TouchableHighlight>
              }
              keyExtractor={(item, index) => index}
            />
        </ScrollView>
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
  welcomeContainer: {
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
  }
});
