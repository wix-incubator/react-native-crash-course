describe('posts store', () => {
  let postsStore;

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
    id: 3,
    title: 'Post 3',
    text: 'Post 3 text',
    img: 'https://picsum.photos/200/200/?image=977'
  };

  beforeEach(() => {
    postsStore = require('./posts.store').postsStore;
  });

  it('should have an initial state without any posts', () => {
    expect(postsStore.getPosts()).toEqual([]);
  });

  it('should set posts', () => {
    postsStore.setPosts(mockPosts);

    expect(postsStore.getPosts()).toEqual(mockPosts);
  });

  it('should add a post', () => {
    postsStore.setPosts(mockPosts);
    postsStore.addPost(mockPost);

    expect(postsStore.getPosts()).toEqual([...mockPosts, mockPost]);
  });

  it('should get a post', () => {
    postsStore.setPosts(mockPosts);

    expect(postsStore.getPost(1)).toEqual(mockPosts[0]);
  });

  it('should delete a post', () => {
    postsStore.setPosts(mockPosts);
    postsStore.addPost(mockPost);
    expect(postsStore.getPosts()).toEqual([...mockPosts, mockPost]);
    postsStore.deletePost(mockPost.id);

    expect(postsStore.getPosts()).toEqual(mockPosts);
  });

  it('should update a post', () => {
    const updatedPost = {
      id: 1,
      title: 'new-title',
      text: 'new-text'
    };
    postsStore.setPosts(mockPosts);
    postsStore.updatePost(updatedPost);
    expect(postsStore.getPost(1)).toEqual({...mockPosts[0], ...updatedPost});
  });
});
