import styled from 'styled-components';

export const StyledModal = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;

  .title {
    font-weight: 700;
    margin-top: 0 !important;
    font-size: 36px !important;
  }

  .sub-title {
    font-weight: 700;
    font-size: 18px !important;
    margin-bottom: 5px;
  }

  .text {
    font-weight: 400;
    font-size: 15px;
  }

  .loading {
    width: 100%;
  }

  // util class name
  .grid-col-3 {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    box-sizing: border-box;
  }

  .grid-gap-x-30 {
    grid-column-gap: 30px;
  }

  .grid-gap-y-10 {
    grid-row-gap: 10px;
  }
`;

export const StyledEntitlementItem = styled.div`
  grid-column: 1fr;
  height: 100%;

  padding: 10px 24px;
  border: 1px solid ${({ theme }) => theme.strongGray};
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  .leave-name {
    color: ${({ theme }) => theme.primaryText};
    font-size: 15px;
    line-height: 24px;
  }

  .remaining-days {
    display: flex;
    flex-flow: column wrap;
    gap: 7px;

    div {
      padding: 2px 8px;
      background-color: ${({ theme }) => theme.baseGray};
      border-radius: 20px;
      white-space: nowrap;

      &.available-leave {
        color: white;

        &.green {
          background-color: ${({ theme }) => theme.green};
        }

        &.remaining-days {
          background-color: ${({ theme }) => theme.red};
        }
      }
    }
  }
`;
