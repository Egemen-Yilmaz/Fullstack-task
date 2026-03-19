# Ethereum USDT Whale Tracker

Bu proje, Ethereum ana ağı üzerindeki USDT transferlerini gerçek zamanlı olarak izleyen ve 100.000 USDT üzerindeki işlemleri kullanıcılara anlık bildirim olarak sunan bir uygulamadır.

## Proje Yapısı

Proje iki ana dizinden oluşmaktadır:
- /backend: NestJS framework'ü kullanılarak geliştirilmiş, Ethereum ağını dinleyen sunucu tarafı.
- /frontend: React ve TypeScript kullanılarak geliştirilmiş, bildirimleri listeleyen kullanıcı arayüzü.

## Kullanılan Teknolojiler

- Backend: NestJS, Ethers.js, Firebase Admin SDK.
- Frontend: React, TypeScript, Firebase Messaging SDK, CSS Modules.
- Blockchain: Alchemy (Ethereum Mainnet Node Provider).
- Bildirim Servisi: Firebase Cloud Messaging (FCM).

## Kurulum ve Çalıştırma

1. Projeyi yerel makinenize indirin.
2. Backend kurulumu:
   cd backend
   npm install
   npm run start:dev
3. Frontend kurulumu:
   cd ../frontend
   npm install
   npm run dev

## Gereksinimler
Uygulamanın çalışması için geçerli bir Alchemy WSS URL adresi ve Firebase yapılandırma bilgilerinin ilgili dosyalarda tanımlanmış olması gerekmektedir.






# Ethereum USDT Whale Tracker

This project is a full-stack application that monitors USDT transfers on the Ethereum mainnet in real-time and provides instant push notifications for transactions exceeding 100,000 USDT.

## Project Structure

The project consists of two main directories:
- /backend: Server-side developed with NestJS, responsible for monitoring the Ethereum network.
- /frontend: User interface developed with React and TypeScript, responsible for listing notifications.

## Tech Stack

- Backend: NestJS, Ethers.js, Firebase Admin SDK.
- Frontend: React, TypeScript, Firebase Messaging SDK, CSS Modules.
- Blockchain: Alchemy (Ethereum Mainnet Node Provider).
- Notification Service: Firebase Cloud Messaging (FCM).

## Installation and Setup

1. Clone the project to your local machine.
2. Backend Setup:
   cd backend
   npm install
   npm run start:dev
3. Frontend Setup:
   cd ../frontend
   npm install
   npm run dev

## Requirements
A valid Alchemy WSS URL and Firebase configuration details must be defined in the respective files for the application to function correctly.