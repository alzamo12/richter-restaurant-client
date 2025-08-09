# Richter Restaurant
## Purpose

A modern, responsive food selling website built with the MERN stack and Firebase authentication. Users can buy their favourite foods here.

## Live Demo

[View the live application here](https://richter-restaurant.web.app/)

## Key Features

* **User Authentication**: Sign in/sign up using Firebase Auth with token verification middleware
* **Role-Based Access**: Admins vs. regular users guarded by custom `verifyAdmin` middleware
* **Responsive Design**: Tailwind CSS and DaisyUI components for mobile-first layouts
* **404 Routing**: Custom black‑themed animated 404 page for unmatched routes

## Tech & NPM Packages Used

* **Frontend**

  * `react`, `react-dom`
  * `react-router-dom`
  * `@tanstack/react-query`
  * `axios`
  * `firebase`
  * `react-icons`
  * `framer-motion`
  * `tailwindcss`, `daisyui`
  * `swiper`

* **Backend**

  * `express`
  * `cors`
  * `mongodb`
  * `firebase-admin`

## Usage

* Register or log in via Firebase Auth
* Add New foods for sell
* Pagination for browsinf foods
* handle Order on foods
* Admin users have access to protected routes for moderation

## 📦 Installation & Setup

## 🖥 Run Locally — Step-by-Step

### **Prerequisites**
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Any required services for the project (e.g., MongoDB, MySQL, Firebase, etc.)

---
### **1. Clone the repository**
```bash
git clone https://github.com/alzamo12/richter-restaurant-client
cd richter-restaurant-client

```
## 🌱 Environment Variables
Create a `.env` file in your project root:
```env
VITE_apiKey= firebase apikey
VITE_authDomain= firebase auth domain
VITE_projectId= firebase projectId
VITE_storageBucket= firebase storageBucket
VITE_messagingSenderId= firebase messaging sender id
VITE_appId= firebase app id
VITE_STRIPE_PUBLISHABLE_KEY== strip e publishable key

```
## Installation
```
npm install 
or 
nmp i

```
## run locally
```
npm run dev
# or
yarn dev



