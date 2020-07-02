import express from 'express';
import cors from 'cors';
import diagnosesRouter from './scr/routes/diagnosesRouter';
import pingRouter from './scr/routes/pingRouter';
import patientsRouter from './scr/routes/patientsRouter';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});