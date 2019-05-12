# Environment Setup

Javascript, Android, iOS - each with its own IDE's and tools, so there's lot's of things to install. 
In this article, we gathered everything that you will need for developing apps with react-native and all of the recommended tools that we are using at Wix Mobile Guild:

* [Terminal](#terminal)
* [Aliases](#Aliases)
* [Git](#Git)
* [React Native Environment](#react-native-Environment)
  * [IDE](#ide)
  * [Test Runner](#test-runner)
  * [Debugger](#debugger)
* [iOS / Android](ios--android)
  * [Xcode](#xcode)
  * [Android Studio](#android-studio)

## Terminal

Install [iTerm2](https://www.iterm2.com/downloads.html).

Install [Oh my Zsh](https://ohmyz.sh/)

We use the terminal very often in our day-to-day work with react-native environment.
The recommended tool for terminal is iTerm2 with Oh-my-zsh. 
The main reasons are:
* It’s super easy to define new aliases
* Git abbreviations come out of the box (see here)
* You can easily display your git branch
* Readable color schemes
* Easy to manage tabs/screens/splits

All iTerm2 features can be found [here](https://iterm2.com/features.html).
Both tools are open-source so if you might want a new feature you’re more than welcome to implement it and contribute.

## Aliases

Aliases are an abbreviations to commands. We use them very often and it’s highly  recommended to define your own aliases. It will save you time and will make you more productive.

### How to define an alias?

1. Open your `.zshrc` file in your root folder:

```
open ~/.zshrc
```

2. Add a new line in the aliases section (doesn’t really matter, just for order manners): 

```
alias openzshrc="open -a /Applications/Visual\ Studio\ Code.app ~/.zshrc"
```

3. Type `openzshrc`  in your terminal and check that it worked ;)

### Recommended Aliases that you can add

To get even more productive, you are welcome to read the  [React Native Developers - Save your Time with these 24 Terminal Tricks](https://medium.com/@RanGreenberg/react-native-developers-save-your-time-with-these-24-terminal-tricks-10dc24f98e19) blog post and add the aliases that you like.

## Git

Git is our major tool to work together. We use it all day every day. 

Some developers use Git via command line, some use it via 3rd party apps like Source Tree or GitHub client.

Install [SourceTree](https://www.sourcetreeapp.com/)

## React Native Environment

We are developing for mobile but we actually use JavaScript environment setup. Which means that we can choose our editor, debugger and test runner. The platform does not choose that for us anymore.

### IDE

Most common code IDEs react-native developers using are:

* [Visual Studio Code](https://code.visualstudio.com/)
* [WebStorm](https://www.jetbrains.com/webstorm/)

No matter which editor you select, make sure to install recommended plugins for react-native development:

* [VSCode react-native plugins example list](https://medium.com/react-native-training/vscode-for-react-native-526ec4a368ce)
* [WebStorm react-native plugins example list](http://bfy.tw/L3ae) 🙃

### Test Runner

We do write tests here at Wix, and many of them :)

We want to make our life easy and comfortable, so we need a tool to run our unit tests automatically.

We can run automated tests using the following tools:

* [Wallaby](https://wallabyjs.com/) - Integrated Continuous Testing Tool for JavaScript. This tool has plugins for almost every IDE (see [list](https://wallabyjs.com/download/)).
* [Jest watch](https://jestjs.io/docs/en/cli.html#running-from-the-command-line)

```
jest --watch //Run tests related to changed files based on hg/git (uncommitted files):

jest --watchAll //Run all tests
```

### Debugger

As mentioned before, we’re in JS environment, so we can’t use the Xcode or Android Studio debuggers, that fit only for native development.

To understand more about debugging, please read [React Native debugging best practices](https://facebook.github.io/react-native/docs/debugging).

We have 2 commons debuggers:
* [Chrome dev tools with react-native extension](https://facebook.github.io/react-native/docs/debugging#chrome-developer-tools)
* [recommended] [React native debugger](https://github.com/jhen0409/react-native-debugger) - Mac app with an open source that is well maintained. It provides all the features that come with chrome dev tools and many more, like ability to inspect network requests easily.
* [Reactatron](https://github.com/infinitered/reactotron) - A desktop app for inspecting your React JS and React Native projects. May run on macOS, Linux, and Windows.


## iOS / Android

React native is a framework that is built on top of the native environment.
In order to run the application in mobile device we need to have iOS and Android native environment. 

### iOS
Xcode is a must when you want to run iOS application.
Download and Install [Xcode](https://developer.apple.com/download/more/).

### Android
Download and install [Android studio](https://developer.android.com/studio/install).













