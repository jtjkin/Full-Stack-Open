import { State } from "./state";
import { Patient, Diagnose } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_SINGLE_PATIENT_VIEW";
      payload: Patient;
  }
  | {
      type: "ADD_ALL_DIAGNOSES";
      payload: Diagnose[];
  }
  | {
      type: "UPDATE_PATIENT_LIST";
      payload: Patient;
  }
  
export const setPatientList = (payload: any) : Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload
  }
}

export const addPatient = (payload: any) : Action => {
  return {
    type: "ADD_PATIENT",
    payload
  }
}

export const addSinglePatientView = (payload: any) : Action => {
  return {
    type: "ADD_SINGLE_PATIENT_VIEW",
    payload
  }
}

export const setAllDiagnoses = (payload: any) : Action => {
  return {
    type: "ADD_ALL_DIAGNOSES",
    payload
  }
}

export const updatePatientList = (payload: any) : Action => {
  return {
    type: "UPDATE_PATIENT_LIST",
    payload
  }
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_SINGLE_PATIENT_VIEW": 
      return {
        ...state,
        singlePatient : action.payload
      };
    case "ADD_ALL_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload
      };
    case "UPDATE_PATIENT_LIST":
      return {
        ...state,
        [action.payload.id]: action.payload
      };      
    default:
      return state;
  }
};
