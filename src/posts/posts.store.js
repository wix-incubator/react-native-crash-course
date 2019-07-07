import * as remx from 'remx';
import filter from 'lodash/filter';
import _find from 'lodash/find';

const initialState = {
  posts: []
  // this is an example of how the state will look like
  // posts: [
  //   {
  //     id: 1,
  //     title: 'Post 1',
  //     text: 'Post 1 text',
  //     img: 'https://picsum.photos/200/200/?image=977'
  //   },
  //   {
  //     id: 2,
  //     title: 'Post 2',
  //     text: 'Post 2 text',
  //     img: 'https://picsum.photos/200/200/?image=1'
  //   }
  // ]
};

const state = remx.state(initialState);

const getters = remx.getters({
  getPosts() {
    return state.posts;
  },

  getPost(id) {
    const post = _find(state.posts, {id})
    return post;
  }
});

const setters = remx.setters({
  setPosts(posts) {
    state.posts = posts;
  },

  addPost(post) {
    state.posts = [...state.posts, post];
  },

  updatePost(post) {
    state.posts = state.posts.map(item => {
      if (item.id !== post.id) {
        // This isn't the post we care about - keep it as-is
        return item
      }
      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...post
      }
    })
  },

  deletePost(id) {
    state.posts = filter(state.posts, post => post.id !== id);
  }
});

export const postsStore = {
  ...getters,
  ...setters
};