# Whale Tracker Backend

Ethereum ağındaki akıllı kontrat etkileşimlerini takip eden ve kriterlere uyan işlemleri Firebase üzerinden istemcilere ileten sunucu uygulamasıdır.

## Teknik Özellikler

- Blockchain Entegrasyonu: Ethers.js kütüphanesi ve WebSocket sağlayıcısı kullanılarak USDT kontratının Transfer event'i filtrelenmektedir.
- Veri İşleme: USDT decimals değeri (6) dikkate alınarak veriler okunabilir birimlere dönüştürülmektedir.
- Bildirim Yönetimi: Firebase Admin SDK aracılığıyla kayıtlı cihaz token'larına anlık mesaj iletilmektedir.

## Çalıştırma

cd backend
npm install
npm run start:dev

"Firebase servis hesabı anahtarınızı firebase-auth.json ismiyle backend dizinine eklemelisiniz"
Sunucu varsayılan olarak http://localhost:3000 portunda çalışmaktadır.




# EN
# Whale Tracker Backend

This is the server-side application that monitors smart contract interactions on the Ethereum network and forwards transactions meeting specific criteria to clients via Firebase.

## Technical Specifications

- Blockchain Integration: The Transfer event of the USDT contract is filtered using the Ethers.js library and a WebSocket provider.
- Data Processing: Data is converted into readable units by considering the USDT decimals value (6).
- Notification Management: Instant messages are sent to registered device tokens via the Firebase Admin SDK.

## Execution

cd backend
npm install
npm run start:dev

The server runs on http://localhost:3000 by default.