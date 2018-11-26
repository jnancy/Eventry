import React from "react";
import { AsyncStorage } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Chatkit from "@pusher/chatkit-client";

const CHATKIT_TOKEN_PROVIDER_ENDPOINT = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0fa52852-e026-4a78-b9fd-9ef562cc901c/token";
const CHATKIT_INSTANCE_LOCATOR = "v1:us1:0fa52852-e026-4a78-b9fd-9ef562cc901c";
const CHATKIT_ROOM_ID = "19467130";
const CHATKIT_USER_NAME = "test";

export default class MyChat extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ROOM_ID: this.props.navigation.state.params.value.room_id.toString(),
      USER_NAME: this.props.navigation.state.params.pk,
      messages: [{
          _id: "id",
          text: "Welcome to the chat for " + this.props.navigation.state.params.value.event_name,
          createdAt: new Date(),
          user: {
            _id: "senderId",
            name: "senderId",
            avatar:
              "http://www.ece.ubc.ca/~mjulia/images/juliarubin.jpg"
          }
      }]
    }
  }
  componentDidMount() {
    console.log("USERNAME " + this.state.USER_NAME);
    const tokenProvider = new Chatkit.TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
    });

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: this.state.USER_NAME,
      tokenProvider: tokenProvider
    });

    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      this.currentUser.subscribeToRoom({
        roomId: this.state.ROOM_ID,
        hooks: {
          onMessage: this.onReceive.bind(this)
        }
      });
    });
  }

  onReceive(data) {
    const { id, senderId, sender, text, createdAt } = data;

    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: sender.name,
      }
    };
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage)
    }));
  }

  onSend([message]) {
    this.currentUser.sendMessage({
      text: message.text,
      roomId: this.state.ROOM_ID
    });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.state.USER_NAME
        }}
      />
    );
  }
}
