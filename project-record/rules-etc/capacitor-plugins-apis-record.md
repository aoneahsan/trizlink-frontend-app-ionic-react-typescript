# Capacitor Packages Important Details

### https://capacitorjs.com/docs/apis/action-sheet

- for android & ios, no special permission or setting needed, just call APi and use it.
- for web, PWA Elements are required for Action Sheet plugin to work.
- pwa-elements (https://capacitorjs.com/docs/web/pwa-elements)

### https://capacitorjs.com/docs/apis/app-launcher

- On Android 11 and newer you have to add the app package names you want to query in the AndroidManifest.xml inside the queries tag.
- `<queries>
  <package android:name="com.pfnew.app" /> (com.pfnew.app://path-in-app)
</queries>`
- On iOS you must declare the URL schemes you pass to this method by adding the LSApplicationQueriesSchemes key to your app's Info.plist file. Learn more about configuring Info.plist.
  - `<key>LSApplicationQueriesSchemes</key>
<array>
    <string>com.pfnew.app</string> (com.pfnew.app://path-in-app)
    <string>pfnew</string> (pfnew://path-in-app)
</array>`

### https://capacitorjs.com/docs/apis/app

- For being able to open the app from a custom scheme you need to register the scheme first. You can do it by editing the Info.plist file and adding this lines.
  - `  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleURLName</key>
      <string>com.pfnew.app</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>com.pfnew.app</string>
        <string>pfnew</string>
      </array>
    </dict>
  </array>`
- For being able to open the app from a custom scheme you need to register the scheme first. You can do it by adding this lines inside the activity section of the AndroidManifest.xml.
  - `<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="@string/custom_url_scheme" />
  or 
  <data android:scheme="pfnew" />
</intent-filter>`

### https://capacitorjs.com/docs/apis/browser

- no special config needed

### https://capacitorjs.com/docs/apis/camera

- iOS - requires the following usage description be added and filled out for your app in Info.plist:
  - NSCameraUsageDescription (Privacy - Camera Usage Description)
  - NSPhotoLibraryAddUsageDescription (Privacy - Photo Library Additions Usage Description)
  - NSPhotoLibraryUsageDescription (Privacy - Photo Library Usage Description)
- Android - This API requires the following permissions be added to your AndroidManifest.xml:
  - `<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />`
  - Additionally, because the Camera API launches a separate Activity to handle taking the photo, you should listen for appRestoredResult in the App plugin to handle any camera data that was sent in the case your app was terminated by the operating system while the Activity was running.
- Web - PWA Elements are required for Camera plugin to work.

### https://capacitorjs.com/docs/apis/clipboard

- no config needed, just import api and use

### https://capacitorjs.com/docs/apis/cookies

- In capacitor.config.json:
  - `  {
    "plugins": {
      "CapacitorCookies": {
        "enabled": true
      }
    }
  }`
- Third Party Cookies on iOS
  - As of iOS 14, you cannot use 3rd party cookies by default. Add the following lines to your Info.plist file to get better support for cookies on iOS. You can add up to 10 domains.
    - `
<key>WKAppBoundDomains</key>
<array>
  <string>www.mydomain.com</string>
  <string>api.mydomain.com</string>
  <string>www.myothercooldomain.com</string>
</array>`

### https://capacitorjs.com/docs/apis/device

- no config needed

### https://capacitorjs.com/docs/apis/dialog

- no config needed

### https://capacitorjs.com/docs/apis/filesystem

- IOS - To have files appear in the Files app, you must set the following keys to YES in Info.plist:
  - UIFileSharingEnabled (Application supports iTunes file sharing)
  - LSSupportsOpeningDocumentsInPlace (Supports opening documents in place)
- Android - If using Directory.Documents or Directory.ExternalStorage, this API requires the following permissions be added to your AndroidManifest.xml:
  - `  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />`
  - Note that Directory.Documents and Directory.ExternalStorage are only available on Android 9 or older.

### https://capacitorjs.com/docs/apis/geolocation

- IOS - Apple requires privacy descriptions to be specified in Info.plist for location information:
- NSLocationAlwaysUsageDescription (Privacy - Location Always Usage Description)
- NSLocationWhenInUseUsageDescription (Privacy - Location When In Use Usage Description)
- Android​ - This API requires the following permissions be added to your AndroidManifest.xml
  - `  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <uses-feature android:name="android.hardware.location.gps" />`

### https://capacitorjs.com/docs/apis/google-maps

- Google Maps API Keys
  - To use the Google Maps SDK on any platform, API keys associated with an account with billing enabled are required. These can be obtained from the Google Cloud Console. This is required for all three platforms, Android, iOS, and Javascript.
- IOS - The Google Maps SDK supports the use of showing the users current location via enableCurrentLocation(bool). To use this, Apple requires privacy descriptions to be specified in Info.plist:

  - NSLocationAlwaysUsageDescription (Privacy - Location Always Usage Description)
  - NSLocationWhenInUseUsageDescription (Privacy - Location When In Use Usage Description)

  - The Google Maps SDK currently does not support running on simulators using the new M1-based Macbooks.

- Android​ - The Google Maps SDK for Android requires you to add your API key to the AndroidManifest.xml file in your project.
  - `<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY_HERE"/>`
  - To use certain location features, the SDK requires the following permissions to also be added to your AndroidManifest.xml:
    - `  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />`

### https://capacitorjs.com/docs/apis/local-notifications

- Android​ - Starting on Android 12, scheduled notifications won't be exact unless this permission is added to your AndroidManifest.xml:
  - `<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />`
- In capacitor.config.json:
  - `  {
    "plugins": {
      "LocalNotifications": {
        "smallIcon": "ic_stat_icon_config_sample",
        "iconColor": "#488AFF",
        "sound": "beep.wav"
      }
    }
  }`
- Doze​
  - If the device has entered Doze mode, your application may have restricted capabilities. If you need your notification to fire even during Doze, schedule your notification by using allowWhileIdle: true. Make use of allowWhileIdle judiciously, as these notifications can only fire once per 9 minutes, per app.

### https://capacitorjs.com/docs/apis/motion

- Permissions​
  - This plugin is currently implemented using Web APIs. Most browsers require permission before using this API. To request permission, prompt the user for permission on any user-initiated action (such as a button click):

### https://capacitorjs.com/docs/apis/network

- no config needed

### https://capacitorjs.com/docs/apis/preferences

- no config needed

### https://capacitorjs.com/docs/apis/push-notifications

- IOS
  - On iOS you must enable the Push Notifications capability. See Setting Capabilities for instructions on how to enable the capability.
- Android
  - The Push Notification API uses Firebase Cloud Messaging SDK for handling notifications. See Set up a Firebase Cloud Messaging client app on Android and follow the instructions for creating a Firebase project and registering your application.
  - There is no need to add the Firebase SDK to your app or edit your app manifest - the Push Notifications provides that for you. All that is required is your Firebase project's google-services.json file added to the module (app-level) directory of your app.
- Push Notifications icon​
  - On Android, the Push Notifications icon with the appropriate name should be added to the AndroidManifest.xml file:
  - `  <meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/push_icon_name" />`
- In capacitor.config.json:
  - `  {
    "plugins": {
      "PushNotifications": {
        "presentationOptions": ["badge", "sound", "alert"]
      }
    }
  }`

### https://capacitorjs.com/docs/apis/screen-reader

- no config needed

### https://capacitorjs.com/docs/apis/share

- Android
  - By default, Capacitor apps only allow to share files from caches folder. To make other Android folders shareable, they have to be added in android/app/src/main/res/xml/file_paths.xml file. Check the Specifying Available Files section in FileProvider (https://developer.android.com/reference/androidx/core/content/FileProvider) docs for the available locations.

### https://capacitorjs.com/docs/apis/text-zoom

- iPads
  - text-zoom plugin won't work on iPads unless preferredContentMode configuration is set to mobile in your Capacitor configuration file.
  - `  {
    "ios": {
      "preferredContentMode": "mobile"
    }
  }`
