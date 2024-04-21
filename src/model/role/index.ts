import mongoose  from "mongoose";
const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    slug: {
      required: true,
      type: String,
      unique: true
  },
    status: {
        required: true,
        type: Number,
        default:1
    },
    created_at: { type: Date, required: true, default: new Date().toISOString(), },
    update_at: { type: Date, required: true, default: new Date().toISOString(), },

})

const role_model=mongoose.models.role||mongoose.model('role', dataSchema)
export {role_model}
