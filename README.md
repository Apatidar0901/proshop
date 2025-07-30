# 🛒 eCommerce platform built with the MERN stack & Redux.
<img width="1980" height="1080" alt="image" src="https://github.com/user-attachments/assets/064a1ec0-a825-4bd3-a1f6-14d019fb0d5e" />

A full-featured eCommerce platform built with the **MERN Stack** (MongoDB, Express, React, Node.js) and **Redux** for state management.

---

## 🚀 Features

- Full-featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination and search
- User authentication & profile with order history
- Admin dashboard:
  - Product management
  - User management
  - Order detail view & delivery status
- Checkout process:
  - Shipping and payment method
  - PayPal / credit card integration
- MongoDB database seeder (products & users)

---

## 🧰 Tech Stack

- **Frontend**: React, Redux, React Router, Axios, Bootstrap
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **Payment Integration**: PayPal API

---

## 📦 Environment Variables

Rename `.env.example` to `.env` and update the following:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PAGINATION_LIMIT=8

