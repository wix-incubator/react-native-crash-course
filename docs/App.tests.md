# Step #5: Add Unit Tests (with Jest)

- [x] [**Step #1**: App Navigation (with react-native-navigation)](App.Navigation.md)
- [x] [**Step #2**: App Logic and State Management (with Remx)](App.Remx.md)
- [x] [**Step #3**: Style the app (with react native ui lib)](App.UiLib.md)
- [x] [**Step #4**: Add E2E Tests (with Detox)](App.e2e.md)

## What we're going to do
So let’s talk about the elephant in the room... Up until now we did not follow TDD (Test Driven Development) rules. The reason is that it’s hard to write TDD if it's new to you, while also learning a new framework. It’s a skill and it’s something that takes time to learn and get used to. Better late than never, right?

In this step we are going to:
* Add unit tests to our app using [Jest](https://jestjs.io/), which is our preferred tool for writing unit tests.
* Refactor our code TDD-style.
* Add missing tests.

## About Testing and React Native

Let's take a look at the testing pyramid.

<img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/testingPyramid.png" />

### Unit tests

At Wix, we test all of our **business logic** with unit tests. Each test verifies one point of the contract for one single method of a class. Every test should have a very narrow and well-defined scope. Complex dependencies and interactions with the outside world are mocked. Unit tests are fast and allow us to develop TDD.

### E2E tests

As you saw in the previous step we used Detox to write our E2E tests. E2E tests should test the **main flows** of your app. They are slow, but they are the closest thing to a real user using your app.

### Component tests

Well... There is an ongoing argument between different teams at Wix Mobile about whether we should do component testing or not. Component testing should test our **React components**.

If you come from a web background you are probably familiar with component testing and you've probably used frameworks like Enzyme to test your components. The problem is that on the web we have jsdom, and on react-native, we are running our app on a real device. There are a couple of options to write component testing in react-native like [Enzyme-Drivers](https://github.com/wix/enzyme-drivers) or [Jest for React Native](https://jestjs.io/docs/en/tutorial-react-native), but some would argue that they are not really testing anything because they are using shallow rendering. If you want to read more about this topic we recommend [this great post](https://medium.com/@niryo/introducing-kompot-b2946243d322) by Nir Yosef.

So, in conclusion, we agreed to disagree and so some teams at Wix write component tests and some don’t.

How do we fill the missing gap? We write more E2E and unit tests. The best practice in react-native is to extract as much logic as possible from a component into a separate file (“presenter/”service”/”helper”). If the component is very slim and clean and uses a presenter for all of its logic, we will be able to test this logic separately with unit tests.

In addition, we started working with a new utility library called “[Kompot](https://github.com/wix-incubator/Kompot)” which uses detox to test components. It is somewhere in the middle between component testing and E2E tests.

## Prerequisites

1. Watch this crazy playlist by MPJ: [Unit testing in Javascript](https://www.youtube.com/playlist?list=PL0zVEGEvSaeF_zoW9o66wa_UCNE3a7BEr)
1. Read the Jest docs about [using Matchers](https://jestjs.io/docs/en/using-matchers), [testing asynchronous code](https://jestjs.io/docs/en/asynchronous), and [mock functions](https://jestjs.io/docs/en/mock-functions)

### Useful Links
* Bookmark Jest's API reference for [Expect](https://jestjs.io/docs/en/expect), [Mock Functions](https://jestjs.io/docs/en/expect), and [The Jest Object](https://jestjs.io/docs/en/expect)


# Getting Started

## 1. Install Jest

You can follow this [Jest Getting Started guide](https://jestjs.io/docs/en/getting-started).

> Note: You might need to troubleshoot some issues with Babel and Jest's configuration. You can use the following projects as a reference for how your `jest.config.js` and `babel.config.js` files should look like:
> * [Jest react native example](https://github.com/facebook/jest/blob/master/examples/react-native/.babelrc.js)
> * [Our final project](https://github.com/wix-playground/wix-mobile-crash-course/blob/master/jest.config.js)

You should now have your first passing test (as described in the Jest guide).

A couple of tips:
* Run `jest --watch` to get instant feedback for every change you make in your code. The "Jest Watch" mode also enables you to specify name or path to a file if you want to focus on a specific set of tests.
* Add scripts for running only E2E/unit test to your `package.json`, and a script for running all tests.
* For a true TDD experience, we recommend using [wallaby.js](https://wallabyjs.com/) (Not mandatory)

# Let the Testing Begin!

## 2. Write unit tests for your Remx store

Next to `posts.store.js` create a new file called `posts.store.test.js` and add the following tests:

```js
describe('posts store', () => {
  beforeEach(() => {
    postsStore = require('./posts.store').postsStore;
  });
  it('should have an initial state without any posts', () => {});
  it('should set posts', () => {});
  it('should add a post', () => {});
  it('should delete a post', () => {});
});
```

Need some help?

* You can check out Yedidy’s talk about [how to test your remx store](https://www.youtube.com/watch?v=_hLnBlqKrIA&t=16m55s)
* You can take a look at the final tests [here](https://github.com/wix-playground/wix-mobile-crash-course/blob/master/src/posts/posts.store.test.js).

## 3. Test your actions

Add tests for your post actions (fetch, add, delete).

A couple of hints:

* Do we actually need to test the store if it’s a unit test? Or do we just need to mock the store and make sure that correct getters and setters are called?
* How do we mock our api file? Check out `mockResolvedValue` in Jest Api.
* If you are having any trouble, you can take a look at the final tests [here](https://github.com/wix-playground/wix-mobile-crash-course/blob/master/src/posts/posts.actions.test.js).

## 4. Refactor `AddPost.js`

Your next task is to refactor `AddPost.js` and extract both `onChangeTitle` and `onChangeText` into a separate `AddPost.presenter.js` file. Try doing it the TDD-style.

You can use this code as your starting point:

```js
describe('AddPost presenter', () => {

 beforeEach(() => {
   Presenter = require('./AddPost.presenter');
 });

 it('should enable the save button if title is not blank', () => {});
 it('should not enable the save button if title is blank', () => {});
 it('should dismiss the modal when clicking on save', () => {});
 it('should call add post action when clicking on save', () => {});
});
```

Our goal here is to have you get the feeling of what it’s like to refactor your code when you have both E2E tests and unit tests protecting you from breaking something in code.

A couple of hints:
* Use jest.mock to mock `react-native-navigation`
* Use jest.mock to mock `posts.actions`
* If you are having trouble, you can take a look at the final tests [here](https://github.com/wix-playground/wix-mobile-crash-course/blob/master/src/posts/screens/AddPost.presenter.test.js)

## Quick Recap

Up until now:
* You learned about the challenges in testing a react-native app.
* You added unit tests to your app.

We hope that you are starting to get the feeling of why tests are good for you and how testing can give you the confidence when refactoring code or diving into code that someone else wrote.

-----

## What’s Next
* [Adding a Native Module](App.NativeModule.md)