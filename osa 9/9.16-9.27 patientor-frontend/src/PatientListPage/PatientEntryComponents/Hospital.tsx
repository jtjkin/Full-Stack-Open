import React from 'react';
import { HospitalEntry } from '../../types';
import { useStateValue } from '../../state';
import { Segment, Icon } from 'semantic-ui-react';

const Hospital: React.FC<{entry: HospitalEntry}> = ({entry}) => {
    const [{ diagnoses }] = useStateValue();
    
    return (
    <Segment key={entry.id}>
        <h3>
            {entry.date}{" "}
            <Icon name="hospital" />{" "}
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
            <b>Discharged:</b>{" "}
            <i>
                {entry.discharge === undefined ? 
                    null : entry.discharge.date}
            </i>
            {entry.discharge === undefined 
                ? null
                : <ul>
                    <li>{entry.discharge.criteria}</li>
                 </ul>
            }
        </div>
    </Segment>)
}

export default Hospital;