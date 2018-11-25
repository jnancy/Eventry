import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";

import ChatEngineCore from "chat-engine";
import typingIndicator from "chat-engine-typing-indicator";

import {MessageEntry} from "chat-engine-react-native";
import {MessageList} from "chat-engine-react-native";


const ChatEngine = ChatEngineCore.create({
  publishKey: "pub-c-2849f512-15df-49ce-9a5c-014a6855762a",
  subscribeKey: "sub-c-6d9cba8e-f03b-11e8-b4c2-46cd67be4fbe"
});

const now = new Date().getTime();
const username = ['user', now].join('-');

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: null,
      renderChat: false,
      me: null,
    };
  }

  componentDidMount() {
    //chatengine throws some warning about timing that is a part of the library itself
    console.disableYellowBox = true;

    ChatEngine.connect(username, {
        signedOnTime: now
    }, 'auth-key');

    ChatEngine.on("$.ready", data => {
      const me = data.me;
      let chat = new ChatEngine.Chat('MyChat');

     chat.plugin(typingIndicator({ timeout: 5000 })); //set this if you want your message entry to have a typing indicator

      this.setState({chat: chat, renderChat: true, me: data.me});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.state.renderChat ? (
          <Text> Loading </Text>
        ) : (
          <View style={{flex:1}}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
            <MessageList chat={this.state.chat} />
            <MessageEntry chat={this.state.chat} typingIndicator />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
