import styled, { css, StyledComponent } from 'styled-components';
import { Collapse as AntCollapse, CollapseProps } from 'antd';
import { flexCenter } from '@nexthcm/common';

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

export const StyledDetailModal = styled.div`
  padding: 16px;
`;

export const Collapse: StyledComponent<any, any> = styled(AntCollapse)`
  .ant-collapse-item {
    border-top: 1px solid #d7d7d7;
    .ant-collapse-header {
      min-height: 56px;
      padding: 12px 20px;
      align-items: center;

      .ant-collapse-expand-icon {
        order: 2;
      }

      .ant-collapse-header-text {
        text-transform: uppercase;
        font-weight: 600;
      }
    }

    &:hover {
      .ant-collapse-header {
        background: #f6f6f6;
      }
    }

    .ant-collapse-content-box {
      padding: 20px;
    }
  }
`;

export const StyledPanel = styled(AntCollapse.Panel)``;

export const AvatarItem = styled.img`
  height: 24px;
  width: 24px;
  border-radius: 50%;
  object-fit: cover;
`;
export const ImageNameItem = styled.div`
  height: 24px;
  width: 24px;
  min-width: 24px;
  max-width: 24px;
  ${cssImgName}
`;

export const ButtonFunction = styled.div`
  cursor: pointer;
  width: 32px;
  height: 32px;
  ${flexCenter}
  border-radius: 10px;
  transition: all 0.3s;

  svg {
    path {
      fill: ${(props) => props.theme.blue};
      transition: all 0.3s;
    }
  }

  &:hover {
    background: ${(props) => props.theme.softBlue};
    svg {
      path {
        fill: ${(props) => props.theme.blueHover};
      }
    }
  }
`;

export const StyledConfirm = styled.div`
  display: flex;
  z-index: 1;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: auto;
  margin: 1.25em auto 0;
  padding: 0;
  gap: 20px;
`;
