import { Router } from "express";
import { sample_food, sample_tags } from "../data";
import expressAsyncHandler from "express-async-handler";
import { FoodModel, foodSchema } from "../models/food.model";
import { UserModel } from "../models/user.model";
const router = Router();


router.get('/seed', expressAsyncHandler(
    async (req, res) => {
        const foodCount = await FoodModel.countDocuments();
        if (foodCount > 0) {
            res.send("seed is already done")
            return;
        }
        await FoodModel.create(sample_food);
        res.send("seed is  done")
    })
)

router.post('/add-food', expressAsyncHandler(
    async (req, res) => {
        const newFood = {
            name: req.body.name,
            price: req.body.price,
            tag:req.body.tag,
            imgUrl: req.body.imgUrl,
            cookTime: req.body.cookTime,
            // Add other necessary fields here
        };
        const createdFood = await FoodModel.create(newFood);
        res.status(201).send(createdFood);
    }
));

/**
 * Getting All Foods 
 */
router.get('/', expressAsyncHandler(
    async (req, res) => {
        const foods = await FoodModel.find();
        res.send(foods);

    })
)

router.get('/search/:searchTerm', expressAsyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i')
        const searchedFoods = await FoodModel.find({ name: { $regex: searchRegex } })
        res.send(searchedFoods);

    }
))
router.get('/tags', expressAsyncHandler(
    async (req, res) => {
        const tags = await FoodModel.aggregate([
            { $unwind: '$tags' },
            {
                $group: {
                    _id: '$tags',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({ count: -1 })
        const all = {
            name: 'all',
            count: await FoodModel.countDocuments()
        }
        tags.unshift(all);
        res.send(tags);

    }))
router.get('/tag/:tagName', expressAsyncHandler(
    async (req, res) => {
        const foodByTag =await FoodModel.find({tags:req.params.tagName})
        res.send(foodByTag);
    
    }
))

router.get('/:foodId', expressAsyncHandler(
        async (req, res) => {
            const foodById = await FoodModel.findById(req.params.foodId);
            res.send(foodById);
            res.send(foodById);
    
        })

)

export default router;