import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnose } from "../types";

import { Action } from "./reducer";
import  dataParser  from "../parsers/dataParsers"

export type State = {
  patients: { [id: string]: Patient };
  singlePatient: Patient;
  diagnoses: Diagnose[];
};

const initialState: State = {
  patients: {},
  singlePatient: {
    id: "",
    name: "",
    occupation: "",
    gender: dataParser.parseGender("other"),
  },
  diagnoses: []
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
