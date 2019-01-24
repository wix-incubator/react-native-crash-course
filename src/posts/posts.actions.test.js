describe('posts actions', () => {

  let postsActions, mockStore, mockFetchPosts, mockAddPost;

  const mockPosts = [
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
  const mockPost = {
    title: 'Post 3',
    text: 'Post 3 text',
    img: 'https://picsum.photos/200/200/?image=977'
  };

  beforeEach(() => {
    jest.mock('./posts.store');
    mockStore = require('./posts.store').postsStore;

    mockFetchPosts = jest.fn().mockResolvedValue(mockPosts);
    mockAddPost = jest.fn().mockImplementation(post => Promise.resolve({...post, id: 'mock-id'}));
    jest.mock('../api', () => ({
      fetchPosts: mockFetchPosts,
      addPost: mockAddPost,
      deletePost: jest.fn()
    }));

    postsActions = require('./posts.actions');
  });

  it('should fetch posts', async () => {
    await postsActions.fetchPosts();
    expect(mockStore.setPosts).toHaveBeenCalledWith(mockPosts);
  });

  it('should add a post', async () => {
    await postsActions.addPost(mockPost);
    expect(mockStore.addPost).toHaveBeenCalledWith({...mockPost, id: 'mock-id'});
  });

  it('should delete a post', async () => {
    await postsActions.deletePost('mock-id');
    expect(mockStore.deletePost).toHaveBeenCalledWith('mock-id');
  });


});
