import mongoose from "mongoose";
import Planet from "../models/Planet";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Planet", Planet);

class PlanetService {
  async getAll() {
    return await _repository.find({}).populate("galaxyId", "starId");
  }
  async getById(id) {
    let data = await _repository.findById(id);
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
    return data;
  }

  async create(rawData) {
    let data = await _repository.create(rawData);
    return data.populate("galaxyId", "starId");
  }

  async edit(id, update) {
    let data = await _repository.findOneAndUpdate({ _id: id }, update, {
      new: true
    });
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
    return data.populate("galaxyId", "starId");
  }

  async delete(id) {
    let data = await _repository.findOneAndDelete({ _id: id });
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
  }
}

const planetService = new PlanetService();
export default planetService;
