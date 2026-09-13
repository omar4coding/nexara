const express = require('express');
const Order = require('../models/order.js');
const Product = require('../models/product.js');
const { protect, sellerOnly } = require('../middleware/auth');

const router = express.Router();

// @route POST /api/orders
// Shopper - place an order
router.post('/', protect, async (req, res) => {
  try {
    const { products, shippingAddress } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No products in order' });
    }

    // Get product details and calculate total
    let totalPrice = 0;
    let sellerId = null;
    const orderProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }

      // All products must be from the same seller
      if (!sellerId) sellerId = product.seller.toString();

      totalPrice += product.price * item.quantity;
      orderProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });

      // Decrease stock
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      shopper: req.user._id,
      seller: sellerId,
      products: orderProducts,
      totalPrice,
      shippingAddress,
      paymentStatus: 'unpaid'
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /api/orders/my
// Shopper - get their own orders
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ shopper: req.user._id })
      .populate('products.product', 'name price images')
      .populate('seller', 'name email')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /api/orders/seller
// Seller - get orders for their products
router.get('/seller', protect, sellerOnly, async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.user._id })
      .populate('products.product', 'name price images')
      .populate('shopper', 'name email')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /api/orders/:id
// Get single order
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('products.product', 'name price images')
      .populate('seller', 'name email')
      .populate('shopper', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Only shopper or seller can see the order
    if (
      order.shopper._id.toString() !== req.user._id.toString() &&
      order.seller._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route PUT /api/orders/:id/status
// Seller - update order status
router.put('/:id/status', protect, sellerOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;