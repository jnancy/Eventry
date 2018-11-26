import React, { Component } from 'react';
import { View, TextInput,Text, ScrollView,Image,Button, Animated,TouchableOpacity, Keyboard, KeyboardAvoidingView,Platform } from 'react-native';
import {Header, Left, Right, Container, Body} from 'native-base'
import {View as SView, Text as SText, Image as SImage, Button as SButton} from '@shoutem/ui'
import {Title, Subtitle, Icon} from '@shoutem/ui'

import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 3;
export const IMAGE_HEIGHT_SMALL = window.width /7;
import logo from '../assets/images/edit_icon.png';


import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';

export default class EditUserScreen extends React.Component {
  constructor(props) {
    super(props);

    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }

    static navigationOptions = {
      header: null,
    };

  componentWillMount () {
   if (Platform.OS=='ios'){
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
   }else{
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
   }

  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT,
    }).start();
  };


  keyboardDidShow = (event) => {
    Animated.timing(this.imageHeight, {
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  keyboardDidHide = (event) => {
    Animated.timing(this.imageHeight, {
      toValue: IMAGE_HEIGHT,
    }).start();
  };

  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.container2}>
      <Header style={{backgroundColor: 'white'}}>
      <Left>
        <Icon name="sidebar" onPress={()=>this.props.navigation.openDrawer()}/>
      </Left>
      <Body>
      <Title>EVENTRY</Title>
      <Subtitle>My Profile</Subtitle>
      </Body>
      <Right></Right>
      </Header>
      <View style={{flex:1,backgroundColor:'white',alignItems:'center', backgroundColor: 'white', justifyContent: 'space-around'}}>

       <Animated.Image source={logo} style={[styles.logo, { height: this.imageHeight }]} />

       <ScrollView style={{flex:1}}>

         <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
      <View style={[styles.card2, { backgroundColor: 'white' }]}>
        <Fumi
          label={'First Name'}
          labelStyle={{ color: '#a3a3a3' }}
          inputStyle={{ color: '#2181A1' }}
          iconClass={FontAwesomeIcon}
          iconName={'user-circle-o'}
          iconColor={'#1aa4b8'}
          iconSize={25}
        />
      </View>
      <View style={[styles.card2, { backgroundColor: 'white' }]}>
        <Fumi
          label={'Last Name'}
          labelStyle={{ color: '#a3a3a3' }}
          inputStyle={{ color: '#2181A1' }}
          iconClass={FontAwesomeIcon}
          iconName={'user'}
          iconColor={'#1a9cb8'}
          iconSize={25}
        />
      </View>
      <View style={[styles.card2, { backgroundColor: 'white' }]}>
        <Fumi
          label={'User Bio'}
          labelStyle={{ color: '#a3a3a3' }}
          inputStyle={{ color: '#2181A1' }}
          iconClass={FontAwesomeIcon}
          iconName={'list-alt'}
          iconColor={'#1a94b8'}
          iconSize={25}
        />
      </View>
      <View style={[styles.card2, { backgroundColor: 'white' }]}>
        <Fumi
          label={'Password'}
          labelStyle={{ color: '#a3a3a3' }}
          inputStyle={{ color: '#2181A1' }}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          secureTextEntry={true}
          iconColor={'#1a8cb8'}
          iconSize={25}
        />
      </View>
      </KeyboardAvoidingView>
      </ScrollView>
      <View style={{ flexDirection: 'column', width: window.width, height: window.height * 0.15, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <View style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          width: window.width,
          height: window.height * 0.12}}>
            <SButton styleName="confirmation" style={{ borderColor: 'black', borderWidth: 1,
            marginBottom: 45}} onPress={() => goBack()}>
              <SText>SAVE</SText>
            </SButton>
            <SButton styleName="confirmation secondary" style={{marginBottom: 45}} onPress={() => goBack()}>
              <SText>CANCEL</SText>
            </SButton>
        </View>
        </View>
      </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    width: window.width - 30,
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 20,
    padding:10,
    marginTop:20
  },
  card2: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    width: window.width - 30,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#D3D3D3',
  },
  register:{
    marginBottom:20,
    width:window.width -100,
    alignItems:'center',
    justifyContent:'center',
    height:50,
    backgroundColor: '#ffae',}
});
