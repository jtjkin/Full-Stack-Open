import express from 'express';
import bodyParser from 'body-parser';

const bmi = express(); 
bmi.use(bodyParser.urlencoded({extended: false}));
bmi.use(bodyParser.json());


export const calculateBmi = (height: number, weight: number) : string => {
    if (isNaN(Number(height)) || isNaN(Number(weight)) ) {
        throw new Error('Values must be numbers.');
    }

    const bmi = weight / Math.pow(height/100, 2);

    let message = '';

    if (bmi < 15) {
        message = 'Very severely underweight';
    }

    if (bmi >= 15 && bmi < 16) {
        message = 'Severely underweight';
    }

    if (bmi >= 16 && bmi < 18.5) {
        message = 'Underweight';
    }

    if (bmi >= 18.5 && bmi < 25) {
        message = 'Normal (healthy weight)';
    }
    
    if (bmi >= 25 && bmi < 30) {
        message = 'Overweight';
    }

    if (bmi >= 30 && bmi < 35) {
        message = 'Obese Class I (Moderately obese)';
    }

    if (bmi >= 35 && bmi < 40) {
        message = 'Obese Class II (Severely obese)';
    }

    if (bmi >= 40) {
        message = 'Obese Class III (Very severely obese)';
    }

    return message;
};


const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);
try {
    console.log(calculateBmi(height, weight));
} catch ({message}) {
    console.log('Error happened: ', message);
}