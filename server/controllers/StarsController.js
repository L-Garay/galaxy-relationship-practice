import express from "express";
import starService from "../services/StarService";
import planetService from "../services/PlanetService";

export default class StarController {
  constructor() {
    this.router = express
      .Router({ mergeParams: true })
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .get("/name/:name", this.getByName)
      .get("/:id", this.getById)
      .get("/:id/planets", this.getPlanetsByStarId)
      .get("", this.getAll)
      .post("", this.create) //Example: api/galaxyId/stars
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }
  async getAll(req, res, next) {
    try {
      let data = await starService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      let data = await starService.getById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getByName(req, res, next) {
    try {
      let data = await starService.getByName(req.body.name);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getPlanetsByStarId(req, res, next) {
    try {
      let data = await planetService.getPlanetsByStarId(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let data = await starService.create(req.body.galaxyId, req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await starService.edit(req.params.id, req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await starService.delete(req.params.id);
      return res.send("Successfully Deleted");
    } catch (error) {
      next(error);
    }
  }
}
