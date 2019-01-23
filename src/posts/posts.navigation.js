import {Navigation} from 'react-native-navigation';

export function pushViewPostScreen({componentId, post}) {
  Navigation.push(componentId, {
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

export function showAddPostModal() {
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
