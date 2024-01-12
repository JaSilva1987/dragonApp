import styled from "styled-components";

export const UpdateModalContent = styled.div`
  text-align: center;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  label {
    text-align: left;
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  textarea {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  button {
    background-color: #4caf50;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-right: 0.5rem;
  }

  button:last-child {
    background-color: #f44336;
    margin-right: 0;
  }
`;

export const SelectInput = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;
