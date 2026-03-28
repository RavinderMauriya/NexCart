# Database Design (MongoDB)

## 1. Design Principles

* Normalized where necessary, denormalized where performance-critical
* Avoid joins (MongoDB limitation)
* Use references for large datasets
* Use embedded docs for small, tightly coupled data

---

## 2. Collections Overview

### Core Collections

* users
* categories
* products
* carts
* orders
* reviews
* coupons

---

## 3. Relationships

### User ↔ Cart

* One-to-One
* cart.user → user._id

### User ↔ Orders

* One-to-Many
* order.user → user._id

### Product ↔ Reviews

* One-to-Many
* review.product → product._id

### Category Hierarchy

* Self-referencing
* category.parent → category._id

---

## 4. Embedding vs Referencing

### Embedded

* product.variants (performance critical)
* user.addresses
* order.items (snapshot)

### Referenced

* cart → product
* order → user
* review → user & product

---

## 5. Index Strategy

### Product

* text index on title
* index on category
* index on brand

### Order

* index on user
* index on status

### Review

* index on product

---

## 6. Data Flow

### Product Listing

* Query products collection
* Apply filters and pagination

### Cart

* Fetch cart by userId
* Populate product reference

### Order Creation

* Read cart
* Validate stock
* Create order snapshot
* Clear cart

---

## 7. Scalability Considerations

* Avoid deep nesting
* Keep document size <16MB
* Use pagination always

---

## 8. Trade-offs

* No joins → duplication in orders
* Simpler queries → faster reads
* Slight inconsistency risk acceptable

---

## 9. Summary

Design optimized for:

* Fast reads
* Moderate writes
* Simple scaling
