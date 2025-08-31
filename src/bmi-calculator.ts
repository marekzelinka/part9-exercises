import * as z from "zod";
import { calculateBmi } from "./utils.ts";

const ArgSchema = z.tuple([
	z.any(),
	z.any(),
	z.coerce.number().positive(),
	z.coerce.number().positive(),
]);

try {
	const [, , height, weight] = ArgSchema.parse(process.argv);
	const result = calculateBmi(height, weight);
	console.log(result);
} catch (error) {
	const errorMessage = error instanceof Error ? error.message : "Unknown";
	console.error(`Something bad happened. Error: ${errorMessage}`);
}
