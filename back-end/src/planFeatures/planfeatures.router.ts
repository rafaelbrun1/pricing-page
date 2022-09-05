import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as PlanFeaturesService from "./planfeatures.service";

export const planFeaturesRouter = express.Router();

planFeaturesRouter.post(
  "/",
  body("featureName").isString(),
  body("planId").isNumeric(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const planfeature = request.body;
      const newplanfeature = await PlanFeaturesService.createPlanFeature(
        planfeature
      );
      return response.status(201).json(newplanfeature);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

planFeaturesRouter.put(
  "/:id",
  body("featureName").isString(),
  body("planId").isNumeric(),
  async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
      const updateFeature = request.body;
      const updatedFeature = await PlanFeaturesService.updatePlanFeature(
        updateFeature,
        id
      );
      return response.status(200).json(updatedFeature);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

planFeaturesRouter.delete(
  "/:id",
  async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
      await PlanFeaturesService.deletePlanFeature(id);
      return response.status(204).json({"Message": "Feature has been successfuly deleted"});
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
