import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import {deletePost} from '../posts.actions';


class ViewPost extends Component {

  static propTypes = {
    componentId: PropTypes.string,
    post: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.onPostDeletePressed = this.onPostDeletePressed.bind(this);
  }

  onPostDeletePressed = async () => {
    Navigation.pop(this.props.componentId);
    await deletePost(this.props.post.id);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>ViewPost Screen</Text>
        <Text>{JSON.stringify(this.props.post)}</Text>
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
