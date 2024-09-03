import { Router } from "express";

import { productPostSchema, productUpdateSchema } from "../validation/product.js";
import Product from "../models/product.js";
import mongoose from "mongoose";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error1 in fetching products: ", error.message);
    res.status(500).json({ success: false, message: "server Error" });
  }
});

router.post("/", async (req, res) => {
  const { body } = req;

  try {
    const product = await productPostSchema.validate(body);

    const newProduct = new Product(product);
    await newProduct.save();

    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ success: false, message: err.errors }); // Send validation errors
    }
    console.log(`Error in create product: ${err.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invilid product Id" });
  }

  try {
    const validetedProduct = await productUpdateSchema.validate(body);

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      validetedProduct,
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ success: false, message: err.errors }); // Send validation errors
    }

    console.log(`Error in create product: ${err.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const {
    params: { id },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product Id" });
  }

  try {
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log(`Error in delete product: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
