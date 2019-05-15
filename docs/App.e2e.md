# Step #4: Add E2E Tests (with Detox)

- [x] [**Step #1**: App Navigation (with react-native-navigation)](App.Navigation.md)
- [x] [**Step #2**: App Logic and State Management (with Remx)](App.Remx.md)
- [x] [**Step #3**: Style the app (with react native ui lib)](App.UiLib.md)

## What we're going to do

In this step we are going to: 
* Install [Detox](https://github.com/wix/detox) and get familiar with part of its API. 
* Write E2E tests for the main flows in our app.
* Refactor our tests to use mock data.

## About Detox

The most difficult part of automated testing of mobile apps, is the tip of the testing pyramid - E2E. The core problem with it is flakiness - tests are usually not deterministic. We believe that the only way to tackle flakiness head-on is by moving from **Black Box** to **Gray Box** testing. That's where Detox comes into play.

[Detox](https://github.com/wix/detox) is Wix's in-house open source gray box end-to-end testing and automation library for mobile apps. Detox tests your mobile app while running on a real device / simulator, interacting with it just like a real user.
 
## Preliminaries

- Watch this video: [Gray Box End to End Testing Framework For Mobile Apps - Rotem Mizrachi](https://youtu.be/kPXbCQpoBAA) (57 min)
- Detox uses **Matchers** to find UI elements in your app, **Actions** to emulate the user interaction with those elements, and **Expectations** to verify values on those elements. Read the following section from Detox docs: [Matchers](https://github.com/wix/Detox/blob/master/docs/APIRef.Matchers.md), [Actions](https://github.com/wix/Detox/blob/master/docs/APIRef.ActionsOnElement.md), [Expectations](https://github.com/wix/Detox/blob/master/docs/APIRef.Expect.md). (15 min)
- Read the following tutorial: [How to Test your React Native App Like a Real User by Elad Bogomolny](https://medium.com/@bogomolnyelad/how-to-test-your-react-native-app-like-a-real-user-ecfc72e9b6bc).

### Useful Links
* [Detox Documentation](https://github.com/wix/detox/blob/master/docs/README.md)

# Getting Started

## 1. Install Detox 

Follow the [Detox Getting Started guide](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md) and add Detox to your project. We recommend using Mocha (not Jest) as your test runner for Detox.

You should now have your first 3 failing tests. Congrats!

# Writing a Few Tests

## 2. Write your first test 

The first green test to write is a simple test that will check that we are rendering the posts list. The best practice is to use the `testID` prop for this purpose. 

So modify the app's code and add this prop to your posts list:

```js
<FlatList
        data={this.props.posts}
        testID="posts-list"
        keyExtractor={item => `{key-${item.id}`}
        renderItem={this.renderItem}
/>
```

In the test match the posts list and set the expectation:

```js
it('should display the posts list on app launch', async () => {
    await expect(element(by.id('posts-list'))).toBeVisible();
});
```

Your End-to-End tests should test your app's main flows. 

> Why not just test *everything* with E2E tests? 
> - E2E tests are “expensive” - all of your tests, including Detox tests, run on CI. An app with hundreds of E2E tests will take ages to run on CI.
> - Detox tests also don’t give us an instant feedback cycle. You can exclude single tests (using `.only`) but still, you won't be able to get that green-red feedback loop while developing, like you have with unit and component tests.

## 3. Write the following E2E tests
* It should display a post
* It should add a post
* It should delete a post

A couple of suggestions while writing your tests:
- A good test should be readable to everyone, not just for developers. Try to create a driver which will make your test look like a simple user flow.
- Try splitting your tests into [Given-When-Then](https://solidsoft.wordpress.com/2017/05/16/importance-of-given-when-then-in-unit-tests-and-tdd/) sections.
- You can use your mac's “Accessibility inspector” to [inspect your app `testID`s](https://www.youtube.com/watch?v=EkG5_kWkqwE&t=250s). At the top left corner choose the simulator as the source > click on the target icon > point out on any component to view its `testID`. 
- Make sure that your hardware keyboard is disconnected from your simulator (cmd+shift+k) - this often fails tests because the simulator doesn’t open the simulator keyboard.

If you need any hints, you can check the final E2E test file [here](https://github.com/wix-playground/wix-mobile-crash-course/blob/master/e2e/firstTest.spec.js).

<img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/e2e.gif" />

# Isolating Tests with Mocking

One rule that should guide any test scenario is predictability. Whenever you write tests, you need to make sure that the inputs and outputs are consistent.

We can run two types of tests with Detox:

* **Production e2e**

Every part of the system is tested (including the server). It’s the closest thing to a real user with a device in their hand. It has many uncontrollable variables and each one can affect the test outcome. For example, if the network is down, the test will fail. If the server has bugs, the test will fail. If your app has AB tests, you can get a different one on each run and the test will fail… We can’t trust those tests to be rock-solid.

So why do we do production e2e tests? The main benefit is that we can reduce the amount of manual testing. Consider running a test suite of 100 tests, where 10 fail. We can then check manually just these 10 scenarios and investigate the issue (e.g., it can be a real issue or a server issue).

* **Mock e2e** (or UI Automation)

As opposed to production E2E, in a mock E2E test, we are setting controlled and consistent inputs and environment, by replacing all endpoints with mock servers and data. We are controlling the servers, the requests, and responses that the test will get. For example, in our app, we would be able to tell detox to test with our mock server, while on production use a real server.

A mock E2E test is predictable and stable and will just keep working because the environment and the server will be the same on each run. On the other hand, it will not catch any bugs or integration issues with the real server.

Looking at the Pros and Cons:

|     | Pros | Cons |
| ---------------- | ---------------- | ---------------- |
| Production E2E     | Real user experience <br> Easy to setup <br> Easy to write <br> High confidence    | Flaky <br> SLow <br> Hard to maintain    |
| Mock E2E     | Closer to code <br> Stable <br> Easy to maintain    | Hard to setup <br> Hard to write    |

We believe that mock E2E tests are the best way to actually run integration tests on react-native.

So when thinking about the tests that we just wrote in the previous section, we can notice a huge problem which can simulate problems we can expect when running production e2e… In one test we are adding a post and on the next test, we are depending on the fact that this post already exists and deleting it. Changing the order of these tests can result in the “delete a post” test to fail. Tests CANNOT depend on one another, they should always run with the same input and the same output. So let's fix it.

## 4. Separate config files 

First thing's first: coffee. Next: for your app to use a *mock* server, you’ll need to tell it when it should not try to connect to the *actual* server. The way of doing this is by creating a new flavor of our Javascript bundle that uses different endpoints.

<img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/detoxMock.png" />

In order to do it:

Follow the instructions [here](https://github.com/wix/Detox/blob/master/docs/Guide.Mocking.md#configuration) to configure `Metro` by creating `rn-cli.config.js` in the project directory and setting resolver.sourceExts to prioritize any given source extension over the default one.

Here is how it looks in our project:

```js
const defaultSourceExts = require('metro-config/src/defaults/defaults').sourceExts
module.exports = {
  resolver: { 
    sourceExts: process.env.RN_SRC_EXT
                ? process.env.RN_SRC_EXT.split(',').concat(defaultSourceExts)
                : defaultSourceExts
  }
};
```

In `package.json` add an additional script:

```js
"start-e2e": "RN_SRC_EXT=e2e.js react-native start"
```  

When you run `npm run start-e2e` it will override the default files with the ones with the E2E extension.

To check that it works you can duplicate one of your files and change its behavior. For example, duplicate `posts.action.js` and in the `deletePost` function add an alert(‘e2e’). Run the app with `npm run start-e2e` and make sure that when deleting a post the alert is triggered and when running the app with `npm run start` the alert does not get triggered.

## 5. Create a separate API file 

Currently, all of our Server calls are located in our `posts.actions.js` file. The best practice is to separate all of those calls to a separated file, to make our code look much cleaner and to enable us to reuse our code. 

So create an `api.js` file with all of your API calls.

This is how our [`posts.actions.js`](https://github.com/wix-playground/wix-mobile-crash-course/blob/master/src/posts/posts.actions.js) and [`api.js`](https://github.com/wix-playground/wix-mobile-crash-course/blob/master/src/api.js) files should look like.

## 6. Override the API file

Create a `api.e2e.js` file, so that whenever you run `npm run start-e2e` it will override the original `api.js` file. In your `api.e2e` file, mock all of your function to use a simple array with mock posts, instead of actually fetching/posting to the server. 

In addition, add a `reset` function that will be used after every test to reset the data to the initial state. Your `api.e2e.js` file should look like [this](https://github.com/wix-playground/wix-mobile-crash-course/blob/master/src/api.e2e.js).

## 7. Refactor your tests 
Use the `reset` function that you just created after every test. 
Refactor the post id’s that you are using in the test, to fit your new mock server's logic. Your tests should look like [this](https://github.com/wix-playground/wix-mobile-crash-course/blob/master/e2e/firstTest.spec.js).

Now when we run our E2E tests they will be rock solid and won't depend on any server.

All the steps from this section can be viewed in this [commit](https://github.com/wix-playground/wix-mobile-crash-course/commit/73fcb3ea893f32f765ddb66d0336717db05afb55).

## Quick Recap

Up until now:

* You [installed Detox](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md) in your project and got to know part of [its API](https://github.com/wix/Detox).
* You've written E2E tests for the main flows in your app.
* You've refactored your tests to use [mock data](https://github.com/wix/Detox/blob/master/docs/Guide.Mocking.md#mocking).

-----
## What's Next

* [Step #5: Add Unit Tests (with Jest)](App.tests.md)

























