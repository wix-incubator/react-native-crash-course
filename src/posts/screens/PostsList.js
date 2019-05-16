import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, Image} from 'react-native';
import {Text, ListItem, Colors, BorderRadiuses,View} from 'react-native-ui-lib';
import {Navigation} from 'react-native-navigation';
import {connect} from 'remx';
import * as postsNavigation from '../posts.navigation';

import * as postsActions from '../posts.actions';
import {postsStore} from '../posts.store';

class PostsList extends Component {

  static propTypes = {
    componentId: PropTypes.string,
    posts: PropTypes.array
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
            id: 'addPost',
            testID: 'add-post-btn',
            text: 'Add'
          }
        ]
      }
    };
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'addPost') {
      postsNavigation.showAddPostModal();
    }
  }

  componentDidMount(){
    postsActions.fetchPosts();
  }

  pushViewPostScreen = post => {
    postsNavigation.pushViewPostScreen({
      componentId: this.props.componentId,
      post
    });
  };

  renderItem = ({item}) => (
    <ListItem
      testID={`postItem-${item.id}`}
      activeBackgroundColor={Colors.purple70}
      activeOpacity={0.1}
      height={77.5}
      onPress={() => this.pushViewPostScreen(item)}
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

  postKeyExtractor =  item => `${item.id}-key`;

  render() {
    return (
      <FlatList
        data={this.props.posts}
        testID="posts-list"
        keyExtractor={this.postKeyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

function mapStateToProps() {
  return {
    posts: postsStore.getPosts()
  };
}

export default connect(mapStateToProps)(PostsList);

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
    backgroundColor: Colors.purple70
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.dark60,
  }
});