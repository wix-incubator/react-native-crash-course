# Creating a Native Module in React Native
## What’s a Native Module?
A native module is a set of javascript functions that are implemented natively for each platform (in our case that's iOS and Android). It's used in cases where native capabilities are needed - when react native doesn't have a corresponding module yet or when native performance is better.

> NOTE: There's also a thing called Native UI Component out there, that creates a native view that can be used inside the jsx. In a native module (the thing we will work on now) we are only able to create functions which can only be called from the React Native application.

## What we’re going to do

We will work step-by-step to create a simple app that will show pop-up messages, or "toasts". You will:
* Create a module with a single function `show(title:)`, to display a “native toast” in Android and iOS. Here’s what a “native toast” looks like:

<p align="center"><Img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/nativeToastGif.gif" allign="center"></p>

* Wrap that module up in a library and add it to npm.
* Create an example application to call this library and display a Toast when a button is clicked / tapped.

In Android, we will use the native Android toast command; in iOS - the native `UIAlertController` command.

You can view the final code [here](https://github.com/Dor256/NativeModules/tree/master/react-native-my-toast).

# Getting Started

### Create the module project

Similarly to how a react native project is created, there's also a handy command to create a react native module, called **create-react-native-module**.

In the terminal, navigate to the folder where you want your project to live and run:

`npm install -g create-react-native-module`

After that also create the module:

`create-react-native-module my-toast`

> NOTE: For npm versions 5.2 and above you can simply run <br>
`npx create-react-native-module my-toast` instead of installing it globaly

Your new module project structure should look like this:

<p align="center"><img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/nativeModuleFolder.png" align="center"></p>

As you can see it contains folders for Android and iOS.

### Set up native files

Some setup is required before we can start using native modules. Usually, outside of this tutorial, such setup would not be required — the native module should include any files it uses. But since we’re doing it all ourselves here, we’ll do the set up as well, so our functions will be completed automatically when we code.

#### Setup Toast in Android

In order to display a Toast in Android, we will use the **Android Toast object**. To get the context we will use the `getReactApplicationContext` function.

Open up the Android folder using Android Studio.

You will be prompted to sync Gradle with the project, once you accept, you'll notice Gradle building your project. This should be enough to get you started, however if anything goes wrong, follow the errors and fix whatever Gradle tells you to fix.

First, let's change the package name in order to prevent any naming conflicts with other native libraries:

* Under the java directory rename the `com.reactlibrary` directory to `com.reactlibrarynativetoast`.

>NOTE: You can right click on the director name `com.reactlibrary`, go to `Refactor` and click `Rename`. By doing this you can skip renaming the other files.

* Also update these files: `MyToastModule`, `MyToastPackage`, `AndroidManifest.xml` — change from `com.reactlibrary` to `com.reactlibrarynativetoast`.


Now we can add the code for the function. Notice this code in the `MyToastModule` file:

```java
 @ReactMethod
    public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
        // TODO: Implement some actually useful functionality
        callback.invoke("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
    }
```

Let's change it to match our needs:

```java
@ReactMethod
public void show(String text) {
  Context context = getReactApplicationContext();
  Toast.makeText(context,text, Toast.LENGTH_LONG).show();
}
```

Depending on your version of React Native you might also need to add the following imports to `MyToastModule` (or use auto-import suggestions when typing):
```
import android.content.Context;
import android.widget.Toast;
import com.facebook.react.bridge.ReactMethod;
```

`@ReactMethod` marks this method as public for react native so it can be used in the JS project.

#### Setup Toast in iOS

##### Basic Setup
There isn't a Toast object in iOS, but there is the `UIAlertController`, which can have similar functionality (using the `actionSheet` style and dismissing it after a certain time).

In order to show the UIAlertController we need to get the top most UIViewController of the app. We can get it by creating a new UIWindow with an invisible UIViewController.

Open `MyToast.xcodeproj` in Xcode.

You should get an error saying that Xcode couldn't recognize `RCTBridgeModule.h` (if not, continue to the next step). In order to fix this issue, open the `package.json` file (from the project directory). Notice that in your devDependencies section should look like this:

```json
"devDependencies": {
  "react": "^16.9.0",
  "react-native": "^0.61.5"
}
```

For the sake of this tutorial, let's change our `react-native` version to `0.59.1`:

```json
"devDependencies": {
  "react": "^16.9.0",
  "react-native": "^0.59.1"
}
```

Next, in the terminal, navigate into the project folder and run **`npm install`**.

Now when listing the contents of the project directory, you should see the `node_modules` folder added.

Move to the next step if the project builds successfully.

Otherwise take the following steps:
  - Disable parallel build
    - Xcode menu -> Product -> Scheme -> Manage Schemes
    - Double click on {project-name}
    - Build Tab -> uncheck checkbox Parallelize Build
  - Add React as a dependency
    - In Xcode, in Project Navigator (left pane), right click on your project (top) -> Add Files to {project-name}
    - Add node_modules/react-native/React/React.xcodeproj
    - Your Target -> Build Phases Tab -> Target Dependencies -> + -> Add React

After this your build should succeed.

##### Project Setup

1. Copy a ready-made iOS module to your project

Download the iOS files from [here](https://github.com/Dor256/NativeModules/blob/master/react-native-my-toast/resources/RNNativeLibrary-IOSToastFiles.zip?raw=true)

Open the zip file — you should have 2 files (IOSNativeToast.h and IOSNativeToast.m) there. Copy those files into your iOS directory.

Now back to XCode.

Right click the RNNativeToastLibrary project (with blue icon) and choose **Add file to “{project-name}”**.

In the popup window choose the 2 files you just extracted form the zip archive and press the "Add" button - you should now be able to see the files in your project

2. iOS Toast module implementation

Open the `MyToast.m` and under `import` add the `IOSNativeToast` property:

```objective-c
#import “IOSNativeToast.h”
@interface MyToast()
@property (nonatomic, retain) IOSNativeToast *toast;
@end
```

Next, initialize the property within the object initialization — add this function inside the `@implementation MyToast` block:

```objective-c
- (instancetype)init {
  self = [super init];
  if (self) {
    self.toast = [[IOSNativeToast alloc] init];
  }
  return self;
}
```

Because we override the init method, we also need to implement the `requireMainQueueSetup` (if we want it to run on main thread).

Add this function inside the `@implementation MyToast` block:

```objective-c
+ (BOOL)requiresMainQueueSetup
{
  return YES;
}
```

In order to notify the main thread about actions that are processed in our JS thread we will need to add the following code:

```objective-c
- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
```

Lastly, change the RCT_EXPORT_METHOD function at the end of the `@implementation `MyToast block to look like this:

```objective-c
RCT_EXPORT_METHOD(show:(NSString *)text)
{
  [self.toast showToast:text];
}
```

Your new MyToast.m file should look like [this](https://github.com/Dor256/NativeModules/blob/master/react-native-my-toast/ios/MyToast.m).

#### (Optional) Add Type Definitions

If you're using TypeScript or just want to add type definitions for people who are going to use your library in the future you can follow these steps:


1. Inside your root project directory create a file called index.d.ts. This will be the file that will hold the type definitions for your project.

2. In that file we will declare our TypeScript module and define our Toast to have a single `show` function that accepts a `string` and returns nothing:

```javascript
declare module 'react-native-my-toast' {
  export interface IToast {
    show(text: string): void
  }

  const MyToast: IToast;
  export default MyToast;
}
```

# Upload your library to NPM

Change the library name to something unique.
Open the `package.json` file and under `name` — change `react-native-my-toast` to `react-native-XXXX`, where XXXX is your unique part.

Move to the public npm using this command

```sh
npm config set registry https://registry.npmjs.org/
```

> If you don’t have an npm account, you can create one [here](https://www.npmjs.com/signup).

Open the terminal, go into the project directory and run `npm adduser` - then add your username details.

Lastly, type `npm publish` to publish your code.

# Using Toast

###### Create an application to display a Toast when a button is clicked / tapped

Make sure you have the `react-native-cli` installed by running `npm list -g --depth 0`. You should see a tree of packages and one of them is `react-native-cli@2.0.1`. If you can't find it, run `npm install -g react-native-cli`.

In the terminal, navigate to the project parent directory and run `react-native init MyToastExample --version 0.60.0`.
Open the `package.json` file and under `dependencies` add `react-native-XXXX”: “1.0.0”`

XXXX is your unique part (see [here](#Upload-your-library-to-NPM)), and “1.0.0” is the version of your library (this is the default version, so if you change it, just put your own version number instead).

In terminal, from within the `MyToastExample` project folder and `npm install`.

###### Link your application to the native library

Becuase we installed `react-native 0.60.0` there is no need to link our native module as `react-native` has a new `auto link` feature which will do it for us once we run the project and we can skip to `Create a screen` below. 

If however you are using and older version of `react-native` you will need to link the native modules for each platform with the link command.

In terminal, make sure you are inside the `MyToastExample` project folder and run `react-native link react-native-XXX` (XXXX is your unique part — see [here](#Upload-your-library-to-NPM)).

###### Check Android linking

Open the `RNNativeToastExample` Android project in Android Studio and then open `settings.gradle`.

You should see:

```
include ‘:react-native-XXXX’
project(‘:react-native-XXXX’).projectDir = new File(rootProject.projectDir, ‘../node_modules/react-native-XXXX/android’)
```

In `build.gradle (Module: app)` you should see:

`implementation project(':react-native-XXXX')` under `dependencies`

Open the `MainApplication` (app > java > com.rnnativetoastexample). Look for your package's `import` statement at the top:

`import com.reactlibrarynativetoast.MyToastPackage`

###### Check iOS linking

Open the terminal in your example project's root folder and navigate to the `ios` folder with `cd ios`. After that run `pod install` - this should link your library to `ios` make sure that `CocoaPods` detected your file by looking at the terminal log which should indicate `Installing react-native-my-toast (1.0.0)`. 

You can now navigate back and run your app with `react-native run-ios`.

###### Create a screen

Replace the contents of your `App.js` file with [this](https://github.com/Dor256/NativeModules/blob/master/toastExample/App.js) and replace the line
`import MyToast from ‘react-native-my-toast’;` with `import YourModuleName from ‘react-native-XXXX’;`, where XXXX is your unique part (see [here](#Upload-your-library-to-NPM)).

As seen in the next step, your screen contains a button and a `textInput` field. When the button is pressed your Toast is displayed with the contents of `textInput`.

# Almost done

###### Run the app

The last step is to run `MyToastExample` on both platforms and display the Toast

Let’s do that now.

Open the terminal, navigate to the `MyToastExample` project folder and run `react-native run-android` to display the android app, and then `react-native run-ios` to display the iOS app.

This is what you should see:

<p align="center"><img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/nativeModuleToastDone.png" align="center"></p>

# Optional

If you would like to remove your library from the npm repository, you have 72 hours to do so.

In terminal run `npm unpublish react-native-XXXX` (where XXXX is your unique part — see [here](#Upload-your-library-to-NPM)).

## What’s Next
* [Performance - Tools and Best Practices](App.performance.md)
