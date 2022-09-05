import Switch from "react-switch";
import { AnualDiscount } from "../App";

interface ChangeBoolean {
  handleChecked: () => void;
  check: boolean;
  anualdiscount: AnualDiscount[]
}
export function Discount({ handleChecked, check, anualdiscount }: ChangeBoolean) {
  return (
    <div className="flex mt-20 border flex-col items-end gap-5">
      <div className="flex items-center gap-5">
        <span className="md:text-6xl text-2xl">Monthly</span>
        <Switch
          checked={check}
          onChange={() => handleChecked()}
          onColor="#45abcd"
        />
        <span className="md:text-6xl text-2xl">Anually</span>
      </div>
      <div className="flex flex-col gap-1">
      {anualdiscount?.map((discount) => { 
          return (
            <span className="md:text-3xl text-lg text-red-600" key={discount?.id}>{discount.percentual}% discount</span>
          )
        })}
        
      </div>
    </div>
  );
}
