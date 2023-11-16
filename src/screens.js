import {Navigation} from 'react-native-navigation';
import PostsList from './posts/screens/PostsList';
import AddPost from './posts/screens/AddPost';
import ViewPost from './posts/screens/ViewPost';

export function registerScreens() {
  Navigation.registerComponent('blog.PostsList', () => PostsList);
  Navigation.registerComponent('blog.AddPost', () => AddPost);
  Navigation.registerComponent('blog.ViewPost', () => ViewPost);
}
