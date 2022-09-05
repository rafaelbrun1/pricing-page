import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { planRouter } from "../src/plans/plans.router";
import { planFeaturesRouter } from "../src/planFeatures/planfeatures.router"
import { AnualDiscountRouter } from "../src/anualdiscount/anualdiscount.router"

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/plans", planRouter);
app.use("/api/planfeatures", planFeaturesRouter)
app.use("/api/anualdiscount", AnualDiscountRouter)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
