// Firebase SDK kütüphanelerini içe aktartarıyoruz 
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Firebase'i Service Worker içinde başlatmak
firebase.initializeApp({
  apiKey: "AIzaSyAFuA5v8vABcPmgwpLkZexYNvBlFTR0AEc",
  authDomain: "fullstack-task-66c57.firebaseapp.com",
  projectId: "fullstack-task-66c57",
  storageBucket: "fullstack-task-66c57.firebasestorage.app",
  messagingSenderId: "67394714493",
  appId: "1:67394714493:web:6a68cf10b23789e8e4aa14",
});

const messaging = firebase.messaging();

// Arka planda mesaj geliyor ise bu fonksiyon tetiklenir
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] got message from background: ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/vite.svg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});