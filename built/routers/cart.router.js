"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var auth_mid_1 = __importDefault(require("../middlewares/auth.mid"));
var cart_model_1 = require("../models/cart.model");
var http_status_1 = require("../constants/http_status");
var order_status_1 = require("../constants/order.status");
var router = express.Router();
router.use(auth_mid_1.default);
router.post('/create', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cart, newCart;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cart = req.body;
                console.log('cart in backend', cart);
                if (cart.items.length <= 0) {
                    res.status(http_status_1.HTTP_BAD_REQUEST).send('Cart Is Empty!');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, cart_model_1.CartModel.deleteOne({
                        user: req.user.id,
                        status: order_status_1.OrderStatus.NEW
                    })];
            case 1:
                _a.sent();
                newCart = new cart_model_1.CartModel(__assign(__assign({}, cart), { user: req.user.id }));
                return [4 /*yield*/, newCart.save()];
            case 2:
                _a.sent();
                res.send(newCart);
                return [2 /*return*/];
        }
    });
}); }));
router.get('/currentUserCart', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentCart;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, cart_model_1.CartModel.findOne({ user: req.user.id, status: order_status_1.OrderStatus.NEW })];
            case 1:
                currentCart = _a.sent();
                if (currentCart) {
                    res.status(http_status_1.HTTP_GOOD_REQUEST).send(currentCart);
                }
                else {
                    res.status(http_status_1.HTTP_BAD_REQUEST).send('Failed to fetch carts');
                }
                return [2 /*return*/];
        }
    });
}); }));
// DELETE API to remove an item from a cart
router.delete('/deleteFood/:foodId/:cartId', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, foodId, cartId, cart, itemIndex, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, foodId = _a.foodId, cartId = _a.cartId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, cart_model_1.CartModel.findById(cartId)];
            case 2:
                cart = _b.sent();
                if (!cart) {
                    return [2 /*return*/, res.status(404).send({ message: 'Cart not found' })];
                }
                itemIndex = cart.items.findIndex(function (item) { return item._id.toString() === foodId; });
                // if (itemIndex === -1) {
                //   return res.status(404).send({ message: 'Item not found in cart' });
                // }
                cart.items.splice(itemIndex, 1);
                // Recalculate the total price and count
                cart.totalPrice = cart.items.reduce(function (total, item) { return total + item.price * item.quantity; }, 0);
                cart.totalCount = cart.items.reduce(function (count, item) { return count + item.quantity; }, 0);
                // Save the updated cart
                return [4 /*yield*/, cart.save()];
            case 3:
                // Save the updated cart
                _b.sent();
                res.send(cart);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                res.status(500).send({ message: 'Error removing item from cart', error: error_1 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); }));
exports.default = router;
