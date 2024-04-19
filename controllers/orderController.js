const Order = require("../models/orderModel")
const Product = require("../models/ProductModel")



// create new order 
exports.newOrder = async (req, res) => {
    try {
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body

        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id
        })

        res.status(200).json({
            success: true,
            order,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

// get Single Order

exports.getSingleOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        )

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not Found"
            })
        }

        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get Loggedin user order 

exports.MyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })

        res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// get all Orders -- Admin
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        let totalAmount = 0;

        orders.forEach((order) => {
            totalAmount += order.totalPrice;
        });

        res.status(200).json({
            success: true,
            totalAmount,
            orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};


/// update Order Status -- Admin
exports.updateOrder = async (req, res) => {

try {
    
        const order = await Order.findById(req.params.id);
    
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not Found"
            })
        }
    
    
        if (order.orderStatus === "Delivered") {
            return res.status(400).json({
                success: false,
                message: "You Have Already This Order"
            });
        }
    
        if (req.body.status === "Shipped") {
            await Promise.all(
                order.orderItems.map(async (o) => {
                  await updateStock(o.product, o.quantity);
                })
              );
        }
        order.orderStatus = req.body.status;
    
        if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now();
        }
    
        await order.save()

        res.status(200).json({
            success: true,
            message: "Updated Successfully"
        });

} catch (error) {

    res.status(500).json({
        success: false,
        message: `Failed to update order: ${error.message}`,
      });
}
}

async function updateStock(id, quantity) {
    
      const product = await Product.findById(id);
  
      product.Stock -= quantity;
  
      await product.save()

}


// delete Order -- Admin
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not Found!"
            });
        }

        await order.remove();

        res.status(200).json({
            success: true,
            message: "order Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};