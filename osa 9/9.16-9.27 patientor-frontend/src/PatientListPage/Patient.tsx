import React, { useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state/state';
import dataParsers from '../parsers/dataParsers';

import { Button} from 'semantic-ui-react'
import { addSinglePatientView } from '../state/reducer';
import PatientEntries from './PatientEntries';
import HealthCheckFormModal from '../AddPatientModal/HealthCheckFormModal';
import GenderRender from './GenderRender';
import { EntryFormValues } from '../AddPatientModal/HealthCheckEntryForm';
import { Entry } from '../types';
import HospitalFormModal from '../AddPatientModal/HospitalFormModal';
import OccupationalHealthcareFormModal from '../AddPatientModal/OccupationalHealthcareFormModal';

const SinglePatientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ singlePatient }, dispatch] = useStateValue();
    const [, dispatchDiagnoses] = useStateValue();

    const [healthCheckOpen, sethealthCheckOpen] = React.useState<boolean>(false);
    const [hospitalOpen, sethospitalOpen] = React.useState<boolean>(false);
    const [occupationalHealthcareOpen, setOccupationalHealthcareOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openHealthCheckModal = (): void => sethealthCheckOpen(true);
    const openHospitalModal = (): void => sethospitalOpen(true);
    const openOccupationalHealthcareModal = (): void => setOccupationalHealthcareOpen(true);

    const closeHealthCheckModal = (): void => {
        sethealthCheckOpen(false);
        setError(undefined);
    };

    const closeHospitalModal = (): void => {
        sethospitalOpen(false);
        setError(undefined);
    };

    const closeOccupationalHealthcareModal = (): void => {
        setOccupationalHealthcareOpen(false);
        setError(undefined);
    };

    const submitNewHealthCheckEntry = async (values: EntryFormValues) => {
        try {
          const { data: updatePatient } = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );

          dispatch(addSinglePatientView(updatePatient));
          closeHealthCheckModal();
        } catch (e) {
          console.error(e.response.data);
          setError(e.response.data.error);
        }
    };

    const submitNewHospitalEntry = async (values: EntryFormValues) => {
        try {
          const { data: updatePatient } = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );

          dispatch(addSinglePatientView(updatePatient));
          closeHospitalModal();
        } catch (e) {
          console.error(e.response.data);
          setError(e.response.data.error);
        }
    };

    const submitOccupationalHealthcareEntry = async (values: EntryFormValues) => {
        try {
          const { data: updatePatient } = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );

          dispatch(addSinglePatientView(updatePatient));
          closeOccupationalHealthcareModal();
        } catch (e) {
          console.error(e.response.data);
          setError(e.response.data.error);
        }
    };
      

    useEffect(() => {
        const getPatient = async () => {
            const fetchedPatient = await axios.get(
                `${apiBaseUrl}/patients/${id}`);
    
            const parsedPatient = dataParsers.parsePatient(fetchedPatient.data);  
            dispatch(addSinglePatientView(parsedPatient));
        };

        if (id !== singlePatient.id) {
            getPatient();
        }
    }, [id, dispatch, dispatchDiagnoses, singlePatient.id])

    return (
        <div>
            <h2>
                {singlePatient.name}
                < GenderRender gender={singlePatient.gender}/>
            </h2>
            <div><b>SSN:</b> {singlePatient.ssn}</div>
            <div><b>Occupation:</b> {singlePatient.occupation}</div>
            <br></br>
            <div>
                <h3>Entries:</h3>
                {singlePatient.entries?.map((entry) => 
                    <PatientEntries entry={entry} key={entry.id}/>
                )}  
            </div>
            <br></br>
            <HealthCheckFormModal
                    modalOpen={healthCheckOpen}
                    onSubmit={submitNewHealthCheckEntry}
                    error={error}
                    onClose={closeHealthCheckModal}
                />
            <Button onClick={() => openHealthCheckModal()}>Add New Healthcheck Entry</Button>

            <HospitalFormModal
                    modalOpen={hospitalOpen}
                    onSubmit={submitNewHospitalEntry}
                    error={error}
                    onClose={closeHospitalModal}
                />
            <Button onClick={() => openHospitalModal()}>Add New Hospital Entry</Button>

            <OccupationalHealthcareFormModal
                    modalOpen={occupationalHealthcareOpen}
                    onSubmit={submitOccupationalHealthcareEntry}
                    error={error}
                    onClose={closeOccupationalHealthcareModal}
                />
            <Button onClick={() => openOccupationalHealthcareModal()}>Add New Occupational Healthcare Entry</Button>

        </div>
    )
}

export default SinglePatientPage;