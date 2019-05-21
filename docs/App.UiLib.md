# Step #3: Style the app (with react native ui lib)

- [x] [**Step #1**: App Navigation (with react-native-navigation)](App.Navigation.md)
- [x] [**Step #2**: App Logic and State Management (with Remx)](App.Remx.md)

## What we're going to do
Our app works well now but let’s face it - only we think it's beautiful. In this step, we will make our app look stunning with [react-native-ui-lib](https://github.com/wix/react-native-ui-lib). 

To that end, we are going to use [react-native-ui-lib](https://github.com/wix/react-native-ui-lib)

## About react-native-ui-lib
[react-native-ui-lib](https://github.com/wix/react-native-ui-lib) is Wix's open source UI toolset & components library for React Native. It is fully maintained by the react-native-ui-lib team at Wix. 

It was designed to enable developers to build and customize their own visual language so it is not specific in any way to Wix. The Wix mobile app, for example, is using a private UI library, wix-react-native-ui-lib, as a wrapper around react-native-ui-lib. Most of the components come directly from react-native-ui-lib, and are customized to Wix's mobile app's purpose and visual language.

<img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/ui-lib%20screens%20(1).png" align="center" height="600px">

## Preliminaries
1. Follow [these steps](https://github.com/wix/react-native-ui-lib/wiki/SETUP) to run the **ui-lib demo project** and play with it for a bit. Go over the **Presets**, check out the **components and inputs screen**, as well as the **lists** and view the **Apple music example**. 
1. Read this article about **layout modifiers**: [Easy Layouting with React Native](https://medium.com/the-react-native-log/easy-layouting-with-react-native-b96c4c6fae7) (10 min)

### Useful links
* Make sure to save [react-native-ui-lib docs](https://z448401921.github.io/react-native-ui-lib/uilib-docs/public/docs/) in your bookmarks.

# Getting Started

## 1. Install react-native-ui-lib

Go to your terminal and run: `npm install --save react-native-ui-lib`

## 2. Change to wrapped components 
react-native-ui-lib is a wrapper around react-native components 
(i.e., it takes a normal react-native component and adds it additional capabilities and styling). 
As a starting point, change all of your `View` and `Text` imports from **react-native** to **react-native-ui-lib**.

All of the changes above can be found in this [commit](https://github.com/wix-playground/wix-mobile-crash-course/commit/0695bd62bef51709ec9775fb6f4a0630ad82e5e2).

# Centralizing Your Components' Style  

Currently, our app is styling each component *separately*. For example, our style object of the title in the `ViewPost` screen can look something like this:

```js
title: {
    fontSize: 28,
    fontWeight: Platform.OS === 'ios' ? '300':undefined,
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light':undefined,
    color: '#8d007b',
    textAlign: 'center',
    marginTop: 23
  }
```

This is very bad. 

> Why? We have lots of duplicated code located all around the app, and we don’t have any control over the app's style as a whole. Consider a large app with many developers and designers, where each of them can potentially use any style they want for each component, manually! That's too messy. Every little change, like in the size of all of our app's titles, will require getting into each screen. Creating a visual language includes having strict rules (or "presets") of styling, which determine for example the color and typography for ALL components of a certain type. 

Luckily, the ui-lib already comes with a set of predefined constants and presets, which define [colors](https://github.com/wix/react-native-ui-lib/blob/dec607df9c94fd37e3dc6f01b1db6847d24f1155/src/style/colorsPalette.js), [typography](https://github.com/wix/react-native-ui-lib/blob/dec607df9c/src/style/typography.js), [shadows](https://github.com/wix/react-native-ui-lib/blob/dec607df9c/src/style/shadows.js) and more. You can easily use these presets anywhere in your code. It's also very easy to [define your own presets](https://github.com/wix/react-native-ui-lib/wiki/STYLE).

## 3. Start using the ui-lib's Presets 
There are 2 ways to use predefined presets from the ui-lib and refactor your app to use them.
**Import the presets and spread them in the style object:**

```js
import {Colors, Typography} from 'react-native-ui-lib';
...
title: {
    ...Typography.text40,
    color: Colors.purple10,
    textAlign: 'center',
    marginTop: 23
  },
```

**OR Use the ui-lib [modifiers](https://github.com/wix/react-native-ui-lib/wiki/MODIFIERS).**
> As stated in the preliminaries, modifiers can be used for layout, but they can also be used for styling. They're quick, readable and require less code. You can check out in the documentation which modifiers can be used on each component. 

For example, this is how your `ViewPost` screen can look like (we removed the styles object completely):

```js
import {Button} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
...
class ViewPost extends Component {
  ...

  render() {
    const {title, text} = this.props.post;

    return (
      <View flex spread padding-24>
        <View>
          <Text text30 purple10>{title}</Text>
          <Text text70 dark20 marginT-12>{text}</Text>
        </View>
        <Button
          title="Delete Post"
          onPress={this.onPostDeletePressed}
          color={'red'}
        />
      </View>
    );
  }
}

export default ViewPost;
```

All of the changes above can be found in this [commit](https://github.com/wix-playground/wix-mobile-crash-course/commit/13d14804630120e38a1d04725cf3959c8ccc1206).

# Playing with the Defaults 

## 4. Make the “Delete” button special 

The [Button](https://z448401921.github.io/react-native-ui-lib/uilib-docs/public/docs/Button/) component is a good example of a simple component in the ui-lib. 
You can [see](https://z448401921.github.io/react-native-ui-lib/uilib-docs/public/docs/Button/) that it wraps the react-native TouchableOpacity component and adds a bunch of props, 
which together comprise a default styling that you can easily play with.
Lets' import our `Button` from the ui-lib instead of react-native and give it the following props: 

```js
<Button
   label="Delete Post"
   text80
   red20
   bg-red70
   fullWidth
   onPress={this.onPostDeletePressed}
/>
```
Try to use the `View` component and it's modifier to make the screen look like this:

<img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/deleteButton.png" align="center" height="600px">

## 5. Make your Text Inputs float and open

Import the ui-lib's [`TextField`](https://z448401921.github.io/react-native-ui-lib/uilib-docs/public/docs/TextField/) component.
Use it to get a floating placeholder for the title and to open a modal for writing the post's text. 

```js
 <TextField
  text70
  containerStyle={{marginBottom: 12}}
  floatingPlaceholder
  placeholder="Add a Catchy Title"
  onChangeText={this.onChangeTitle}
  floatOnFocus
/>
<TextField
  text70
  floatingPlaceholder
  placeholder="This is the beginning of a great post"
  onChangeText={this.onChangeText}
  expandable
/>
```

Here is how our `TextField`s should look like now:  
<img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/textInputs.gif" align="center" height="600px">

## 6. Style your Posts List

Use the ui-lib's [ListItem](https://z448401921.github.io/react-native-ui-lib/uilib-docs/public/docs/ListItem/) component. 
Update your `renderItem` function to give the list some basic styling:  

```js
import {Text, ListItem, Colors, BorderRadiuses, Image} from 'react-native-ui-lib';
...

renderItem = ({item}) => (
    <ListItem
      activeBackgroundColor={Colors.purple70}
      activeOpacity={0.1}
      height={77.5}
      onPress={() => this.pushViewPostScreen(item)}
    >
      <ListItem.Part left>
        <Image
          source={{uri: item.img}}
          style={styles.image}
        />
      </ListItem.Part>
      <ListItem.Part middle column containerStyle={[styles.border, {paddingRight: 17}]}>
        <ListItem.Part containerStyle={{marginBottom: 3}}>
          <Text dark10 text70 style={{flex: 1, marginRight: 10}} numberOfLines={1}>{item.title}</Text>
        </ListItem.Part>
        <ListItem.Part>
          <Text style={{flex: 1, marginRight: 10}} text90 dark40 numberOfLines={1}>{item.text}</Text>
        </ListItem.Part>
      </ListItem.Part>
    </ListItem>
  );

  render() {
    return (
      <FlatList
        data={this.props.posts}
        keyExtractor={item => `{key-${item.id}`}
        renderItem={this.renderItem}
      />
    );
  }
}

function mapStateToProps() {
  return {
    posts: postsStore.getPosts()
  };
}

export default connect(mapStateToProps)(PostsList);

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.dark60,
  }
});
```

The [ListItem](https://z448401921.github.io/react-native-ui-lib/uilib-docs/public/docs/ListItem/) component is very flexible and was designed to support various styles, this is why the `renderItem` function seems a bit long. You can move it into a separated component.

As mentioned, the wix-react-native-ui-lib uses `ListItem` from the ui-lib and applies styling relevant only for the Wix App. So its API will look something like this:
```js
<WixListItem 
  title={post.title} 
  subtitle={post.text} 
  thumbnail={{uri: post.img}}
/>
```

All of the changes above can be found in this [commit](https://github.com/wix-playground/wix-mobile-crash-course/commit/40a676203546bba1b4c0890616457d3af814f029).

## Quick Recap
Up until now:
- You refactored your app's components to have a **consistent style**.
- You got familiar with a few **react-native-ui-lib components, presets, and modifyers**, and can now go ahead and explore it further to give the app your own look.

This is how our app looks like now:

<img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/finalApp.gif" align="center" height="600px">

# What’s Next

We built an entire app without any Tests!!! Don’t tell Uncle Bob and let’s add some tests ASAP.  

- [**Step #4**: Add E2E Tests (with Detox)](App.e2e.md)










