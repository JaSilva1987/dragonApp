import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Dragon } from "../DragonListPage/DragonListPage";
import { UpdateModalContent } from "./styles";

interface DragonUpdateModalProps {
  isOpen: boolean;
  dragon: Dragon | null;
  onClose: () => void;
  onUpdate: (updatedDragon: Dragon) => void;
}

const DragonUpdateModal: React.FC<DragonUpdateModalProps> = ({
  isOpen,
  dragon,
  onClose,
  onUpdate,
}) => {
  const [updatedName, setUpdatedName] = useState(dragon?.name || "");
  const [updatedType, setUpdatedType] = useState(dragon?.type || "");

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${dragon?.id}`,
        {
          name: updatedName,
          type: updatedType,
        }
      );
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating dragon:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <UpdateModalContent>
        <h3>Atualizar Registro</h3>
        <label>
          Name:
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            value={updatedType}
            onChange={(e) => setUpdatedType(e.target.value)}
          />
        </label>
        <button onClick={handleUpdate}>Atualizar</button>
        <button onClick={onClose}>Fechar</button>
      </UpdateModalContent>
    </Modal>
  );
};

export default DragonUpdateModal;
