import React, {Component} from 'react';
import {View, Text, TextField} from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import {Navigation} from 'react-native-navigation';

import * as Presenter from './AddPost.presenter';

class AddPost extends Component {

  static propTypes = {
    componentId: PropTypes.string,
    postToUpdate: PropTypes.object
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    const {postToUpdate} = this.props;
    this.state =  {
      title: postToUpdate && postToUpdate.title,
      text: postToUpdate && postToUpdate.text
    }
  }

  static options(props) {
    return {
      topBar: {
        title: {
          text: props.postToUpdate ? 'Edit Post' : 'Add Post'
        },
        rightButtons: [{
          id: 'saveBtn',
          testID: 'save-post-btn',
          text: 'Save',
          enabled: false
        }],
        leftButtons: [{
          id: 'cancelBtn',
          icon: require('../../icons/x.png')
        }]
      }
    };
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'cancelBtn') {
      Navigation.dismissModal(this.props.componentId);
    } else if (buttonId === 'saveBtn') {
      this.onSavePressed();
    }
  }

  onChangeTitle = title => {
    this.setState({title});
    Presenter.onChangeTitle({
      componentId: this.props.componentId,
      title
    });
  };

  onChangeText = text => {
    this.setState({text})
  };

  onSavePressed = () => {
    const {componentId, postToUpdate} = this.props;
    Presenter.onSavePressed({
      componentId: componentId,
      title: this.state.title,
      text: this.state.text,
      postToUpdate
    });
  };

  render() {
    return (
      <View flex padding-24>
        <Text  text40 green10 marginB-12>AddPost Screen</Text>
        <TextField
          testID="add-title-input"
          value={this.state.title}
          text70
          containerStyle={{marginBottom: 12}}
          floatingPlaceholder
          placeholder="Post Title"
          onChangeText={this.onChangeTitle}
          floatOnFocus
        />
        <TextField
          testID="add-text-input"
          value={this.state.text}
          text70
          floatingPlaceholder
          placeholder="Post text"
          onChangeText={this.onChangeText}
          expandable
        />
      </View>
    );
  }
}

export default AddPost;