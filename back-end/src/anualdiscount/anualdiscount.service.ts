import { db } from "../utils/db.server";

type AnualDiscount = {
  id: number,
  percentual: number;
 }


export const updateAnualDiscount = async (
  AnualDiscount: Omit<AnualDiscount, "id">,
  id: number
): Promise<AnualDiscount> => {
  const { percentual } = AnualDiscount;
  return db.anualDiscount.update({
    where: {
      id,
    },
    data: {
      percentual,
    },
    select: {
      id: true,
      percentual: true,
    },
  });
};

export const listAnualDiscount = async (): Promise<AnualDiscount[]> => {
  return db.anualDiscount.findMany({
    select: {
      id: true,
      percentual: true,
    },
  });
};