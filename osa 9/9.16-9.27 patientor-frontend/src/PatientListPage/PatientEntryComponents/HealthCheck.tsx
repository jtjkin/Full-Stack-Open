import React from 'react';
import { HealthCheckEntry } from '../../types';
import { Segment, Icon } from 'semantic-ui-react';
import { useStateValue } from '../../state';

const HealthCheck: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
    const [{ diagnoses }] = useStateValue();
    
    const healtbarPrinter = () => {
        if (entry.healthCheckRating === 3) {
            return null;
        } 

        if (entry.healthCheckRating === 2) {
            return (
                <span>
                <Icon name="plus square" />
                </span> 
            );
        }

        if (entry.healthCheckRating === 1) {
            return (
                <span>
                <Icon name="plus square" />
                <Icon name="plus square" /> 
                </span> 
            );
        }

        if (entry.healthCheckRating === 0) {
            return (
                <span>
                <Icon name="plus square" />
                <Icon name="plus square" /> 
                <Icon name="plus square" /> 
                </span> 
            );
        }
    }

    return (
        <Segment key={entry.id}>
            <h3>
                {entry.date}{" "}
                <Icon name="user md" />{" "}
            </h3>
            <i>{entry.description}</i>
            <ul>
                {entry.diagnosisCodes?.map((diagnose) => (
                    <li key={diagnose}>
                        {diagnose} {diagnoses.find(value => value.code === diagnose)?.name}
                    </li>
                ))}
            </ul>
            <h4>Health rating: {healtbarPrinter()}</h4>
        </Segment>)
}

export default HealthCheck;