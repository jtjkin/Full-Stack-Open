import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import { EntryFormValues } from "./HealthCheckEntryForm";
import HealthCheckEntryForm from "./HealthCheckEntryForm"

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const HealtchCheckFormModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new patient entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );

export default HealtchCheckFormModal;