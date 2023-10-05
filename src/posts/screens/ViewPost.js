import React, {useEffect} from 'react';
import {View, Text, Button, LoaderScreen} from 'react-native-ui-lib';
import {Navigation} from 'react-native-navigation';
import {useConnect} from 'remx';

import * as postsActions from '../posts.actions';
import {postsStore} from '../posts.store';
import * as postsNavigation from '../posts.navigation';

const ViewPost = (props) => {
  const post = useConnect(postsStore.getPost, [props.postId]);
  
  const onEditPostPress = () => {
    postsNavigation.showAddPostModal(post);
  }

  const onPostDeletePressed = async () => {
    Navigation.pop(props.componentId);
    await postsActions.deletePost(post.id);
  }

  useEffect(() => {
    const subscription = Navigation.events().registerNavigationButtonPressedListener(
      ({buttonId}) => {
        if (buttonId === 'editPost') {
          onEditPostPress();
        }
      },
    );
    return () => subscription.remove();
  }, []);


  if(!post){
    return <LoaderScreen/>
  }

  const {title, text} = post;

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
        onPress={onPostDeletePressed}
      />
    </View>
  );
}

ViewPost.options = {
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

export default ViewPost;
