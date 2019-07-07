import {Navigation} from 'react-native-navigation';
import * as postsActions from '../posts.actions';

export function onChangeTitle({componentId, title}) {
  Navigation.mergeOptions(componentId, {
    topBar: {
      rightButtons: [{
        id: 'saveBtn',
        testID: 'save-post-btn',
        text: 'Save',
        enabled: !!title
      }]
    }
  });
}

export function onSavePressed({componentId, title, text, postToUpdate}) {
  Navigation.dismissModal(componentId);
  if (postToUpdate) {
    const post = {...postToUpdate, title, text};
    postsActions.updatePost(post);
  } else {
    const randomImageNumber = Math.floor((Math.random() * 500) + 1);
    postsActions.addPost({
      title,
      text,
      img: `https://picsum.photos/200/200/?image=${randomImageNumber}`,
    });
  }
}
