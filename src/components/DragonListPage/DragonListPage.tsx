import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  ResponsiveTable,
  FirstColumn,
  SecondColumn,
  ThirdColumn,
  ActionsColumn,
  AddButton,
} from "./styles";
import DragonFormModal from "../DragonFormModal/DragonFormModal";
import DragonDetailsModal from "../DragonDetailsModal/DragonDetailsModal";
import DragonUpdateModal from "../DragonUpdateModal/DragonUpdateModal";

export interface Dragon {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  histories: string[];
}

interface DragonListPageProps {
  onLogout: () => void;
}

const DragonListPage: React.FC<DragonListPageProps> = ({ onLogout }) => {
  const [dragons, setDragons] = useState<Dragon[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDragon, setSelectedDragon] = useState<Dragon | null>(null);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchDragons = async () => {
      try {
        const response = await axios.get(
          "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon"
        );
        setDragons(response.data);
      } catch (error) {
        console.error("Error fetching dragons:", error);
      }
    };

    fetchDragons();
  }, []);

  const handleRemoveDragon = async (dragonId: string) => {
    try {
      await axios.delete(
        `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${dragonId}`
      );
      setDragons((prevDragons) =>
        prevDragons.filter((dragon) => dragon.id !== dragonId)
      );
    } catch (error) {
      console.error("Error removing dragon:", error);
    }
  };

  const handleSaveDragon = async (
    name: string,
    type: string,
    histories: string[]
  ) => {
    try {
      const response = await axios.post(
        "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon",
        {
          name,
          type,
          histories,
          createdAt: new Date().toISOString(),
        }
      );
      setDragons((prevDragons) => [...prevDragons, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving dragon:", error);
    }
  };

  const handleOpenUpdateModal = (dragon: Dragon) => {
    setSelectedDragon(dragon);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateDragon = async (updatedDragon: Dragon) => {
    try {
      await axios.put(
        `http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${updatedDragon.id}`,
        updatedDragon
      );
      setDragons((prevDragons) =>
        prevDragons.map((dragon) =>
          dragon.id === updatedDragon.id ? updatedDragon : dragon
        )
      );
      setIsUpdateModalOpen(false);
      setSelectedDragon(null);
    } catch (error) {
      console.error("Error updating dragon:", error);
    }
  };

  return (
    <Container>
      <h2>Dragon List</h2>
      <DragonFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDragon}
      />
      <ResponsiveTable>
        <thead>
          <tr>
            <FirstColumn>Name</FirstColumn>
            <SecondColumn>Type</SecondColumn>
            <ThirdColumn>Data de Criação</ThirdColumn>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dragons.map((dragon) => (
            <tr key={dragon.id}>
              <td>{dragon.name}</td>
              <td>{dragon.type}</td>
              <td>{new Date(dragon.createdAt).toLocaleString()}</td>
              <ActionsColumn>
                <button onClick={() => setSelectedDragon(dragon)}>
                  Detalhes
                </button>
                <button onClick={() => handleOpenUpdateModal(dragon)}>
                  Atualizar
                </button>
                <button onClick={() => handleRemoveDragon(dragon.id)}>
                  Remove
                </button>
              </ActionsColumn>
            </tr>
          ))}
        </tbody>
      </ResponsiveTable>
      <AddButton onClick={() => setIsModalOpen(true)}>Add Dragon</AddButton>

      <DragonDetailsModal
        isOpen={!!selectedDragon}
        dragon={selectedDragon}
        onClose={() => setSelectedDragon(null)}
      />

      {selectedDragon && (
        <DragonUpdateModal
          isOpen={isUpdateModalOpen}
          dragon={selectedDragon}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedDragon(null);
          }}
          onUpdate={handleUpdateDragon}
        />
      )}
    </Container>
  );
};

export default DragonListPage;
