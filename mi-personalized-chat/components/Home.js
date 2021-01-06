import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

class Home extends React.Component {
  static navigationOptions = { title: 'Chatroom' };
  state = { name: '' };
  onPress = () =>
    this.props.navigation.navigate('Chatroom', { name: this.state.name });
  onChangeText = name => this.setState({ name });
  render() {
    return (
      <View>
        <Text style={styles.title}>Name:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="Emilse Ormeno"
          onChangeText={this.onChangeText}
          value={this.state.name}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const offset = 24;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#000000',
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
  },
});
export default Home;