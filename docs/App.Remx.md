# Step #2: App Logic and State Management (with Remx)

- [x] [Step #1: **App Navigation**](App.Navigation.md)

## What we're going to do

In this section we will enable adding, displaying, and deleting a post with [Remx](https://github.com/wix/remx) - Wix's open source state management library, though you can use any state management solution you'd like (Redux, Mobx, or anything else).

To that end, in this step we are going to:

* Create a Remx store to hold and manage all of our posts' data.
* Write actions to hold our business logic and invoke the store's getters and setters according to our needs.
* Connect our `PostList` screen component to actions on the data from the store.

## About Remx
Remx is a state management library.

When the Wix Mobile Team started to build the Wix App, they took a look at all of the well-known and battle-tested choices - Redux, Mobx, Local component state, and others. They felt that a large-scale project that lots of developers from different teams will work on, needs a combination that will take only the pros from each of these methods. And So Remx was born.

Remx takes the redux (flux) architecture and enforces it through a short, simple, clean, strict, and easy to learn API. Almost zero boilerplate! And we think that it's time for you to fall in love with Remx. 

> We are not going to go into the big argument about Redux Vs Mobx Vs other state management solutions. Some of our projects use Redux, some use Mobx, some are even using both. We recommend using our own open source in-house state management library called Remx.

## Preliminaries
* Have no idea what Flux is? Watch the following [video](https://www.youtube.com/watch?v=nYkdrAPrdcw#t=10m10s) (14 min)
* Watch the first part (until 18:00) of [[Redux] - The Best Explanation of How it Works](https://www.youtube.com/watch?v=3sjMRS1gJys) - It might be about Redux but it's a great explanation about why we even need state management.
* Watch a talk by Yedidya K explaining the benefits of Remx: [Remx: The Happy Middle](https://www.youtube.com/watch?v=_hLnBlqKrIA) (21:37 min)

### Useful links
* Read Remx short [documentation](https://github.com/wix/remx#why) (5 min read).

# Getting Started
## 1. Install Remx
Go to your terminal and run: `npm install --save remx`

## 2. Create a Remx Store
Create a `posts.store.js` file for your Remx store.
The first thing that we need to decide is how our state will be structured - for simplicity use the following structure, where posts are **structured in an array**:

```js
{
  "posts": [
    {
      "id": 1,
      "title": "Post 1",
      "author": "Post 1 text",
      "img": "https://picsum.photos/200/200/?image=1"
    },
    {
      "id": 2,
      "title": "Post 2",
      "author": "Post 2 text",
      "img": "https://picsum.photos/200/200/?image=2"
    }
  ]
}
```

> There are many tips for structuring your app state. You can read the following post: [Avoiding Accidental Complexity When Structuring Your App State](https://hackernoon.com/avoiding-accidental-complexity-when-structuring-your-app-state-6e6d22ad5e2a) by Tal Kol.  
Following the tips in this article will probably lead you **not to use arrays** in a real project - indeed, it's not the smartest choice. We're doing it here just to keep our example as simple as possible, and to avoid the need to parse our data.

Remx API is super slim and includes only 4 functions, we will use 3 of them now to hold and manage our posts' data in our `posts.store.js` file: state, getters, and setters.

### Define the state as an empty post array

We will define our state using `remx.state(initialState)`.

* The `state` function takes a plain object and makes it observable (i.e., an object we're following its every change).
Any change to the state will trigger a re-render of any connected react component that should be effected from the change. So for example if you have a state with two props, A and B, and you have a connected component that is using only prop A, only changes to prop A will trigger a re-render of the component.
* The state should be defined **inside** the store, and should not be exported. 
* All interactions with the state should be done through **exported** getters and setters. 

Here's what your `posts.store.js` file should look like:

```js
import * as remx from 'remx';
const initialState = {
  posts: []
};
const state = remx.state(initialState);
```

## 4. Add Getters and Setters 

To **return** parts of the state, we will use `remx.getters(...)`. 

To **change** parts of the state, we will use `remx.setters(...)`. So:
  
* All functions that will **return** parts of the state should be wrapped within the **getters** function. 
* All functions that will **change** parts of the state should be wrapped within the **setters** function

Wrapped getters and setters functions should be defined **inside the same store file** and **should be exported**.   

>Remx has an automatic caching mechanism for `getters` for preventing unnecessary renders.

For now, our getters and setters will be pretty dumb, they will only set the posts and get the posts. That's because we structured our app with arrays. Later, however, we will add much more complex logic inside them, such as parsing the data or manipulating multiple parts of our state. 

Your final `storeTopics.js` file should look like this:  

```js
import * as remx from 'remx';

const initialState = {
  posts: []
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
```

# Writing your first action
Actions are where we put our imperative business logic, and so we call them by simply invoking them (with arguments if needed). Actions can be asynchronous, and shouldn't return anything (to enforce uni-directional data flow). 

Create a `posts.actions.js` file next to the `posts.store.js` file.

> We don't need any dispatching function because our stores are just plain old JS objects (that we tested separately). So although not a part of the API (there's really nothing special about dispatch anyway), we encourage the separation of actions and stores for low coupling, and to put action files next to the same use-case store files, for high cohesion.

## 5. Add the `fetchPosts` Action 
The first action will fetch our posts from somewhere and update the posts store state with the setter that you just created. For now, we will “fake” the data that we will later receive from the server.  

Your action should look like this:

```js

import {postsStore} from './posts.store';

const posts = [
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

export function fetchPosts() {
  postsStore.setPosts(posts);
}
```

# Displaying posts' data 

## 6. Connect the PostsList screen to display posts from the store
`remx.connect(mapStateToProps)(MyComponent)` connects a react component to the state. This function can optionally take a `mapStateToProps` function, for mapping the state into props.  

> If you are used to redux you can keep working with `mapStateToProps` but it’s important to understand that you can also just import the store and call the getters straight from your component.

In `componentDidMount`, use the `fetchPosts` action that you just created.  
Create a `mapStateToProps` function that will use the getter that we created to get the posts. (You can also avoid using `mapStateToProps` and just call the getter when you need it.  
Connect your component to the `mapStateToProps` function.  
In the render function, add another Text component to display our posts as raw data (don’t worry we will convert it to a list really soon).

Here is what your `PostList.js` should look:

```js
...
import {connect} from 'remx';
import {postsStore} from '../posts.store';
import * as postsActions from '../posts.actions';

class PostsList extends Component {

  static propTypes = {
    componentId: PropTypes.string,
    posts: PropTypes.array
  };

 ...

  componentDidMount() {
    postsActions.fetchPosts();
  }

  ...

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} onPress={this.pushViewPostScreen}>PostsList Screen</Text>
        <Text>{JSON.stringify(this.props.posts)}</Text>
      </View>
    );
  }
}

function mapStateToProps() {
  return {
    posts: postsStore.getPosts()
  };
}

export default connect(mapStateToProps)(PostsList);
```

Upon refreshing the app you should see the posts' raw data:

<img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/wiringRemx.png" align="center" height="600px">

All of the changes above can be found in this [commit](https://github.com/wix-playground/wix-mobile-crash-course/commit/04e82c8e8e759951b8bf7f132af05ad45edf2c77).

## 7. Create Your Own Local Server in 30 sec

This will give you a REST API you can use. It will take only 30 sec using [Json-server](https://github.com/typicode/json-server).

To install JSON Server run:  
`npm install -g json-server`

Create a `db.json` file on the root folder with some initial post data, for example:

```js
{
  "posts": [
    {
      "id": 1,
      "title": "Post 1",
      "text": "Scientists have developed catalysts that can convert carbon dioxide – the main cause of global warming – into plastics, fabrics, resins and other products. The discovery, based on the chemistry of artificial photosynthesis, is detailed in the journal Energy & Environmental Science.",
      "author": "Post 1 text",
      "img": "https://picsum.photos/200/200/?image=1"
    },
    {
      "id": 2,
      "title": "Post 2",
      "text": "It is one of the blessings of old friends that you can afford to be stupid with them.",
      "author": "Post 2 text",
      "img": "https://picsum.photos/200/200/?image=2"
    }
  ]
}
```

Add to your package json a script that will run your JSON server:  
`"fake-server": "json-server --watch db.json"`

Run the fake server: `npm run fake-server`

That's it, you now have your own REST API server - go to [http://localhost:3000/posts/1](http://localhost:3000/posts/1) to get your posts.

> Bug alert: If you are having issues with fetching from localhost on Android please follow this issue or use iOS:
  https://github.com/facebook/react-native/pull/23984

## 8. Fetch Posts from the Server

In your `fetchPosts` action, fetch the posts' data from our fake server (instead of mocking it).

As mentioned, actions can be asynchronous. Transform your `fetchPosts` action into an asynchronous function and use fetch to [fetch](https://facebook.github.io/react-native/docs/network) the data:

```js
import {postsStore} from './posts.store';

export async function fetchPosts() {
  const response = await fetch('https://localhost:3000/posts');
  const posts = await response.json();
  postsStore.setPosts(posts);
}
```
Upon refreshing the app, it should display the posts from your server.

## 9. Add a Remx Logger

Remx has an API for adding a logger, to enable us to log all getter/setter, `mapStateToProps` and component render calls. 

Just add the following lines to the `index.js` file:  
`import {registerLoggerForDebug} from 'remx'`
`registerLoggerForDebug(console.log); `

<img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/remx-logger.png" align="center">
  

Adding the logger, we can see the **full data flow** that we currently have in our app:  
`mapStateToProps` with 0 posts > `PostsList` gets rendered > `setPosts` setters is called setting the posts from the server > `mapStateToProps` with the new posts > `PostsList` gets rendered again.

That’s it, our Remx store and our own server are set, so we can continue working on our app logic (adding and deleting posts).

# We are almost done
We'll now add the remaining actions, starting with 'addPost'.

## 10. Add a Post

Add a setter in the posts store:

```js
addPost(post) {
    state.posts = [...state.posts, post];
}
```

> Normally, a Javascript array's contents is modified using mutative functions like push, unshift, and splice. 
In our case, react-native FlatList(Which we are going to use) is a pure component so we can’t mutate the state directly. Here is a good link to learn more about [Immutable Update Patterns](https://redux.js.org/recipes/structuringreducers/immutableupdatepatterns). Another option will be to use [FlatList](https://facebook.github.io/react-native/docs/flatlist#extradata) extraData prop.

Add your new action in `posts.actions.js`:

```js
export async function addPost(post) {
  const response = await fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  const postToAdd = await response.json();
  postsStore.addPost(postToAdd);
}
```

Now, we will use the `addPost` action to save new posts.

* We will add a `TextInput` in the `AddPost` screen.
* We will use the component state to save the values of our text inputs.
* We will use those values as our post data.

Here is what your `AddPost.js` should look:

```js
import * as postsActions from '../posts.actions';

class AddPost extends Component {

  ...
  
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state =  {
      title: '',
      text: ''
    }
  }

  ...

  onChangeTitle = title => {
    this.setState({title});
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [{
          id: 'saveBtn',
          text: 'Save',
          enabled: !!title
        }]
      }
    });
  };

  onChangeText = text => {
    this.setState({text})
  };

  onSavePressed = () => {
    Navigation.dismissModal(this.props.componentId);
    const randomImageNumber = Math.floor((Math.random() * 500) + 1);
    postsActions.addPost({
      title: this.state.title,
      text: this.state.text,
      img: `https://picsum.photos/200/200/?image=${randomImageNumber}`
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>AddPost Screen</Text>
        <TextInput
          placeholder="Add a Catchy Title"
          value={this.state.title}
          onChangeText={this.onChangeTitle}
        />
        <TextInput
          placeholder="This is the beginning of a great post"
          value={this.state.text}
          onChangeText={this.onChangeText}
        />
      </View>
    );
  }
}

export default AddPost;
```

Now, you should be able to add a new post.
Your new post will be visible in the `PostsList` screen.

All actions described in this section are provided in this [commit](https://github.com/wix-playground/wix-mobile-crash-course/commit/d88307d9b0eb8084957e8c571e8d3427e60853a5).
            
## 11. Displaying a Post on the `ViewPost` screen

It’s time to spend some time on our posts list and ViewPost screen. 

Use react-native [FlatList](https://facebook.github.io/react-native/docs/flatlist) to create a list of your posts, and pass the post to the ViewPost screen.

This is how your `PostsList.js` file should look like
```js
import {View, Text, StyleSheet, FlatList} from 'react-native';
...
class PostsList extends Component {

  ...

  pushViewPostScreen = post => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'blog.ViewPost',
        passProps: {
          somePropToPass: 'Some props that we are passing',
          post
        },
        options: {
          topBar: {
            title: {
              text: 'Post1'
            }
          }
        }
      }
    });
  };

  ...

  renderItem = ({item}) => (
    <Text onPress={() => this.pushViewPostScreen(item)}>
      {item.title}
    </Text>
  );

  postKeyExtractor =  item => `${item.id}-key`;

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>PostsList Screen</Text>
        <FlatList
          data={this.props.posts}
          keyExtractor={this.postKeyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
...
```

We are now passing the post as a prop to the `ViewPost` screen.
Go ahead and render the post on the ViewPost screen.


All actions described in this section are provided in this [commit](https://github.com/wix-playground/wix-mobile-crash-course/commit/1cfffd6be2cb7255d6bb2d86f1b342cf47bdf46a?diff=unified).

## 12. Delete a Post
When clicking on the `Delete` button on the `ViewPost` scrren, we will need to delete the post from the server and then delete it from our state.   
Again, start with your store and add a `deletePost` setter in the store:

```js
deletePost(id) {
    state.posts = filter(state.posts, post => post.id !== id);
}
```
> We are using a lodash filter function that does not mutate the state and returns a new array.

Add the `deletePost` action in your `posts.actions.js`file:

```js
export async function deletePost(id) {
  await fetch(`http://localhost:3000/posts/${id}`, {
    method: 'DELETE'
  });
  postsStore.deletePost(id);
}
```

Use the action inside our `ViewPost` screen in the `onPostDeletePressed` function.

All actions described in this section are provided in this [commit](https://github.com/wix-playground/wix-mobile-crash-course/commit/10d7e95ff47b0c0135d3a17b1962f4956f85e74d).

## Quick Recap

So here is what we did so far:

* Created a Remx store and connected it to our `PostList` screen
* Created a fake server in 30 sec.
* Learned how to work with Remx and async actions.
* Started to implement our app features. Each feature started with creating the setter in the store > implementing the action > using it in the component.

## Feel like you're up for a challenge?
Try implementing the following feature: from the `PostView` screen add an **Edit button** which will open a modal, in which you will be able to edit posts. 
Think about the following questions before you start:
1. Should the `EditPost` screen be a pushed screen or a modal?
2. When you update the post, would the `PostList` screen be re-rendered and updated? Why? 
3. Would the `ViewPost` screen be re-rendered and updated? Why? What do we need to do to make it work?

-----

## What’s Next
* [Step #3: Style the app (with react native ui lib)](App.UiLib.md)








