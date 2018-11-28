import React, {Component} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Text, ListItem, Colors, BorderRadiuses, Image} from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import {Navigation} from 'react-native-navigation';
import {connect} from 'remx';

import {postsStore} from '../posts.store';
import * as postsActions from '../posts.actions';

class PostsList extends Component {

  static propTypes = {
    componentId: PropTypes.string,
    posts: PropTypes.array
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);

    this.pushViewPostScreen = this.pushViewPostScreen.bind(this);
  }

  static get options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: 'addPost',
            text: 'Add'
          }
        ]
      }
    };
  }

  componentDidMount() {
    postsActions.fetchPosts();
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'addPost') {
      this.showAddPostModal();
    }
  }

  pushViewPostScreen(post) {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'blog.ViewPost',
        passProps: {
          post
        },
        options: {
          topBar: {
            title: {
              text: 'Post1'
            }
          }
        }
      }
    });
  }

  showAddPostModal() {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: 'blog.AddPost',
          }
        }]
      }
    });
  }

  renderItem = ({item}) => (
    <ListItem
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

  render() {
    return (
      <FlatList
        data={this.props.posts}
        testID="posts-list"
        keyExtractor={item => `{key-${item.id}`}
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
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.dark60,
  }
});
