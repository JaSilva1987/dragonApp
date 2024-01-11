// src/components/DragonListPage/DragonListPage.tsx
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

interface Dragon {
  id: string;
  name: string;
  type: string;
  createdAt: string; // Adicionado o campo createdAt
  histories: string[]; // Modificado o campo histories para um array
}

const DragonListPage: React.FC = () => {
  const [dragons, setDragons] = useState<Dragon[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          createdAt: new Date().toISOString(), // Adicionando a data de criação atual
        }
      );
      setDragons((prevDragons) => [...prevDragons, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving dragon:", error);
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
                <button onClick={() => handleRemoveDragon(dragon.id)}>
                  Remove
                </button>
              </ActionsColumn>
            </tr>
          ))}
        </tbody>
      </ResponsiveTable>
      <AddButton onClick={() => setIsModalOpen(true)}>Add Dragon</AddButton>
    </Container>
  );
};

export default DragonListPage;
