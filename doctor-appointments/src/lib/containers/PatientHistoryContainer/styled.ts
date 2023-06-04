import styled from "styled-components";

export const StyledPatientHistoryContainer = styled.div`
  .ant-timeline.ant-timeline-label
    .ant-timeline-item-left
    .ant-timeline-item-content {
    width: calc(50% - 14px + 250px);
    padding-left: 20px;
  }

  .ant-timeline.ant-timeline-label .ant-timeline-item-label {
    padding-right: 20px;
  }

  .shadow {
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 2px #0000001a;
  }

  .back {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 10px;
    margin: 10px 0 15px;

    font-weight: 400;
    font-size: 14px;
    color: ${({ theme }) => theme.baseGray03};

    cursor: pointer;
  }

  h1 {
    font-weight: 700;
    font-size: 22px;
    line-height: 40px;
    color: ${({ theme }) => theme.primaryText};
    margin-bottom: 30px;
  }

  .timeline-item {
    .timeline-title {
      font-weight: 600;
      color: ${({ theme }) => theme.baseGray03};
      cursor: pointer;
      margin-bottom: 5px;
    }

    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: ${({ theme }) => theme.primaryText};
    }

    &.active {
      .timeline-title {
        color: ${({ theme }) => theme.strongBlue};
      }

      svg {
        path {
          stroke: ${({ theme }) => theme.strongBlue};
        }
      }
    }
  }
`;
