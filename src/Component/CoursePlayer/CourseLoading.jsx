import styled, { keyframes } from "styled-components";
import { FaPlay } from "react-icons/fa";

const shimmer = keyframes`
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
`;
const Shell = styled.section`
  width: 100%;
  padding: 24px;
  color: ${({ theme }) => theme.color};
  @media (max-width: 600px) { padding: 16px; }
`;
const Status = styled.div`
  margin-bottom: 24px;
  small { color: ${({ theme }) => theme.colorMuted}; font-size: 13px; }
  h2 { margin: 6px 0 8px; font-size: clamp(19px, 3vw, 26px); line-height: 1.4; }
  p { margin: 0; color: ${({ theme }) => theme.colorMuted}; font-size: 14px; }
`;
const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(240px, 3fr);
  gap: 24px;
  @media (max-width: 768px) { grid-template-columns: minmax(0, 1fr); gap: 18px; }
`;
const Panel = styled.div`
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.backgroundCard};
`;
const Bar = styled.div`
  height: 44px;
  background: linear-gradient(110deg, #3730a3, #3158a6 55%, #0e7490);
  display: flex;
  align-items: center;
  padding: 0 18px;
  gap: 6px;
  i { width: 7px; height: 7px; border-radius: 50%; background: #ffffff70; }
`;
const Placeholder = styled.div`
  height: ${({ $height }) => $height || "12px"};
  width: ${({ $width }) => $width || "100%"};
  border-radius: 6px;
  background: ${({ theme }) => theme.type === "dark"
    ? "linear-gradient(100deg, #252938 25%, #353d55 50%, #252938 75%)"
    : "linear-gradient(100deg, #e9edf7 25%, #f7f9ff 50%, #e9edf7 75%)"};
  background-size: 200% 100%;
  animation: ${shimmer} 1.8s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;
const Screen = styled(Placeholder)`
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  min-height: 180px;
  border-radius: 0;
  display: grid;
  place-items: center;
  span { display: grid; place-items: center; width: 64px; height: 64px; border-radius: 50%; color: #818cf8; background: ${({ theme }) => theme.backgroundCard}; box-shadow: 0 8px 28px #3730a315; }
  svg { margin-left: 4px; }
`;
const Details = styled.div`
  display: grid;
  gap: 12px;
  padding: 20px;
`;
const Lesson = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

export default function CourseLoading({ name }) {
  return (
    <Shell aria-busy="true" aria-label="Loading course">
      <Status role="status">
        <small>YOUR LEARNING SPACE</small>
        <h2>{name || "Getting your course ready"}</h2>
        <p>Loading lessons and course content…</p>
      </Status>
      <Layout aria-hidden="true">
        <div>
          <Panel>
            <Bar><i /><i /><i /></Bar>
            <Screen><span><FaPlay /></span></Screen>
            <Details><Placeholder $width="75%" $height="18px" /><Placeholder $width="45%" /></Details>
          </Panel>
        </div>
        <Panel>
          <Details><Placeholder $width="60%" $height="20px" /><Placeholder $width="80%" /></Details>
          {Array.from({ length: 7 }, (_, i) => (
            <Lesson key={i}>
              <Placeholder $width="24px" $height="24px" style={{ flexShrink: 0 }} />
              <Placeholder $width={`${70 - (i % 3) * 12}%`} />
            </Lesson>
          ))}
        </Panel>
      </Layout>
    </Shell>
  );
}
