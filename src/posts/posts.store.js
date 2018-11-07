import * as remx from 'remx';


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
  }

});

export const postsStore = {
  ...getters,
  ...setters
};
