import styled from "styled-components";

export const StyledFilterDoctorContainer = styled.div`
  width: 250px;
  .special-list {
    padding: 0;
    margin: 0;
    display: flex;
    flex-flow: column nowrap;
    gap: 10px;

    .special-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 10px;

      /* span {
        white-space: nowrap;
      } */
    }
  }
`;

export const StyledToolTipSlider = styled.div`
  padding: 4px 13px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.grayBlue};
`;
