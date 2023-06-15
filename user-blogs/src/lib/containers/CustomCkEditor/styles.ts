import styled, { css, StyledComponent } from 'styled-components';
import { EditorProps } from './CustomCkEditor';

export const StyledQuillContainer: StyledComponent<any, any> = styled.div`
  .hidden {
    height: 0;
    opacity: 0;
    border: 0;
    pointer-events: none;
  }
`;

export const StyledVariablesContent: StyledComponent<any, any> = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  label {
    align-self: flex-start;
    width: fit-content;
    font-weight: 400;
    font-size: 15px;
  }
`;

export const Label: StyledComponent<any, any> = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${(props) => props.theme.textDefault};
  text-align: left;
  display: flex;
  .required-mark {
    color: red;
  }
`;

export const StyledErrorMessage: StyledComponent<any, any> = styled.span`
  font-size: 13px;
  line-height: 20px;
  color: ${(props) => props.theme.red};
  display: inline-block;
  margin-top: 4px;
  width: 100% !important;
  text-align: left;
`;

export const EditorContainer = styled.div<EditorProps & { error: boolean }>`
  .ck.ck-editor {
    display: block;
    border: 1px solid ${(props) => props.theme.baseGray};
    border-radius: 10px;
    box-shadow: 0 2px 3px rgb(0 0 0 / 10%);
    transition: 0.2s ease-in-out;
    transition-property: box-shadow, background, border-color;
    background: ${(props) => props.theme.secondaryText};

    &:has(.ck-editor__main) {
      &:has(.ck-focused) {
        border-color: ${(props) => props.theme.strongBlue};
        border-width: 2px;

        .ck-editor__top {
          .ck.ck-toolbar {
            border-color: ${(props) => props.theme.strongBlue};
            border-width: 2px;
          }
        }
      }
    }

    ${({ error, theme }) =>
      error &&
      css`
        border-color: ${theme.red} !important;
        border-width: 2px;
      `}

    .ck.ck-editor__main {
      font-size: 14px;
      border-radius: 0 0 10px 10px;
      overflow: hidden;
      transition: 0.3s ease-in-out;
      transition-property: box-shadow, background;

      .ck-content {
        min-height: 200px;
        padding: 12px 15px;
        border-radius: 0 0 10px 10px;

        p {
          font-family: 'Helvetica', 'Arial', 'sans-serif' !important;
          color: ${(props) => props.theme.black};
        }
      }

      .ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable) {
        border: 0;
      }
    }
  }

  .ck.ck-editor__top {
    position: relative;
    box-shadow: 0 2px 3px rgb(0 0 0 / 10%);
    z-index: 2;

    .ck.ck-toolbar {
      padding: 3px;
      border-radius: 10px 10px 0 0 !important;
      border: 0;
      border-bottom: 1px solid ${(props) => props.theme.baseGray};
      transition: 0.2s ease-in-out;
      transition-property: box-shadow, background, border-color;

      ${({ error, theme }) =>
        error &&
        css`
          border-bottom: 2px solid ${theme.red} !important;
        `}
    }
  }

  .ck.ck-editor__main {
    .ck-content.ck {
      border: 0 !important;
    }
  }

  .template-variable {
    padding: 4px 6px;
    background-color: rgb(219, 234, 254);
    font-size: 12px;
    color: ${({ theme }) => theme.text};
    border-radius: 20px;
    .ck.ck-reset_all.ck-widget__type-around {
      display: none;
    }

    img {
      max-width: 90%;
    }
  }
`;
