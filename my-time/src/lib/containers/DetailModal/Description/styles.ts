import { Dropdown } from 'antd';
import styled, { StyledComponent } from 'styled-components';
import { cssImgName } from '../styles';

export const StyledDescription = styled.div`
  padding-bottom: 20px;

  .ant-divider {
    border-top: 1px solid #d7d7d7;
  }
`;

export const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const StyledAvatar = styled.div``;

export const ImgAvatar = styled.img`
  height: 144px;
  width: 144px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ImgName = styled.div`
  height: 144px;
  width: 144px;
  min-width: 144px;
  max-width: 144px;
  font-size: 35px;
  font-weight: 700;
  ${cssImgName}
`;

export const Detail = styled.div`
  display: table;
  width: 100%;

  div.ant-typography,
  .ant-typography p {
    margin-bottom: 0;
  }
`;

export const DetailRow = styled.div`
  display: table-row;
`;

export const DetailLabel = styled.div`
  display: table-cell;
  padding-top: 8px;
  padding-bottom: 8px;
  font-weight: 600;
  vertical-align: middle;
  white-space: nowrap;
`;

export const DetailValue = styled.div`
  display: table-cell;
  vertical-align: middle;
  padding-left: 32px;

  &.value-assignee {
    display: flex;
    gap: 8px;
    button {
      display: inline-block !important;
      border: none;
      height: 40px;
      width: 40px;
      border-radius: 8px;
      background: #ebefff;
      color: #526ed3;
      padding: 0 20px;
      cursor: pointer;
      transition: all 0.3s;

      svg {
        path {
          stroke: #526ed3;
        }
      }

      &:hover {
        background: #dfe3f3;
      }
    }
  }

  &.value-email {
    display: flex;
    flex-direction: column;
  }
`;

export const StyledEmailCC = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

export const ImageEmailCC = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ImageNameEmailCC = styled.div`
  height: 32px;
  width: 32px;
  max-width: 32px;
  min-width: 32px;
  ${cssImgName}
`;

export const DropDownAction: StyledComponent<any, any> = styled(Dropdown)``;

export const ButtonAction = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: #ebefff;
  color: #526ed3;
  padding: 0 24px;
  border-radius: 10px;
  height: 44px;
  gap: 4px;
  margin: 0 auto;
  cursor: pointer;

  span {
    font-weight: 600;
  }

  svg {
    path {
      stroke: #526ed3;
    }
  }
`;

export const ItemAction = styled.div`
  cursor: pointer;
`;
