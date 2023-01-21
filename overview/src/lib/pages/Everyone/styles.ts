import styled from 'styled-components';

export const StyledContainerEveryone = styled.div`
  .title-leave-calendar {
    color: #ffffff;
    line-height: 24px;
    padding: 4px 12px;
    border-radius: 6px;
    background-color: #4338ca;
  }

  .mb-8 {
    margin-bottom: 8px;
  }
`;

export const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 8px;
  margin-bottom: 8px;
`;

export const StyledContainerTable = styled.div`
  max-width: 100%;
  margin-top: 16px;
  padding: 16px;
  box-shadow: 0 0 #0000, 0 0 #0000, 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${(props) => props.theme.secondaryText};
  border-radius: 10px;
  font-size: 13px;

  .user-name {
    text-transform: uppercase;
    font-weight: 700;
    margin: 0;
    color: ${(props) => props.theme.blue};
  }

  .short-name-container {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;

    .short-name {
      padding: 4px;
      border-radius: 4px;
      color: #ffffff;
      font-weight: 700;
      cursor: pointer;
    }
  }

  .is-weekend {
    background-color: red;
  }

  .holiday {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    background-color: #ebefff;
    border-radius: 50%;
  }

  .holiday:hover {
    cursor: pointer;
    background-color: #d8ddf2;
  }

  .working-day {
    font-size: 16px;
  }

  .ant-table-content {
    font-size: 13px;
  }

  .ant-table-content {
    overflow-x: overlay !important;

    &::-webkit-scrollbar {
      width: 6px;
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: #fff;
      border-radius: 100px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.scrollbar};
      border-radius: 200px;
    }

    &.more-width-table {
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
    }
  }
`;
