// src/components/DragonUpdateModal/DragonUpdateModal.tsx
import React, { useState, useEffect } from "react";
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
  const [updatedName, setUpdatedName] = useState("");
  const [updatedType, setUpdatedType] = useState("");
  const [updatedHistories, setUpdatedHistories] = useState<string[]>([]);

  useEffect(() => {
    if (dragon) {
      setUpdatedName(dragon.name);
      setUpdatedType(dragon.type);
      setUpdatedHistories(dragon.histories || []);
    }
  }, [dragon]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${dragon?.id}`,
        {
          name: updatedName,
          type: updatedType,
          histories: updatedHistories,
        }
      );
      onUpdate(response.data);
      onClose(); // Fechar o modal após a atualização
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
        <br />
        <label>
          Type:
          <input
            type="text"
            value={updatedType}
            onChange={(e) => setUpdatedType(e.target.value)}
          />
        </label>
        <br />
        <label>
          Histórico:
          <textarea
            value={
              Array.isArray(updatedHistories) ? updatedHistories.join("\n") : ""
            }
            onChange={(e) => setUpdatedHistories(e.target.value.split("\n"))}
          />
        </label>
        <br />
        <button onClick={handleUpdate}>Atualizar</button>
        <button onClick={onClose}>Fechar</button>
      </UpdateModalContent>
    </Modal>
  );
};

export default DragonUpdateModal;
