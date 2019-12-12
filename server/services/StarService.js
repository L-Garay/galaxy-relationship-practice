import mongoose from "mongoose";
import Star from "../models/Star";
import ApiError from "../utils/ApiError";
import galaxyService from "./GalaxyService";

const _repository = mongoose.model("Star", Star);

class StarService {
  async getStarsByGalaxyId(galaxyId) {
    let data = await _repository.find({ galaxyId: galaxyId });
    return data;
  }

  async getAll() {
    return await _repository.find({}).populate("galaxyId");
  }
  async getById(id) {
    let data = await _repository.findById(id);
    if (!data) {
      throw new ApiError("Invalid ID Star", 400);
    }
    return data;
  }

  async create(galaxyId, rawData) {
    let galaxy = await galaxyService.getById(galaxyId);
    rawData.galaxyId = galaxy._id;
    let data = await _repository.create(rawData);
    return data.populate("galaxyId");
  }

  async edit(id, update) {
    let data = await _repository.findOneAndUpdate({ _id: id }, update, {
      new: true
    });
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
    return data.populate("galaxyId");
  }

  async delete(id) {
    let data = await _repository.findOneAndDelete({ _id: id });
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
  }
}

const starService = new StarService();
export default starService;
