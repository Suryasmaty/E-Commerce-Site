const asyncHandler = require("./../middleware/asyncHandler");
const AppError = require("./../middleware/AppError");
const Order = require("./../models/orderModel");

// @desc create new order
// @route POST /api/orders
// @access Private
exports.addOrderItems = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  //console.log(req.body);

  if (orderItems && orderItems.length === 0) {
    next(new AppError("No Order items", 400));
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(200).json({
      order: createdOrder,
    });
  }
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(201).json({
    orders: orders,
  });
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
exports.getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    next(new AppError("Order not found", 404));
  }
});

// @desc Update order to be paid
// @route PUT /api/orders/:id
// @access Private
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  console.log("orderId", req.params.id);
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // order.paymentResult = {
    //   id: req.body.id,
    //   status: req.body.status,
    //   update_time: req.body.update_time,
    //   email_address: req.body.payer.email_address,
    // };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    next(new AppError("order not found", 404));
  }
});

// @desc Update order to be delivered
// @route PUT /api/orders/:id/deliver
// @access Private/admin
exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  res.send("update order to delivered");
});

// @desc Get all orders
// @route GET /api/orders/
// @access Private/admin
exports.getOrders = asyncHandler(async (req, res, next) => {
  res.send("get all orders");
});
