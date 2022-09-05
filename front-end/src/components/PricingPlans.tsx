import { useEffect, useState } from "react";
import { api } from "../libs/axios";
import { AnualDiscount } from "../App";

interface Discount {
  anualdiscount: AnualDiscount[];
  check: boolean;
}

export interface PlanFeatures {
  id: number;
  featureName: string;
  planId: number;
}

export interface Plans {
  id: number;
  plan_name: String;
  price: number;
  PlanFeatures: PlanFeatures[];
}

export function PricingPlans({ anualdiscount, check }: Discount) {
  const [plans, setPlans] = useState<Plans[]>();

  const discount = anualdiscount?.map((discount) => {
    return discount.percentual;
  });

  async function fetchData() {
    try {
      await api.get("api/plans").then((response) => {
        setPlans(response.data);
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="mt-10 gap-9 flex flex-wrap items-center justify-center">
      {plans?.map((plan) => {
        const percentdiscount =
          plan.price - (Number(discount) / 100) * plan.price;
        return (
          
          <div
            className={plan.plan_name === 'Plus' ? "h-[30rem] bg-yellow-50 border w-80 flex flex-col justify-between items-center p-8 rounded-md shadow-2xl shadow-gray-700" : "h-96 border w-80 flex flex-col justify-between items-center p-8 rounded-md shadow-2xl shadow-gray-700"}
            key={plan.id}
          >
            <strong className="text-2xl"> {plan.plan_name}</strong>
            {check === true && plan.price !== 0 ? (
              <>
                <span className="text-xl line-through text-red-500">
                  {plan.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                <span className="text-4xl text-green-600">
                  {percentdiscount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </>
            ) : (
              <>
                <span className="text-4xl text-green-600">
                  {plan.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </>
            )}
            <div className="flex flex-col ">
              {plan.PlanFeatures.map((feature) => {
                return (
                  <span className="text-xl" key={feature.id}>
                    {feature.featureName}
                  </span>
                );
              })}
            </div>
            <button className="border border-transparent w-full bg-violet-600 text-white rounded-md h-10 hover:bg-violet-700">
              {" "}
              {plan.plan_name === "Free" ? (
                <span className="text-xl"> Try it now </span>
              ) : (
                <span className="text-xl"> Get Started </span>
              )}
            </button>
          </div>
            );
      })}
    </div>
);
}
