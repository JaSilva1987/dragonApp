// src/components/DragonFormModal/DragonFormModal.tsx
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FormContainer, CloseButton, AddButton, SelectInput } from "./styles";

interface DragonFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, type: string, histories: string[]) => void; // Modificado a assinatura da função onSave
}

const DragonFormModal: React.FC<DragonFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [histories, setHistories] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Limpar os campos quando o modal é aberto
      setName("");
      setType("");
      setHistories([]);
    }
  }, [isOpen]);

  const handleSave = () => {
    onSave(name, type, histories);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Dragon"
      overlayClassName="Overlay"
      className="Modal"
    >
      <FormContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Add Dragon</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Type:
            <SelectInput value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Select Type</option>
              <option value="Fire">Fire</option>
              <option value="Ice">Ice</option>
              <option value="Water">Water</option>
              {/* Adicione mais opções conforme necessário */}
            </SelectInput>
          </label>
          <label>
            Histories:
            <textarea
              value={histories.join("\n")}
              onChange={(e) => setHistories(e.target.value.split("\n"))}
            />
          </label>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </form>
      </FormContainer>
    </Modal>
  );
};

export default DragonFormModal;
