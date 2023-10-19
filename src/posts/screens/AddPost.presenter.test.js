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
  
  afterEach(() => {
    Navigation.mergeOptions.mockClear();
  });

  it('should enable the save button if title and text is not blank', () => {
    Presenter.onChange({
      componentId: mockComponentId,
      title: mockTitle,
      text: mockText
    });
    expect(Navigation.mergeOptions.mock.calls[0][1].topBar.rightButtons[0].enabled).toBeTruthy();
  });

  it('should not enable the save button if title is blank', () => {
    Presenter.onChange({
      componentId: mockComponentId,
      title: '',
      text: ''
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

  it('should call update post action when clicking on save if given post to update', () => {
    const postToUpdate = {
      id: 1,
      title: 'old-title',
      text: 'old-text',
      img: 'old-image'
    }
    Presenter.onSavePressed({
      componentId: mockComponentId,
      title: mockTitle,
      text: mockText,
      postToUpdate
    });

    expect(postsActions.updatePost).toHaveBeenCalledWith({
      id: 1,
      title: mockTitle,
      text: mockText,
      img: 'old-image'
    });
  });

});
