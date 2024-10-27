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
`;

export const CourseContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 calc(30% - 10px);
  box-sizing: border-box;
  gap: 20px;
  border: 2px solid rgb(50, 205, 50);
  padding: 20px;

  @media (min-width: 768px) {
    width: 300px;
  }
`;
export const StartCourseButton = styled(Link)`
    border: ${props =>
      props.availability ? "1px solid green" : "1px solid black"};
    text-decoration: none;
    background: ${props => (props.availability ? "green" : "gray")};
    color: white;
    height: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const CourseName = styled.div`height: 35px;`;
