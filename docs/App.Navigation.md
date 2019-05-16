# Step #1: App Navigation (with react native navigation)

- [x] **[Build Your First App](App.Intro.md) - intro**

Every app starts with navigation. In this section, we are going to build the skeleton of our app using [react-native-navigation](https://github.com/wix/react-native-navigation). 

## About react-native-navigation
[react-native-navigation (RNN)](https://github.com/wix/react-native-navigation) is an open source project created by the Wix mobile team. It is now the top open source project by Wix. As opposed to other popular JS navigation solutions for react-native, RNN is a 100% native navigation solution with a simple cross-platform JS API. 

This tutorial will help you learn RNN's basic functionality and feel more comfortable diving into the more complex features and API. You can view the full documentation [here](https://wix.github.io/react-native-navigation/#/).

#### Useful links
* react-native-navigation [docs](https://wix.github.io/react-native-navigation/#/docs/screen-api)
* react-native-navigation [on stack overflow](https://stackoverflow.com/questions/tagged/react-native-navigation)

## What we’re going to do
Here is the outline of what we are going to build in this section:

![app skelaton](https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/blogSkelaton.png)

* We will create a `PostsList` screen.
* Pressing on a post will push the `ViewPost` screen
* From the `ViewPost` screen, we can delete the post and go back to the posts list.
* From the list, we also have an option to open a modal with the `AddPost` screen.
* From the `AddPost` screen, we can cancel or save and go back to the posts list.

# Getting Started
### 1. Start with a simple react-native init project

You can follow the react-native [getting started guide](https://facebook.github.io/react-native/docs/getting-started)(Choose "React Native CLI Quickstart" and not "Expo Quickstart") to make sure that you have all dependencies installed. If this is not the first time you are creating a react-native project just go to your terminal and run:

```
react-native init wixMobileCrashCourse
cd wixMobileCrashCourse
```
To run the project you will need to run:
```
react-native run-ios
react-native run-android
```
You should see your new app running on your simulators:

<img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/react%20native%20init.png" align="center" width="80%" >

### 2. Install react-native-navigation 
As `react-native-navigation` is a native navigation library - integrating it into your app will require editing native files. Follow the installation guides in the [documentation](https://wix.github.io/react-native-navigation/#/).

Make sure that your app is still running on both simulators and that you are not getting any red screens.


# Adding the Screens
### 3. Create and Register Screens

In `src/posts/screens` create three screens: `PostsList.js`, `ViewPost.js` and `AddPost.js`. Each screen should be a very basic component that looks like this:
```js
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class PostsList extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>PostsList Screen</Text>
      </View>
    );
  }
}

export default PostsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3EDFF',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  }
});
```

Every screen component in your app must be registered with a unique name before you are able to use it. So create a `src/screens.js` file and [register the new screens](https://wix.github.io/react-native-navigation/#/docs/Usage?id=registercomponentscreenid-generator) that you just created.  

[Here](https://github.com/wix-playground/wix-mobile-crash-course/blob/master/src/screens.js) is what your `screens.js` file should look like.


### 4. Initialize the App Layout 

From your `index.js` file, call `registerScreens` and [initialize the app layout](https://wix.github.io/react-native-navigation/#/docs/Usage?id=registerapplaunchedlistenercallback) that you want via the `setRoot` command - pick the **simplest layout** which is based on a single stack (a stack, supports children layouts of any kind. A stack can be initialized with more than one screen, in which case the last screen will be presented at the top of the stack) with a single component - our PostsList screen. 

> The possibilities of the layout API are almost endless and you can compose almost any arbitrary native layout. You can check out all of the [layout types here](https://wix.github.io/react-native-navigation/#/docs/layout-types). 

Here is what your `index.js` should look like:  

```js
import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'blog.PostsList',
              options: {
                topBar: {
                  title: {
                    text: 'Blog'
                  }
                }
              }
            }
          }
        ],
      }
    }
  });
});
```

> You have just set the root using a single stack with the PostsList component AND the Top Bar title provided in the Options object; You can check the complete Options object format [here](https://wix.github.io/react-native-navigation/#/docs/styling?id=options-object-format).

When you refresh the app, you should get the blue PostsList screen:  

<img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/PostsList.png" align="center" >

All actions described in this section are provided in this [commit](https://github.com/wix-playground/wix-mobile-crash-course/commit/2de9761877a3fa7ed6339daae7d370979da14017).

# Pushing Your First Screen
Now we want to enable the following behavior: when the user clicks on the text, the app pushes the ViewPost screen. Later on, it will be very easy to attach the same function to a list item instead of the text. 

### 5. Push a Screen into the Navigation Stack

To push a new screen into this screen’s navigation stack, we will use [Navigation.push](https://wix.github.io/react-native-navigation/#/docs/screen-api?id=pushcomponentid-layout).This method expects to receive the current `componentId` which can be found in `props.componentID`. 

So in `PostsList.js` create a `pushViewPostScreen` function and attach it to the `onPress` event of the Text.

Here is how `PostsList.js` will look like:  

```js
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';

class PostsList extends Component {

  static propTypes = {
    componentId: PropTypes.string
  };

  pushViewPostScreen = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'blog.ViewPost',
        passProps: {
          somePropToPass: 'Some props that we are passing'
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
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} onPress={this.pushViewPostScreen}>PostsList Screen</Text>
      </View>
    );
  }
}
...
```
> Two things in the code above that we didn’t cover are:  
> **passProps** - you can pass props to the screen that we are pushing.  
> **options** - you can style the navigator’s appearance and behavior by passing any [Options](https://wix.github.io/react-native-navigation/#/docs/styling?id=styling-options) object. This object can be declared in two different ways: One, you can declare the object dynamically when adding a screen to the layout hierarchy as we did in the code above. Two, you can also define the object by setting static get options() on the screen component. This declaration is static and should be done for every screen. In the next section, we will explore this option.

When you refresh the app, you should now able to push the ViewPost screen by clicking the text:  

<img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/pushingTheFirstScreen.gif" align="center" height="400px">

All the steps from this section can be viewed in this [commit](https://github.com/wix-playground/wix-mobile-crash-course/commit/23c31c700a221e557a6c0e3c7742114b3a5ae54b).

# Adding Buttons to the Top Bar
On the PostsLists screen, we want to have an “Add” button that opens the AddPost screen as a modal. Buttons are part of the Options object. 

### 6. Add the “Add” Button (to PostList Screen)

Declare the button in the PostsList screen [statically](https://wix.github.io/react-native-navigation/#/docs/topBar-buttons?id=declaring-buttons-statically). Top bar buttons have [multiple options for](https://wix.github.io/react-native-navigation/#/docs/topBar-buttons?id=button-options) customization, but we will declare a very simple button with a title and id.

We want the component to [handle the button click](https://wix.github.io/react-native-navigation/#/docs/topBar-buttons?id=handling-button-press-events), so you will need to do 2 things:
* Add events().bindComponent(this)to the constructor.
* When a top bar button press event is triggered, the app calls the navigationButtonPressed - implement that and alert or console.log the pressed button id.

Here is how your `postList.js` file will look like:  

```js
...

class PostsList extends Component {

 constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);
 ...

  static options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: 'addPost',
            text: 'Add'
          }
        ]
      }
    };
  }

  navigationButtonPressed({buttonId}) {
    alert(buttonId);
  }
  ...
  pushViewPostScreen() {
  ...
```

Now you have an Add button and whenever you press it, you should get an alert with the `buttonId` (in our example it is `addPost`).

Next, Instead of the just displaying the buttonId as an alert, try to handle the press event and show the AddPost screen as a [modal](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/modality/) with [Navigation.showModal](https://wix.github.io/react-native-navigation/#/docs/screen-api).

All the steps from this section can be viewed in this [commit](https://github.com/wix-playground/wix-mobile-crash-course/commit/5165ad5ee81e55577120e2ceb5007d4ed52dd0d0).

### 7. Add “Cancel” and “Save” Buttons (to AddPost Screen)

In the same that we added the **Add** Button, add the **Cancel** and **Save** buttons to the Top bar of the AddPost screen. Whenever the **Cancel** button is clicked, use [Navigation.dismissModal](https://wix.github.io/react-native-navigation/#/docs/screen-api?id=dismissmodalcomponentid) to dismiss the modal and go back to the PostsList screen.

Left buttons on Android only support icons, so we will add an "X" icon which you can download from the assets folder.   

```js
...
import PropTypes from 'prop-types';
import {Navigation} from 'react-native-navigation'

class AddPost extends Component {

  static propTypes = {
    componentId: PropTypes.string
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  static options() {
    return {
      topBar: {
        title: {
          text: 'Add Post'
        },
        rightButtons: [{
          id: 'saveBtn',
          text: 'Save'
        }],
        leftButtons: [{
          id: 'cancelBtn',
          icon: require('../../icons/x.icon.png')
        }]
      }
    };
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'cancelBtn') {
      Navigation.dismissModal(this.props.componentId);
    } else if (buttonId === 'saveBtn') {
      alert('saveBtn');
    }
  }

...
```

<img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/addingButtons.gif" align="center" height="400px">

All the steps from this section can be viewed in this [commit](https://github.com/wix-playground/wix-mobile-crash-course/commit/cd2afd9d5f0a611f04c2bf316c08bb990340cd7a).

### 8. Set the Style of the “Save” Button
At the full app gif (At the bottom of this tutorial), the `Save` button is disabled until the user starts typing something in the TextInput. 
To disable the button, we can simply add `enabled: false` in the button option.

But how do we set styles dynamically? Glad you asked. 
[Navigation.mergeOptions](https://wix.github.io/react-native-navigation/#/docs/styling?id=setting-styles-dynamically) to the rescue! 
You can pass any Options object in the mergeOptions method that dynamically changes a screen style. 
These options are merged with the existing Options object.

Let's add a `TextInput` and set the `Save` Button dynamically.   

This is how our `AddPost` screen will look like:
```js
...
import {View, Text, TextInput, StyleSheet} from 'react-native';
...
class AddPost extends Component {

  ...
 
  static options() {
    return {
      topBar: {
        title: {
          text: 'Add Post'
        },
        rightButtons: [{
          id: 'saveBtn',
          text: 'Save',
          enabled: false
        }],
        leftButtons: [{
          id: 'cancelBtn',
          icon: require('../../icons/x.icon.png')
        }]
      }
    };
  }

  ...
  
  onChangeText = text => {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [{
          id: 'saveBtn',
          text: 'Save',
          enabled: !!text
        }]
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>AddPost Screen</Text>
        <TextInput
          placeholder="Start writing to enable the save btn"
          onChangeText={this.onChangeText}
        />
      </View>
    );
  }
}

export default AddPost;
```

You can check this [commit](https://github.com/wix-playground/wix-mobile-crash-course/commit/263a128914b13a4c3ed302fe7a5943b6385fdbaa).

# We are Almost Done
The app navigation skeleton is almost ready and we will leave the rest to you.

### 9. Implement the remaining buttons' press events:
* **Save** - Dismiss the modal when clicking on the `Save` button in the same way the Cancel button does.
* **Delete** - In The `ViewPost` screen, add the `Delete` button. Use [Navigation.pop](https://wix.github.io/react-native-navigation/#/docs/screen-api?id=popcomponentid) to pop the ViewPost screen from the stack and reveal the PostsList screen underneath.

You can check out these commits if you need a hint: [Save Button](https://github.com/wix-playground/wix-mobile-crash-course/commit/3fb02f426f362328d6f78351ac5dbfa893b32ba4), [Delete Button](https://github.com/wix-playground/wix-mobile-crash-course/commit/e71e54325b05adf52cfb8c812d8a914654264e1c).

Your app should now look something like this:

<img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/navigationFinal.gif" align="center" height="600px">

## Quick Recap
Up until now:

* You got to know part of [react-native-navigation](https://github.com/wix/react-native-navigation/) API.
You’ve [registered](https://wix.github.io/react-native-navigation/#/docs/Usage?id=registercomponentscreenid-generator) the screens.
* You’ve [initialised the app layout](https://wix.github.io/react-native-navigation/#/docs/Usage?id=registerapplaunchedlistenercallback) via the setRoot command
* You’ve pushed the screens using [Navigation.push](https://wix.github.io/react-native-navigation/#/docs/screen-api?id=pushcomponentid-layout)
* You’ve learned how to set the [Top Bar buttons](https://wix.github.io/react-native-navigation/#/docs/topBar-buttons) and how to handle [navigation press events](https://wix.github.io/react-native-navigation/#/docs/events?id=onnavigationbuttonpressed)
* You’ve learned how to work with [Modals](https://wix.github.io/react-native-navigation/#/docs/screen-api?id=showmodallayout-), and
* You’ve learned how to [style the navigator](https://wix.github.io/react-native-navigation/#/docs/styling) using the Options object and how to dynamically merge options.

You can view the full project in [this repository](
https://github.com/wix-playground/wix-mobile-crash-course).

***
# What’s Next

[Adding App Logic and State Management with Remx](App.Remx.md)





  

