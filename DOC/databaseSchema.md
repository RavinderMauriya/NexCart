# Schema (Mongoose Models)

## 1. User Schema

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user","admin"], default: "user" },
  isBlocked: { type: Boolean, default: false },
  addresses: [
    {
      fullName: String,
      phone: String,
      pincode: String,
      city: String,
      state: String,
      addressLine: String,
      isDefault: Boolean
    }
  ]
}, { timestamps: true });
```

---

## 2. Category Schema

```js
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
    index: true
  }
});
```

---

## 3. Product Schema

```js
const productSchema = new mongoose.Schema({
  title: { type: String, required: true, index: "text" },
  description: String,
  brand: { type: String, index: true },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    index: true
  },

  attributes: [
    {
      name: String,
      values: [String]
    }
  ],

  variants: [
    {
      attributes: Object, // {color: "red", size: "M"}
      price: { type: Number, required: true },
      discountPrice: Number,
      stock: { type: Number, default: 0 },
      sku: { type: String, unique: true },
      images: [String]
    }
  ],

  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },

}, { timestamps: true });
```

---

## 4. Cart Schema

```js
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    index: true
  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      variantId: String,
      quantity: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });
```

---

## 5. Order Schema

```js
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true
  },

  items: [
    {
      productId: String,
      title: String,
      variant: Object,
      quantity: Number,
      price: Number
    }
  ],

  totalAmount: Number,

  paymentMethod: {
    type: String,
    enum: ["COD","UPI"]
  },

  paymentStatus: {
    type: String,
    enum: ["pending","paid"],
    default: "pending"
  },

  status: {
    type: String,
    enum: ["pending","confirmed","shipped","delivered","cancelled","returned"],
    default: "pending"
  },

  address: Object,
  coupon: String

}, { timestamps: true });
```

---

## 6. Review Schema

```js
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", index: true },
  rating: { type: Number, required: true },
  comment: String,
  images: [String],
  verified: Boolean
}, { timestamps: true });
```

---

## 7. Coupon Schema

```js
const couponSchema = new mongoose.Schema({
  code: { type: String, unique: true, index: true },
  discountType: { type: String, enum: ["flat","percent"] },
  value: Number,
  minOrder: Number,
  expiry: Date,
  isActive: Boolean
});
```

---

## 8. Index Summary

```js
productSchema.index({ title: "text" });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });

orderSchema.index({ user: 1 });
orderSchema.index({ status: 1 });

reviewSchema.index({ product: 1 });
```

---

## 9. Notes

* Variants embedded for fast reads
* Order stores snapshot to avoid inconsistency
* Cart stores variantId (not full object)
* Indexes added for performance-critical queries
