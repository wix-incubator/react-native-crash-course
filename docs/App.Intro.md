# Building Your First App

It’s time to build your first React Native app! In this section, we will walk you through building a blog app from scratch.

## About the App

The app will display a list of posts and a user will be able to view posts, add and delete them. Here is how it’s going to look like:

![final app](https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/finalApp.gif)

All of the code for the final project can be found [here](https://github.com/wix-playground/wix-mobile-crash-course).

## About this Tutorial

We will follow this workflow, step-by-step:

1. [Build the **app navigation**](App.Navigation.md) (with React-native-navigation)
2. [Adding the **app business logic** and **state management**](App.Remx.md) (with Remx)
3. [**Style** the app](App.UiLib.md) (with react-native-ui-lib)
4. [Add **e2e tests**](App.e2e.md) (with Detox)
5. [Add **unit tests**](App.tests.md) (with Jest)
6. [Adding a **Native Module**](App.NativeModule.md)
7. [Performance - Tools and Best Practice](App.performance.md)


Each step comprises 2 parts:

* **Prerequisites** - includes links to best resources to learn from. These are for your convenience, so feel free to skip what you are already familiar with.
* **Hands-on** - work step by step on building the app, applying best practices in each step and exploring the most important features of the libraries we are using.

> __**Note:**__ *Each step is heavily dependent on the previous one, so even if you choose to skip the more theoretical "Perliminaries" part, make sure to go through the hands-on sections.*

If you feel like you want to give your app your own twist, go for it! Check out these API's you can use:
* [SpaceX Launches](https://github.com/r-spacex/SpaceX-API)
* [Star Wars data](https://swapi.co/)
* [Weather API](https://www.metaweather.com/api/) or [Open weather map](http://openweathermap.org/current)
* [Cryptocurrency prices API](https://www.coindesk.com/api/)
* [Food & recipes API](https://spoonacular.com/food-api)  (you'll need a freemium subscription)
* [Twitter search API](https://dev.twitter.com/rest/public/search)
* [Movie Database api](https://www.themoviedb.org/documentation/api)
* [Reddit API](https://www.reddit.com/dev/api/)

We will use our own simple local server which we will create (Just to make sure that we're not dependent on any external APIs and that we have a full REST API).

## Prerequisites
Before you dive into this tutorial, you should feel comfortable with the basics of JS and React.

We recommend going over the [Basics section](https://github.com/wix-playground/wix-mobile-crash-course#1-learn-the-basics) plan before you start. It will help you untangle the environment setup, learn or refresh your basic knowledge of JS, React, Node, Git, etc .

If you choose to dive straight into this section and start building your app, the minimum requirement is to complete the official [React Native Getting Started guide](https://facebook.github.io/react-native/docs/getting-started.html) (Choose building project with Native code and not quick start), to install and build your first Hello world app and ensure that your environment setup is ready.

Have fun 🚀

## What's Next
[Step #1: Build the App Navigation (with React-native-navigation)](App.Navigation.md)
