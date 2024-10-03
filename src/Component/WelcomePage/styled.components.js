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
  flex-direction: row;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 2px solid rgb(50, 205, 50);
  padding: 20px;

  @media (min-width: 768px) {
    width: 300px;
  }
`;
export const StartCourseButton = styled(Link)`
    border: 1px solid green;
    text-decoration: none;
    background: green;
    color: white;
    height: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
