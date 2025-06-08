# 🧢 3D T-Shirt Customizer & E-Commerce App

This is a 3D T-shirt customization and e-commerce application built with **Next.js 15**, **React Three Fiber**, and **Stripe**. Users can interact with a 3D shirt model, customize it in real-time, and proceed to secure checkout with smooth animations and responsive design.

![image](https://github.com/user-attachments/assets/e6684df4-e32e-4aa5-99d5-11f9dfa8c958)
![image](https://github.com/user-attachments/assets/66449448-4329-47a6-a5ae-6c3b31cab3aa)
![image](https://github.com/user-attachments/assets/fd755b9f-b862-4173-93a0-49217a2ccc3d)
![image](https://github.com/user-attachments/assets/3b5d4ea7-5738-468a-9de4-43f66843ca6b)
![image](https://github.com/user-attachments/assets/adf941ff-0efb-4b67-8dd7-f9ba38c70d32)
![image](https://github.com/user-attachments/assets/ff69073d-70ee-4555-a67a-2b28d4041300)

---

## 🚀 Features

### 🧩 3D Visualization
- Interactive 3D T-shirt model rendered with **Three.js** and **React Three Fiber**
- Load models from `.glb` files
- Apply real-time color and decal customizations
- Smooth camera transitions with Framer Motion

### 🎨 Customization Options
- Color picker for base shirt color
- Upload and apply custom decals
- Predefined decals (React, Three.js, PMNDRS logos)
- Zoom, rotate, and pan camera interactions

### 🛒 E-Commerce Integration
- Full Stripe checkout integration
- Shopping cart management with localStorage
- Success page with animation and countdown
- Cancel page with retry option
- Email notifications on successful purchase

### 📱 UI & UX
- Responsive design for mobile and desktop
- Client-side rendering for seamless interaction
- Loading animations for feedback and polish

---

## 🧰 Tech Stack

| Tech | Purpose |
|------|---------|
| **Next.js 15.3.3** | Fullstack React framework with Turbopack |
| **React Three Fiber** | Declarative 3D rendering |
| **Three.js** | Low-level 3D rendering library |
| **Framer Motion** | Animations & transitions |
| **Stripe** | Payment processing |
| **Valtio** | Lightweight state management |
| **Nodemailer** | Email notifications |

---

## 📦 Installation

```bash
git clone https://github.com/your-username/3d-tshirt-customizer.git
cd 3d-tshirt-customizer
npm install
