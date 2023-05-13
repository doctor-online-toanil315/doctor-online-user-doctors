import styled, { css } from 'styled-components';

export const StyledFileUpload = styled.div<{
  error: boolean;
  readonly: boolean;
}>`
  width: 100%;

  .title {
    font-weight: 600;
    font-size: 13px;
    line-height: 22px;
    color: ${({ theme }) => theme.primaryText};
    margin-bottom: 5px;
  }

  .danger {
    color: ${({ theme }) => theme.red};
    font-size: 13px;
    line-height: 20px;
    display: inline-block;
    margin-top: 4px;
    width: 100% !important;
    text-align: left;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .label {
    padding: 12px 20px;
    background-color: transparent;
    border: 1px dashed ${({ theme }) => theme.strongBlue};
    border-radius: 6px;
    margin: 0 0 5px;

    display: flex;
    flex-flow: column nowrap;

    ${({ error, theme }) =>
      error &&
      css`
        border-color: ${theme.red} !important;
      `}

    ${({ readonly }) =>
      readonly &&
      css`
        pointer-events: none !important;
      `}

    p {
      display: flex;
      align-items: center;
      gap: 4px;

      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      color: ${({ theme }) => theme.baseGray03};
      margin-bottom: 5px;

      .highlight {
        font-size: 600;
        color: ${({ theme }) => theme.strongBlue};
      }
    }

    .max-size {
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: ${({ theme }) => theme.baseGray03};
    }
  }

  .upload-status {
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: ${({ theme }) => theme.baseGray03};
    margin-bottom: 0;
  }

  .percent {
    padding: 0 0 0 10px;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    color: ${({ theme }) => theme.primaryText};
    margin-bottom: 0;
  }

  .link {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    .file-link {
      font-weight: 500;
      font-size: 13px;
      line-height: 22px;
      color: ${({ theme }) => theme.primaryText};
      margin-bottom: 0;
      display: inline-block;
      width: 85%;
      overflow-x: hidden;
      white-space: nowrap;

      p {
        margin-bottom: 0;
      }
    }
  }

  svg {
    width: 20px !important;
    margin-right: 5px;
    cursor: pointer;
    path {
      stroke: ${({ theme }) => theme.strongBlue};
    }
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  padding: 6px 15px;
  background-color: ${({ theme }) => theme.lightGray};
  border-radius: 6px;
`;

interface ProgressProps {
  width: number;
}

export const Progress = styled.div<ProgressProps>`
  position: relative;
  transform: translateY(-50%);
  width: 95%;
  height: 2px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.baseGray03};
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ width }) => `${width}%`};
    background-color: ${({ theme }) => theme.strongBlue};
    transition: all 0.1s linear;
  }
`;
