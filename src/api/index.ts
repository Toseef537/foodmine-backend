import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import { sample_food, sample_tags, Sample_Users } from "../data";
import foodRouter from "../routers/food.router"
import userRouter from "../routers/user.router"
import { dbConnect } from '../configs/database.config';
import orderRouter from '../routers/order.router';
import cartRouter from '../routers/cart.router';
dbConnect();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://foodmine-frontend-gamma.vercel.app',
    credentials: true,
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://foodmine-frontend-gamma.vercel.app");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.use("/api/foods", foodRouter)
app.use("/api/users", userRouter)
app.use("/api/carts", cartRouter)
app.use("/api/orders", orderRouter)



const port = 5000;
app.listen(port, () => {
})



