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

You can view the final code [here](https://github.com/roiberlin/native-toast-library).

# Getting Started

### Create the module project

Similarly to how a react native project is created, there's also a handy command to create a react native module, called **react-native-create-library**.

In the terminal, navigate to the folder where you want your project to live and run:

`npm install -g react-native-create-library`

After that also create the module:

`react-native-create-library --platforms ios,android NativeToastLibrary`

Your new module project structure should look like this:

<p align="center"><img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/nativeModuleFolder.png" align="center"></p>

As you can see it contains folders for Android, iOS, and Windows platforms.

Because we are not using Windows:
* delete the Windows folder
* open up the `package.json` file and delete the line that contains “react-native-windows” under “peerDependencies”.

### Set up native files

Some setup is required before we can start using native modules. Usually, outside of this tutorial, such setup would not be required — the native module should include any files it uses. But since we’re doing it all ourselves here, we’ll do the set up as well, so our functions will be completed automatically when we code.

#### Setup Toast in Android

In order to display a Toast in Android, we will use the **Android Toast object**. To get the context we will use the `getReactApplicationContext` function.

Open up the Android folder using Android Studio.

First, run the build process using the Android Studio suggestions (in my case it was changing in the `build.gradle` file’s classpath value to **‘com.android.tools.build:gradle:2.3.2’**, buildToolsVersion to **‘25.0.0’**).

Also change yor **distributionUrl** for **gradle-wrapper** in `gradle/wrapper/gradle-wrapper.properties`

And don't forget to add google repo in `build.gradle`

```java
repositories {
    mavenCentral()
    google()
}
```

Make sure to change the package name in order to prevent any naming conflicts with other native libraries:

* Under the java directory rename the `com.reactlibrary` directory to `com.reactlibrarynativetoast`.

* Also update these files: `RNNativeToastLibraryModule`, `RNNativeToastLibraryPackage`, `AndroidManifest.xml` — change from `com.reactlibrary` to `com.reactlibrarynativetoast`.

Now we can add the code for the function. Add this code in the `RNNativeToastLibraryModule` file:

```java
@ReactMethod
public void show(String text) {
  Context context = getReactApplicationContext();
  Toast.makeText(context,text, Toast.LENGTH_LONG).show();
}
```

Depending on your version of React Native you might also need to add the following imports to `RNNativeToastLibraryModule` (or use auto-import suggestions when typing):
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

Open `RNNativeToastLibrary.xcodeproj` in Xcode.

You should get an error saying that Xcode couldn't recognize `RCTBridgeModule.h` (if not, continue to the next step). In order to fix this issue, open the `package.json` file (from the project directory), find the `peerDependencies` line and right above it add the following:

```json
"devDependencies": {
  "react-native": "0.41.2"
},
```

The version of react-native should match the one set for the `peerDependencies`.

Next, in the terminal, navigate into the project folder and run **`npm install`**.

Now when listing the contents of the project directory, you should see the `node_modules` folder added.

Move to the next step is project builds successfully.

Otherwise take the following steps:
  - Disable parallel build
    - Xcode menu -> Product -> Scheme -> Manage Schemes
    - Double click on application row
    - Build Tab -> uncheck checkbox Parallelize Build
  - Add React as a dependency
    - In Xcode, in Project Navigator (left pane), right click on your project (top) -> Add Files to {project-name}
    - Add node_modules/react-native/React/React.xcodeproj
    - Your Target -> Build Phases Tab -> Target Dependencies -> + -> Add React

After this your build should succeed.

##### Project Setup

1. Copy a ready-made iOS module to your project

Download the iOS files from [here](https://github.com/roiberlin/native-toast-library/raw/master/resorces/RNNativeLibrary-IOSToastFiles.zip)

Open the zip file — you should have 2 files (IOSNativeToast.h and IOSNativeToast.m) there. Copy those files into your iOS directory.

Now back to XCode.

Right click the RNNativeToastLibrary project (with blue icon) and choose **Add file to “RNNativeToastLibrary”**.

In the popup window choose the 2 files you just extracted form the zip archive and press the "Add" button - you should now be able to see the files in your project

2. iOS Toast module implementation

Open the RNNativeToastLibrary.m and under `import` add the `IOSNativeToast` property:

```objective-c
#import “IOSNativeToast.h”
@interface RNNativeToastLibrary()
@property (nonatomic, retain) IOSNativeToast *toast;
@end
```

Next, initialize the property within the object initialization — add this function inside the `@implementation RNNativeToastLibrary` block:

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

Add this function inside the `@implementation RNNativeToastLibrary` block:

```objective-c
+ (BOOL)requiresMainQueueSetup
{
  return YES;
}
```

Lastly, add the function itself at the end of the `@implementation RNNativeToastLibrary` block:

```objective-c
RCT_EXPORT_METHOD(show:(NSString *)text)
{
  [self.toast showToast:text];
}
```

Your new RNNativeToastLibrary.m file should look like [this](https://github.com/roiberlin/native-toast-library/blob/master/ios/RNNativeToastLibrary.m).

# Upload your library to NPM

Change the library name to something unique.
Open the `package.json` file and under `name` — change `react-native-native-toast-library` to `react-native-native-toast-library-XXXX`, where XXXX is your unique part.

Move to the public npm using this command

```sh
npm config set registry https://registry.npmjs.org/
```

> If you don’t have an npm account, you can create one [here](https://www.npmjs.com/signup).

Open the terminal, go into the project directory and run `npm adduser` - then add your username details.

Lastly, type `npm publish` to publish your code.

# Using Toast

###### Create an application to display a Toast when a button is clicked / tapped

In the terminal, navigate to the project parent directory and run `react-native init RNNativeToastExample --version 0.59.1`.

Open the `package.json` file and under `dependencies` add `react-native-native-toast-library-XXXX”: “1.0.0”`

XXXX is your unique part (see [here](#Upload-your-library-to-NPM)), and “1.0.0” is the version of your library (this is the default version, so if you change it, just put your own version number instead).

In terminal, from within the `RNNativeToastExample` project folder and `npm install`.

###### Link your application to the native library

In order for your application to “know” about your native library, you need to link the native modules for each platform you use with the link command.

In terminal, make sure you are inside the `RNNativeToastExample` project folder and run `react-native link react-native-native-toast-library-XXX` (XXXX is your unique part — see [here](#Upload-your-library-to-NPM)).

###### Check Android linking

Open the `RNNativeToastExample` Android project in Android Studio and then open `setting.gradle`.

You should see:

```
include ‘:react-native-native-toast-library-XXXX’
project(‘:react-native-native-toast-library-XXXX’).projectDir = new File(rootProject.projectDir, ‘../node_modules/react-native-native-toast-library-XXXX/android’)
```

In `build.gradle (Module: app)` you should see:

implementation project(':react-native-native-toast-library-XXXX')

Open the `MainApplication` (app > java > com.rnnativetoastexample). Under the `getPackages` method you should see:

`new RNNativeToastLibraryPackage()`

###### Check iOS linking

Open `RNNativeToastExample` in the iOS project in XCode.

Under the Libraries folder you should see the `RNNativeToastLibrary project` (1),

Click the `RNNativeToastExample` project file (2) > Build Phases (3) >
Link Binary with Libraries (4).
In the list you should see the `libRNNativeToastLibrary.a` file (5).

<p align="center"><img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/nativeModuleiOSLibraryCheck.png" align="center"></p>

> **Important note** — in simple projects and libraries like this the linking should work. Where projects or libraries are not standard, the linking command may not work completely. In that case you should perform these operations manually.

###### Create a screen

Replace the contents of your `App.js` file with [this](https://github.com/roiberlin/native-toast-library/blob/master/RNNativeToastExample/App.js) and replace the line
`import RNNativeToastLibrary from ‘react-native-native-toast-library’;` with `import RNNativeToastLibrary from ‘react-native-native-toast-library-XXXX’;`, where XXXX is your unique part (see [here](#Upload-your-library-to-NPM)).

As seen in the next step, your screen contains a button and a `textInput` field. When the button is pressed your Toast is displayed with the contents of `textInput`.

# Almost done

###### Run the app

The last step is to run `RNNativeToastExample` on both platforms and display the Toast

Let’s do that now.

Open the terminal, navigate to the `RNNativeToastExample` project folder and run `react-native run-android` to display the android app, and then `react-native run-ios` to display the iOS app.

This is what you should see:

<p align="center"><img src="https://github.com/wix-playground/wix-mobile-crash-course/blob/master/assets/nativeModuleToastDone.png" align="center"></p>

# Optional

If you would like to remove your library from the npm repository, you have 72 hours to do so.

In terminal run `npm unpublish react-native-native-toast-library-XXXX` (where XXXX is your unique part — see [here](#Upload-your-library-to-NPM)).

## What’s Next
* [Performance - Tools and Best Practices](App.performance.md)
