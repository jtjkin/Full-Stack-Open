import express from 'express';
import  patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {

    res.send(patientsService.getPatientsWithoutSSN());
});

router.get('/:id', (req, res) => {
    const newPatient = patientsService.getPatientById(req.params.id);

    if(newPatient === undefined) {
        res.status(404).send('Patient not found.')
    }

    res.send(newPatient);
});

router.post('/', (req, res) => {
    try {
        const patient = req.body;
        const newPatientEntry = patientsService.addPatient(patient);
    
        res.json(newPatientEntry); 
    } catch (e) {
        res.status(404).send(e.message);
    }    
});

router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = patientsService.addPatientEntry(req);
        res.send(newEntry);
    } catch (e) {
        res.status(404).send(e.message);
    }
    
})

export default router;