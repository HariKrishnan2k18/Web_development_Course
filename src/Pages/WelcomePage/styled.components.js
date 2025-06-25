import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  @media (max-width: 768px) {
    padding: 16px;
    padding-top: 0px;
  }
`;

export const NavBarMobile = styled.div`
  box-shadow: 0px 0px 5px 0px rgba(241, 136, 196, 0.75);
  padding: 16px;
  width: 100%;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background-color: ${({ theme }) => theme.background};
  @media (min-width: 768px) {
    display: none;
  }
`;

export const CloudImage = styled.img`
  width: 30px;
  @media (max-width: 768px) {
    width: 20px;
  }
`;

export const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: sticky;
  top: 0;
  /* margin-bottom: 20px; */
  box-shadow: 0px 0px 5px 0px rgba(241, 136, 196, 0.75);
  padding: 16px;
  padding-left: 64px;
  width: 100%;
  gap: 16px;
  background-color: ${({ theme }) => theme.background};
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SearchInput = styled.input`
  margin: 0px 36px;
  padding-left: 20px;
  width: 60%;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #ff00ff;

  &:focus-visible {
    border: "1px solid #ff00ff";
  }
`;

export const LoginButton = styled.button`
  cursor: pointer;
  border-radius: 1em;
  padding: 10px 40px;
  margin-top: 20px;
`;

export const SignupButton = styled.button`
  color: #fff;
  padding: 10px 40px;
  border-radius: 1em;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
  background: linear-gradient(to right, #9c27b0, #e040fb);
  cursor: pointer;
`;
export const UserName = styled.h3`
  padding: 4px 20px;
  border-color: #ff00ff;
  border: 3px solid transparent;
  animation: glow-border 2s infinite alternate;
  border-radius: 8px;
  margin: 0px;
  @keyframes glow-border {
    0% {
      border-color: #ff00ff;
    }
    50% {
      border-color: #00ffff;
    }
    75% {
      border-color: rgb(0, 255, 102);
    }
    100% {
      border-color: #ff00ff;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
export const CourseContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-content: center;
  width: 95%;
  gap: 20px;
  margin-bottom: 20px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 20px;
  padding: 20px;
  border: ${({ theme }) => `1px solid ${theme.color}`};
  border-radius: 8px;
`;
export const StartCourseButton = styled(Link)`
  border: ${(props) =>
    props.availability === "true" ? "1px solid green" : "1px solid black"};
  text-decoration: none;
  background: ${(props) =>
    props.availability === "true" ? "#ff00ff" : "gray"};
  color: white;
  height: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  &:hover {
    background: ${(props) =>
      props.availability === "true" ? "blue" : "black"};
  }
`;

export const CourseName = styled.div`
  height: 35px;
`;
