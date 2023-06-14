import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  EditorContainer,
  Label,
  StyledErrorMessage,
  StyledQuillContainer,
} from "./styles";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MyCustomUploadAdapterPlugin } from "./extra-plugins";

export interface EditorProps {
  placeholder?: string;
  name: string;
  required?: boolean;
  label?: string;
  enableReinitialize?: boolean; // use this flag to enable reinitialize, this flag is used to trigger simulate click action of user to display image in first time initial editor
}

const CustomCkEditor = ({
  enableReinitialize = false,
  ...props
}: EditorProps) => {
  const { t } = useTranslation();
  const { name, label, required, placeholder } = props;
  const [editorContent, setEditorContent] = useState<string>("");
  const [editorRef, setEditorRef] = useState<any>(null);

  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const watchField = watch(name);

  const errorMessage = errors[props.name]?.["message"]
    ? errors[props.name]?.["message"]
    : "";

  useEffect(() => {
    setEditorContent(watchField ?? "");
  }, [watchField]);

  // simulate click action of user for trigger editor change source attribute
  // of image from subPath to Base64
  const isFirstRunRef = useRef<boolean>(true);
  useEffect(() => {
    if (isFirstRunRef.current && editorContent && enableReinitialize) {
      const triggerFocus = setTimeout(() => {
        document.getElementById("required-mark")?.focus();
      }, 150);
      isFirstRunRef.current = false;
    }
  }, [editorContent]);

  return (
    <StyledQuillContainer>
      <input className="hidden" id="required-mark" />
      {label && (
        <Label>
          {label}
          {required ? <span className="required-mark">*</span> : null}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ...field } }) => (
          <EditorContainer {...props} error={Boolean(errorMessage)}>
            <CKEditor
              config={{
                extraPlugins: [MyCustomUploadAdapterPlugin],
              }}
              onChange={(_, editor) => {
                const content = editor.getData();
                onChange(content.replace("img data-src=", "img src="));
                setEditorContent(content);
              }}
              editor={ClassicEditor}
              data={editorContent}
              onReady={(editor) => {
                setEditorRef(editor);
                enableReinitialize && editor.focus();
              }}
            />
          </EditorContainer>
        )}
      />
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </StyledQuillContainer>
  );
};

export default CustomCkEditor;
