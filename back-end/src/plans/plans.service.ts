import { db } from "../utils/db.server";
import type { PlanFeature } from "../planFeatures/planfeatures.service";
export type Plan = {
  id: number;
  plan_name: string;
  price: number;
  PlanFeatures?: PlanFeature[];
};

export const listPlansWithPlanFeatures = async (): Promise<Plan[]> => {
  return db.plan.findMany({
    select: {
      id: true,
      plan_name: true,
      price: true,
      PlanFeatures: {
        select: {
          id: true,
          featureName: true,
          planId: true,
        },
      },
    },
  });
};

export const createPlan = async (plan: Omit<Plan, "id">): Promise<Plan> => {
  const { plan_name, price } = plan;
  return db.plan.create({
    data: {
      plan_name,
      price,
    },
    select: {
      id: true,
      plan_name: true,
      price: true,
    },
  });
};

export const updatePlan = async (
  plan: Omit<Plan, "id">,
  id: number
): Promise<Plan> => {
  const { plan_name, price } = plan;
  return db.plan.update({
    where: {
      id,
    },
    data: {
      plan_name,
      price,
    },
    select: {
      id: true,
      plan_name: true,
      price: true,
    },
  });
};

export const deletePlan = async (id: number): Promise<void> => {
  await db.plan.delete({
    where: {
      id,
    },
  });
};
