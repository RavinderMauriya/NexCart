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
"message": "user register successfully"
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
"success": true,
"message": "Login successful",
"accessToken": "JWT_TOKEN"
}

---

## Refresh Token

POST /auth/refresh

---

## Logout

GET /auth/logout

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

## Get Brands

GET /products/brands

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

## Get Product Variant

GET /products/:productId/:variantId

---

## Upload Variant Images (Admin)

POST /products/upload

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

DELETE /cart/

---

# 4. ORDER APIs

## Create Order

POST /orders

Body:
{
"addressId": "id",
"paymentMethod": "COD",
"items": []
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

## Verify Payment

POST /orders/verify

---

## Cancel Order

POST /orders/cancel

---

## Return Order

POST /orders/return

---

# 5. CATEGORY APIs

## Get Categories

GET /category

---

## Get Root Categories

GET /category/root

---

## Create Category (Admin)

POST /category

---

## Update Category (Admin)

PUT /category

---

## Delete Category (Admin)

DELETE /category/:id

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

## Delete Review

DELETE /reviews/:reviewId

---

# 7. USER APIs

## Get Profile

GET /user/profile/me

---

## Update Profile

PUT /user/profile/update

---

## Get All Users (Admin)

GET /user/profile/all

---

## Upload Avatar

POST /user/profile/upload-avatar

---

## Get Addresses

GET /user/profile/address

---

## Add Address

POST /user/profile/address

---

## Update Address

PUT /user/profile/address/:addressId

---

## Delete Address

DELETE /user/profile/address/:addressId

---

## Block User (Admin)

PUT /user/profile/block/:id

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
