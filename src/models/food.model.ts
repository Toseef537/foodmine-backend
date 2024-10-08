import { model, Schema } from "mongoose";

export interface Food{
    id: string;
    name: string;
    price: number;
    tags?: string[];
    favourite?: boolean;
    stars?: number;
    imgUrl: string;
    origins?: string[];
    cookTime: string;  
}
export const foodSchema=new Schema<Food>(
{
    name:{type:String,required:true},
    price:{type:Number,required:true},
    tags:{type:[String]},
    favourite:{type:Boolean},
    stars:{type:Number},
    imgUrl:{type:String,required:true},
    origins:{type:[String]},
    cookTime:{type:String,required:true},



},{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
    timestamps:true
})

export const FoodModel=model<Food>('food',foodSchema)