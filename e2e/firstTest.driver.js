const when = {
  pressOnPost: id => get.post(id).tap(),
  pressOnAddPostBtn: () => element(by.id('add-post-btn')).tap(),
  typeTitle: title => get.titleInput().typeText(title),
  pressOnSave: () => element(by.id('save-post-btn')).tap(),
  scrollToBottom: () => get.postsList().scrollTo('bottom'),
  pressOnDeletePost: () => element(by.id('delete-post-btn')).tap()
};

const get = {
  postsList: () => element(by.id('posts-list')),
  post: id => element(by.id(`postItem-${id}`)),
  postTitle: () => element(by.id('post-title')),
  postText: () => element(by.id('post-text')),
  titleInput: () => element(by.id('add-title-input')),
};

module.exports = {
  when,
  get
};
