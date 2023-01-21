import styled from 'styled-components';

export const StyledCICOPanel = styled.div`
  & > div {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 24px;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  @media (min-width: 768px) {
    & > div {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
`;

export const StyledCICO = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  text-align: center;
  font-size: 15px;
  padding: 20px;
  box-shadow: 0 4px 24px rgb(0 0 0 / 12%);
  transition: all 300ms ease-in-out;
  cursor: pointer;
  will-change: transform, box-shadow;
  background: ${(props) => props.theme.secondaryText};
  position: relative;
  border-radius: 20px;
  word-wrap: break-word;
  text-decoration: none;
  color: ${(props) => props.theme.textDefault};
  outline: none;
  box-sizing: content-box;

  &:hover {
    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.2);
    transform: translateY(-4px);
  }
`;
