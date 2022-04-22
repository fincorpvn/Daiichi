import PushNotification, {Importance} from 'react-native-push-notification';
import DeviceInfo from 'react-native-device-info';
import {apiAuth, navigate} from 'services';
import {Ecolors, Icons} from 'constant';
import {requestPermisson} from 'utils';
import {
  checkNotifications,
  PERMISSIONS,
  requestNotifications,
} from 'react-native-permissions';
import {Platform} from 'react-native';

export async function handleNotification() {
  return null;
  requestNotifications(['alert', 'sound']).then(({status, settings}) => {
    // …
    console.log('request notification', {
      status,
      settings,
    });
  });
  if (Platform.OS === 'android') {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'fcm_fallback_notification_channel', // (required)
        channelDescription: 'fcm_fallback_notification_channel', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: async function (token: {token: string; os: string}) {
        const deviceId: any = DeviceInfo.getSystemVersion();
        const res = await apiAuth.updateDeviceInfo({
          deviceToken: token.token,
          deviceInfo: `${token.os}-${deviceId}`,
          //  JSON.stringify({
          //   OS: token.os,
          //   versionOS: deviceId,
          // }),
        });
        console.log('TOKEN:', {token, deviceId, res});
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification: any) {
        console.log('NOTIFICATION:', notification);
        if (notification.userInteraction) {
          PushNotification.cancelAllLocalNotifications();
          navigate('ProfileScreen');
          return;
        }
        PushNotification.localNotification({
          channelId: notification.channelId, // 'your-channel-id',
          // channelId: 'fcm_fallback_notification_channel', // 'your-channel-id',
          //... You can use all the options from localNotifications
          title: notification.title, // '1231231321312',
          message: notification.message, // 'My Notification Message', // (required)
          // date: new Date(Date.now() + 60 * 1000).toString(), // in 60 secs
          // allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
          // foreground: true,
          // showWhen: true,
          autoCancel: false,
          largeIcon: '@mipmap/ic_launcher_round',
          smallIcon: '@drawable/ic_notification',
          // largeIcon: 'ic_notification',
          // smallIcon: 'ic_notification',
          color: Ecolors.mainColor,
          // data: notification.data,
          /* Android Only Properties */
          repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
        });
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }
}
