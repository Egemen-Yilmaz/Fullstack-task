# Whale Tracker Frontend

Kullanıcıların anlık blockchain hareketlerini izleyebileceği, modern ve duyarlı bir kullanıcı arayüzüdür.

## Özellikler

- Gerçek Zamanlı Güncellemeler: Sayfa yenilenmeden yeni transferler listeye eklenir.
- Push Bildirimleri: Uygulama arka planda veya farklı bir sekmede olsa dahi tarayıcı bildirimi gönderilir.
- Modüler Tasarım: Bileşen tabanlı mimari ve CSS Modules kullanılarak geliştirilmiştir.

## Kurulum Detayları

Projeyi çalıştırmadan önce src/firebase.ts ve public/firebase-messaging-sw.js dosyalarındaki Firebase yapılandırmasının güncel olduğundan emin olunmalıdır.

## Çalıştırma

cd frontend
npm install
npm run dev

Uygulama varsayılan olarak http://localhost:5173 portunda çalışmaktadır.




## EN

# Whale Tracker Frontend

A modern and responsive user interface where users can monitor instantaneous blockchain movements.

## Features

- Real-time Updates: New transfers are added to the list without refreshing the page.
- Push Notifications: Browser notifications are sent even if the application is in the background or a different tab.
- Modular Design: Developed using component-based architecture and CSS Modules.

## Setup Details

Before running the project, ensure that the Firebase configuration in src/firebase.ts and public/firebase-messaging-sw.js is up to date.

## Execution

cd frontend
npm install
npm run dev

The application runs on http://localhost:5173 by default.