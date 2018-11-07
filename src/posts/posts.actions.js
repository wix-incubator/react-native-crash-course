import {postsStore} from './posts.store';

export function fetchPosts() {
  // TODO: fetch posts from our fake server
  const posts = [];
  postsStore.setPosts(posts);
}

