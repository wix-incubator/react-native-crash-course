import {Navigation} from 'react-native-navigation';

export function pushViewPostScreen({componentId, postId}) {
  Navigation.push(componentId, {
    component: {
      name: 'blog.ViewPost',
      passProps: {
        postId
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
