# Step #4: Add E2E Tests (with Detox)

- [x] [**Step #1**: App Navigation (with react-native-navigation)](App.Navigation.md)
- [x] [**Step #2**: App Logic and State Management (with Remx)](App.Remx.md)
- [x] [**Step #3**: Style the app (with react native ui lib)](App.UiLib.md)

## What we're going to do

In this step we are going to:
* Install [Detox](https://github.com/wix/detox) and get familiar with part of its API.
* Write E2E tests for the main flows in our app.
* Refactor our tests to use mocking data.

## About Detox

The most complicated thing about automated testing of mobile apps is the tip of the testing pyramid - E2E. The core problem lies within its flakiness, which usually makes tests non-deterministic. We believe that the only way to tackle flakiness head-on is by moving from **Black Box** to **Gray Box** testing. That's where Detox comes into play.

[Detox](https://github.com/wix/detox) is Wix's in-house open source gray box end-to-end testing and automation library for mobile apps. Detox tests your mobile app while running on a real device / simulator, interacting with it just like a real user would.

## Prerequisites

- Watch this video: [Gray Box End to End Testing Framework For Mobile Apps - Rotem Mizrachi](https://youtu.be/kPXbCQpoBAA) (57 min)
- Detox uses **Matchers** to find UI elements in your app, **Actions** to emulate user interaction with elements, and **Expectations** to verify values in those elements. Read the following section from the Detox docs: [Matchers](https://github.com/wix/Detox/blob/master/docs/APIRef.Matchers.md), [Actions](https://github.com/wix/Detox/blob/master/docs/APIRef.ActionsOnElement.md), [Expectations](https://github.com/wix/Detox/blob/master/docs/APIRef.Expect.md). (15 min)
- Read through the following tutorial: [How to Test your React Native App Like a Real User by Elad Bogomolny](https://medium.com/@bogomolnyelad/how-to-test-your-react-native-app-like-a-real-user-ecfc72e9b6bc).

### Useful Links
* [Detox Documentation](https://github.com/wix/detox/blob/master/docs/README.md)

# Getting Started

## 1. Install Detox

Follow the [Detox Getting Started guide](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md) and add Detox to your project. We recommend using Mocha (not Jest) as your test runner for Detox.
Make sure that are are using a [supported React Native version](https://github.com/wix/Detox/#react-native).

By the time you wrap up with the above guide you should have run your first 3 failing tests. Congrats!

# Writing Tests

## 2. Write your first test

The first green test you are going to write is a simple test that will check if we are rendering the posts list. Best practice is to use the `testID` prop for this purpose. Modify the code of the app and add `testID` to your posts list:

```js
<FlatList
        data={this.props.posts}
        testID="posts-list"
        keyExtractor={item => `{key-${item.id}`}
        renderItem={this.renderItem}
/>
```

In the test code target the posts list and set the expectation:

```js
it('should display the posts list on app launch', async () => {
    await expect(element(by.id('posts-list'))).toBeVisible();
});
```

Your End-to-End tests should test your main flows of your app.

> Why not just test *everything* with E2E tests?
> - E2E tests are “expensive” - all of your tests, including Detox tests, run on CI. An app with hundreds of E2E tests will take ages to run on CI.
> - Detox tests also don’t give us an instant feedback cycle. You can exclude single tests (using `.only`) but still, you won't be able to get that green-red feedback loop while developing, like you have with unit and component tests.

## 3. Write the following E2E tests
* It should display a post
* It should add a post
* It should delete a post

A couple of suggestions while writing your tests:
- A good test should be readable by everyone, not just by developers. Try to create a driver that will make your test look like a simple user flow.
- Try splitting your driver into [Given-When-Then](https://solidsoft.wordpress.com/2017/05/16/importance-of-given-when-then-in-unit-tests-and-tdd/) sections.
- If you are working on a Mac, you can use its “Accessibility inspector” to [inspect your app `testID`s](https://www.youtube.com/watch?v=EkG5_kWkqwE&t=250s).In the top left corner choose the simulator as the source > click on the target icon > point to any component to view its `testID`.
- Make sure your hardware keyboard is disconnected from your simulator (cmd+shift+k) - this often fails tests because the simulator doesn't open the simulator keyboard.

If you need any hints, you can check the final E2E test file [here](https://github.com/wix-playground/wix-mobile-crash-course/blob/master/e2e/firstTest.spec.js).

<img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/e2e.gif" />

# Isolating Tests with Mocking

An important rule to guide any test scenario is predictability. Whenever you write tests, you need to make sure that both inputs and outputs are consistent.

We can run two types of tests with Detox:

* **Production e2e**

Every part of the system is tested (including the server). It’s the closest thing to a real user with a device in their hand. It has many uncontrollable variables where each can affect the test outcome. For example, if the network is down, the test will fail. If server has bugs, the test will fail. If your app has AB tests, you can get a different one on each run and the test will fail... We can’t trust those tests to be rock-solid.

So why do we do production e2e tests? The main benefit is that we can reduce the amount of manual testing. Consider running a test suite of 100 tests, where 10 fail. We can then check manually just these 10 scenarios and investigate the issues (e.g., it can be a real issue or a server problem).

* **Mock e2e** (or UI Automation)

As opposed to production E2E, in a mock E2E test we are setting controlled and consistent inputs and environment by replacing all endpoints with mock servers and data. We are controlling the servers, the requests, and thus all the responses the test will give us. For example, we could have detox run tests using the mock server on dev, while in production use a real server.

A mock E2E test is predictable and stable and will just keep working because the environment and the server will stay the same on each run. On the other hand, it will not catch any bugs or integration issues that might arise when deploying with a real server.

Looking at the Pros and Cons:

|     | Pros | Cons |
| ---------------- | ---------------- | ---------------- |
| Production E2E     | Real user experience <br> Easy to setup <br> Easy to write <br> High confidence    | Flaky <br> Slow <br> Hard to maintain    |
| Mock E2E     | Closer to code <br> Stable <br> Easy to maintain    | Hard to setup <br> Hard to write    |

We believe that mock E2E tests are the best way to actually run integration tests on react-native.

Consider tests we just wrote in the previous section. There is potentially a huge problem there - as some tests depend on successful outcomes of other ones. To explain further, in one test we are adding a post and in the next test we are depending on the fact that this post already exists. Also, changing the order of these tests can result in the “delete a post” test to fail. Tests CANNOT depend on one another, they should always run with the same input and the same output. So let's fix that.

## 4. Separate config files

First things first: grab some coffee :coffee:. <br />Next: for your app to use a *mock* server, you’ll need to tell it when it should not try to connect to the *actual* server. This is accomplished by creating a new flavor of our Javascript bundle that uses different endpoints.

<img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/detoxMock.png" />

In order to do it:

Follow the instructions [here](https://github.com/wix/Detox/blob/master/docs/Guide.Mocking.md#configuration)

Here is how your `metro.config.js` file should look like:

```js
const defaultSourceExts = require('metro-config/src/defaults/defaults').sourceExts

module.exports = {
  resolver: {
    sourceExts: process.env.RN_SRC_EXT ? process.env.RN_SRC_EXT.split(',').concat(defaultSourceExts) : defaultSourceExts
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
```

In `package.json` add an additional script:

```js
"start-e2e": "RN_SRC_EXT=e2e.js react-native start"
```

When you run `npm run start-e2e` it will override default files with the ones that have the E2E extension.

To check that it works you can duplicate one of your files and change its behavior. For example, duplicate `posts.action.js` (don't forget to name it `posts.action.e2e.js`, you can delete it after you're done playing with it) and in the `deletePost` function add an `alert(‘e2e’)`. Run the app with `npm run start-e2e` and make sure that when deleting a post the alert is triggered and when running the app with `npm run start` the alert does not get triggered.

## 5. Create a separate API file

Currently, all of our Server calls are located in our `posts.actions.js` file. The best practice is to separate all of those calls into a separated file - it will make our code look much cleaner and allow us to reuse it later.

So create an `api.js` file with all of your API calls.

This is how our [`posts.actions.js`](https://github.com/wix-playground/wix-mobile-crash-course/blob/master/src/posts/posts.actions.js) and [`api.js`](https://github.com/wix-playground/wix-mobile-crash-course/blob/master/src/posts/api.js) files should look like.

## 6. Override the API file

Create an `api.e2e.js` file so that whenever you run `npm run start-e2e` it will override the original `api.js` file. In your `api.e2e.js` file, mock all of your functions to use a simple array with mock posts, instead of actually fetching/posting to the server.

In addition, add a `reset` function which will be used after every test to reset the data to its initial state. Your `api.e2e.js` file should look like [this](https://github.com/wix-playground/wix-mobile-crash-course/blob/master/src/posts/api.e2e.js).

## 7. Refactor your tests
Use the `reset` function that you just created after every test. Refactor the post id’s which you are using in the test to fit your new mock server's logic. Your tests should look like [this](https://github.com/wix-playground/wix-mobile-crash-course/blob/master/e2e/firstTest.spec.js).

Now when we run our E2E tests they will be rock solid and won't stumble upon on any potential server flaws.

All the steps from this section can be viewed in this [commit](https://github.com/wix-playground/wix-mobile-crash-course/commit/73fcb3ea893f32f765ddb66d0336717db05afb55).

## Quick Recap

So far you have:

* [Installed Detox](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md) in your project and got to know a part of [its API](https://github.com/wix/Detox).
* Written E2E tests for the main flows in your app.
* Refactored your tests to use [mock data](https://github.com/wix/Detox/blob/master/docs/Guide.Mocking.md#mocking).

-----
## What's Next

* [Step #5: Add Unit Tests (with Jest)](App.tests.md)
