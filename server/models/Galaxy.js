import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Galaxy = new Schema(
  {
    name: { type: String, required: true },
    size: { type: Number, required: true },
    age: { type: Number, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Galaxy;
