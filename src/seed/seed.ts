import { encrypt } from "../config/bcrypt";
import { connectDB } from "../config/connection";
import { role_model } from "../model/role";
import { user_model } from "../model/user";
import { roles, users } from "./data";

const seed = async () => {
  try {
    await connectDB();

    //roles
    await Promise.all(
      roles.map(async (role) => {
        await role_model.updateOne(
          { slug: role.slug },
          { $set: role },
          { upsert: true }
        );
      })
    );

    let super_admin = await role_model.findOne({ slug: "super_admin" });
    console.log("super_admin", super_admin);
    //user super-admin
    await Promise.all(
      users.map(async (user) => {
        let newUser: any = user;
        newUser.password= await encrypt(user.password)
        newUser.role_id = super_admin._id;
        let data= await user_model.updateOne(
          { email: user.email },
          { $set: newUser },
          { upsert: true }
        );
        console.log('data',data);
      })
    );

    console.log("seed run completed.");
  } catch (error) {
    console.log("error to run seed", error);
  }
};

seed();
