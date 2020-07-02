import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res: { send: (arg0: string) => void; }) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        if (req.query.height === undefined || 
            req.query.height === undefined ||
            isNaN(Number(req.query.height)) ||
            isNaN(Number(req.query.weight))) {
            throw new Error('');
        }

        const result = {
            weight: req.query.weight,
            height: req.query.height,
            bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
        };

        res.send(result);
    } catch {
        res.send({error: 'malformatted parameters'});
    }
});

app.get('/exercise-calculator', (req, res) => {

    try { // eslint-disable-next-line @typescript-eslint/no-explicit-any 
        if (req.body.daily_exercises === undefined || req.body.target === undefined) { // eslint-disable-line @typescript-eslint/no-unsafe-member-access
            throw new Error("{error: 'parameters missing'}");
        } // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if(!Array.isArray(req.body.daily_exercises) || isNaN(Number(req.body.target))) { // eslint-disable-line @typescript-eslint/no-unsafe-member-access
            throw new Error("{error: 'malformatted parameters'}");
        } // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = calculateExercises(req.body.daily_exercises, req.body.target); // eslint-disable-line @typescript-eslint/no-unsafe-member-access
        res.send(result);

    } catch ({message}) {
        res.send(message);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});