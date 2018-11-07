import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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

  pushViewPostScreen() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'blog.ViewPost',
        passProps: {
          somePropToPass: 'Some props that we are passing'
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} onPress={this.pushViewPostScreen}>PostsList Screen</Text>
        <Text>{JSON.stringify(this.props.posts)}</Text>
      </View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3EDFF',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  }
});
