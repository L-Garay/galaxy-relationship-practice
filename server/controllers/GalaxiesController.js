import express from "express";
import galaxyService from "../services/GalaxyService";
import starService from "../services/StarService";
import planetService from "../services/PlanetService";

export default class GalaxyController {
  constructor() {
    this.router = express
      .Router()
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .get("", this.getAll) //Example: api/galaxies
      .get("/:id", this.getById)
      .get("/name/:name", this.getByName)
      .get("/:id/stars", this.getStarsByGalaxyId) //Example: api/galaxies/:id/stars
      .get("/:id/planets", this.getPlanetsByGalaxyId)
      .post("", this.create) //Example: api/galaxies
      .put("/:id", this.edit) //Example: api/galaxies/l1k23l12kn4l12k412l3kn
      .delete("/:id", this.delete); //Example: api/galaxies/l1k23l12kn4l12k412l3kn
  }
  async getAll(req, res, next) {
    try {
      let data = await galaxyService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let data = await galaxyService.getById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getByName(req, res, next) {
    try {
      let data = await galaxyService.getByName(req.params.name);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getStarsByGalaxyId(req, res, next) {
    try {
      let data = await starService.getStarsByGalaxyId(req.body.galaxyId);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getPlanetsByGalaxyId(req, res, next) {
    try {
      let data = await planetService.getPlanetsByGalaxyId(req.body.galaxyId);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let data = await galaxyService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await galaxyService.edit(req.params.id, req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await galaxyService.delete(req.params.id);
      return res.send("Successfully Deleted");
    } catch (error) {
      next(error);
    }
  }
}
