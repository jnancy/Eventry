import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import Chatkit from "@pusher/chatkit-client";

const CHATKIT_TOKEN_PROVIDER_ENDPOINT = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0fa52852-e026-4a78-b9fd-9ef562cc901c/token";
const CHATKIT_INSTANCE_LOCATOR = "v1:us1:0fa52852-e026-4a78-b9fd-9ef562cc901c";
const CHATKIT_ROOM_ID = "19465103";
const CHATKIT_USER_NAME = "test";
const YOUR_KEY = "6da31832-1c47-48cc-ab3b-d02d54ed226c:ftQrAOm3k3zdq6YIOARDpq2HqGmq8hcmZp07arOxT44=";

export default class MyChat extends React.Component {
  state = {
    messages: [{
        _id: "id",
        text: "Welcome to zee chat",
        createdAt: new Date(),
        user: {
          _id: "senderId",
          name: "senderId",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA"
        }
      }]
  };

  componentDidMount() {
    const tokenProvider = new Chatkit.TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
    });

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: CHATKIT_USER_NAME,
      tokenProvider: tokenProvider
    });

    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      this.currentUser.subscribeToRoom({
        roomId: CHATKIT_ROOM_ID,
        hooks: {
          onMessage: this.onReceive.bind(this)
        }
      });
    });
  }

  onReceive(data) {
    const { id, senderId, text, createdAt } = data;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
      }
    };
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage)
    }));
  }

  onSend([message]) {
    this.currentUser.sendMessage({
      text: message.text,
      roomId: CHATKIT_ROOM_ID
    });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: CHATKIT_USER_NAME
        }}
      />
    );
  }
}
