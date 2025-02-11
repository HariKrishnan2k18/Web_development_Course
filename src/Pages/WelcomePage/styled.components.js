import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  text-align: center;
  height: 100%;
  @media (max-width: 768px) {
    padding: 16px;
    padding-top: 0px;
  }
`;

export const CourseContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  justify-content: center;
  width: 90%;
  gap: 20px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 20px;

  padding: 20px;
  border-color: #ff00ff;
  border: 2px solid transparent;
  animation: glow-border 2s infinite alternate;
  border-radius: 8px;
  /* margin: 0px; */
  @keyframes glow-border {
    0% {
      border-color: #ff00ff;
    }
    50% {
      border-color: #00ffff;
    }
    100% {
      border-color: #ff00ff;
    }
  }
`;
export const StartCourseButton = styled(Link)`
    border: ${props =>
      props.availability ? "1px solid green" : "1px solid black"};
    text-decoration: none;
    background: ${props => (props.availability ? "#ff00ff" : "gray")};
    color: white;
    height: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    &:hover {
      background: ${props => (props.availability ? "blue" : "black")};
    }
`;

export const CourseName = styled.div`height: 35px;`;
