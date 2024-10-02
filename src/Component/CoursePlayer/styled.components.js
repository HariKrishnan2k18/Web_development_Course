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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const FolderHeader = styled.h4`
  background: #f7f9fa;
  cursor: pointer;
  padding: 10px;
  margin: 0px;
  display: flex;
  flex-direction: row;
  gap: 24px;
  padding-left: 20px;
  border-bottom: ${props => props.view && "1px solid #d1d7dc"};
`;

export const FolderContent = styled.div`
  margin: 0px;
  padding: 20px;
  padding-left: 32px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Folder = styled.div`
  border: 1px solid #d1d7dc;
  margin-bottom: 6px;
`;

export const VideoTitle = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 8px;
`;