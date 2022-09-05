import { useEffect, useState } from "react";
import { Discount } from "./components/Discount";
import { Header } from "./components/Header";
import { PricingPlans } from "./components/PricingPlans";
import { api } from "./libs/axios";

export interface AnualDiscount { 
  id?: number
  percentual: number
}

export function App() {
  function handlechecked() {
    setChecked(!checked);
    return checked;
  }
  
  const [checked, setChecked] = useState(false);
  const [anualDiscount, setDiscount] = useState<AnualDiscount[]>()

  async function getDiscount() { 
    await api.get("api/anualdiscount").then((response) => { 
      setDiscount(response.data)
    })
  }

  useEffect(() => {
    getDiscount()
  }, [])

  return (
    <>
      <Header />
      <div className="w-[100vw] h-[100vh] flex items-center justify-start mt-4 flex-col">
        <Discount handleChecked={handlechecked} check={checked} anualdiscount={anualDiscount!}/>
        <PricingPlans anualdiscount={anualDiscount!} check={checked}/>
      </div>
    </>
  );
}
