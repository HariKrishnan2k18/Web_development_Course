import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

/* ── Animations ─────────────────────────────── */
const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const borderRotate = keyframes`
  0%   { border-color: #8b5cf6; }
  33%  { border-color: #ec4899; }
  66%  { border-color: #06b6d4; }
  100% { border-color: #8b5cf6; }
`;

/* ── Layout ──────────────────────────────────── */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  font-family: 'Inter', sans-serif;
`;

/* ── NavBar Desktop ──────────────────────────── */
export const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${({ theme }) => theme.navBackground};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 0 48px;
  height: 64px;
  width: 100%;
  gap: 16px;
  animation: ${fadeInDown} 0.4s ease;
  box-shadow: ${({ theme }) => theme.shadow};

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavBrand = styled.span`
  font-size: 20px;
  font-weight: 800;
  background: ${({ theme }) => theme.accentGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
  letter-spacing: -0.5px;
  cursor: default;
  user-select: none;
`;

export const NavLink = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colorMuted};
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.color};
    background: ${({ theme }) => theme.backgroundCard};
  }
`;

export const NavSpacer = styled.div`
  flex: 1;
`;

/* ── NavBar Mobile ───────────────────────────── */
export const NavBarMobile = styled.nav`
  display: none;
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${({ theme }) => theme.navBackground};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 0 16px;
  height: 56px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-shadow: ${({ theme }) => theme.shadow};

  @media (max-width: 768px) {
    display: flex;
  }
`;

/* ── Search Input ────────────────────────────── */
export const SearchInput = styled.input`
  flex: 1;
  max-width: 520px;
  height: 40px;
  padding: 0 16px 0 44px;
  background: ${({ theme }) => theme.searchBg};
  border: 1.5px solid ${({ theme }) => theme.searchBorder};
  border-radius: 24px;
  color: ${({ theme }) => theme.color};
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;

  &::placeholder {
    color: ${({ theme }) => theme.colorMuted};
  }

  &:focus {
    border-color: #8b5cf6;
    background: ${({ theme }) => theme.backgroundCard};
    box-shadow: 0 0 0 3px rgba(139,92,246,0.15);
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 520px;

  svg {
    position: absolute;
    left: 14px;
    color: ${({ theme }) => theme.colorMuted};
    font-size: 15px;
    pointer-events: none;
  }
`;

/* ── Auth Buttons ────────────────────────────── */
export const LoginButton = styled.button`
  cursor: pointer;
  border-radius: 24px;
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  border: 1.5px solid ${({ theme }) => theme.searchBorder};
  background: transparent;
  color: ${({ theme }) => theme.color};
  transition: all 0.25s;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.backgroundCard};
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139,92,246,0.12);
  }
`;

export const SignupButton = styled.button`
  cursor: pointer;
  border-radius: 24px;
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  border: none;
  background: ${({ theme }) => theme.accentGradient};
  color: #fff;
  transition: all 0.25s;
  white-space: nowrap;
  box-shadow: 0 4px 14px rgba(139,92,246,0.35);

  &:hover {
    background: ${({ theme }) => theme.accentGradientHover};
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(139,92,246,0.45);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const UserName = styled.div`
  padding: 6px 18px;
  font-size: 14px;
  font-weight: 700;
  border: 2px solid transparent;
  border-radius: 24px;
  animation: ${borderRotate} 3s linear infinite;
  background-clip: padding-box;
  white-space: nowrap;
  letter-spacing: 0.3px;

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ── Hero Section ────────────────────────────── */
export const HeroSection = styled.section`
  width: 95%;
  padding: 40px 0 20px;
  animation: ${fadeInUp} 0.5s ease;

  @media (max-width: 768px) {
    padding: 20px 0 12px;
  }
`;

export const HeroTitle = styled.h1`
  font-size: clamp(24px, 4vw, 40px);
  font-weight: 800;
  margin: 0 0 10px;
  letter-spacing: -1px;
  line-height: 1.15;
  background: ${({ theme }) => theme.accentGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const HeroSubtitle = styled.p`
  font-size: clamp(14px, 2vw, 17px);
  color: ${({ theme }) => theme.colorMuted};
  margin: 0;
  font-weight: 400;
  line-height: 1.6;
`;

/* ── Course Grid ─────────────────────────────── */
export const CourseContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 95%;
  padding: 0 0 48px;
  animation: ${fadeInUp} 0.6s ease 0.1s both;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

/* ── Course Card ─────────────────────────────── */
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.backgroundCard};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.cardShadow};

  &:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: ${({ theme }) => theme.shadow};
    border-color: rgba(139,92,246,0.35);
    background: ${({ theme }) => theme.backgroundCardHover};
  }

  img {
    width: 100%;
    height: 165px;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const CardImageWrapper = styled.div`
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.3) 100%);
  }
`;

export const CardBody = styled.div`
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  justify-content: space-between;
`;

export const CourseName = styled.div`
  font-size: 13.5px;
  font-weight: 600;
  line-height: 1.5;
  color: ${({ theme }) => theme.color};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/* ── Start Course Button ─────────────────────── */
export const StartCourseButton = styled(Link)`
  text-decoration: none;
  background: ${({ theme }) => theme.accentGradient};
  color: #fff;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.2px;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(139,92,246,0.3);

  &:hover {
    background: ${({ theme }) => theme.accentGradientHover};
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(139,92,246,0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

/* ── CloudImage (Theme Toggle) ───────────────── */
export const CloudImage = styled.img`
  width: 28px;
  height: 28px;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.2s;
  border-radius: 50%;
  padding: 2px;

  &:hover {
    transform: rotate(20deg) scale(1.15);
    opacity: 0.85;
  }

  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
  }
`;

/* ── Mobile Nav Icon Buttons ─────────────────── */
export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colorMuted};
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;

  &:hover {
    color: ${({ theme }) => theme.color};
    background: ${({ theme }) => theme.backgroundCard};
  }
`;

const skeletonShimmer = keyframes`
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
`;

export const CourseStatus = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colorMuted};
  font-size: 14px;
  font-weight: 600;
`;

export const SkeletonCard = styled.div`
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.backgroundCard};
`;

export const SkeletonBlock = styled.div`
  height: ${({ $height }) => $height || "16px"};
  width: ${({ $width }) => $width || "100%"};
  border-radius: ${({ $image }) => $image ? "0" : "8px"};
  background: ${({ theme }) => theme.type === "dark"
    ? "linear-gradient(100deg, #252334 25%, #39334f 50%, #252334 75%)"
    : "linear-gradient(100deg, #eee9f8 25%, #faf8ff 50%, #eee9f8 75%)"};
  background-size: 200% 100%;
  animation: ${skeletonShimmer} 1.6s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;
