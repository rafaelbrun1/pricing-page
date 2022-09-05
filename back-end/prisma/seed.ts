import { db } from "../src/utils/db.server";

type Plan = {
  plan_name: string;
  price: number;
};

type PlanFeatures = {
  featureName: string;
  planId: number;
};

type AnualDiscount = { 
  percentual: number;
}

async function seed() {
  await Promise.all(
    getPlan().map((plan) => {
      return db.plan.create({
        data: {
          plan_name: plan.plan_name,
          price: plan.price,
        },
      });
    })
  );
  const plan = await db.plan.findFirst({
    where: {
      plan_name: "Free",
    },
  });

  await Promise.all(
    getPlanFeatures().map((feature) => {
      const { featureName, planId } = feature;
      return db.planFeatures.create({
        data: {
          featureName,
          planId,
        },
      });
    })
  );
}

seed();

function getPlan(): Array<Plan> {
  return [
    {
      plan_name: "Plus",
      price: 10,
    },
    {
      plan_name: "Free",
      price: 0,
    },
    {
      plan_name: "Pro",
      price: 50,
    },
  ];
}

function getPlanFeatures(): Array<PlanFeatures> {
  return [
    {
      featureName: "2 repositories",
      planId: 1,
    },
    {
      featureName: "10 repositories",
      planId: 2,
    },
    {
      featureName: "Unlimited Repositories",
      planId: 3,
    },
  ];
}
