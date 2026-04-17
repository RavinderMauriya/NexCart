import User from "../models/userSchema.js";
import asyncHandler from "../utils/asyncHandler.js";

export const addAddress = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { fullName, phone, pincode, city, state, addressLine, isDefault } =
    req.body;

  if (!fullName || !phone || !pincode || !addressLine || !city || !state) {
    return res.status(400).json({
      success: false,
      message: "Required fields missing",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (isDefault || user.address.length === 0) {
    user.address.forEach((addr) => (addr.isDefault = false));
  }

  user.address.push({
    fullName,
    phone,
    pincode,
    city,
    state,
    addressLine,
    isDefault: isDefault || user.address.length === 0,
  });

  await user.save();

  res.status(201).json({
    success: true,
    message: "Address added",
    data: user.address,
  });
});

//update address
export const updateAddress = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { addressId } = req.params;

  const { fullName, phone, pincode, city, state, addressLine, isDefault } =
    req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // ===== FIND ADDRESS =====
  const address = user.address.id(addressId);

  if (!address) {
    return res.status(404).json({
      success: false,
      message: "Address not found",
    });
  }

  // ===== HANDLE DEFAULT =====
  if (isDefault) {
    user.address.forEach((addr) => (addr.isDefault = false));
  }

  // ===== UPDATE FIELDS =====
  address.fullName = fullName ?? address.fullName;
  address.phone = phone ?? address.phone;
  address.pincode = pincode ?? address.pincode;
  address.city = city ?? address.city;
  address.state = state ?? address.state;
  address.addressLine = addressLine ?? address.addressLine;
  address.isDefault = isDefault ?? address.isDefault;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Address updated",
    data: user.address,
  });
});

// delete address
export const deleteAddress = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { addressId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const addressIndex = user.address.findIndex(
    (addr) => addr._id.toString() === addressId,
  );

  if (addressIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Address not found",
    });
  }

  // If we delete a default address, we might want to make another one default
  const wasDefault = user.address[addressIndex].isDefault;
  user.address.splice(addressIndex, 1);

  if (wasDefault && user.address.length > 0) {
    user.address[0].isDefault = true;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Address deleted",
    data: user.address,
  });
});

// get all addresses
export const getAddresses = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({
    success: true,
    data: user.address,
  });
});
