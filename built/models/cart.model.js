"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = exports.cartItemSchema = void 0;
var mongoose_1 = require("mongoose");
var food_model_1 = require("./food.model");
var order_status_1 = require("../constants/order.status");
exports.cartItemSchema = new mongoose_1.Schema({
    food: { type: food_model_1.foodSchema, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});
var cartSchema = new mongoose_1.Schema({
    totalPrice: { type: Number, required: true },
    totalCount: { type: Number, required: true },
    items: { type: [exports.cartItemSchema], required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    status: { type: String, default: order_status_1.OrderStatus.NEW },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
exports.CartModel = (0, mongoose_1.model)('cart', cartSchema);
