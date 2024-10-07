importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAPkJMfqCtXtiEPfLttsHWYO27hfpL4xLE",
  authDomain: "glyrics-7fd6e.firebaseapp.com",
  databaseURL: "https://glyrics-7fd6e-default-rtdb.firebaseio.com",
  projectId: "glyrics-7fd6e",
  storageBucket: "glyrics-7fd6e.appspot.com",
  messagingSenderId: "807699001292",
  appId: "1:807699001292:web:5137cd697ef1ac63a7f769",
  measurementId: "G-LLEPN2G71Z"
};


firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

let darkPatternsValue = 0;

self.addEventListener('message', function(event){
  if (event.data && event.data.type === 'SET_DARK_PATTERNS_VALUE') {
    darkPatternsValue = event.data.value;
  }
});

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
    if(darkPatternsValue != 1){
      return;
    }
    lastNotificationId = currentNotificationId;

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
      };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
    console.log('Notification clicked ', event);
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/?source=notification')
    );
 });
