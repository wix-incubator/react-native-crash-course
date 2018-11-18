import * as remx from 'remx';
import filter from 'lodash/filter';


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
  }

});


const setters = remx.setters({

  setPosts(posts) {
    state.posts = posts;
  },

  addPost(post) {
    state.posts = [...state.posts, post];
  },

  deletePost(id) {
    state.posts = filter(state.posts, post => post.id !== id);
  }

});

export const postsStore = {
  ...getters,
  ...setters
};
