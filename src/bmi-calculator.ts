import { calculateBmi } from "./lib/calculate-bmi.ts";

interface CalculateBmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): CalculateBmiValues => {
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  } else if (args.length > 4) {
    throw new Error("Too many arguments");
  }

  const height = Number(args[2]);

  if (Number.isNaN(height) || height < 0) {
    throw new Error("Height must be a positive number!");
  }

  const weight = Number(args[3]);

  if (Number.isNaN(weight) || weight < 0) {
    throw new Error("Weight must be a positive number!");
  }

  return {
    height,
    weight,
  };
};

try {
  const { height, weight } = parseArguments(process.argv);

  const result = calculateBmi(height, weight);
  console.log(result);
} catch (error) {
  let errorMessage = "Something bad happened.";

  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }

  console.log(errorMessage);
}
