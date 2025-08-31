type CalculateBmiResult =
  | "Underweight (Severe thinness)"
  | "Underweight (Moderate thinness)"
  | "Underweight (Mild thinness)"
  | "Normal range"
  | "Overweight (Pre-obese)"
  | "Obese (Class I)"
  | "Obese (Class II)"
  | "Obese (Class III)";

/**
 * @param height height in centimeters
 * @param weight weight in centimeters
 */
export function calculateBmi(
  height: number,
  weight: number,
): CalculateBmiResult {
  const bmi = weight / (height / 100) ** 2;

  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (bmi >= 16 && bmi < 17) {
    return "Underweight (Moderate thinness)";
  } else if (bmi >= 17 && bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal range";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight (Pre-obese)";
  } else if (bmi >= 30 && bmi < 35) {
    return "Obese (Class I)";
  } else if (bmi >= 35 && bmi < 40) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
}

type RatingDescription =
  | "very good"
  | "not too bad but could be better"
  | "could be much better";

type Rating = 1 | 2 | 3;

interface CalculateExercisesResult {
  /** the number of days */
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
  /** the original target value */
  target: number;
  /** the calculated average time */
  average: number;
}

export function calculateExercises(
  dailyExerciseHours: number[],
  targetAmount: number,
): CalculateExercisesResult {
  const trainingExerciseHours = dailyExerciseHours.filter((v) => v > 0);
  const averageTime =
    trainingExerciseHours.reduce((sum, v) => sum + v, 0) /
    dailyExerciseHours.length;
  const rating =
    averageTime > targetAmount
      ? 3
      : averageTime < targetAmount && averageTime > targetAmount * 0.75
        ? 2
        : 1;
  const ratingDescription =
    rating === 3
      ? "very good"
      : rating === 2
        ? "not too bad but could be better"
        : "could be much better";

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: trainingExerciseHours.length,
    success: dailyExerciseHours.every((v) => v > targetAmount),
    rating,
    ratingDescription,
    target: targetAmount,
    average: averageTime,
  };
}
