const express = require('express');
import expressAsyncHandler from "express-async-handler";
import authMid from "../middlewares/auth.mid";
import { CartModel } from "../models/cart.model";
import { HTTP_BAD_REQUEST, HTTP_GOOD_REQUEST } from "../constants/http_status";
import { OrderStatus } from "../constants/order.status";
const router = express.Router();
router.use(authMid);

router.post('/create', expressAsyncHandler(
  async  (req:any, res:any) => {
    const cart = req.body;
    console.log('cart in backend',cart);
    
    
    if (cart.items.length <= 0) {
        res.status(HTTP_BAD_REQUEST).send('Cart Is Empty!');
        return;
    }

    await CartModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW
    });

    const newCart = new CartModel({ ...cart, user: req.user.id });
    await newCart.save();
    res.send(newCart);
})
) 

router.get('/currentUserCart', expressAsyncHandler(
    async  (req:any, res:any) => {
      const currentCart=  await CartModel.findOne({user: req.user.id,status: OrderStatus.NEW});
      if(currentCart){
        res.status(HTTP_GOOD_REQUEST).send(currentCart);
      }
      else{
        res.status(HTTP_BAD_REQUEST).send('Failed to fetch carts')
      }
  })
  ) 

export default router;