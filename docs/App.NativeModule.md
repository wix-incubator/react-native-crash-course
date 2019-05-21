# Creating a Native Module in React Native
## What’s a Native Module?
A native module is a set of javascript functions that are implemented natively for each platform (in our case is iOS and Android). It is used in cases where native capabilities are needed, that react native doesn’t have a corresponding module yet, or when the native performance is better.

NOTE: Just so you know, there is also such a thing called a Native UI Component that creates a native view that can be used inside the jsx. In a native module (what we will do here) we can only create functions, to be called from the React Native application.
## What we’re going to do
In this example, we will implement a toast mechanism step by step. You will:
* Create a module with a single function `show(title:)`, to display a “native toast” in Android and iOS. Here’s what a “native toast” looks like:

<p align="center"><Img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/nativeToastGif.gif" allign="center"></p>
* Wrap that module up in a library and add it to npm.
* Create an example application that calls this library to display Toast upon a click of a button.

In Android, we will use the native Android toast command.

In iOS, we will use the native UIAlertController.

You can view the final code [here](https://github.com/roiberlin/native-toast-library).
# Getting Started
* Create the module project
Like in the case of creating a react native project, there is also a template that creates a react native module, called **react-native-create-library**.
Open the terminal and reach the folder where you want to put your project.

In order to create the react native module project, use the install **react-native-create-library** command:

`npm install -g react-native-create-library`
here is how
And then create your module:

`react-native-create-library -—platforms ios,android NativeToastLibrary`

Your new module project should look like this

<p align="center"><img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/nativeModuleFolder.png" align="center"></p>

As you can see it contains Android, iOS, and Windows platforms.

Because we are not using Windows, delete the Windows folder in your project and inside the package.json file delete the line that contains “react-native-windows” under “peerDependencies”.
# Setting up the Native Files
Some setup is required before we get into using the native modules themselves. This setup would not be required outside this tutorial — the native module should include any files it uses. But since we’re doing it all ourselves here, we’ll set it up as well, so our functions will be completed automatically when we code.
* Setup Toast in Android

In order to display Toast in Android, we will use the **Android Toast object**. To get the context we will use the `getReactApplicationContext` function.

Open the Android folder using Android Studio.

First, make the build process run using the Android Studio suggestions (in my case it was changing in the `build.gradle` file’s classpath value to **‘com.android.tools.build:gradle:2.3.2’**, buildToolsVersion to **‘25.0.0’**).

Change the package name in order to prevent name clashes with other native libraries.

* Under the java directory rename the `com.reactlibrary` directory to **‘com.reactlibrarynativetoast’**.
* Also update the files `RNNativeToastLibraryModule`, `RNNativeToastLibraryPackage`, `AndroidManifest.xml` — change from `com.reactlibrary` to `com.reactlibrarynativetoast`.

Now you can add the function. In the `RNNativeToastLibraryModule` file add this code:

```
@ReactMethod
public void show(String text) {
  Context context = getReactApplicationContext();
  Toast.makeText(context,text, Toast.LENGTH_LONG).show();
}
```

`@ReactMethod` marks the method as public for react native so it can be used in the JS project.

* Setup Toast in iOS

In iOS, we don’t have a Toast object but we do have the `UIAlertController`, that can have a similar functionality (using the `actionSheet` style and dismissing it after a constant time frame).

In order to show the UIAlertController we need to get the top most UIViewController of the app. we will get it by creating a new UIWindow with an invisible UIViewController.

Open `RNNativeToastLibrary.xcodeporj` in Xcode.

You should have an error that Xcode doesn’t recognize `RCTBridgeModule.h` (if not, continue to the next step). In order to fix this issue, open the file `package.json` in the project directory and above the `peerDependencies` line add:

```
"devDependencies": {
  "react-native": "0.41.2"
},
```

The version should be the same as in the `peerDependencies`.

Now open the terminal, get into the project directory and type **`npm install`**.

When you look at the project directory again, you should see that a `node_modules` directory was added.

1. Add a React Native iOS Project

Back to Xcode. Usually you will create the native module inside an example project that will have the react native library. Here we create 
Since we don’t have gradle here like we do in Android, we’ll add a RN iOS Project and library.

Open the **RNNativeToastLibrary (1)** and select the **Build Phases (2)** tab. Click **Link Binary with Libraries (3)** and then click on the plus button **(4)**.

<p align="center"><img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/nativeModuleAddReactLibrary.png" align="center"></p>

In the popup window click the Add Other… button, and choose node_modules > react-native > React > React.xcodeproj:

<p align="center"><img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/nativeModuleReactFiles.png" align="center"></p>

2. Add a React Native iOS Library

Open the **RNNativeToastLibrary (1)** project on the top (with the blue icon) and select the **Build Phases (2)** tab. Click **Link Binary with Libraries (3)** and then click on the plus button **(4)**

<p align="center"><img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/nativeModuleAddReactLibrary.png" align="center"></p>

In the popup window choose **libReact.a** from ‘React’ target — as shown here:

<p align="center"><img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/nativeModuleAddReactLib.png" align="center"></p>

Build your project (Command + B). You should see that RCTBridgeModule.h is recognized.

3. Copy a ready-made iOS module to your project

Download the iOS files from [here](https://github.com/roiberlin/native-toast-library/raw/master/resorces/RNNativeLibrary-IOSToastFiles.zip)

Open the zip file — you should have 2 files (IOSNativeToast.h, IOSNativeToast.m) there. Copy those files under your iOS directory.

Now back to XCode.

Right Click RNNativeToastLibrary project file (with blue icon) choose **Add file to “RNNativeToastLibrary”**.

In the popup window choose the 2 files and press the Add button, so now you can see the files in your project

4. iOS Toast module implementation

Open the RNNativeToastLibrary.m. and under the `import` add the `IOSNativeToast` property:

```
#import "IOSNativeToast.h"
@interface RNNativeToastLibrary()
@property (nonatomic, retain) IOSNativeToast *toast;
@end
```

Next, initialize it in the object initialization — add the function inside the `@implementation RNNativeToastLibrary` block:

```
- (instancetype)init {
  self = [super init];
  if (self) {
    self.toast = [[IOSNativeToast alloc] init];
  }
  return self;
}
```

Because we override the init method, we also need to implement the `requireMainQueueSetup` (if we want it to run on main thread).

Add this function inside the `@implementation RNNativeToastLibrary` block:

```
+ (BOOL)requiresMainQueueSetup
{
  return YES;
}
```

Lastly, add the function itself at the end of the `@implementation RNNativeToastLibrary` block:

```
RCT_EXPORT_METHOD(show:(NSString *)text)
{
  [self.toast showToast:text];
}
```

Your new RNNativeToastLibrary.m file should look like [this](https://github.com/roiberlin/native-toast-library/blob/master/ios/RNNativeToastLibrary.m).

# Upload your library to NPM

Change the library name to something unique. 
Open the `package.json` file and under `name` — change `react-native-native-toast-library` to `react-native-native-toast-library-XXXX`, where XXXX is your unique part.

Move to the public npm using the command

```
npm config set registry https://registry.npmjs.org/
```

If you don’t have an npm account create it [here](https://www.npmjs.com/signup).

Open the terminal in the project directory, and type `npm adduser` and then your username details.
Lastly, type `npm publish` to publish your code.

# Using Toast

* Create an application to display Toast when a button is clicked

Open the terminal in the project parent directory and type `react-native init RNNativeToastExample`.

Open the `package.json` file and under `dependencies` add "react-native-native-toast-library-XXXX": "1.0.0"`

You should add a comma before the line to keep the JSON format of it.

XXXX is your unique part (see [here](#Upload-your-library-to-NPM)), and “1.0.0” is the version of your library (this is the default version, so if you change it put your own value instead).

Open the terminal in the `RNNativeToastExample` project and type `npm install`.

* Link your application to the native library

In order for your application to “know” your native library, you need to link the native modules for each platform that you use with the link command.

Open the terminal in the `RNNativeToastExample` project and type `react-native link react-native-native-toast-library-XXX` (XXXX is your unique part — see [here](#Upload-your-library-to-NPM)).

* Check Android linking
Open the `RNNativeToastExample` Android project in Android Studio and open `setting.gradle`.

You should see:

```
include ‘:react-native-native-toast-library-XXXX’
project(‘:react-native-native-toast-library-XXXX’).projectDir = new File(rootProject.projectDir, ‘../node_modules/react-native-native-toast-library-XXXX/android’)
```

In `build.gradle (Module: app)` you should see:

`compile project(‘:react-native-native-toast-library’)`

You can change `compile` to `implementation` (`compile` is the old syntax).

Open the `MainApplication` (app > java > com.rnnativetoastexample). You should see under the `getPackages` method:

`new RNNativeToastLibraryPackage()`

* Check iOS linking

Open `RNNativeToastExample` in the iOS project in XCode.

Under the Libraries folder you should see the `RNNativeToastLibrary project` (1),

Click the `RNNativeToastExample` project file (2) > Build Phases (3) > 
Link Binary with Libraries (4).
In the list you should see the `libRNNativeToastLibrary.a` file (5).

<p align="center"><img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/nativeModuleiOSLibraryCheck.png" align="center"></p>

**Important note** — in simple projects and libraries like this the linking should work. Where projects or libraries are not standards, the linking command may not work completely. n that case you should perform those operations manually.

* Create a screen

Replace the contents of your `App.js` file with this and replace the line 
`import RNNativeToastLibrary from ‘react-native-native-toast-library’;` with `import RNNativeToastLibrary from ‘react-native-native-toast-library-XXXX’;`, where XXXX is your unique part (see [here](#Upload-your-library-to-NPM)).

As we will see in next step, your screen contains a button and a `textInput`.

when the button is pressed your Toast is displayed with the contents of `textInput`.

# We are almost done

* Run the app

The last step is to run `RNNativeToastExample` on both platforms and display the Toast

(testing the library). Let’s do that now.

Open the terminal in the `RNNativeToastExample` project and type `react-native run-android` to display the android app, and then `react-native run-ios` to display the iOS app.

Here’s what you should see:

<p align="center"><img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/nativeModuleToastDone.png" align="center"></p>

# Optional

If you would like to remove your library from the npm repository, you have 72 hours to do so.

Open terminal and type `npm unpublish react-native-native-toast-library-XXXX` (where XXXX is your unique part — see [here](#Upload-your-library-to-NPM)).


## What’s Next
* [Performance - Tools and Best Practices](App.performance.md)
