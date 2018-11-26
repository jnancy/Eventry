import React from 'react';
import { ScrollView,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Text, 
  View, 
  Alert,
  ActivityIndicator,
  Image,
  StatusBar } from "react-native";
  import DateTimePicker from 'react-native-modal-datetime-picker';
  import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
  import { AsyncStorage } from "react-native"
  import { ImagePicker } from 'expo';
  import ActionButton from 'react-native-circular-action-menu';
  import IonIcon from 'react-native-vector-icons/Ionicons';
  import ParallaxScrollView from 'react-native-parallax-scrollview';

  let {width,height} = Dimensions.get("window");

  export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      screenLoading: false,
      Authkey: '',
      gotID: false,
      event_name:'',
      event_description:'',
      event_price:'',
      start_date: '',
      end_date: '',
      event_lat: '',
      event_lng: '',
      event_location: '',
      isStartDateTimePickerVisible: false,
      isEndDateTimePickerVisible: false,
      endDateChosen: false,
      startDateChosen: false,
      image: [],
    };
  }

  _showStartDateTimePicker = () => this.setState({ isStartDateTimePickerVisible: true });

  _hideStartDateTimePicker = () => this.setState({ isStartDateTimePickerVisible: false });

  _handleStartDatePicked = (start_date) => {
    console.log('Start date and time: ', start_date);
    this.setState({startDateChosen: true});
    this.setState({start_date});
    this._hideStartDateTimePicker();
  };

  _showEndDateTimePicker = () => this.setState({ isEndDateTimePickerVisible: true });

  _hideEndDateTimePicker = () => this.setState({ isEndDateTimePickerVisible: false });

  _handleEndDatePicked = (end_date) => {
    console.log('Finish date and time: ', end_date);
    this.setState({endDateChosen: true});
    this.setState({end_date});
    this._hideEndDateTimePicker();
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

  async _AddEvent(){ 
    if(!this.state.gotID){
      let Authkey = await this._getID();
      this.setState({Authkey: Authkey, gotID: true});
    }
      //console.log("hereeee " + (this.state.start_date).format(Date));
      //console.log("hereeee " + (this.state.end_date).format(Date));
      const self = this;
      fetch("http://eventry-dev.us-west-2.elasticbeanstalk.com/events/", 
          {
            method: "POST",
            headers: {
            'Authorization': 'Token ' + this.state.Authkey,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              event_name: self.state.event_name,
              event_description: self.state.event_description,
              event_price : self.state.event_price,
              event_point_location: JSON.stringify({
                latitude: self.state.event_lat,
                longitude: self.state.event_lng,
              }),
              event_start_time: self.state.start_date,
              event_end_time: self.state.end_date,
            }),
          })
          .then(response => response.json())
          .then((responseData) => {
            Alert.alert(
            "POST Response",
            JSON.stringify(responseData),
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              { cancelable: false }
            );
          })
          .catch((error) => {
          console.error(error);
          });
          this.setState({
          screenLoading: false,
          });
    }
    
    _renderImages() {
      let images = [];
      //let remainder = 4 - (this.state.devices % 4);
      this.state.image.map((item, index) => {
        images.push(
          /*<Image
            key={index}
            source={{ uri: item }}
            style={{ width: 100, height: 100 }}
          />*/
          console.log("image" + index)
        );
      });
      return images;
    }

    
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ 
        image: this.state.image.concat([result.uri])
    });
  };
}

  render() {
    let { image } = this.state;
    if (this.state.screenLoading) {
      return (
        <View style = { styles.container } >
        {this._getID()}
          <ActivityIndicator />
          <StatusBar barStyle = "default" />
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
      <ScrollView>
      <View style = {{ flex: 1 }} >

        <View style = {{flexDirection: "column", alignItems: "center", marginTop: height/20}} >
          <TextInput
            style={styles.TextInput}
            onChangeText={(event_name) => this.setState({event_name})}
            value={this.state.event_name}
            placeholder="Title"
            placeholderTextColor="#A0AAAB"
          />

          <TextInput
            style={styles.TextInput}
            onChangeText={(event_description) => this.setState({event_description})}
            value={this.state.event_description}
            placeholder="Tell us more about your event"
            placeholderTextColor="#A0AAAB"
          />
          <TextInput
            style={styles.TextInput}
            onChangeText={(event_price) => this.setState({event_price})}
            value={this.state.event_price}
            placeholder="Price"
            placeholderTextColor="#A0AAAB"
          />

        <GooglePlacesAutocomplete
          placeholder='Location'
          minLength={2}
          autoFocus={false}
          listViewDisplayed='auto'
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={(data, details) => { 
            console.log(details["geometry"]["location"]["lat"]);
            console.log(details["geometry"]["location"]["lng"]);
            this.setState({event_lat: details["geometry"]["location"]["lat"]});
            this.setState({event_lng: details["geometry"]["location"]["lng"]})
            //console.log(details);
            this.setState({event_location: data["structured_formatting"]["main_text"]});
            console.log(data);
          }}
          
          getDefaultValue={() => ''}

          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyDE_Llytfo-JPzY5dE4XuuNAKD_eZFO9Ww',
            language: 'en', // language of the results
            //types: '(cities)' // default: 'geocode'
          }}

          styles={{
            textInputContainer: {
              width: width *7/10,
              height: 40,
              
            },
            description: {
              //fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            }
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}

          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            //types: 'food'
          }}
          />
          
          <TouchableOpacity style={{height: 40}}onPress={this._showStartDateTimePicker}>
          <Text
            style={styles.DateText}
            TextColor='#A0AAAB'
          > {this.state.startDateChosen? (this.state.start_date).toString().substring(0,21) : "Start Date"} </Text>
          </TouchableOpacity>


          <DateTimePicker
          isVisible={this.state.isStartDateTimePickerVisible}
          mode = 'datetime'
          onConfirm={this._handleStartDatePicked}
          onCancel={this._hideStartDateTimePicker}
          minimumDate = {new Date()}
          />

          <TouchableOpacity style={{height: 40}}onPress={this._showEndDateTimePicker}>
          <Text
            style={styles.DateText}
            TextColor='#A0AAAB'
          > {this.state.endDateChosen? (this.state.end_date).toString().substring(0,21) : "End Date"} </Text>
          </TouchableOpacity>


          <DateTimePicker
          isVisible={this.state.isEndDateTimePickerVisible}
          mode = 'datetime'
          onConfirm={this._handleEndDatePicked}
          onCancel={this._hideEndDateTimePicker}
          minimumDate = {this.state.startDateChosen? this.state.start_date : new Date()}
          />
          <Text style = {{color: 'red'}}>{(this.state.startDateChosen && this.state.endDateChosen && this.state.start_date >= this.state.end_date)?"Invalid end date: Has to be after start date" : ""}</Text>

          <TouchableOpacity style={{height: 40}} onPress={this._pickImage}>
          <Text
            style={styles.DateText}
            TextColor='#A0AAAB'
          > Pick an image</Text>
          </TouchableOpacity>
                  
          <TouchableHighlight
            style = {{
              backgroundColor: "#C6E9ED",
              width: width * (7 / 10),
              padding: 10,
              marginTop: 20,
              borderRadius: 15,
            }}
            onPress = {() => {
                let err = this.state.startDateChosen && this.state.endDateChosen && this.state.start_date >= this.state.end_date
                if(err){
                  Alert.alert(
                    "ERROR",
                    "Please fix the error(s) and try again" + (this.state.event_lat).toString() + " " + (this.state.event_lng).toString() ,
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    { cancelable: false }
                  );
                }
                else{ 
                this._AddEvent();
              }
            }
            }
            underlayColor = "#A9D9DE" >
            <Text style={{textAlign: "center", color: "#425187", fontSize: 15, fontWeight: "bold"}}> Add event </Text>
          </TouchableHighlight>
        </View>
      </View>
      </ScrollView>
      <ActionButton buttonColor="rgba(76,127,178,0.68)">
        <ActionButton.Item buttonColor='#B1D8ED' title="New Event" 
        onPress={() =>  this.props.navigation.navigate('LinksPage')}>
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
        <ActionButton.Item buttonColor='#2181A1' title="Starred Events" 
        onPress={() => this.props.navigation.navigate('FavouritesPage')}>
          <IonIcon name="md-star" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#035D75' title="My Profile" 
        onPress={() => {}}>
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
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  TextInput: {
    height: 40,
    color: 'black',
    borderColor: '#A9D9DE',
    marginTop: 10,
    borderBottomWidth: 1,
    width:  width *7/10,
    fontSize: 15,
  },
  DateText: {
    height: 40,
    color: 'black',
    borderColor: '#A9D9DE',
    marginTop: 10,
    borderBottomWidth: 1,
    width:  width *7/10,
    fontSize: 15,
  }
});
