import React from "react";
import Modal from "react-modal";
import { Dragon } from "../DragonListPage/DragonListPage";
import { modalStyle } from "./styles";

interface DragonDetailsModalProps {
  isOpen: boolean;
  dragon: Dragon | null;
  onClose: () => void;
}

const DragonDetailsModal: React.FC<DragonDetailsModalProps> = ({
  isOpen,
  dragon,
  onClose,
}) => {
  if (!dragon) {
    return null;
  }

  const histories = Array.isArray(dragon.histories) ? dragon.histories : [];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: modalStyle.content,
      }}
    >
      <div>
        <button onClick={onClose} style={{ float: "right" }}>
          Fechar
        </button>
        <h3>Detalhes do Dragão</h3>
        <p>Name: {dragon.name}</p>
        <p>Type: {dragon.type}</p>
        <p>Data de Criação: {new Date(dragon.createdAt).toLocaleString()}</p>
        <h4>Histórico:</h4>
        {histories.length > 0 ? (
          histories.map((history, index) => <p key={index}>{history}</p>)
        ) : (
          <p>Sem histórico disponível.</p>
        )}
      </div>
    </Modal>
  );
};

export default DragonDetailsModal;
