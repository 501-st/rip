import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px auto 0;
  align-items: center;
  font-family: "Exo 2", sans-serif;
  font-size: 20px;
  width: 1200px;
`;

export const Input = styled.input`
  border-radius: 10px;
  padding: 10px 15px;
  width: 350px;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Button = styled.button`
  background-color: orange;
  border-radius: 10px;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 15px 25px;
`;