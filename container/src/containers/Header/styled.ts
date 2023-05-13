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

export const StyledNotificationListContainer = styled.div`
  width: 100%;
  padding: 5px 0 10px;

  .header {
    padding: 5px 10px 10px;
    border-bottom: 1px solid ${({ theme }) => theme.lightGray};
    margin-bottom: 10px;

    p {
      font-weight: 600;
      font-size: 18px;
      line-height: 28px;
      color: ${({ theme }) => theme.primaryText};
      margin-bottom: 0;
    }
  }

  .empty {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 10px;

    img {
      width: 50%;
      object-fit: cover;
    }

    p {
      font-weight: 600;
      font-size: 16px;
      line-height: 28px;
      color: ${({ theme }) => theme.strongBlue};
      margin-bottom: 0;
    }
  }

  .infinite-scroll-component {
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    &::-webkit-scrollbar {
      width: 8px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: ${({ theme }) => theme.lightGray};
    }
  }
`;

export const StyledNotificationItem = styled.div<{ isSeen: boolean }>`
  padding: 15px 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  border-radius: 6px;
  margin-bottom: 5px;
  cursor: pointer;
  position: relative;

  &::before {
    content: "";
    width: 10px;
    height: 10px;
    background-color: ${({ isSeen, theme }) =>
      isSeen ? "transparent" : theme.strongBlue};
    border-radius: 50%;

    position: absolute;
    left: 0;
    top: 10px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.grayBlue};
  }

  .left {
    display: flex;
    flex-flow: row nowrap;
    gap: 15px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .infos {
      h3 {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: ${({ theme }) => theme.primaryText};
        margin-bottom: 0;
      }

      p {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: ${({ theme }) => theme.baseGray03};
        margin-bottom: 0;
      }
    }
  }

  span {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: ${({ theme }) => theme.baseGray03};
  }
`;

export const StyledReceiveCallRequest = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 15px;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    color: ${({ theme }) => theme.strongBlue};
    margin-bottom: 0;
  }

  button {
    height: 40px !important;
    padding: 0 40px !important;
  }
`;
