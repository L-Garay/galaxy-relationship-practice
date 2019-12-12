import express from "express";
import planetService from "../services/PlanetService";

export default class PlanetController {
  constructor() {
    this.router = express
      .Router({ mergeParams: true })
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.

      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/name/:name", this.getByName)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }

  async getAll(req, res, next) {
    try {
      let data = await planetService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let data = await planetService.getById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getByName(req, res, next) {
    try {
      let data = await planetService.getByName(req.body.name);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      let data = await planetService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await planetService.edit(req.params, req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await planetService.delete(req.params.id);
      return res.send("Successfully Deleted");
    } catch (error) {
      next(error);
    }
  }
}
