import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { questions } from "../utils/question";

export const Test = ({ questions, onRestart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(40);
  const currentQuestion = questions[currentIndex];
  useEffect(() => {
    if (selected || showResult) return;
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          handleNext();
          return 40;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [currentIndex, selected, showResult]);
  const handleAnswer = (option) => {
    setSelected(option);
    if (option === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => handleNext(), 2000);
  };
  const handleNext = () => {
    setSelected(null);
    setTimer(40);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };
  const getPercent = () => ((score / questions.length) * 100).toFixed(1);
  if (showResult) {
    return (
      <StyledContainer>
        <h2>Результат</h2>
        <p>
          Вы ответили правильно на {score} из {questions.length}
        </p>
        <p>Процент: {getPercent()}%</p>
        <button onClick={onRestart}>Пройти снова</button>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <h3>{currentQuestion.question}</h3>
      <p>Осталось времени: {timer} сек</p>
      <StyledOptionsGrid>
        {currentQuestion.options.map((option, i) => {
          const isCorrect = option === currentQuestion.correctAnswer;
          const isSelected = option === selected;
          const bgColor = selected
            ? isCorrect
              ? "#a1e8af"
              : isSelected
              ? "#ffb3b3"
              : "#f0f0f0"
            : "#f0f0f0";

          return (
            <StyledButton
              key={i}
              disabled={!!selected}
              onClick={() => handleAnswer(option)}
              style={{
                backgroundColor: bgColor,
                cursor: selected ? "default" : "pointer",
              }}
            >
              {option}
            </StyledButton>
          );
        })}
      </StyledOptionsGrid>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledButton = styled.button`
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
`;
const StyledOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 20px;
`;
