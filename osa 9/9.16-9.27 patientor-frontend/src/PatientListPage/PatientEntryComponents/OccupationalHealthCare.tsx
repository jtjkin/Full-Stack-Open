import React from "react";
import { OccupationalHealthcareEntry } from "../../types";
import { Segment, Icon } from "semantic-ui-react";
import { useStateValue } from "../../state";

const OccupationalHealthCare : React.FC<{entry: OccupationalHealthcareEntry}>= ({entry}) => {
    const [{ diagnoses }] = useStateValue();

    return (
    <Segment key={entry.id}>
        <h3>
            {entry.date}{" "}
            <Icon name="stethoscope" />{" "}
            {entry.employerName}
        </h3>
        <i>{entry.description}</i>
        <ul>
            {entry.diagnosisCodes?.map((diagnose) => (
                <li key={diagnose}>
                    {diagnose} {diagnoses.find(value => value.code === diagnose)?.name}
                </li>
            ))}
        </ul>
        <div>
            <b>Sick leave granted: </b>
            {entry.sickLeave === undefined ? "No" : "Yes" }
            {entry.sickLeave === undefined ? null : 
                <ul>
                    <li>Start date: {entry.sickLeave.startDate}</li>
                    <li>End date: {entry.sickLeave.endDate}</li>
                </ul>
            }    
        </div>
    </Segment>)
}

export default OccupationalHealthCare;