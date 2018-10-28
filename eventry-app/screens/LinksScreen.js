import React from "react";
import { ScrollView, 
  StyleSheet, 
  TextInput, 
  Dimensions, 
  TouchableHighlight, 
  Text, 
  View, 
  AlertIOS,
  ActivityIndicator, 
  StatusBar } from "react-native";


  let {width,height} = Dimensions.get("window");
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: "#fff",
    },
    TextInput: {
      height: 40,
      color: "black",
      borderColor: "#A9D9DE",
      marginTop: 10,
      borderBottomWidth: 1,
      width:  width *7/10,
      fontSize: 15,
  
    }
  });

  export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Add a New Event",
  };

  constructor(props) {
    super(props);

    this.state = {
      screenLoading: false,
      event_name:"",
      event_description:"",
      event_price:"",
      event_loc: "",
      event_date: "",
    };
  }
  render() {
    if (this.state.screenLoading) {
      return (
        <View style = { styles.container } >
          <ActivityIndicator />
          <StatusBar barStyle = "default" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
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
          <TextInput
            style={styles.TextInput}
            onChangeText={(event_loc) => this.setState({event_loc})}
            value={this.state.event_loc}
            placeholder="Location"
            placeholderTextColor="#A0AAAB"
          />
          
          <TextInput
            style={styles.TextInput}
            onChangeText={(event_date) => this.setState({event_date})}
            value={this.state.event_date}
            placeholder="Date DD/MM/YYYY"
            placeholderTextColor="#A0AAAB"
          />
          
          <TouchableHighlight
            style = {{
              backgroundColor: "#C6E9ED",
              width: width * (7 / 10),
              padding: 10,
              marginTop: 20,
              borderRadius: 15,
            }}
            onPress = {() => {
                const self = this;
                fetch("http://eventry-dev.us-west-2.elasticbeanstalk.com/events/", {
                  method: "POST",
                  body: JSON.stringify({
                    event_name: self.state.event_name,
                    event_description: self.state.event_description,
                    event_location: self.state.event_loc,
                    event_price : self.state.event_price,
                    //event_start_time: self.state.event_date,
                  }),
                  headers: new Headers({
                    "Content-Type": "application/json"
                  }),
                })
                .then(response => response.json())
                .then((responseData) => {
                  AlertIOS.alert(
                      "POST Response",
                      JSON.stringify(responseData)
                  )
                 })
                .catch((error) =>{
                  console.error(error);
                });
                //ADD STUFF
                this.setState({
                screenLoading: false,
                  });
              }
            }
            underlayColor = "#A9D9DE" >
            <Text style={{textAlign: "center", color: "#425187", fontSize: 15, fontWeight: "bold"}}> Add event </Text>
          </TouchableHighlight>
        </View>
      </View>
      </ScrollView>
    );
  }
}


