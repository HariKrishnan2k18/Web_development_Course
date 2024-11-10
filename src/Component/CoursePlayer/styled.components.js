import styled, { keyframes } from "styled-components";

export const AppContainer = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  height: 100%;
  min-height: 100vh;
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const SwitchButtonIcon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  > div {
    padding: 20px;
    @media (max-width: 768px) {
      padding-top: 0px;
    }
  }
  > div:first-child {
    font-weight: 700;
    font-size: 18px;
    width: 100%;
    text-align: center;
    @media (max-width: 768px) {
      padding-right: 0px;
    }
  }
  > div :last-child {
    width: 30px;
    cursor: pointer;
    @media (max-width: 768px) {
      padding-left: 0px;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  height: 100%;
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
    padding: 0px;
  }
`;

export const RightContainer = styled.div`
  width: 30%;
  padding: 10px;
  display: ${props => props.fullview && "none"};
  @media (max-width: 768px) {
    width: 100%;
    padding: 0px;
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
  background: ${({ theme }) => theme.contentlayout};
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
  gap: 16px;
`;

const loadingAnimation = keyframes`
  0% {
    transform: scaleX(0);
    transform-origin: left;
  }
  50% {
    transform: scaleX(1);
    transform-origin: left;
  }
  100% {
    transform: scaleX(0);
    transform-origin: right;
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: #f0f0f0;
  overflow: hidden;
  position: relative;
`;

export const LoadingLine = styled.div`
  width: 100%;
  height: 100%;
  background-color: gray;
  transform-origin: left;
  animation: ${loadingAnimation} 2s infinite ease-in-out;
`;

export const LoadingDiv = styled.div`
  width: 100%;
  top: 35%;
  left: 45%;
  position: fixed;
  @media (max-width: 768px) {
    top: 40%;
    left: 35%;
  }
`;

export const VideoLoad = styled.div`
  width: 100%;
  height: 500px;
  top: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${({ theme }) => theme.frameborder};
  background: ${({ theme }) => theme.frameloadingbackground};
  @media (max-width: 768px) {
    height: 350px;
  }
`;
