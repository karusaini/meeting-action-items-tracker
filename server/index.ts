import "dotenv/config";
import express from "express";
import cors from "cors";
import { actionsHandler } from "../src/api/actions.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/actions", actionsHandler);
app.get("/api/actions", actionsHandler);

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
