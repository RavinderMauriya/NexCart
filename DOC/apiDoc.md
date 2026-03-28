# API Documentation (REST)

Base URL: /api

Auth: Bearer Token (JWT)
Header:
Authorization: Bearer <token>

---

# 1. AUTH APIs

## Register

POST /auth/register

Body:
{
"name": "Ravi",
"email": "[test@mail.com](mailto:test@mail.com)",
"password": "123456"
}

Response:
{
"success": true,
"message": "OTP sent"
}

---

## Verify OTP

POST /auth/otp-verify

Body:
{
"email": "[test@mail.com](mailto:test@mail.com)",
"otp": "123456"
}

---

## Login

POST /auth/login

Body:
{
"email": "[test@mail.com](mailto:test@mail.com)",
"password": "123456"
}

Response:
{
"token": "JWT_TOKEN",
"refreshToken": "REFRESH_TOKEN"
}

---

## Refresh Token

POST /auth/refresh

---

# 2. PRODUCT APIs

## Get All Products

GET /products?page=1&limit=10

Query Params:

* search
* category
* minPrice
* maxPrice
* brand
* rating
* sort

---

## Get Single Product

GET /products/:id

---

## Create Product (Admin)

POST /products

---

## Update Product (Admin)

PUT /products/:id

---

## Delete Product (Admin)

DELETE /products/:id

---

# 3. CART APIs

## Get Cart

GET /cart

---

## Add to Cart

POST /cart/add

Body:
{
"productId": "id",
"variantId": "id",
"quantity": 1
}

---

## Update Cart

PUT /cart/update

---

## Remove Item

DELETE /cart/remove

---

# 4. ORDER APIs

## Create Order

POST /orders

Body:
{
"addressId": "id",
"paymentMethod": "COD"
}

---

## Get My Orders

GET /orders/my

---

## Get All Orders (Admin)

GET /orders

---

## Update Order Status (Admin)

PUT /orders/:id/status

Body:
{
"status": "shipped"
}

---

## Cancel Order

POST /orders/cancel

---

## Return Order

POST /orders/return

---

# 5. COUPON APIs

## Apply Coupon

POST /coupon/apply

Body:
{
"code": "FLAT100"
}

---

## Create Coupon (Admin)

POST /coupon

---

# 6. REVIEW APIs

## Add Review

POST /reviews

Body:
{
"productId": "id",
"rating": 5,
"comment": "Good"
}

---

## Get Product Reviews

GET /reviews/:productId

---

# 7. USER APIs

## Get Profile

GET /user/profile

---

## Update Profile

PUT /user/profile

---

## Block User (Admin)

PUT /user/block/:id

---

# 8. RESPONSE FORMAT

Success:
{
"success": true,
"data": {}
}

Error:
{
"success": false,
"message": "Error message"
}

---

# 9. STATUS CODES

* 200 OK
* 201 Created
* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 500 Server Error

---

# 10. NOTES

* All protected routes require JWT
* Admin routes require role=admin
* Always validate input
* Use pagination for list APIs
