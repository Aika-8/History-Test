import React from "react";
import styled from "styled-components";

export const TestOptions = ({ onSelectSet }) => {
  return (
    <StyledContainerOptions>
      <h2>Выберите вариант теста:</h2>
      <div>
        {[...Array(5)].map((_, i) => (
          <StyledButton key={i} onClick={() => onSelectSet(i)}>
            Вариант {i + 1}
          </StyledButton>
        ))}
      </div>
    </StyledContainerOptions>
  );
};
const StyledContainerOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledButton = styled.button`
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  font-size: 16px;
`;
