import React from "react";
import Modal from "react-modal";
import { FormContainer, CloseButton } from "../DragonFormModal/styles";

interface DragonDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dragon: {
    name: string;
    type: string;
    createdAt: string;
    histories: string[];
  } | null;
}

const DragonDetailsModal: React.FC<DragonDetailsModalProps> = ({
  isOpen,
  onClose,
  dragon,
}) => {
  if (!dragon) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Dragon Details"
      overlayClassName="Overlay"
      className="Modal"
    >
      <FormContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Dragon Details</h2>
        <p>
          <strong>Name:</strong> {dragon.name}
        </p>
        <p>
          <strong>Type:</strong> {dragon.type}
        </p>
        <p>
          <strong>Data de Criação:</strong>{" "}
          {new Date(dragon.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Histories:</strong>
        </p>
        <ul>
          {dragon.histories.map((history, index) => (
            <li key={index}>{history}</li>
          ))}
        </ul>
      </FormContainer>
    </Modal>
  );
};

export default DragonDetailsModal;
