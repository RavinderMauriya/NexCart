# NexCart - E-commerce Platform

A full-stack e-commerce website built with MERN stack (MongoDB, Express, React, Node.js).

## 📁 Current Project Structure

### Root Level
```
NexCart/
├── 📁 backend/                 # Node.js/Express API
├── 📁 frontend/                # React/Vite SPA
├── 📁 DOC/                     # Documentation
├── 📄 README.md
```


### Backend Structure
```
backend/
├── 📁 controllers/             # Request handlers
│   ├── 📄 addressController.js
│   ├── 📄 authController.js
│   ├── 📄 cartController.js
│   ├── 📄 categoryController.js
│   ├── 📄 orderController.js
│   ├── 📄 productController.js
│   ├── 📄 reviewController.js
│   ├── 📄 statusController.js
│   └── 📄 userController.js
├── 📁 middleware/              # Custom middleware
│   ├── 📄 authMiddleware.js
│   └── 📄 rateLimit.js
├── 📁 models/                  # Database schemas
│   ├── 📄 cartModel.js
│   ├── 📄 categorySchema.js
│   ├── 📄 orderSchema.js
│   ├── 📄 productSchema.js
│   ├── 📄 reviewSchema.js
│   └── 📄 userSchema.js
├── 📁 routes/                  # API routes
│   ├── 📄 adminStatusRoute.js
│   ├── 📄 authRoute.js
│   ├── 📄 cartRoute.js
│   ├── 📄 categoryRoute.js
│   ├── 📄 orderRoute.js
│   ├── 📄 productRoute.js
│   ├── 📄 reviewRoute.js
│   └── 📄 userRoute.js
├── 📁 utils/                   # Helper functions
│   ├── 📄 asyncHandler.js
│   └── 📄 imagekit.js
├── 📄 .env
├── 📄 .gitignore
├── 📄 package.json
├── 📄 package-lock.json
└── 📄 server.js                # Server entry point
```


### Frontend Structure
```
frontend/
├── 📁 public/
│   ├── 📄 _redirects
│   ├── 📄 favicon.svg
│   ├── 📄 icons.svg
│   └── 📄 favicon.png
├── 📁 src/
│   ├── 📁 adminPages/          # Admin-specific pages
│   │   ├── 📄 AddProduct.jsx
│   │   ├── 📄 Categories.jsx
│   │   ├── 📄 Dashboard.jsx
│   │   ├── 📄 Orders.jsx
│   │   ├── 📄 Product.jsx
│   │   ├── 📄 ProductImages.jsx
│   │   └── 📄 Users.jsx
│   ├── 📁 assets/              # Static assets
│   │   └── 📄 logo.svg
│   ├── 📁 components/          # Reusable UI components
│   │   ├── 📄 Footer.jsx
│   │   ├── 📄 Navbar.jsx
│   │   ├── 📄 mobileBottomNav.jsx
│   │   ├── 📁 adminDashboard/
│   │   │   ├── 📄 AdminLayout.jsx
│   │   │   ├── 📄 Button.jsx
│   │   │   ├── 📄 Card.jsx
│   │   │   ├── 📄 Input.jsx
│   │   │   ├── 📄 Select.jsx
│   │   │   ├── 📄 Sidebar.jsx
│   │   │   └── 📄 Topbar.jsx
│   │   ├── 📁 auth/
│   │   │   ├── 📄 AuthModal.jsx
│   │   │   ├── � LoginForm.jsx
│   │   │   ├── 📄 ProtectedRoute.jsx
│   │   │   └── 📄 RegisterForm.jsx
│   │   ├── �� cart/
│   │   │   ├── 📄 AddressBar.jsx
│   │   │   ├── 📄 CartItem.jsx
│   │   │   ├── 📄 CartList.jsx
│   │   │   └── 📄 PriceSummary.jsx
│   │   ├── 📁 checkout/
│   │   │   ├── 📄 CheckoutOrderSummary.jsx
│   │   │   ├── 📄 CheckoutSkeleton.jsx
│   │   │   ├── 📄 DeliveryAddress.jsx
│   │   │   └── 📄 PaymentMethod.jsx
│   │   ├── 📁 home/
│   │   │   ├── 📄 CircularIcons.jsx
│   │   │   ├── 📄 HomeCategoryProduct.jsx
│   │   │   ├── 📄 LogoTicker.jsx
│   │   │   ├── 📄 PromoSection.jsx
│   │   │   ├── 📄 ScrollSection.jsx
│   │   │   ├── 📄 Section.jsx
│   │   │   └── 📄 SlideBackground.jsx
│   │   ├── 📁 product/
│   │   │   ├── 📄 FilterSidebar.jsx
│   │   │   ├── 📄 ProductCard.jsx
│   │   │   ├── 📄 ProductGrid.jsx
│   │   │   └── 📄 SortBar.jsx
│   │   ├── 📁 productDetailPage/
│   │   │   ├── 📄 ProductGallery.jsx
│   │   │   ├── 📄 ProductInfo.jsx
│   │   │   ├── 📄 ProductReviews.jsx
│   │   │   └── 📄 ProductSpecs.jsx
│   │   └── 📁 profile/
│   │       ├── 📄 Address.jsx
│   │       ├── 📄 Order.jsx
│   │       ├── 📄 ProfileDetails.jsx
│   │       ├── 📄 ProfileInfo.jsx
│   │       ├── 📄 ProfileOrders.jsx
│   │       └── 📄 ProfileSidebar.jsx
│   ├── 📁 context/             # React Context
│   │   ├── 📄 AuthContext.jsx
│   │   ├── 📄 CartContext.jsx
│   │   └── 📄 ThemeContext.jsx
│   ├── 📁 pages/               # Page components
│   │   ├── 📄 CartPage.jsx
│   │   ├── 📄 CheckoutPage.jsx
│   │   ├── 📄 Home.jsx
│   │   ├── 📄 OrderSuccessPage.jsx
│   │   ├── 📄 ProductDetailPage.jsx
│   │   ├── 📄 ProductPage.jsx
│   │   └── 📄 Profile.jsx
│   ├── 📁 services/            # API services
│   │   └── 📄 api.js
│   ├── 📄 App.css
│   ├── 📄 App.jsx
│   ├── 📄 index.css
│   └── 📄 main.jsx
├── 📄 .gitignore
├── 📄 eslint.config.js
├── 📄 index.html
├── 📄 package.json
├── 📄 package-lock.json
└── 📄 README.md
```

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB database

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   # Backend dependencies
   cd backend && npm install
   
   # Frontend dependencies  
   cd frontend && npm install
   ```

### Running the Application
Use the root package.json scripts:
```bash
# Start only backend
npm run dev:backend

# Start only frontend
npm run dev:frontend
```

## � Documentation
Detailed documentation is available in the `/DOC` folder:
- API Documentation
- Database Design
- Architecture Overview

## 🛠 Tech Stack
- **Frontend**: React, Vite, TailwindCSS, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **Payment**: Razorpay
- **File Storage**: ImageKit
- **Other**: CORS, dotenv, multer, react-router-dom
