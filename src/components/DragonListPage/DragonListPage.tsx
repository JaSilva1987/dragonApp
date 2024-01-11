import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  ResponsiveTable,
  FirstColumn,
  SecondColumn,
  ActionsColumn,
  AddButton,
} from "./styles";

interface Dragon {
  id: string;
  name: string;
  type: string;
}

const DragonListPage: React.FC = () => {
  const [dragons, setDragons] = useState<Dragon[]>([]);

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

  return (
    <Container>
      <h2>Dragon List</h2>
      <AddButton>
        <Link to="/dragons/new">Add Dragon</Link>
      </AddButton>
      <ResponsiveTable>
        <thead>
          <tr>
            <FirstColumn>Name</FirstColumn>
            <SecondColumn>Type</SecondColumn>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dragons.map((dragon) => (
            <tr key={dragon.id}>
              <td>{dragon.name}</td>
              <td>{dragon.type}</td>
              <ActionsColumn>
                <Link to={`/dragons/${dragon.id}`}>Details</Link>
                <Link to={`/dragons/edit/${dragon.id}`}>Edit</Link>
                <button onClick={() => handleRemoveDragon(dragon.id)}>
                  Remove
                </button>
              </ActionsColumn>
            </tr>
          ))}
        </tbody>
      </ResponsiveTable>
    </Container>
  );
};

export default DragonListPage;
