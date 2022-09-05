import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as PlansService from "../plans/plans.service";

export const planRouter = express.Router();

planRouter.get("/", async (request: Request, response: Response) => {
  try {
    const plans = await PlansService.listPlansWithPlanFeatures();
    return response.status(200).json(plans);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

planRouter.post(
  "/",
  body("plan_name").isString(),
  body("price").isNumeric(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    
    try {
      const plan = request.body;
      const newPlan = await PlansService.createPlan(plan);
      return response.status(201).json(newPlan);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

planRouter.delete("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    await PlansService.deletePlan(parseInt(id));
    return response.status(204).json({"Message": "Plan has been successfuly deleted"});
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

planRouter.put(
  "/:id",
  body("plan_name").isString(),
  body("price").isNumeric(),
  async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
      const plan = request.body;
      const updatePlan = await PlansService.updatePlan(plan, id);
      return response.status(200).json(updatePlan);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
