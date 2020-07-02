import { Patient, Gender} from '../types'

const parseGender = (data: any) : Gender => {
    return data;
}

const parsePatient = (data: any) : Patient => {

    const newPatient = {
        id: data.id,
        name: data.name,
        occupation: data.occupation,
        gender: parseGender(data.gender),
        ssn: data.ssn,
        entries: data.entries
    }

    return newPatient
}    

export default { parseGender, parsePatient }