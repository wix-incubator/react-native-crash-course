<p align="center"><Img src="https://github.com/wix-playground/react-native-crash-course/blob/master/assets/banner.png" allign="center"></p>

# React Native Crash Course by Wix

The React Native crash course by Wix is a self-learning course designed to help you learn everything 
you need to know before diving into writing production code in [React Native](https://facebook.github.io/react-native/).
This course is part of the official onboarding plan for every new developer joining the Wix Mobile Guild.

The course is divided into 2 sections:

## 1. Learn the basics

Helps you untangle the environment setup, learn basics or refresh your knowledge of JS, React, Node, Git, etc. If you already feel comfortable with these subjects, you can jump straight into the next section.

* [Environment setup](/docs/Basics.enviromentSetup.md)
* [Intro to Git & GitHub](/docs/Basics.IntroToGit.md)
* [JS](/docs/Basics.JavaScript.md)
* [React Native](/docs/Basics.ReactNative.md)


## 2. Build your first app

This step-by-step guide will teach you about the best practices and open source tools we are using at Wix and will  guide you through building a simple blog app.

1. [Intro](/docs/App.Intro.md)
2. [Build the **app navigation**](/docs/App.Navigation.md) (with React-native-navigation)
3. [Adding the **app business logic** and **state management**](/docs/App.Remx.md) (with Remx)
4. [**Style** the app](/docs/App.UiLib.md) (with react-native-ui-lib)
5. [Add **e2e tests**](/docs/App.e2e.md) (with Detox)
6. [Add **unit tests**](/docs/App.tests.md) (with Jest)
7. [Adding a **Native Module**](/docs/App.NativeModule.md)
8. [Performance - Tools and Best Practice](/docs/App.performance.md)

Here is how our app will look like:

![The app that we are going to build](https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/finalApp.gif)


Let's start. 🚀

> Note: The most important thing about any course, is to keep it up to date. We encourage the old Scout's rule: "Leave the campground cleaner than you found it". If you find any issues or out of date content, please send us a pull request or open an issue we will take care of it. Thanks!

We are always working on improving the course content and we would love to get your [feedback](https://docs.google.com/forms/d/e/1FAIpQLSfceLeyvKe2jkk0dkT6LdVE9CA5uq3J-Jt3sCkEhs07hQRVZQ/viewform?usp=sf_link).

## How To Run the App
```
npm install
npm run fake-server
react-native run-ios / run-android
```
* prerequisites: 
    * npm `json-server` package
    * ios simulator - Hardware -> Keyboard -> Toggle Software Keyboard
## How To Run the Tests
```
npm run start-e2e
npm run test
```
