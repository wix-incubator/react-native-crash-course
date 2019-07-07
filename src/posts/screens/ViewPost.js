import React, {Component} from 'react';
import {View, Text, Button, LoaderScreen} from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import {Navigation} from 'react-native-navigation';
import {connect} from 'remx';

import * as postsActions from '../posts.actions';
import {postsStore} from '../posts.store';
import * as postsNavigation from '../posts.navigation';

class ViewPost extends Component {

  static propTypes = {
    componentId: PropTypes.string,
    post: PropTypes.object,
    postId: PropTypes.number
  };

  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);
  }

  static options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: 'editPost',
            testID: 'edit-post-btn',
            text: 'Edit'
          }
        ]
      }
    };
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'editPost') {
      this.onEditPostPress();
    }
  }

  onEditPostPress = () => {
    postsNavigation.showAddPostModal(this.props.post);
  }

  onPostDeletePressed = async () => {
    Navigation.pop(this.props.componentId);
    await postsActions.deletePost(this.props.post.id);
  }

  render() {
    if(!this.props.post){
      return <LoaderScreen/>
    }
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

function mapStateToProps(props) {
  return {
    post: postsStore.getPost(props.postId)
  };
}

export default connect(mapStateToProps)(ViewPost);