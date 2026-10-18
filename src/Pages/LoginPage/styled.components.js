import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(32px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

export const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.25s ease;
`;

export const LoginForm = styled.form`
  position: absolute;
  inset: 0;
  background: rgba(26, 26, 46, 0.28);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InnerForm = styled.div`
  width: 420px;
  max-width: 90vw;
  padding: 48px 40px 40px;
  background: #ffffff;
  color: #1a1a2e;
  color-scheme: light;
  border: 1px solid #e9e2f5;
  border-radius: 24px;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  box-shadow: 0 24px 64px rgba(26, 26, 46, 0.18);
  animation: ${slideUp} 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);

  h2 {
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.5px;
    background: linear-gradient(135deg, #8b5cf6, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    margin: -8px 0 0;
    font-size: 13px;
    color: #6b7280;
    font-family: 'Inter', sans-serif;
    text-align: center;
  }
`;

const inputBase = `
  width: 100%;
  text-align: center;
  padding: 12px 18px;
  background: #f9fafb;
  border: 1.5px solid #ddd6eb;
  border-radius: 14px;
  color: #1a1a2e;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    border-color: #8b5cf6;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(139,92,246,0.15);
  }
`;

export const Username = styled.input`${inputBase}`;
export const Password = styled.input`${inputBase}`;

export const LoginButton = styled.button`
  width: 100%;
  cursor: pointer;
  border: none;
  border-radius: 14px;
  padding: 13px;
  font-size: 15px;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
  color: #fff;
  box-shadow: 0 4px 18px rgba(139,92,246,0.4);
  transition: all 0.25s;
  letter-spacing: 0.3px;

  &:hover {
    background: linear-gradient(135deg, #7c3aed 0%, #db2777 100%);
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(139,92,246,0.5);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const UserName = styled.div`
  padding: 6px 18px;
  font-size: 14px;
  font-weight: 700;
  border: 2px solid #8b5cf6;
  border-radius: 24px;
  white-space: nowrap;
  letter-spacing: 0.3px;
`;
