import styled from 'styled-components';

export const StyledTimePanel = styled.div`
  color: ${(props) => props.theme.secondaryText};
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  background-color: rgb(67 56 202);
  border-radius: 12px;
  grid-column: span 2 / span 2;
  position: relative;
  padding: 32px;
`;
export const StyledTable = styled.div`
  table-layout: fixed;
  width: 100%;
  display: table;

  .table-header-group {
    display: table-header-group;
    font-weight: 700;
  }

  .table-row-group {
    display: table-row-group;
  }

  .table-cell {
    display: table-cell;

    &.border {
      border-width: 0;
      border-left-width: 1px;
      border-right-width: 1px;
      border-style: solid;
      border-color: #e5e7eb;
    }

    &.py-8 {
      padding-top: 32px;
      padding-bottom: 32px;
    }
  }
`;
export const StyledViewDetail = styled.div`
  padding-top: 32px;
  justify-content: center;
  display: flex;

  a {
    color: rgba(255, 255, 255, 0.6);
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
