import styled from "styled-components";

export const StyledRecentPatient = styled.div`
  padding: 10px;

  p {
    margin-bottom: 0;
  }
`;

export const StyledRecentPatientName = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  gap: 15px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.primaryText};
  }
`;

export const PatientStatusTag = styled.div<{ color: string }>`
  display: inline-block;
  font-weight: 500;
  font-size: 13px;
  line-height: 24px;
  color: white;

  padding: 6px 12px;
  border-radius: 6px;
  background-color: ${({ color, theme }) => theme[color]};
`;
