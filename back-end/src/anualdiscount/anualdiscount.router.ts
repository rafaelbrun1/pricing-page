import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as AnualDiscountService from "../anualdiscount/anualdiscount.service";

export const AnualDiscountRouter = express.Router();



AnualDiscountRouter.put(
  "/:id",
  body("percentual").isNumeric(),
  async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
      const anualDiscount = request.body;
      const updateanualDiscount = await AnualDiscountService.updateAnualDiscount(anualDiscount, id);
      return response.status(200).json(updateanualDiscount);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

AnualDiscountRouter.get("/", async (request: Request, response: Response) => {
  try {
    const plans = await AnualDiscountService.listAnualDiscount();
    return response.status(200).json(plans);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});