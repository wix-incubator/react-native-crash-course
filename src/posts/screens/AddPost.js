import React, {useEffect, useState} from 'react';
import {View, Text, TextField} from 'react-native-ui-lib';
import {Navigation} from 'react-native-navigation';

import * as Presenter from './AddPost.presenter';

const AddPost = (props)=> {
  const {componentId, postToUpdate} = props;
  
  const [title, setTitle] =  useState(postToUpdate?.title);
  const [text, setText] =  useState(postToUpdate?.text);

  const onChangeTitle = title => {
    setTitle(title);
    Presenter.onChangeTitle({
      componentId,
      title
    });
  };

  const onChangeText = text => {
    setText(text)
  };

  const onSavePressed = () => {
    Presenter.onSavePressed({
      componentId: componentId,
      title,
      text,
      postToUpdate
    });
  };

  useEffect(() => {
    const subscription = Navigation.events().registerNavigationButtonPressedListener(
      ({buttonId}) => {
        if (buttonId === 'cancelBtn') {
          Navigation.dismissModal(componentId);
        } else if (buttonId === 'saveBtn') {
          onSavePressed();
        }
      },
    );
    return () => subscription.remove();
  }, []);
  
  useEffect(() => {
    Navigation.mergeOptions(componentId,
      {
        topBar: {
          title: {
            text: postToUpdate ? 'Edit Post' : 'Add Post'
          },
        }
      });
  }, [postToUpdate]);

  return (
    <View flex padding-24>
      <Text  text40 green10 marginB-12>AddPost Screen</Text>
      <TextField
        testID="add-title-input"
        value={title}
        text70
        containerStyle={{marginBottom: 12}}
        floatingPlaceholder
        placeholder="Post Title"
        onChangeText={onChangeTitle}
        floatOnFocus
      />
      <TextField
        testID="add-text-input"
        value={text}
        text70
        floatingPlaceholder
        placeholder="Post text"
        onChangeText={onChangeText}
        expandable
      />
    </View>
  );

}

AddPost.options = {
  topBar: {
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

export default AddPost;
