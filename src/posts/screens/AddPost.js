import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TextField} from 'react-native-ui-lib';
import {Navigation} from 'react-native-navigation';

import * as Presenter from './AddPost.presenter';

const AddPost = (props)=> {
  const {componentId, postToUpdate} = props;

  const [title, setTitle] = useState(postToUpdate?.title);
  const [text, setText] = useState(postToUpdate?.text);

  const onChange = useCallback(() => {
    Presenter.onChange({
      componentId,
      title,
      text,
    });
  }, [componentId, title, text]);

  const onSavePressed = useCallback(() => {
    Presenter.onSavePressed({
      componentId,
      title,
      text,
      postToUpdate,
    });
  }, [componentId, postToUpdate, text, title]);

  useEffect(() => {
    onChange();
  }, [componentId, title, text, onChange]);

  useEffect(() => {
    const subscription = Navigation.events().registerNavigationButtonPressedListener(
      ({buttonId}) => {
        if (buttonId === 'cancelBtn') {
          Navigation.dismissModal(componentId);
        } else if (buttonId === 'saveBtn') {
          onSavePressed({
            componentId,
            title,
            text,
            postToUpdate,
          });
        }
      },
    );
    return () => subscription.remove();
  }, [componentId, title, text, postToUpdate, onSavePressed]);

  return (
    <View flex padding-24>
      <Text text40 green10 marginB-12>AddPost Screen</Text>
      <TextField
        testID="add-title-input"
        value={title}
        text70
        containerStyle={{marginBottom: 12}}
        floatingPlaceholder
        placeholder="Post Title"
        onChangeText={setTitle}
        floatOnFocus
      />
      <TextField
        testID="add-text-input"
        value={text}
        text70
        floatingPlaceholder
        placeholder="Post text"
        onChangeText={setText}
        multiline
      />
    </View>
  );
};

AddPost.options = ({postToUpdate}) => ({
  topBar: {
    title: {
      text: postToUpdate ? 'Edit Post' : 'Add Post',
    },
    rightButtons: [{
      id: 'saveBtn',
      testID: 'save-post-btn',
      text: 'Save',
      enabled: false,
    }],
    leftButtons: [{
      id: 'cancelBtn',
      icon: require('../../icons/x.png'),
    }],
  },
});

export default AddPost;
