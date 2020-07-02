type ExerciseResult = {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
};

export const calculateExercises = (
    exerciseHours: Array<number>, 
    target: number): 

    ExerciseResult => {


    //Number of total days
    const numberofDays = exerciseHours.length;

    //Number of days excercised
    const exerciseDays = exerciseHours.filter(hours => hours > 0);
    const numberOfExcerciseDays = exerciseDays.length;

    //average training hours per day
    const sum = exerciseHours.reduce((a, b) => a + b); 
    const average = sum / numberofDays;

    /*
     * return
     * 
     * (boolean) succesfull: was the target met
     * (string) message: rating description 
     * (number) rating: scale 1-3 where: 
     *      3 -> over target, 
     *      2 -> over target - 1, 
     *      1 -> less 
     */

    let succesfull;
    let message;
    let rating;

    if (average >= target) {
        succesfull = true;
        message = 'You did it!';
        rating = 3;
    } else if (average >= target - 1 && average < target) {
        succesfull = false;
        message = 'Not too bad but could be better';
        rating = 2;
    } else {
        succesfull = false;
        message = "Slacking, haven't we? Well, next time you'll do better.";
        rating = 1;
    }

    const result = {
        periodLength: numberofDays,
        trainingDays: numberOfExcerciseDays,
        success: succesfull,
        rating: rating,
        ratingDescription: message,
        target: target,
        average: average
    };

    return result;
};

const target = Number(process.argv[2]);
const array: Array<number> = [];

try {
    if (isNaN(Number(process.argv[2]))) {
        throw new Error('target must be a number.');
    }

    for (let i = 3; i < process.argv.length; i++) {
        if (isNaN(Number(process.argv[i]))) {
            throw new Error('days must contain numbers only.');
        }

        array.push(Number(process.argv[i]));
    }

    console.log(calculateExercises(array, target));
} catch ({message}) {
    console.log('Error happened: ', message);
}