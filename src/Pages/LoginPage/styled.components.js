import styled from "styled-components";

export const LoginButton = styled.button`
  cursor: pointer;
  border-radius: 5em;
  color: #fff;
  background: linear-gradient(to right, #9c27b0, #e040fb);
  border: 0;
  padding: 10px 40px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
  margin-top: 20px;
`;

export const Username = styled.input`
  color: rgb(38, 50, 56);
  background: rgba(136, 126, 126, 0.04);
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  outline: none;
  box-sizing: border-box;
  border: 2px solid #dd6fcc;
  text-align: center;
`;
export const Password = styled.input`
  color: rgb(38, 50, 56);
  background: rgba(136, 126, 126, 0.04);
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  outline: none;
  box-sizing: border-box;
  border: 2px solid #dd6fcc;
  text-align: center;
`;

export const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 999;
  overflow: hidden;
`;

export const LoginForm = styled.form`
  /* position: relative; */
  background: #000000b0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  min-height: 100vh;
  @media (max-width: 768px) {
    min-height: 110vh;
  }
`;

export const InnerForm = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  min-height: 60vh;
  gap: 20px;
  position: relative;
  border-radius: 50px;
  border: 3px solid green;
  @media (max-width: 768px) {
    width: 90%;
  }
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
