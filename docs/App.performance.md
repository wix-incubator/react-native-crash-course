# Performance - Tools and Best Practices

Why should you care about the performance of your app?

First of all — user expectations. Here are some interesting numbers:

* Half of users expect the app to load in 2 seconds or less.
* More than half of users blame the app for being slow, not their device.
* Four out of five users will attempt to use a slow app only 3 times or less before removing it.

Furthermore, mobile devices are used more than desktop machines. It’s a matter of access and it depends on the time of day and other factors, but [the tendency clearly is for people to use their mobile phones more](https://techjury.net/stats-about/mobile-vs-desktop-usage/).

## 1. Improve the initial start-up time.
"Lazy require" should help you with the start time of your app. Instead of importing dependencies at the top of the file, require those only when you actually need them.
Or enable [inline requires](https://facebook.github.io/react-native/docs/performance#adding-a-packager-config-file) which will do the work for you during bundle time. Either way — be [idle until urgent](https://philipwalton.com/articles/idle-until-urgent/), i.e., defer any work that’s not immediate.

This gets more and more impactful as the code base grows bigger. Each megabyte in your bundle size (including your dependencies) will slow down the initial start time of your app.

### Tools

Add [DetoxInstruments](https://github.com/wix/DetoxInstruments) to your project and measure how [enabling inline](https://facebook.github.io/react-native/docs/performance#adding-a-packager-config-file) requires reduces your app’s startup time.
Use [Developer Events](https://github.com/wix/DetoxInstruments/blob/master/Documentation/DeveloperAPIReferenceEventsJS.md)
and [require.Systrace](https://facebook.github.io/react-native/docs/performance#investigating-the-loaded-modules) to accurately measure this. You can check how it’s related to DetoxInstruments in [react-native-js-profiler](https://github.com/wix-incubator/react-native-js-profiler/blob/master/src/JSPerfProfiler.js#L77-L99).

## 2. Avoid wasteful renders

There are the usual suspects for wasteful renders, let’s get to know them:

### Implement shouldComponentUpdate

You should implement the [shouldComponentUpdate](https://reactjs.org/docs/react-component.html#shouldcomponentupdate) method for your React components,
or at the very least, use [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) instead of Component, which does a shallow comparison for props.

### Use memoization.

It is a caching mechanism which caches outputs for different sets of inputs. Meaning, given the same arguments for your memoized functions, they will return the same values.

This approach is very useful for redux-connect functions, because whenever you take something from the store and run a filter on it, it will prevent creating a new instance every time and thus will help avoid a re-render with each store change.

You can use [reselect](https://github.com/reduxjs/reselect) for Redux stores.
It should be a store-agnostic mechanism, and should work with others, though it might require some tweaking.


### Arrow functions and style references

Don’t use arrow functions as callbacks (such as click or tap) in your render functions.
With arrow functions, each render creates a new instance of that function,
so when reconciliation happens, React does a diff and says ‘OK, this is new,
because the function reference doesn’t match’. [Here’s an example of right and wrong implementations](https://gist.github.com/mbardauskas/da5a7b2d8d296645102ba974fd4c368f).

Same goes for Style References. If you use objects / arrays for styling, they will create new instances with each render. You should use StyleSheet from React Native, which always passes a reference. You might ask, what you should do with dynamic styles? Well, you can use those for now, since dynamic styles usually don't have that big of an impact. However, the point is to try to avoid creating new instances for each render when you could pass a constant and have it be static.
[Here’s an example of right and wrong implementations](https://gist.github.com/mbardauskas/54637d8f91f68aa42fc551481ad69f2b).

### Tools

* As Facebook suggests, start with [systrace for Android UI profiling](https://facebook.github.io/react-native/docs/performance#profiling-android-ui-performance-with-systrace). Measure and save current performance. Try implementing shouldComponentUpdate and other suggestions to see the impact on performance those changes will have.

* Use [why-did-you-render](https://github.com/welldone-software/why-did-you-render) to identify wasteful renders and [React Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) to measure which changes will have most impact.

> Note that the practices above will have more impact as your app grows, initial changes for a small app will not be that significant. Thus, if you want to be able find bottlenecks more easily, try stressing the app with more views and/or data. For example, if you have a list of contacts, try giving it hundreds of items to render.

## 3. Network related improvements

### Batch network requests.

If you’re in charge of data and if it’s accessible via a single server, just adapt your endpoints to fit your needs so it would result in less requests. Otherwise, if you’re using multiple services or microservices, try creating a middleware server to group them together. Be mindful of backwards compatibility though and keep the balance between maintainability and request count.

### Instead of polling, use WebSockets.

Depending on request frequency, polling may have a significant impact on your battery life
(more frequent polling leads to bigger impact) because it would do requests and run code on specific time intervals even though there’s nothing new to receive. On the other hand, WebSockets only run code when there is something new to process. This is a usual pattern for chats, but there are more use cases for the technology. In short, use WebSockets whenever you have to send requests to your servers every few seconds or minutes to get updates.

### Use small resources.

By ‘resources’ we mean mainly images. If you’re showing a small thumbnail of a photo,
loading a 4Mb image is a huge overkill.
Having a 100x100 px image for a view of 100x100 [dips](https://en.wikipedia.org/wiki/Device-independent_pixel) is usually enough even for [retina](https://en.wikipedia.org/wiki/Retina_display) screens. Image compression quality and format also affect performance. The smaller the image is in size, the faster it’s processed. Also, if your responses are large and you’re not using the data you download, you should optimize those resources as well.

### Move heavy computations to the backend.

Map and reduce functions are fine in most cases, unless you’re doing it for thousands of items. If you’re experiencing extreme situations and extreme amounts of data, avoid interacting with them on the device and move it to back-end.

### Use device storage & cached data.

Use local storage to cache data, so once users turn on the app, it will load from there. Get updates only when needed. This will also help with the offline mode.

### Use pagination for lists.

Get a small amount of initial data and keep requesting more items once a user nears the end of the list. Make sure that items are rendered via FlatList, otherwise you’ll get performance issues.

## Tools

* Use [react-native-debugger](https://github.com/jhen0409/react-native-debugger) to identify existing network calls and measure what would be the impact of combining or parallelizing existing network requests.
* Use [DetoxInstruments](https://github.com/wix/DetoxInstruments) to measure the impact of making your images smaller.
* Use [Image callbacks](https://facebook.github.io/react-native/docs/image#onloadend) to attach [Developer Events](https://github.com/wix/DetoxInstruments/blob/master/Documentation/DeveloperAPIReferenceEventsJS.md).

> Note that DetoxInstruments is also capable of showing network requests, though the goal here is to try a few different tools and see which would best fit your needs.

## Additional Reading

* [Two mistakes in React.js we keep doing over and over again - Yaroslav Serhieiev](https://medium.com/wix-engineering/two-mistakes-in-react-js-we-keep-doing-over-and-over-again-b1aea20fb3f0)
* [Performance in the React Native docs](https://facebook.github.io/react-native/docs/next/performance)
