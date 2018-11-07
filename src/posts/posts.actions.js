import {postsStore} from './posts.store';

const posts = [
  {
    id: 1,
    title: 'Post 1',
    text: 'Post 1 text',
    img: 'https://picsum.photos/200/200/?image=977'
  },
  {
    id: 2,
    title: 'Post 2',
    text: 'Post 2 text',
    img: 'https://picsum.photos/200/200/?image=1'
  }
];

export function fetchPosts() {
  postsStore.setPosts(posts);
}

