---
title: "Betaflight PID Ayarlama Rehberi"
slug: "betaflight-pid-ayarlama"
date: "2026-03-28"
author: "FPV Türkiye"
excerpt: "Betaflight'ta PID ayarlarını nasıl yapacağınızı adım adım anlattığımız kapsamlı rehber. Titreşim sorunlarını çözün, uçuş kalitenizi artırın."
category: "rehber"
tags: ["betaflight", "pid", "ayarlama", "rehber"]
featured: true
coverImage: ""
---

# Betaflight PID Ayarlama Rehberi

PID (Proportional, Integral, Derivative) ayarları, drone'unuzun uçuş kalitesini doğrudan etkiler. Doğru PID ayarları ile drone'unuz daha stabil, daha tepkili ve daha az titreşimli uçar.

## PID Nedir?

- **P (Proportional):** Drone'un ne kadar hızlı tepki verdiğini belirler
- **I (Integral):** Rüzgar gibi sürekli kuvvetlere karşı düzeltme yapar
- **D (Derivative):** Aşırı tepkiyi (overshoot) engeller, titreşimi sönümler

## Adım Adım Ayarlama

### 1. Varsayılan Değerlerle Başlayın
Betaflight'ın varsayılan PID değerleri çoğu drone için iyi bir başlangıç noktasıdır. İlk önce bir test uçuşu yapın.

### 2. P Değerini Ayarlayın
- P'yi artırın → Drone daha keskin tepki verir
- P çok yüksekse → Hızlı titreşimler başlar
- P çok düşükse → Drone gevşek ve tepkisiz hissedilir

### 3. D Değerini Ayarlayın
- D'yi artırın → Titreşim azalır, motorlar ısınabilir
- D çok yüksekse → Motorlar aşırı ısınır, gürültülü uçuş
- D çok düşükse → Overshoot ve salınım

### 4. I Değerini Ayarlayın
- I genellikle varsayılana yakın kalabilir
- Rüzgarda drift varsa I'yi hafif artırın

## Filtre Ayarları

PID kadar önemli olan filtre ayarları, gürültüyü temizler:

- **Gyro filtresi:** RPM filtresi mutlaka aktif olmalı
- **D-term filtresi:** D gürültüsünü azaltır
- **Dynamic notch:** Pervane rezonansını filtreler

## Betaflight CLI Komutları

```
set p_pitch = 45
set i_pitch = 80
set d_pitch = 40
set p_roll = 42
set i_roll = 75
set d_roll = 35
set p_yaw = 35
set i_yaw = 90
save
```

## İpuçları

1. **Her seferinde tek parametre değiştirin** — Birden fazla şeyi aynı anda değiştirirseniz hangisinin etkili olduğunu bilemezsiniz
2. **Blackbox kayıt yapın** — PID Toolbox ile analiz edin
3. **Motor sıcaklığını kontrol edin** — Uçuş sonrası motorlara dokunun, çok sıcaksa D'yi düşürün
4. **Hesaplayıcımızı kullanın** — [PID Hesaplayıcı](/hesaplayici/pid) sayfamızdan başlangıç değerleri alabilirsiniz

İyi ayarlamalar!
