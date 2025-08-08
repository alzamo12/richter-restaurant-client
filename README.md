# Disco Zone Forum

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

