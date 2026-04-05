# System Architecture (MERN)

## 1. High-Level Overview

Client (React) ↔ API Layer (Express) ↔ Database (MongoDB)

* Stateless REST API
* JWT-based authentication
* Media via ImageKit (external service)

---

## 2. Layers

### 2.1 Client Layer (Frontend)

* React + Context API
* Tailwind CSS
* Responsibilities:

  * UI rendering
  * State management (auth, cart, filters)
  * API consumption

#### Structure

```
/src
  /components
  /pages
  /context
  /services
  /utils
```

---

### 2.2 API Layer (Backend - Express)

Responsibilities:

* Routing
* Request validation
* Business logic (controllers)
* Auth & authorization

#### Structure

```
/server
  /routes
  /controllers
  /middleware
  /models
  /utils
  /config
```

---

### 2.3 Database Layer (MongoDB)

* Collections: users, products, categories, carts, orders, reviews, coupons
* Mongoose ODM
* Indexed queries

---

## 3. Request Flow

### Example: Add to Cart

1. Client sends request with JWT
2. Auth middleware verifies token
3. Controller validates payload
4. DB query (find product + variant)
5. Update cart collection
6. Response returned

---

## 4. Authentication Flow

### Login

1. User enters email/password
2. Server validates credentials
3. OTP sent via Resend
4. OTP verified
5. JWT + refresh token issued

### Protected Route

* Token passed in header
* Middleware verifies
* Access granted/denied

---

## 5. Product Flow

### Product Listing

* Query products
* Apply filters (price, category, brand)
* Apply sorting
* Return paginated data

### Product Detail

* Fetch product
* Select variant
* Show reviews

---

## 6. Order Flow

1. Fetch cart
2. Validate stock
3. Apply coupon
4. Calculate total
5. Create order (snapshot)
6. Update stock
7. Clear cart

---

## 7. Image Handling

* Upload via backend → ImageKit
* Store returned URL in DB
* No local storage

---

## 8. Security

* JWT auth
* Bcrypt hashing
* Role-based middleware
* Basic rate limiting

---

## 9. Scalability Strategy

* Stateless backend (horizontal scaling possible)
* Pagination for all listings
* Indexed queries
* Separation of concerns (modular structure)

---

## 10. Error Handling

* Centralized error middleware
* Standard response format

Example:

```
{
  success: false,
  message: "Error message"
}
```

---

## 11. Logging (*)

* Request logs
* Error logs
* Order events

---

## 12. Limitations

* No caching layer
* No microservices
* No queue system

---

## 13. Future Architecture Upgrade

* Redis (caching)
* Microservices split (auth, product, order)
* Message queue (RabbitMQ)
* CDN for assets

---

## 14. Summary

Clean layered architecture:

* Frontend handles UI + state
* Backend handles logic + validation
* DB optimized for reads

Scalable for startup-level traffic.
