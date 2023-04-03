import { Tabs } from "doctor-online-components";
import styled from "styled-components";

export const Container = styled.div`
  .back-to-home {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: ${({ theme }) => theme.baseGray03};

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 10px;

    margin-bottom: 30px;

    cursor: pointer;
  }
`;

export const StyledTabs = styled(Tabs)``;
