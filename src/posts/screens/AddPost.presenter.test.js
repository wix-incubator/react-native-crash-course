describe('AddPost presenter', () => {

  let Presenter, Navigation, postsActions;
  const mockComponentId = 'mock-componentId';
  const mockTitle = 'mock-title';
  const mockText = 'mock-text';


  beforeEach(() => {
    jest.mock('react-native-navigation');
    Navigation = require('react-native-navigation').Navigation;

    jest.mock('../posts.actions');
    postsActions = require('../posts.actions');

    Presenter = require('./AddPost.presenter');
  });

  it('should enable the save button if title is not blank', () => {
    Presenter.onChangeTitle({
      componentId: mockComponentId,
      title: mockTitle
    });

    expect(Navigation.mergeOptions.mock.calls[0][1].topBar.rightButtons[0].enabled).toBeTruthy();
  });

  it('should not enable the save button if title is blank', () => {
    Presenter.onChangeTitle({
      componentId: mockComponentId,
      title: ''
    });

    expect(Navigation.mergeOptions.mock.calls[0][1].topBar.rightButtons[0].enabled).not.toBeTruthy();
  });

  it('should dismiss the modal when clicking on save', () => {
    Presenter.onSavePressed({
      componentId: mockComponentId,
      title: mockTitle,
      text: mockText
    });

    expect(Navigation.dismissModal).toHaveBeenCalledWith(mockComponentId);
  });

  it('should call add post action when clicking on save with a random image', () => {
    Presenter.onSavePressed({
      componentId: mockComponentId,
      title: mockTitle,
      text: mockText
    });

    expect(postsActions.addPost).toHaveBeenCalledWith({
      title: mockTitle,
      text: mockText,
      img: expect.any(String)
    });
  });

});
