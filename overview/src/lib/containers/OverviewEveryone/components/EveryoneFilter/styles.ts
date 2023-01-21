import styled from 'styled-components';

export const StyledContainerFilter = styled.div`
  padding: 16px;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.deepGray};

  .button {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-view {
      width: 74px;
      font-size: 13px;
      line-height: 32px;
      font-weight: 500;
      padding: 0 17px !important;
    }
  }

  .grid {
    display: grid;

    .col-span-2 {
      grid-column: span 2 / span 2;
    }
  }

  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .gap-col-8 {
    column-gap: 8px;
  }

  .gap-row-16 {
    row-gap: 16px;
  }

  .ant-select-item-option-selected {
    background-color: #ffffff;
  }
`;
