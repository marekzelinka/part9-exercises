import express from "express";
import { calculateBmi, calculateExercises } from "./utils.ts";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (Number.isNaN(height) || Number.isNaN(weight)) {
    res.status(400).json({
      error: "malformatted parameters",
    });
    return;
  }

  const result = calculateBmi(height, weight);

  res.json({
    weight,
    height,
    bmi: result,
  });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises: dailyExercises, target } = req.body;

  if (dailyExercises === undefined || target === undefined) {
    res.status(400).json({
      error: "parameters missing",
    });
    return;
  }

  const targetAmount = Number(target);
  if (
    Number.isNaN(targetAmount) ||
    targetAmount < 0 ||
    !Array.isArray(dailyExercises) ||
    dailyExercises.some((v) => Number.isNaN(v) || v < 0)
  ) {
    res.status(400).json({
      error: "malformatted parameters",
    });
    return;
  }

  const dailyExerciseHours = dailyExercises.map((v) => Number(v));
  const result = calculateExercises(dailyExerciseHours, targetAmount);

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`🚀 Server runnning on port ${PORT}`);
});
