# Product Requirements Document (PRD)

## 1. Product Overview

A Flipkart-style single-vendor eCommerce platform built using MERN stack.

### Goals

* Sell products across 4 categories
* Provide smooth shopping experience
* Scalable backend design

### Categories

* Electronics
* Mobiles
* Fashion
* Furniture

---

## 2. User Roles

### Customer

* Browse products
* Add to cart
* Place orders
* Write reviews

### Admin

* Manage products
* Manage orders
* Manage users

---

## 3. Functional Requirements

### 3.1 Authentication

* Email + password login
* JWT authentication
* Refresh token (httpOnly cookie)

---

### 3.2 Product Management

#### Features

* Create product
* Update product
* Delete product
* View product

#### Product Structure

* Title
* Description
* Brand
* Category hierarchy
* Attributes
* Variants

---

### 3.3 Variant System

Each product can have multiple variants:

* Attributes (color, size, storage, etc.)
* Price
* Discount price
* Stock
* Images

---

### 3.4 Search & Filtering

#### Search

* Name-based
* Category-based

#### Filters

* Price range
* Category / Subcategory
* Rating
* Brand
* Stock availability

#### Sorting

* Price low to high
* Price high to low
* Newest
* Popularity

---

### 3.5 Cart

* Add to cart
* Update quantity
* Remove item
* Persistent DB cart

---

### 3.6 Order System

#### Order Flow

pending → confirmed → shipped → delivered → cancelled → returned

#### Features

* COD, UPI and Razorpay (ONLINE)
* Payment status tracking
* Address snapshot

---

### 3.7 Review System

* Rating (1–5)
* Comment
* Images
* Verified purchase

---

### 3.8 Address System

* Multiple addresses
* Default address selection

---

### 3.9 Admin Panel

* Product CRUD
* Order management
* User block/unblock

---

## 4. Non-Functional Requirements

* Scalable architecture
* Secure authentication
* Optimized database queries
* Pagination support

---

## 5. Constraints

* No multi-vendor support
* No caching layer
* No advanced search engine

---

## 6. Success Metrics

* Fast API response (<300ms avg)
* High product query performance
* Low cart abandonment (logic ready)

---

## 7. Future Scope

* Multi-vendor system
* Recommendation engine
* Redis caching
* ElasticSearch integration
