import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  padding: 20px 0px;

  .search-field {
    max-width: 524px;
    min-width: 370px;
  }

  && {
    .ant-select-selector:focus-within ~ .ant-select-arrow {
      transform: unset !important;
    }
  }
`;
export const RightHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  gap: 20px;
`;
export const StyledProfile = styled.div``;
export const ProfileContainer = styled.div`
  .dropdown-placeholder {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    img {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .profile-dropdown-item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
`;
export const NotificationContainer = styled.div``;
export const StyledDivider = styled.div`
  width: 2px;
  height: 30px;
  background: ${({ theme }) => theme.lightGray};
`;

export const StyledProfileOverview = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  gap: 12px;
  padding: 12px;

  background-color: ${({ theme }) => theme.grayBlue};

  img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  h3 {
    margin-bottom: 0;
  }

  p {
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: ${({ theme }) => theme.primaryText};
  }
`;

export const StyledDropdownItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 12px;
  padding: 6px;
`;
