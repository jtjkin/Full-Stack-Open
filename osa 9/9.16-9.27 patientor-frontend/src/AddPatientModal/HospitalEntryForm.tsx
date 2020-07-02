import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, TypeOption, DiagnosisSelection, SelectTypeField } from "./FormField";
import { Entry, Type } from '../types';
import { useStateValue } from '../state';

export type EntryFormValues = Omit<Entry, "id" | "date">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
  }

const typeOption: TypeOption = 
    { value: Type.Hospital, label: "Hospital" };  

export const HospitalForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    return (
      <Formik
        initialValues={{
          specialist: "",
          description: "",
          type: Type.Hospital,
          diagnosisCodes: undefined,
          dischargeDate: "",
          dischargeCriteria: ""
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              <SelectTypeField
                label="Entry type"
                name="type"
                option={typeOption}
              />   
              <Field
                label="Specialist *"
                placeholder="specialist"
                name="specialist"
                component={TextField}
              />
              <Field
                label="Description *"
                placeholder="description"
                name="description"
                component={TextField}
              />
              <Field
                label="Discharge date"
                placeholder="yyyy-mm-dd"
                name="dischargeDate"
                component={TextField}
              />
              <Field
                label="Discharge criteria"
                placeholder="discharge criteria"
                name="dischargeCriteria"
                component={TextField}
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
              <div>* Field is required</div>
              <br></br>
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    );
  };
  
  export default HospitalForm;