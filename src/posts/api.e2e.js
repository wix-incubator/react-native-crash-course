const initialPosts = [
  {
    id: 1,
    title: 'Post 1',
    text: 'post 1 text',
    img: 'https://picsum.photos/200/200/?image=11'
  },
  {
    id: 2,
    title: 'Post 2',
    text: 'Scientists have developed catalysts that can convert carbon dioxide – the main cause of global warming – into plastics, fabrics, resins and other products. The discovery, based on the chemistry of artificial photosynthesis, is detailed in the journal Energy & Environmental Science.',
    img: 'https://picsum.photos/200/200/?image=22'
  }
];
let mockPostsFromServer = [...initialPosts];

function reset() {
  mockPostsFromServer = [...initialPosts];
}

async function fetchPosts() {
  const posts = [...mockPostsFromServer];
  return Promise.resolve(posts);
}

async function addPost(post) {
  const postToAdd = {...post, id: mockPostsFromServer.length + 1};
  mockPostsFromServer.push(postToAdd);
  return Promise.resolve(postToAdd);
}

async function deletePost(id) {
  mockPostsFromServer = mockPostsFromServer.filter(post => post.id !== id);
  return Promise.resolve();
}

module.exports = {
  reset,
  fetchPosts,
  addPost,
  deletePost
};


