---
layout: post
title: Camera inspection for car transmissions
categories: [MachineVision,PYLON,Qt]
---

Application used Basler cameras with Pylon SDK implementation for image recoding. Key points:
- camera multi-snap, different sides of car transmission
- image recording with image storage 
- MySQL database parts recoding
- searching in database according transmission barcode

Hardware:
- Industrial GigE cameras [Basler acA 1920-25gm](https://www.baslerweb.com/en/products/cameras/area-scan-cameras/ace/aca1920-25gm/)

Software:
- Qt 5.11.2
- [Basler Pylon 5](https://www.baslerweb.com/en/products/software/pylon-windows/)

### [CameraUIv1](https://codeleccz.github.io/CameraUIv1/) - Hyundai application

#### 1. Main window view

![Camera GUI 1](https://codeleccz.github.io/images/CameraUIv1/hyundai1.png)

#### 2. User interface for image snap

![Camera GUI 2](https://codeleccz.github.io/images/CameraUIv1/hyundai2.png)

#### 3. Camera settings

![Camera GUI 3](https://codeleccz.github.io/images/CameraUIv1/hyundai3.png)

#### 4. Stored images view

![Camera GUI 4](https://codeleccz.github.io/images/CameraUIv1/hyundai4.png)
