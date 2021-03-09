importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js');


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }

firebase.initializeApp({
    messagingSenderId: "490188429737",
  })



// const messaging  = firebase.messaging()
// const VAPID = 'BKHaWalYchJzD4pX28Mjv8X3gdq7C2Qc9puwBdEQ87n7ZQ2eKuCELMNzFEHK-aYPieWm91OZhY73fcK4IY4xA9c'

// messaging.getToken({ vapidKey: VAPID }).then((currentToken) => {
//   if (currentToken) {
//     console.log(currentToken);
//     // await firebase.database().ref('users').set(userData)
//     // Send the token to your server and update the UI if necessary
//     // ...
//   } else {
//     // Show permission request UI
//     console.log('No registration token available. Request permission to generate one.');
//     // ...
//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token. ', err);
//   // ...
// });
