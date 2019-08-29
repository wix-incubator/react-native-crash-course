import {Navigation} from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent('blog.PostsList', () => require('./posts/screens/PostsList').default);
}