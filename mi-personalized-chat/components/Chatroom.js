import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Firebase from '../Firebase';

type Props = { name?: string };

class Chatroom extends React.Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'My Personalized Chat For Private Communication',
  });
  state = { messages: [] };
  get user() {
    return {
      name: this.props.navigation.state.params.name,
      _id: Firebase.shared.uid,
    };
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Firebase.shared.send}
        user={this.user}
      />
    );
  }
  componentDidMount() {
    Firebase.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    Firebase.shared.off();
  }
}
export default Chatroom;
