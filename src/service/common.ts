import mongoose from "mongoose";
export const generateCommonQuery = (_instance: mongoose.Model<any>) => {
  return {

    async findOne(where: any) {
      return await _instance.findOne(where);
    },
    async updateOne(where: any,data:any) {
      return await _instance.updateOne(where,{$set:data});
    },

    async create(obj: any) {
      return await _instance.create(obj);
    },

  };
};




// import mongoose, { Document, Model, FilterQuery, UpdateQuery } from "mongoose";

// type ModelType<T extends Document> = Model<T>;

// // type CommonQuery<T extends Document> = {
// //   findOne(where: FilterQuery<T>): Promise<T | null>;
// //   updateOne(where: FilterQuery<T>, data: UpdateQuery<T>): Promise<void>;
// //   create(obj: Partial<T>): Promise<T>;
// // };

// export const generateCommonQuery = <T extends Document>(
//   _instance: ModelType<T>
// ) => {
//   return {
//     async findOne(where: FilterQuery<T>): Promise<T | null> {
//       return await _instance.findOne(where);
//     },
//     async updateOne(where: FilterQuery<T>, data: UpdateQuery<T>): Promise<void> {
//       await _instance.updateOne(where, { $set: data });
//     },
//     async create(obj: Partial<T>): Promise<T> {
//       return await _instance.create(obj);
//     },
//   };
// };
