import patientData from '../../data/patients';
import { Patient, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types/types';
import patientValidator from '../validators/patientValidator';

const patients: Array<Patient> = 
    patientValidator.initialDataParser(patientData);

const createId = (): string => {
    const random = Math.floor(Math.random() * 1000);
    const newid = `d2773${random}-f723-11e9-8f0b-362b9e155667`;
    return newid;
};

const createDate = (): string => {
    /*
    *   Shameless copy-paste (credit: Samuel Meddows)
    *   https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    */
    const today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    
    const date = yyyy + '-' + mm + '-' + dd;
    return date;
}

const getPatients = (): Array<Patient> => {
    return patients;
};

const getPatientsWithoutSSN = (): Omit<Patient, 'ssn'>[] => {
    return patients.map((patient) => ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
    }));
};

const addPatient = (patient: any) : Patient | undefined => {
    const newPatient = {
        id: createId(),
        name: patientValidator.parseString(patient.name),
        dateOfBirth: patientValidator.parseString(patient.dateOfBirth),
        gender: patientValidator.parseGender(patient.gender),
        occupation: patientValidator.parseString(patient.occupation),
        ssn: patientValidator.parseString(patient.ssn),
        entries: []
    };
    
    patients.push(newPatient);
    return newPatient;
}

const getPatientById = (id : string) : Patient | undefined => {
    const foundPatient = patients.find(patient => id === patient.id);

    if (foundPatient === undefined) {
        return undefined;
    }

    return foundPatient;
}

const updatePatientList = (patient : Patient) : void => {
    patients.map(p => p.id === patient.id ? patient : p);
}

const addPatientEntry = (req: any) : Patient | undefined => {
    const patient = getPatientById(req.params.id);

    if(patient === undefined) {
        throw new Error("Patient not found.")
    }

    if (req.body.description === undefined ||
        req.body.specialist === undefined ||
        req.body.type === undefined) {
            throw new Error("Some required fields are missing");
    }

    if (req.body.type === "HealthCheck" &&
        req.body.healthCheckRating === undefined ) {
            throw new Error("Field: 'Health check rating' is missing");
        }

    const newEntry : any = {
        id: createId(),
        description: req.body.description,
        date: createDate(),
        specialist: req.body.specialist,
        type: req.body.type
    }

    if (req.body.diagnosisCodes !== undefined) {
        let array: string[] = []
        req.body.diagnosisCodes.forEach((code : string) => array.push(code));
        newEntry.diagnosisCodes = array;
    }

    if (req.body.dischargeDate !== "" || 
        req.body.dischargeCriteria !== "") {
            let discharge = {
                date: undefined,
                criteria: undefined
            };

            if (req.body.dischargeDate !== "") {
                discharge.date = req.body.dischargeDate;
            }

            if (req.body.dischargeCriteria !== "") {
                discharge.criteria = req.body.dischargeCriteria;
            }
            newEntry.discharge = discharge;
    }

    if (req.body.type === "HealthCheck" && 
        req.body.healthCheckRating !== undefined) {
            newEntry.healthCheckRating = req.body.healthCheckRating;
    }

    if (req.body.employerName !== undefined) {
        newEntry.employerName = req.body.employerName;
    }

    if (req.body.sickLeaveStartDate !== "" ||
        req.body.sickLeaveEndDate !== "") {
            let sickLeave = {
                startDate: undefined,
                endDate: undefined
            }

            if (req.body.sickLeaveStartDate !== "") {
                sickLeave.startDate = req.body.sickLeaveStartDate;
            }

            if (req.body.sickLeaveEndDate !== "") {
                sickLeave.endDate = req.body.sickLeaveEndDate;
            }

            newEntry.sickLeave = sickLeave;
    }

    if (newEntry.type === "HealthCheck") {
        const finalEntry : HealthCheckEntry = newEntry;
        patient.entries?.push(finalEntry);
        updatePatientList(patient);
        return patient;
    }

    if (newEntry.type === "Hospital") {
        const finalEntry : HospitalEntry = newEntry;
        patient.entries?.push(finalEntry);
        updatePatientList(patient);
        return patient;
    }

    if (newEntry.type === "OccupationalHealthcare") {
        const finalEntry : OccupationalHealthcareEntry = newEntry;
        patient.entries?.push(finalEntry);
        updatePatientList(patient);
        return patient;
    }

    return undefined;
}
 
export default {
    getPatients,
    getPatientsWithoutSSN,
    addPatient,
    getPatientById,
    addPatientEntry
};