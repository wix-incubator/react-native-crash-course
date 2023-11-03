import React, {useCallback, useEffect} from 'react';
import {StyleSheet, FlatList, Image} from 'react-native';
import {Text, ListItem, Colors, BorderRadiuses} from 'react-native-ui-lib';
import {Navigation} from 'react-native-navigation';
import {useConnect} from 'remx';
import * as postsNavigation from '../posts.navigation';

import * as postsActions from '../posts.actions';
import {postsStore} from '../posts.store';

const PostsList = (props) => {
  const posts = useConnect(postsStore.getPosts);

  const pushViewPostScreen = useCallback((post) => {
    postsNavigation.pushViewPostScreen({
      componentId: props.componentId,
      postId: post.id,
    });
  }, [props.componentId]);

  useEffect(() => {
    postsActions.fetchPosts();
    const subscription = Navigation.events().registerNavigationButtonPressedListener(
      ({buttonId}) => {
        if (buttonId === 'addPost') {
          postsNavigation.showAddPostModal();
        }
      },
    );
    return () => subscription.remove();
  }, []);

  const renderItem = ({item}) => (
    <ListItem
      testID={`postItem-${item.id}`}
      activeBackgroundColor={Colors.purple70}
      activeOpacity={0.1}
      height={77.5}
      onPress={() => pushViewPostScreen(item)}
    >
      <ListItem.Part left>
        <Image
          source={{uri: item.img}}
          style={styles.image}
        />
      </ListItem.Part>
      <ListItem.Part middle column containerStyle={[styles.border, {paddingRight: 17}]}>
        <ListItem.Part containerStyle={{marginBottom: 3}}>
          <Text dark10 text70 style={{flex: 1, marginRight: 10}} numberOfLines={1}>{item.title}</Text>
        </ListItem.Part>
        <ListItem.Part>
          <Text style={{flex: 1, marginRight: 10}} text90 dark40 numberOfLines={1}>{item.text}</Text>
        </ListItem.Part>
      </ListItem.Part>
    </ListItem>
  );

  const postKeyExtractor = item => `${item.id}-key`;

  return (
    <FlatList
      data={posts}
      testID="posts-list"
      keyExtractor={postKeyExtractor}
      renderItem={renderItem}
    />
  );
};

PostsList.options = {
  topBar: {
    rightButtons: [
      {
        id: 'addPost',
        testID: 'add-post-btn',
        text: 'Add',
      },
    ],
  },
};

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
    backgroundColor: Colors.purple70,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.dark60,
  },
});

export default PostsList;
