import { calculateExercises } from "./lib/calculate-exercises.ts";

interface CalculateExercisesValues {
  dailyExerciseHours: number[];
  targetAmount: number;
}

const parseArguments = (args: string[]): CalculateExercisesValues => {
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }

  const targetAmount = Number(args[2]);

  if (Number.isNaN(targetAmount) || targetAmount < 0) {
    throw new Error("Target amount must be a positive number!");
  }

  const dailyExerciseHours = args.slice(3).map((v) => Number(v));

  if (dailyExerciseHours.some((v) => Number.isNaN(v) || v < 0)) {
    throw new Error("All daily exercise hours must be a positive number!");
  }

  return {
    dailyExerciseHours,
    targetAmount,
  };
};

try {
  const { dailyExerciseHours, targetAmount } = parseArguments(process.argv);

  const result = calculateExercises(dailyExerciseHours, targetAmount);
  console.log(result);
} catch (error) {
  let errorMessage = "Something bad happened.";

  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }

  console.log(errorMessage);
}
