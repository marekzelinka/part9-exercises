import express from "express";
import { calculateBmi } from "./utils.ts";

const app = express();
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

app.listen(PORT, () => {
	console.log(`🚀 Server runnning on port ${PORT}`);
});
