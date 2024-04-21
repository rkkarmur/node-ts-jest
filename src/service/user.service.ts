import { user_model } from "../model/user";
import { generateCommonQuery } from "./common";
export const USER= generateCommonQuery(user_model)
export const forLogin=async (email:string)=>{
return await user_model.findOne({email,status:1})
}
