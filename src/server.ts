import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import { sample_food, sample_tags, Sample_Users } from "../src/data";
import foodRouter from "../src/routers/food.router"
import userRouter from "../src/routers/user.router"
import { dbConnect } from '../src/configs/database.config';
import orderRouter from '../src/routers/order.router';
import cartRouter from '../src/routers/cart.router';
dotenv.config();
dbConnect();
const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use("/api/foods", foodRouter)
app.use("/api/users", userRouter)
app.use("/api/carts", cartRouter)
app.use("/api/orders", orderRouter)



const port = process.env.PORT || 5000;
app.listen(port, () => {
})

export default app;

