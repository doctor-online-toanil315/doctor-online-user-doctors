import styled from 'styled-components';
export const StyleContainer = styled.div`
  @media only screen and (max-width: 1024px) {
    .container-right {
      flex-direction: row;
    }
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
  .container-right__contain {
    width: 150px;
    font-size: 13px;
  }
`;
export const StyleDot = styled.div`
  border-radius: 100%;
  display: inline-block;
  translate: 0 5px;
  background: ${(props) =>
    props.property === 'holiday'
      ? props.theme.accentActive
      : props.property === 'workingday'
      ? props.theme.strongBlue
      : props.property === 'onSite'
      ? props.theme.green
      : props.theme.organeOT};
  height: 20px;
  width: 20px;
  margin: 0 5px;
`;
export const StyleHeader = styled.div`
  width: 100%;
  height: 32px;
  background: rgb(67 56 202 / 1);
  border-radius: 10px;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  padding: 4px 12px;
  margin: 0 0 8px;
`;

export const StyleEvent = styled.div`
  width: 100%;
  position: absolute;
  bottom: 6%;
  left: 0;
  opacity: 1;
  display: block;
  z-index: 5;
`;

export const StyleLabelEvent = styled.p`
  margin: 0.25rem;
  padding: 0.25rem;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.property === 'workFromHome' ? props.theme.strongBlue : props.theme.strongGray};
  font-weight: 600;
  color: ${(props) =>
    props.property === 'workFromHome' ? props.theme.strongBlue : props.theme.strongGray};
  border-radius: 0.5rem;
  font-size: small;
`;

export const StyleDotDay = styled.div`
  border-radius: 100%;
  background: ${(props) =>
    props.property === 'holiday'
      ? props.theme.accentActive
      : props.property === 'workingday'
      ? props.theme.strongBlue
      : props.property === 'onSite'
      ? props.theme.green
      : props.theme.organeOT};
  height: 10px;
  width: 10px;
`;

export const StyleDivDot = styled.div`
  width: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
