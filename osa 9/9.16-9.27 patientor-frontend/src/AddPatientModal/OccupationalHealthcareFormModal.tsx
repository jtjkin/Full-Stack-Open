import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import { EntryFormValues } from "./OccupationalHealthcareForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm"

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const OccupationalHealthcareFormModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new patient entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );

export default OccupationalHealthcareFormModal;