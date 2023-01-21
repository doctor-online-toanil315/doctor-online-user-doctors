import { Upload } from 'antd';
import { UploadProps } from './Upload';
import styled, { StyledComponent } from 'styled-components';

export const StyledUpload: StyledComponent<any, any> = styled(Upload)<UploadProps>`
  .ant-upload.ant-upload-select.ant-upload-select-text {
    width: 100%;
  }

  .ant-upload-disabled:hover {
    cursor: default;
  }

  cursor: pointer;

  .info-subtext {
    display: flex;
    height: 56px;
    border-color: ${(props) => props.theme.strongBlue} !important;
    border: 1px dashed;
    border-radius: 10px;
    justify-content: center;
    align-items: center;

    .text {
      color: rgb(88, 109, 204);
    }

    .sub-text {
      margin-left: 5px;
      color: rgb(108, 110, 127);
    }
  }

  .ant-upload-list-item-info {
    display: none;
  }

  .info-subtext:hover {
    background: rgb(224, 227, 242);
  }

  .name-input {
    padding: 15px 9px;
    border: 1px solid #ededed;
    border-radius: 10px;
    height: 55px;
    display: flex;
    justify-content: space-between;

    .text-input {
      color: #000;
    }

    .delete-input {
      display: none;
    }

    &:hover {
      .delete-input {
        display: block;
        color: black !important;
        background: transparent;
        border: none;
        font-weight: 700;
        opacity: 0.7;
        cursor: pointer;
      }
    }
  }

  .error-upload {
    margin-top: 4px;
    .text-input {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .error-message {
        color: red;
      }
    }

    .delete-input {
      display: none;
    }

    &:hover {
      cursor: default;
      .delete-input {
        display: block;
        color: black !important;
        background: transparent;
        border: none;
        font-weight: 700;
        opacity: 0.7;
        cursor: pointer;
      }
    }
  }

  .ant-upload-list.ant-upload-list-text {
    display: none;
  }

  .info-input {
    display: flex;

    .check-input {
      margin-right: 10px;

      svg {
        font-size: 22px;
        color: green !important;
      }
    }
  }
`;
