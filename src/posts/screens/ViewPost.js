import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';


class ViewPost extends Component {

  static propTypes = {
    componentId: PropTypes.string,
    somePropToPass: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.onPostDeletePressed = this.onPostDeletePressed.bind(this);
  }

  onPostDeletePressed() {
    //In here we will request from the server to delete the post
    Navigation.pop(this.props.componentId);
    setTimeout(() => {
      alert('Post deleted');
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>ViewPost Screen</Text>
        <Text>{this.props.somePropToPass}</Text>
        <Button
          title="Delete Post"
          onPress={this.onPostDeletePressed}
          color={'red'}
        />
      </View>
    );
  }
}

export default ViewPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCDDDB',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  }
});
