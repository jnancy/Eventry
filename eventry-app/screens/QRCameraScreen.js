import React, { Component } from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { AsyncStorage } from "react-native"

export default class QRCameraScreen extends React.Component {
    constructor(props){
      super(props);
      this.state ={ 
        hasCameraPermission: null,
        lastScannedUrl: null,
      };
    }

    static navigationOptions = {
      header: null,
    };

    componentDidMount() {
      this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({
        hasCameraPermission: status === 'granted',
      });
    };

   async _checkinUser(qrcode){
      this.setState({refreshing: true});
      let Authkey = await this._getID();
      this.setState({Authkey: Authkey});
      let checkinURL = 'http://eventry-dev.us-west-2.elasticbeanstalk.com/events/checkin_qrcode/'
      fetch(checkinURL, {
        method: 'POST',
        headers: {
          'Authorization': 'Token ' + this.state.Authkey,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          QRcode: qrcode
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
        });
      }).then(() => {
        //console.log(this.state.EventJson);
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

    _handleBarCodeRead = result => {
      if (result.data !== this.state.lastScannedUrl) {
        LayoutAnimation.spring();
        this.setState({ lastScannedUrl: result.data });
        // POST TO THE SERVER!!
        this._checkinUser(result.data);
        const {goBack} = this.props.navigation;
        //this.props.navigation.navigate('HomeScreen');
        Alert.alert(
          "Done!",
          "User is checked in!",
          [{text: 'OK', onPress: () => this.props.navigation.navigate('HomePage')},
           {text: 'Scan Another', onPress: () => console.log('scan another Pressed')}],
          { cancelable: false }
        );
        console.log("I'm in home screen");
      }
    };
  
    
  render() {
    
    return (
      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />}

        {this._maybeRenderUrl()
        }

        <StatusBar hidden />
      </View>
    );
  }

  _handlePressUrl = () => {
    Alert.alert(
      'Open this URL?',
      this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL(this.state.lastScannedUrl),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 15,
        flexDirection: 'row',
      },
      url: {
        flex: 1,
      },
      urlText: {
        color: '#fff',
        fontSize: 20,
      },
      cancelButton: {
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      cancelButtonText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 18,
      },
});
