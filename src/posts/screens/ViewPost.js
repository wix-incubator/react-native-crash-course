import React, {Component} from 'react';
import {View, Text, Button} from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import {Navigation} from 'react-native-navigation';

import * as postsActions from '../posts.actions';

class ViewPost extends Component {

  static propTypes = {
    componentId: PropTypes.string,
    post: PropTypes.object
  };

  onPostDeletePressed = async () => {
    Navigation.pop(this.props.componentId);
    await postsActions.deletePost(this.props.post.id);
  }

  render() {
    const {title, text} = this.props.post;

    return (
      <View flex spread padding-24>
        <View>
          <Text testID="post-title" text30 purple10>{title}</Text>
          <Text testID="post-text" text70 dark20 marginT-12>{text}</Text>
        </View>
        <Button
          testID="delete-post-btn"
          label="Delete Post"
          text80
          red20
          bg-red70
          fullWidth
          onPress={this.onPostDeletePressed}
        />
      </View>
    );
  }
}

export default ViewPost;