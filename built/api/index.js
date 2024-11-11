"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var food_router_1 = __importDefault(require("../routers/food.router"));
var user_router_1 = __importDefault(require("../routers/user.router"));
var database_config_1 = require("../configs/database.config");
var order_router_1 = __importDefault(require("../routers/order.router"));
var cart_router_1 = __importDefault(require("../routers/cart.router"));
(0, database_config_1.dbConnect)();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'https://foodmine-frontend-gamma.vercel.app',
    credentials: true,
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://foodmine-frontend-gamma.vercel.app");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use("/api/foods", food_router_1.default);
app.use("/api/users", user_router_1.default);
app.use("/api/carts", cart_router_1.default);
app.use("/api/orders", order_router_1.default);
var port = 5000;
app.listen(port, function () {
});
