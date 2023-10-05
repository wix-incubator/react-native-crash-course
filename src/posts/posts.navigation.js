import {Navigation} from 'react-native-navigation';
import { postsStore } from './posts.store';

export function pushViewPostScreen({componentId, postId}) {
  if(!postId){
    return;
  }
  
  const {title} = postsStore.getPost(postId);

  Navigation.push(componentId, {
    component: {
      name: 'blog.ViewPost',
      passProps: {
        postId
      },
      options: {
        topBar: {
          title: {
            text: title
          }
        }
      }
    }
  });
}

export function showAddPostModal(postToUpdate) {
  Navigation.showModal({
    stack: {
      children: [{
        component: {
          name: 'blog.AddPost',
          passProps: {
            postToUpdate
          }
        }
      }]
    }
  });
}
