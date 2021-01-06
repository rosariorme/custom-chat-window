import Home from './components/Home';
import Chat from './components/Chatroom';
import { createStackNavigator } from 'react-navigation'

const navigator = createStackNavigator({
  Home: { screen: Home },
  Chatroom: { screen: Chatroom },
});

export default navigator
