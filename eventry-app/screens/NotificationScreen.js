import React, {
	Component,
} from 'react';
import {
	Animated,
	AppRegistry,
	Dimensions,
	ListView,
	StyleSheet,
	Text,
  Image,
	TouchableOpacity,
	TouchableHighlight,
  ActivityIndicator,
  RefreshControl,
	View
} from 'react-native';

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import {Header, Left, Right, Container, Body} from 'native-base'
import { AsyncStorage } from "react-native";

import {Row, Subtitle, Button, Icon, Title} from '@shoutem/ui';
import {Text as SText} from "@shoutem/ui";

import ActionButton from 'react-native-circular-action-menu';
import IonIcon from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class NavigationScreen extends React.Component {

	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			listViewData: Array(5).fill('').map((_,i) => ({key: `${i}`, text: `item #${i}`})),
      isLoading: true,
      refreshing: false,
      Authkey: ''
    };

		this.rowSwipeAnimatedValues = {};
		Array(5).fill('').forEach((_, i) => {
			this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
		});
	}

	closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	}

  static navigationOptions = {
    header: null,
  };

	deleteRow(rowMap, rowKey) {
		this.closeRow(rowMap, rowKey);
		const newData = [...this.state.listViewData];
		const prevIndex = this.state.listViewData.findIndex(item => item.key === rowKey);
		newData.splice(prevIndex, 1);
		this.setState({listViewData: newData});
	}

	deleteSectionRow(rowMap, rowKey) {
		this.closeRow(rowMap, rowKey);
		var [section, row] = rowKey.split('.');
		const newData = [...this.state.sectionListData];
		const prevIndex = this.state.sectionListData[section].data.findIndex(item => item.key === rowKey);
		newData[section].data.splice(prevIndex, 1);
		this.setState({sectionListData: newData});
	}

	onRowDidOpen = (rowKey, rowMap) => {
		console.log('This row opened', rowKey);
	}

	onSwipeValueChange = (swipeData) => {
		const { key, value } = swipeData;
		this.rowSwipeAnimatedValues[key].setValue(Math.abs(value));
	}
  _getID = async () =>{
    var value = await AsyncStorage.getItem('userID');
    console.log("here" + value);
    if (value != null){
      return value;
    }
    else{
      //default key
      return "6dda5d77c06c4065e60c236b57dc8d7299dfa56f";
    }
  }

  async _onRefresh() {
    this.setState({refreshing: true});
    let Authkey = await this._getID();
    this.setState({Authkey: Authkey});
    fetch('http://eventry-dev.us-west-2.elasticbeanstalk.com/events/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + this.state.Authkey,
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
          console.log('REFRESHIN');
        });

      }).then(() => {
        this.setState({refreshing: false});
      });
    }

  componentDidMount(){
    this._onRefresh();
  }

	render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    var rcolor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
		return (
			<View style={styles.container}>
      <Header style={{backgroundColor: 'white'}}>
      <Left>
        <Icon name="sidebar" onPress={()=>this.props.navigation.openDrawer()}/>
      </Left>
      <Body>
      <Title>EVENTRY</Title>
      <Subtitle>Notification Center</Subtitle>
      </Body>
      <Right></Right>
      </Header>
      <SwipeListView
        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
        renderRow={ data => (
          <View style={[styles.rowFront, {borderLeftColor: rcolor, flex: 1, borderRightColor: '#D3D3D3', borderTopColor: '#D3D3D3', borderBottomColor: '#D3D3D3',
                        borderRightWidth: 2, borderTopWidth: 2, borderBottomWidth: 2}]}>
            <View style={{backgroundColor: 'white', height: height*0.2, alignItems: 'center', justifyContent: 'center',
                          width: width * 0.2, borderRightWidth: 3, borderRightColor: '#D3D3D3' , flex: 1}}>
                <Image
                  source={{uri: 'https://cdn.dribbble.com/users/553355/screenshots/2464535/bell.gif'}}
                  style={{width: 73, height: 73}}
                />
                <SText>Today</SText>
                <Title style={{fontWeight: 'bold'}}>11:45</Title>
            </View>

            <View style={{flex: 4, padding: 5}}>
              <View style={{height: height*0.2, backgroundColor: 'white'}}>
                <View style={{flexDirection: 'row', backgroundColor: 'white', flex: 3, alignItems: 'center', marginLeft: 20}}>
                    <Image
                      source={require('../assets/images/robot-dev.png')}
                      style={{borderWidth: 2, borderColor: 'black', borderRadius: 50, height: height*0.05, width: height*0.05}}
                    />
                    <Title styleName='bold' style={{marginLeft: 10, color: rcolor}}>eventry-bot</Title>
                </View>
                <View style={{flexDirection: 'row', backgroundColor: 'white', flex: 4, marginLeft: 20, marginRight: 20}}>
                  <Subtitle styleName="top">This is the content of the notification, is there something else that is supposed to also be here or nah?</Subtitle>
                </View>
            </View>
            </View>

          </View>
        )}
        renderHiddenRow={ (data, secId, rowId, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity style={styles.backLeftBtn} onPress={ () => {} }>
              <IonIcon name="md-settings" size={30} />
              <SText style={{color: 'black'}}>Settings</SText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.closeRow(rowMap, `${secId}${rowId}`) }>
              <IonIcon name="md-close-circle" size={30} />
              <SText style={{color: '#D3D3D3'}}>Close</SText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(rowMap, `${secId}${rowId}`) }>
              <IonIcon name="ios-trash" size={30} />
              <SText style={{color: '#D3D3D3'}}>Delete</SText>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-150}
      />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F8F8F8',
		flex: 1
	},
	rowFront: {
    flexDirection: 'row',
		alignItems: 'center',
    backgroundColor: 'white',
    borderLeftWidth: 10,
		justifyContent: 'center',
		height: height*0.2,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
	},
	rowBack: {
		alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    marginTop: 20,
		backgroundColor: '#87AFC7',
    borderRadius: 10,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
    height: height*0.2,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75,
	},
  backLeftBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
	backRightBtnLeft: {
		backgroundColor: 'grey',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
	},
	controls: {
		alignItems: 'center',
		marginBottom: 30
	},
	switchContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 5
	},
	switch: {
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black',
		paddingVertical: 10,
		width: Dimensions.get('window').width / 4,
	},
});
