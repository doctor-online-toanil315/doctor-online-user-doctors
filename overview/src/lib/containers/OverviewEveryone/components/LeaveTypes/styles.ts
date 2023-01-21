import styled from 'styled-components';

export const StyledContainerLeaveTypes = styled.div`
  padding: 16px;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.deepGray};

  .content-leave-types {
    display: flex;
    flex-wrap: wrap;
    column-gap: 24px;
    row-gap: 8px;

    .text-type {
      font-size: 13px;
    }

    .mr-4 {
      margin-right: 4px;
    }

    .fw-700 {
      font-weight: 700;
    }
  }
`;
