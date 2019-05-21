# Environment Setup

In this course we will work with a variety of tools and technologies, in particular with Javascript, Android, iOS - each with its own IDE's and tools, so there's lot's of things to install.

Below is everything you will need for developing apps with react native and also a list of recommended tools that we use on a daily basis at the Wix Mobile Guild:

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

If you are familiar with using the native Mac terminal or you're' a Linux geek, feel free to set things up the way you like them. In general though we recommend installing and setting up [iTerm2](https://www.iterm2.com/downloads.html) (in case you are on a Mac) and  [Oh my Zsh](https://ohmyz.sh/) (cross-platform).

But even if you already manage your own terminal settings files, live and breath aliases and autofill your git commands (or use a GUI-based tool for that), this article is still worth reading through to get familiar with how we do things at Wix.

We use terminal very often in our day-to-day work with react native environments, so here's why we recommend the iTerm2 with Oh-my-zsh:
* It’s super easy to define new aliases
* Git abbreviations come out of the box
* You can easily display your git branch
* Readable color schemes
* Easy to manage tabs/screens/splits

All iTerm2 features can be found [here](https://iterm2.com/features.html). Both tools are open-source so if you want a new feature implemented, you’re more than welcome to contribute to these projects.

## Aliases

Aliases are an abbreviations to commands. We use them very often and it’s highly recommended to define your own aliases. It will save you time and will make you more productive.

### How to define an alias?

1. Open your `.zshrc` file in your root folder:

```
open ~/.zshrc
```

2. And a new line in the aliases section (doesn't really matter where you add it, but let's keep things clean):

```
alias openzshrc="open -a /Applications/Visual\ Studio\ Code.app ~/.zshrc"
```

3. Type `openzshrc`  in your terminal and check that it worked ;)

> **Notice**: This example alias will work on a Mac with the MS Visual Studio IDE installed; running `openzshrc` should have opened the Visual Studio for you. More on IDEs below.

### Recommended Aliases you can add

To get even more productive, you are welcome to read the  [React Native Developers - Save your Time with these 24 Terminal Tricks](https://medium.com/@RanGreenberg/react-native-developers-save-your-time-with-these-24-terminal-tricks-10dc24f98e19) blog post and add the aliases that you like.

## Git

Git is the basis of our collaborative work. We use it all day every day.

Some developers use Git via command line, some use it via 3rd party apps like Source Tree or GitHub Desktop. Here's a short list of great options to consider:

* [SourceTree](https://www.sourcetreeapp.com/)
* [GitHub Desktop client](https://desktop.github.com/)
* [GitKraken Client](https://www.gitkraken.com/git-client)
* [Atom Editor](https://atom.io/)

## React Native Environment

We are developing for mobile but we actually use the JavaScript environment setup. Which means that we are free to choose an editor, debugger and test runner per our preference. The platform does not choose that for us anymore.

### IDE

Most common code IDEs React Native developers using are:

* [Visual Studio Code](https://code.visualstudio.com/)
* [WebStorm](https://www.jetbrains.com/webstorm/)

No matter which editor you select, make sure to install recommended plugins for React Native development:

* [VSCode react-native plugins example list](https://medium.com/react-native-training/vscode-for-react-native-526ec4a368ce)
* [WebStorm react-native plugins example list](http://bfy.tw/L3ae)

### Test Runner

We do write tests here at Wix, and many of them :)

Since generally we want to make our lives easier, we would need a tool to run our unit tests automatically.

We can run automated tests using the following tools:

* [Wallaby](https://wallabyjs.com/) - Integrated Continuous Testing Tool for JavaScript, which features plugins for almost every IDE out there ([see this list](https://wallabyjs.com/download/)).
* [Jest watch](https://jestjs.io/docs/en/cli.html#running-from-the-command-line)

```
jest --watch //Run tests related to changed files based on hg/git (uncommitted files):

jest --watchAll //Run all tests
```

### Debugger

As mentioned before, we’re in a JS environment, so we can’t really use the Xcode or Android Studio debuggers, which work only when developing natively.

To understand more about debugging, please read [React Native debugging best practices](https://facebook.github.io/react-native/docs/debugging).

For the purposes of this course we will talk about these two commons debuggers:
* [Chrome dev tools with a react native extension](https://facebook.github.io/react-native/docs/debugging#chrome-developer-tools)
* **[recommended]** [React native debugger](https://github.com/jhen0409/react-native-debugger) - Open source, cross-platform and a quite well maintained, it provides all the features that come with the Chrome dev tools and many more, like an ability to easily inspect network requests.
* [Reactatron](https://github.com/infinitered/reactotron) - A cross-platform desktop app for inspecting your React JS and React Native projects.

## iOS / Android

React native is a framework, built on top of the native environment. In order to run our application on a mobile device we need to have iOS and Android native environments.

### iOS
Xcode is a must when you want to run an iOS application.
Download and Install [Xcode](https://developer.apple.com/download/more/).

### Android
Download and install [Android studio](https://developer.android.com/studio/install).
