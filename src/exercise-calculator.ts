type RatingDescription =
	| "very good"
	| "not too bad but could be better"
	| "could be much better";

type Rating = 1 | 2 | 3;

interface Result {
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

function calculateExercises(
	dailyExerciseHours: number[],
	targetAmount: number,
): Result {
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

const result = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
console.log(result);
