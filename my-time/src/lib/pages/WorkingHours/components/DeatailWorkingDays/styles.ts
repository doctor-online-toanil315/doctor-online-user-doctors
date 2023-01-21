import styled from 'styled-components';

export const StyledDetailWorkingDays = styled.div`
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
export const StyledContainer = styled.div`
  .title {
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    margin: 0 0 8px;
  }

  .days {
    color: rgb(59 130 246);
    font-weight: 700;
    font-size: 96px;
    line-height: 1;
  }

  .total-days {
    font-variant: none;
    font-feature-settings: normal;
    color: rgb(156 163 175);
    font-weight: 700;
    font-size: 36px;
    line-height: 40px;
  }

  .footer {
    color: rgba(27, 31, 59, 0.65);
  }
`;
