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
  border: 2px solid rgb(50, 205, 50);
  padding: 20px;
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
