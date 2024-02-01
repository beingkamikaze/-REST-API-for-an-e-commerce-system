const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const PORT = 8080;

//Database Connection
mongoose.connect(
  "mongodb+srv://mayank:mayank@cluster0.dxu2r.mongodb.net/ecommapi",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.on("error", () => {
  console.log("error connecting to mongodb");
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MOngoDB");
});

// Define Product and Variant Schemas
const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  SKU: {
    type: String,
    required: true,
  },
  additionalCost: {
    type: String,
    required: true,
  },
  stockCount: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    variants: [variantSchema],
  },
  { strictPopulate: false }
);

const Product = mongoose.model("Product", productSchema);

//Middlewares
app.use(bodyParser.json());

//Routes

//Create a new Product
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong with creating Product :(",
    });
  }
});

// Create a New variant for a product
app.post("/api/products/:productId/variants", async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        error: "Product not fond",
      });
    }
    product.variants.push(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

//retrieve products
app.get("/api/products", async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong with getting Product :(",
    });
  }
});

//Search products by name, decription or Variant name
app.get("/api/products/search", async (req, res) => {
  const seacrchTerm = req.query.q;
  try {
    const product = await Product.find({
      $or: [
        { name: { $regex: seacrchTerm, $options: "i" } },
        { description: { $regex: seacrchTerm, $options: "i" } },
        { "variants.name": { $regex: seacrchTerm, $options: "i" } },
      ],
    });
    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong with Searching Product :(",
    });
  }
});

//Update a Product
app.put("/api/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    }).populate("someField");

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
});

// Update a variant for a product
app.put("/api/products/:productId/variants/:variantId", async (req, res) => {
  const { productId, variantId } = req.params;

  try {
    const product = await Product.findOneAndUpdate(
      { _id: productId, "variants._id": variantId },
      { $set: { "variants.$": req.body } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product or Variant not found" });
    }

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Delete a Product
app.delete("/api/products/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({
        error: "Product not Found",
      });
    }

    res.json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
});
//Delete a Variant of product
app.delete("/api/products/:productId/variants/:variantId", async (req, res) => {
  const { productId, variantId } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      { $pull: { variants: { _id: variantId } } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product or Variant Not found :(" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong in deleting variant of product :(",
    });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
