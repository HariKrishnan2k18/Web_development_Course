import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  gap: ${props => (props.fullview ? "0px" : "24px")};
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0px;
  }
`;

export const LeftContainer = styled.div`
  width: ${props => (props.fullview ? "100%" : "70%")};
  padding: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const RightContainer = styled.div`
  width: 30%;
  padding: 10px;
  display: ${props => props.fullview && "none"};
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SubFolderDiv = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SubFolderFiles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 150px;
`;
