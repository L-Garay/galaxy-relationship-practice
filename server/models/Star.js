import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Star = new Schema(
  {
    name: { type: String, required: true, maxlength: 20 },
    size: { type: Number, required: true },
    age: { type: Number, required: true },
    galaxyId: { type: ObjectId, ref: "Galaxy", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Star;
