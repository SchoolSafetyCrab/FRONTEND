/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyBGCjMXT4Wx5LueT3qYQBS4EfcWAVCmRFc',
  authDomain: 'schoolsafetycrab.firebaseapp.com',
  projectId: 'schoolsafetycrab',
  storageBucket: 'schoolsafetycrab.appspot.com',
  messagingSenderId: '503502455960',
  appId: '1:503502455960:web:8617100dd9d4508fce3ced',
  measurementId: 'G-8JQCR8T3WW',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: '공지가 왔어요',
    icon: '/firebase-logo.png',
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});
