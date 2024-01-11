import styled from "styled-components";

export const Container = styled.div`
  margin: 2%;
`;

export const Table = styled.table`
  width: 100%;
  padding: 16px;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

export const FirstColumn = styled.th`
  width: 55%;
`;

export const SecondColumn = styled.th`
  width: 25%;
`;

export const ActionsColumn = styled.td`
  display: flex;
  gap: 10px;
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

export const ResponsiveTable = styled(Table)`
  @media (max-width: 600px) {
    th,
    td {
      display: block;
      width: 100%;
    }
  }

  @media (min-width: 601px) and (max-width: 800px) {
    th:first-child {
      width: 55%;
    }

    th:nth-child(2) {
      width: 25%;
    }
  }
`;
