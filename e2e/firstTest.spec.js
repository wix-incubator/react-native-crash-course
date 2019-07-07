const driver = require('./firstTest.driver');
const MockServerApi = require('../src/posts/api.e2e');

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  afterEach(() => {
    MockServerApi.reset();
  });

  it('should display the posts list on app launch', async () => {
    await expect(driver.get.postsList()).toBeVisible();
  });

  it('should display the first post in the list', async () => {
    const postId = 1;

    await driver.when.pressOnPost(postId);
    await expect(driver.get.postTitle()).toHaveText('Post 1');
    await expect(driver.get.postText()).toHaveText('post 1 text');
  });

  it('should add a post', async () => {
    const newPost = {
      title: 'New Post Title',
    };

    await driver.when.pressOnAddPostBtn();
    await driver.when.typeTitle(newPost.title);
    await driver.when.pressOnSave();
    await driver.when.scrollToBottom();
    await driver.when.pressOnPost(3);

    await expect(driver.get.postTitle()).toHaveText(newPost.title);
  });

  it('should delete a post', async () => {
    await driver.when.scrollToBottom();
    await driver.when.pressOnPost(2);
    await driver.when.pressOnDeletePost();
    await driver.when.scrollToBottom();

    await expect(driver.get.post(2)).toBeNotVisible();
  });

  it('should update a post', async () => {
    const postId = 1;

    await driver.when.pressOnPost(postId);
    await driver.when.pressOnEditPostBtn();
    await driver.when.typeTitle('-updated');
    await driver.when.pressOnSave();

    await expect(driver.get.postTitle()).toHaveText('Post 1-updated');
    await expect(driver.get.postText()).toHaveText('post 1 text');
  });

});
