// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken as getFCMToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apikey,
  authDomain: process.env.REACT_APP_authDom,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Firebase Messaging 인스턴스 생성
const messaging = getMessaging(app);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((err) => {
      console.error('Service Worker registration failed:', err);
    });
}

export { db, messaging, getFCMToken, onMessage };
