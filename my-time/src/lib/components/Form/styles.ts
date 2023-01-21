import styled, { css } from 'styled-components';
import { CardProps } from './Card';

const bgColor: string[] = [
  `#e7716a`,
  `#ffc9c8`,
  `#fffada`,
  `#888c90`,
  `#1b65e3`,
  `#6495ED`,
  `#556B2F`,
  `#696969`,
  `#FFE4E1`,
  `#008080`
];

export const cssImgName = css`
  background-color: ${bgColor[Math.floor(Math.random() * bgColor.length)]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

export const BtnWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .ant-btn.ant-btn[disabled],
  .ant-btn.ant-btn[disabled]:hover,
  .ant-btn.ant-btn[disabled]:active {
    cursor: default;
    color: ${(props) => props.theme.secondaryText};
    background: ${(props) => props.theme.strongBlue};
    svg {
      path {
        fill: ${(props) => props.theme.secondaryText};
      }
    }
  }
`;

export const StyledOption = styled.div`
  .option {
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
    height: 100%;
    &__info {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      width: 100%;
      height: 100%;
      gap: 8px;
      .employee-username {
        font-size: 15px;
        font-weight: 400;
      }
    }
    & > span {
      margin-left: 5px;
      width: 19px;
    }
  }
`;

export const SelectWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  gap: 16px 16px;
  margin-bottom: 22px;
`;

export const CardContainer = styled.div<CardProps>`
  ${(props) =>
    props.active &&
    `transition: 0.5s ease;
    color:  ${props.theme.secondaryText};
    background-color: ${props.theme.deepBlue};`}

  ${(props) =>
    props.disabled &&
    `opacity: 0.4;
    pointer-events: none;`}

  border-radius: 8px;
  cursor: pointer;
  height: 55px;
  /* padding: 0 24px; */
  border: 1px solid ${(props) => props.theme.boxShadowInputHover};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  &:active {
    ${(props) =>
      !props.active &&
      `transition: 0.5s ease;
      background-color: ${props.theme.baseGray02};`}
  }

  .leave-types {
    display: flex;
    flex-flow: column nowrap;
    margin-left: 10px;
  }

  .remaining-days {
    display: inline-block;
    border-radius: 9999px;
    ${(props) => props.active && `background-color: ${props.theme.strongGray} !important;`}
    background-color: rgba(0, 0, 0, 0.08);
    padding: 0 8px;
    font-size: 12px;
  }

  .available-days {
    display: inline-block;
    border-radius: 9999px;
    background-color: ${(props) =>
      Number(props?.availableDays) >= 0 ? props.theme.green : props.theme.red};
    padding: 0 8px;
    font-size: 12px;
    color: white;
    margin-top: 5px;
  }
  .active-card {
    background-color: ${(props) => props.theme.deepBlue};
  }
  .leave-name {
    /* text-overflow: ellipsis; */
    /* overflow: hidden; */
    // Addition lines for 2 line or multiline ellipsis
    /* display: -webkit-box !important; */
    /* -webkit-line-clamp: 2; */
    /* -webkit-box-orient: vertical; */
    /* white-space: normal; */
    flex: 1;
    width: 80%;
  }
`;

export const ErrorMessageStyled = styled.span`
  position: relative;
  top: -18px;
  margin-bottom: 0;
  font-size: 13px;
  line-height: 20px;
  color: ${(props) => props.theme.red};
  width: 100% !important;
  text-align: left;
`;

export const OTErrorMessageStyled = styled.span`
  position: relative;
  top: -12px;
  margin-bottom: 22px;
  font-size: 13px;
  line-height: 20px;
  color: ${(props) => props.theme.red};
  width: 100% !important;
  text-align: left;
`;

export const LeaveErrorMessageStyled = styled.span`
  position: relative;
  top: -15px;
  font-size: 13px;
  line-height: 20px;
  color: ${(props) => props.theme.red};
  display: inline-block;
  width: 100% !important;
  text-align: left;
`;

export const ListCardContainer = styled.div`
  margin-bottom: 22px;
  display: grid;
  gap: 13px 13px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

export const StyledOptionCheckbox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  .emailCC-select {
    font-size: 15px;
    line-height: 24px;
    font-weight: 400;
    color: #1b1f3b;
    .name-container {
      font-weight: 600 !important;
    }
  }
`;

export const AvatarItem = styled.img`
  height: 24px;
  width: 24px;
  border-radius: 50%;
  margin-right: 5px;
  object-fit: cover;
`;

export const ImageNameItem = styled.div`
  height: 24px;
  width: 24px;
  min-width: 24px;
  max-width: 24px;
  ${cssImgName}
  margin-right: 5px;
`;
