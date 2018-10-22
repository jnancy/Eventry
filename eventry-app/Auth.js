import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage,
} from 'react-native';
import {isSignedIn} from './auth/fakeAuth.js';
import {createRootNavigator} from './Router.js';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
    };
  }
  componentDidMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }
  render() {
    const { checkedSignIn, signedIn } = this.state;
    if (!checkedSignIn) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
    const Layout = createRootNavigator(signedIn);
    return <Layout />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
