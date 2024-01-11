// src/components/DragonFormModal/styles.ts
import styled from "styled-components";

export const FormContainer = styled.div`
  width: 30%;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  background-color: #fff;
  padding: 16px;
  box-shadow: -10px 0 20px rgba(0, 0, 0, 0.1);

  form {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      display: flex;
      flex-direction: column;
    }

    button {
      background-color: #007bff;
      color: #fff;
      padding: 8px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    textarea {
      height: 80px;
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #007bff;
  color: #fff;
  padding: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const AddButton = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const SelectInput = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
