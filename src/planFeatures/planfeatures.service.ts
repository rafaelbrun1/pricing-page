import { db } from "../utils/db.server";

export type PlanFeature = {
  id: number;
  featureName: string;
  planId: number;
};

export const createPlanFeature = async (
  planFeature: Omit<PlanFeature, "id">
): Promise<PlanFeature> => {
  const { featureName, planId } = planFeature;
  return db.planFeatures.create({
    data: {
      featureName,
      planId,
    },
    select: {
      id: true,
      featureName: true,
      planId: true,
    },
  });
};

export const updatePlanFeature = async (
  planFeature: Omit<PlanFeature, "id">,
  id: number
): Promise<PlanFeature> => {
  const { featureName, planId } = planFeature;
  return db.planFeatures.update({
    where: {
      id,
    },
    data: {
      featureName,
      planId,
    },
    select: {
      id: true,
      featureName: true,
      planId: true,
    },
  });
};

export const deletePlanFeature = async(id: number): Promise<void> => { 
  await db.planFeatures.delete({ 
    where: { 
      id,
    }
  })
}
