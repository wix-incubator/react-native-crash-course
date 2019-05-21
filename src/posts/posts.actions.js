import {postsStore} from './posts.store';
import * as ServerApi from './api';

export async function fetchPosts() {
  const posts = await ServerApi.fetchPosts();
  postsStore.setPosts(posts);
}

export async function addPost(post) {
  const postToAdd = await ServerApi.addPost(post);
  postsStore.addPost(postToAdd);
}

export async function deletePost(id) {
  await ServerApi.deletePost(id);
  postsStore.deletePost(id);
}