import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import {Navigation} from 'react-native-navigation';
import * as Presenter from './AddPost.presenter';

class AddPost extends Component {

  static propTypes = {
    componentId: PropTypes.string
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);

    this.state = {
      title: '',
      text: ''
    };
  }

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Add Post'
        },
        rightButtons: [{
          id: 'saveBtn',
          testID: 'save-post-btn',
          text: 'Save',
          enabled: false
        }],
        leftButtons: [{
          id: 'cancelBtn',
          text: 'Cancel'
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
    this.setState({text});
  };

  onSavePressed = () => {
    Presenter.onSavePressed({
      componentId: this.props.componentId,
      title: this.state.title,
      text: this.state.text
    });
  }

  render() {
    return (
      <View flex padding-24>
        <Text text40 purple10 marginB-24>Add Post</Text>
        <TextInput
          testID="add-title-input"
          text70
          containerStyle={{marginBottom: 12}}
          floatingPlaceholder
          placeholder="Add a Catchy Title"
          onChangeText={this.onChangeTitle}
          floatOnFocus
        />
        <TextInput
          testID="add-text-input"
          text70
          floatingPlaceholder
          placeholder="This is the beginning of a great post"
          onChangeText={this.onChangeText}
          expandable
        />
      </View>
    );
  }
}

export default AddPost;
