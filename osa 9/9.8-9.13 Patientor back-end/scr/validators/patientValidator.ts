import { Gender, Patient } from "../types/types";

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isGender = (value: any): value is Gender => {
    return Object.values(Gender).includes(value);
}

const parseString = (data: any) : string => {

    if(!data || !isString(data)) {
        throw new Error('Incorrect or missing data:' + data);
    }

    return data;
}

const parseGender = (data: any) : Gender => {
    if (!data || !isGender(data)) {
        throw new Error ('Incorrect or missing gender:' + data);
    }

    return data;
}

const initialDataParser = (data: any) : Array<Patient> => {
    data.map((patient: any) => ({
        id: parseString(patient.id),
        name: parseString(patient.name),
        dateOfBirth: parseString(patient.dateOfBirth),
        gender: parseGender(patient.gender),
        occupation: parseString(patient.occupation),
        ssn: parseString(patient.ssn),
        entries: patient.entries
    }));

    return data;
}

export default {
    parseString,
    parseGender,
    initialDataParser
}