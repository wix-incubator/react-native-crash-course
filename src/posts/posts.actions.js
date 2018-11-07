import {postsStore} from './posts.store';

export async function fetchPosts() {
  const response = await fetch('http://localhost:3000/posts');
  const posts = await response.json();
  postsStore.setPosts(posts);
}

