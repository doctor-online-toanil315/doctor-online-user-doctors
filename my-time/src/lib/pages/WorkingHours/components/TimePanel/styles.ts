import styled from 'styled-components';

export const StyledTimePanel = styled.div`
  color: ${(props) => props.theme.secondaryText};
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  background-color: rgb(67 56 202);
  border-radius: 12px;
  position: relative;
  padding: 32px 20px;
`;
export const StyledFirstGrid = styled.div`
  grid-template-columns: repeat(2, minmax(0, 1fr));
  display: grid;
  margin-bottom: 40px;

  img {
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    height: auto;
    display: block;
    vertical-align: middle;
  }
`;
export const StyledSecondGrid = styled.div`
  grid-template-columns: repeat(2, minmax(0, 1fr));

  display: grid;
`;
export const StyledTimeIn = styled.div`
  align-items: center;
  flex-direction: column;
  display: flex;

  div:first-child {
    font-size: 20px;
    line-height: 28px;
  }

  div:last-child {
    margin-top: calc(24px * calc(1 - 0));
    margin-bottom: calc(24px * 0);
  }
`;
export const StyledTimeOut = styled.div`
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
  align-items: center;
  flex-direction: column;
  display: flex;
  border-left-width: 1px;

  div:first-child {
    font-size: 20px;
    line-height: 28px;
  }

  div:last-child {
    margin-top: calc(24px * calc(1 - 0));
    margin-bottom: calc(24px * 0);
  }
`;
export const StyledBoxShadow = styled.div`
  background-color: rgb(99 102 241);
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  height: 20px;
  bottom: -20px;
  right: 12px;
  left: 12px;
  position: absolute;
`;
export const StyledWorkingTimeToday = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;

  div:first-child {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
  }

  div:last-child {
    margin-top: calc(24px * calc(1 - 0));
    margin-bottom: calc(24px * 0);
    font-weight: 700;
    font-size: 36px;
    line-height: 40px;
  }
`;
