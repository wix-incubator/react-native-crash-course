# Performance - Tools and Best Practices

## Incentive
Positive user experience is one of the main factors fuelling the return engagement of users with an app.
The perception of what is a "performant app" is mainly based on the user's general sense of the app's responsiveness. 
In other words, the amount of time passed from the user's performed action, to the time it takes the app to respond and carry out the action which allows further engagement (also known as TTI - time to interactive).

Here are some interesting facts and numbers regarding user's expectations when it comes to performance:
* Four out of five users will attempt to use a slow app only 3 times or less before removing it.
* Half of users expect the app to load in 2 seconds or less.
* More than half of users blame the app for being slow, not their device or internet quality.
* Every 1% decrease in startup time correlates with 0.27% increase in visitation.
* "Fun" fact: Mobile performance delays make us more stressed than watching a horror movie (source: App Annie - Largest app data resource).

Furthermore, mobile devices are used more than desktop machines, making [the general tendency towards mobile phones](https://techjury.net/stats-about/mobile-vs-desktop-usage/).

**Let's break down and address performance issues and take a look at some helpful tools.**

## 1. Improve startup time
**The goal: Decrease bundle size as much as possible while using only what you need and when your truly need it.**</br>
The problem of a long startup time can be caused by many issues, many can be spotted and addressed by the following tools and improvements:

### [react-native-bundle-visualizer](https://www.npmjs.com/package/react-native-bundle-visualizer)</br>
This package helps you to identify a large library affecting the bundle size, so you can keep the bundle size low and loading times fast.

### Importing only what you need
Lets take UiLib as an example:</br>
~~Bad~~: `import * as uilib from 'react-native-uilib`</br>
Good: Importing what you actually need instead: `import View from 'react-native-uilib/view`

### "Lazy require"
Instead of importing dependencies at the global context of the file, require those only when you actually need them.</br>
Or enable [inline requires](https://facebook.github.io/react-native/docs/performance#adding-a-packager-config-file) which will do the work for you during bundle time. Either way — be [idle until urgent](https://philipwalton.com/articles/idle-until-urgent/), i.e., defer any work that’s not immediate.
This gets more and more impactful as the code base grows bigger. Each megabyte in your bundle size (including your dependencies) will slow down the initial start time of your app.

### Related Tools:
* [react-native- perf-logger](https://github.com/bruchim/react-native-perf-logger):</br>
Assists with the measurement of startup duration by using React Native markers to indicate the various steps during the startup process in the user device.</br>
Supplies the duration of:</br>
  * Native module initializations - First screen drawing.
  * The application's time to interaction.

## 2. Improved rendering and performance
Here are some rendering solutions and rules of thumb aimed to increase user interaction by lowering the time to interactive:

### Making Data Immutable
General examples:</br>
* Aim not to create a function in your render function as the function will be created for every render.</br>
* It is usually preferred to create immutable objects instead of mutating existing ones, which results in more object creation overhead. 

### Avoid passing a new reference for the same old data

### Arrow functions and style references
Don’t use arrow functions as callbacks in your render functions, use a function reference.</br>
With arrow functions, each render creates a new instance of that function,
so when reconciliation happens, React does a diff and says ‘OK, this is new, because the function reference doesn’t match’. [Here’s an example of right and wrong implementations](https://gist.github.com/mbardauskas/da5a7b2d8d296645102ba974fd4c368f).

Same goes for Style References. If you use objects/arrays for styling, they will create new instances with each render. You should use StyleSheet from React Native, which is created once on initial render and passes a reference. You might ask, what you should do with dynamic styles? Well, you can use those for now, since dynamic styles usually don’t have a big impact. However, the point is to try to avoid creating new instances for each render when you could pass a constant and have it be static.
[Here’s an example of right and wrong implementations](https://gist.github.com/mbardauskas/54637d8f91f68aa42fc551481ad69f2b).

### Implement shouldComponentUpdate
You should aim to implement the [shouldComponentUpdate](https://reactjs.org/docs/react-component.html#shouldcomponentupdate) method when possible/needed to limit wasteful re-renders. 

### [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) 
A PureComponent self manages re-renders using shallow prop and state comparison to give performance boost in some cases. This should be used consciously as this controls when the component re-renders.

### [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback)
With the introduction of [Hooks](https://reactjs.org/docs/hooks-intro.html), using a function component and the `useCallback` hook, will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate).

### Use memoization
Memoization is a caching mechanism which caches outputs for different sets of inputs. Meaning, given the same arguments for your memoized entity, they will return the same values.
* Data memoization: [memoizeOne](https://www.npmjs.com/package/memoize-one)
* HOC memoization: [React.memo](https://reactjs.org/docs/react-api.html#reactmemo):</br>
If your component renders the same result given the same props, you can wrap it in a call to React.memo for a performance boost in some cases by memoizing the result. This means that React will skip rendering the component, and reuse the last rendered result.

\* This approach is very useful for redux-connect functions, because whenever you take something from the store and run a filter on it, it will prevent creating a new instance every time and thus will help avoid a re-render with each store change.
You can use [reselect](https://github.com/reduxjs/reselect) for Redux stores.
It should be a store-agnostic mechanism, and should work with others, though it might require some tweaking.

### Prefer Native libraries over JS
If possible, prefer libraries with Native implementation over JS implementation:</br>
This serves two main purposes; The delivery of a native experience for the users, and reducing the traffic over the bridge which leaves more  resources for JS based computation.

### [useNativeDriver](https://reactnative.dev/blog/2017/02/14/using-native-driver-for-animated)
A small yet significant **opt-in** performance boost when it comes to React Native Animated component. It sends everything about the animation to native before it has even started and allows native code to perform the animation on the UI thread without having to go through the bridge on every frame.

### Related Tools:
* [Flipper](https://fbflipper.com/): A platform for debugging React Native apps, allowing you to visualize and inspect your app. Main features: Device logs, crash reporter inspecting, network requests inspecting, inspecting device preferences, inspecting cached images. Another big advantage is the ability to use integrated plugins like: [flipper-plugin-react-native-performance](https://www.npmjs.com/package/flipper-plugin-react-native-performance).
* [why-did-you-render](https://github.com/welldone-software/why-did-you-render): helps identifying wasteful unnecessary renders.
* [react-devtools](https://www.npmjs.com/package/react-devtools): Great for easy info logging, spotting performance bottlenecks, visual "Flamegraph" analyzing tool, helpful for catching timing issues and rendering bottleneck. 
* Similarly, [React Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html), provides some of the debugging features similar to react-devtools, but built in to react-native via the developer menu.
* Also from the React Native developer menu - **performance monitor** is a great tool to inspect the fps of the Ui and the JS threads and make sure there are not dips caused by bottlenecks in either thread.
* [Detox Instruments](https://github.com/wix/DetoxInstruments): offers: </br>
Performance profiling, visual CPU & Memory usage, User interface FPS, Disk activity, Network activity, [Developer Events](https://github.com/wix/DetoxInstruments/blob/master/Documentation/DeveloperAPIReferenceEventsJS.md), React Native profiling, JavaScript thread CPU load, Bridge call counters, data counters, data collection, Async storage & data metrics
* [Developer Events](https://github.com/wix/DetoxInstruments/blob/master/Documentation/DeveloperAPIReferenceEventsJS.md)
and [require.Systrace](https://facebook.github.io/react-native/docs/performance#investigating-the-loaded-modules) can be used as accurate measurements, as shown in [react-native-js-profiler](https://github.com/wix-incubator/react-native-js-profiler/blob/master/src/JSPerfProfiler.js#L77-L99).
* [systrace for Android UI profiling](https://facebook.github.io/react-native/docs/performance#profiling-android-ui-performance-with-systrace). Measure and save current performance.


\* Note that the practices above will have more impact as your app grows. For a small app these might be less significant or noticeable. Thus, if you want to be able find bottlenecks more easily, try stressing the app with more views and/or data. For example, if you have a list of contacts, try giving it hundreds of items to render putting strain on the bridge. Or simply creating a for loop which console.logs all the time</br>
That being said, sticking to best practices will help avoid the point where rendering and performance issues occur which require monitoring and performance tools to fix. To paraphrase A.Einstein: A wise person avoids problems the a clever man solves :).

## 3. Network related improvements

### Batch network requests
If you’re in charge of data and if it’s accessible via a single server, just adapt your endpoints to fit your needs so it would result in less requests. If you’re using multiple services or micro services, try creating a middleware server to group them together. Be mindful of backwards compatibility though and keep the balance between maintainability and request count.

### Use WebSockets instead of polling
Depending on the request frequency, polling may have a significant impact on your battery life.
More frequent polling leads to bigger impact because it requests and runs the code in specific time intervals even though there’s nothing new to receive. On the other hand, WebSockets only run code when there is something new to process - this is a common pattern for chat implementations. In short, use WebSockets whenever you have to send requests to your servers every few seconds or minutes to get updates.

### Images - Use small resources & caching
By ‘resources’ we mean mainly images. If you’re showing a small thumbnail of a photo,
loading a 4Mb image is a huge overkill.
Having a 100x100 px image for a view of 100x100 [dips](https://en.wikipedia.org/wiki/Device-independent_pixel) is usually enough even for [retina](https://en.wikipedia.org/wiki/Retina_display) screens. Image compression quality and format also affect performance. The smaller the image is in size, the faster it’s processed. Also, if your responses are large and you’re not using the data you download, you should optimize those resources as well. Another helpful Image processing tip is using React Native's image [queryCache](https://reactnative.dev/docs/image.html#querycache) to intelligently reload Image based on the result of this cache interrogation method.

### Move heavy computations to the backend
Map and reduce functions are fine in most cases, unless you’re doing it for thousands of items. Under extreme data loads, avoid interacting with them on the device and move it to back-end.

### Use device storage & cached data
Use local storage to cache data, so once users turn on the app, it will load from there. Get updates only when needed. This will also help with the offline mode.

### Lists (FlatList) optimizations
Lists have a known pain point when it comes to performance when large data loads are concerned.
Consider this approach to increase performance:</br>
* Get a small amount of initial data and keep requesting more items once a user reaches the end [onEndReached](https://reactnative.dev/docs/flatlist.html#onendreached) of the set threshold - [onEndReachedThreshold](https://reactnative.dev/docs/flatlist.html#onendreachedthreshold) of the visible list.
* [initialNumToRender](https://reactnative.dev/docs/flatlist.html#initialnumtorender)
* [getItemLayout](https://reactnative.dev/docs/flatlist.html#getitemlayout)

### Related Tools:
* [react-native-debugger](https://github.com/jhen0409/react-native-debugger): identifies network calls and measure what would be the impact of combining or parallelizing existing network requests.
* [Detox Instruments](https://github.com/wix/DetoxInstruments): to measure the impact of making your images smaller.
* Use [Image callbacks](https://facebook.github.io/react-native/docs/image#onloadend) to attach [Developer Events](https://github.com/wix/DetoxInstruments/blob/master/Documentation/DeveloperAPIReferenceEventsJS.md).

## Additional sources
* [Two mistakes in React.js we keep doing over and over again - Yaroslav Serhieiev](https://medium.com/wix-engineering/two-mistakes-in-react-js-we-keep-doing-over-and-over-again-b1aea20fb3f0)
* [Performance in the React Native docs](https://reactnative.dev/docs/performance)
* [React Native EU 2020](https://www.youtube.com/watch?v=DduUntL2Sv4): 2 Performance talks start at the 2:29.56 time marker (the second is of our own Omri Bruchim).
