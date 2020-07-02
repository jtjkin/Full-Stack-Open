import React from "react";
import { Entry } from "../types";
import OccupationalHealthCare from "./PatientEntryComponents/OccupationalHealthCare";
import Hospital from "./PatientEntryComponents/Hospital";
import HealthCheck from "./PatientEntryComponents/HealthCheck";

const PatientEntries : React.FC<{entry:Entry}>= ({entry}) => {

    switch (entry.type) {
        case "OccupationalHealthcare":
            return <OccupationalHealthCare entry={entry} />
        case "HealthCheck":
            return <HealthCheck entry={entry} />
        case "Hospital":
            return <Hospital entry={entry} />
        default:
            return null    
    }
}

export default PatientEntries;