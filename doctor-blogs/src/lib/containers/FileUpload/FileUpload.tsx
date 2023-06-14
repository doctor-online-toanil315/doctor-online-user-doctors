import React, { ChangeEvent, useEffect, useState } from "react";
import { Progress, ProgressBar, StyledFileUpload } from "./styled";
import Upload from "./upload";
import { DeleteIcon, UploadIcon } from "doctor-online-components";

export interface FileUploadProps {
  label?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  error?: { message?: string };
  isRequired?: boolean;
  accept?: "video" | "image";
  value?: string;
  name: string;
  readonly?: boolean;
  baseUrl: string;
}

const FileUpload = ({
  label,
  error,
  onChange,
  onClear,
  isRequired,
  value,
  accept = "image",
  readonly = false,
  baseUrl,
  ...restProps
}: FileUploadProps) => {
  const { name } = restProps;
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0);
  const [linkFile, setLinkFile] = useState<string>("");

  useEffect(() => {
    setLinkFile(value ?? "");
    setShowProgress(!!value);
  }, [value]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileData = files[0];
      const fileType = files[0].type.split("/")[0];

      if (fileType === accept) {
        // reset file upload component before upload new file to server
        setShowProgress(true);
        setPercentage(0);
        setLinkFile("");

        const formData = new FormData();
        formData.append("file", fileData);

        const config = {
          onUploadProgress: function (progressEvent: ProgressEvent) {
            let percentCompleted = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            if (percentCompleted === 100) {
              percentCompleted -= 1;
            }
            setPercentage(percentCompleted);
          },
        };

        const dataUpload = await Upload(baseUrl, formData, config, fileType);
        setPercentage(100);
        onChange && onChange(dataUpload ?? "");
        setLinkFile(dataUpload ?? "");
      }
      e.target.value = "";
    }
  };

  const handleCancel = () => {
    onChange && onChange("");
    setShowProgress((prev) => false);
    setPercentage((prev) => 0);
    setLinkFile((prev) => "");
  };

  return (
    <StyledFileUpload error={Boolean(error?.message)} readonly={readonly}>
      {label && (
        <p className="title">
          <span>{label}</span>
          {isRequired && <span className="danger"> *</span>}
        </p>
      )}

      <label
        style={{
          cursor: "pointer",
          pointerEvents: readonly ? "none" : "unset",
        }}
        htmlFor={name}
      >
        <div className="label center">
          <p>
            <UploadIcon />
            Drop yor file here, or <span className="highlight">Browse</span>
          </p>
          <p className="max-size">Max size 10MB</p>
        </div>
      </label>
      <input
        {...restProps}
        onChange={handleFileChange}
        id={name}
        hidden
        type="file"
        accept="video/*,image/*"
      />
      {showProgress ? (
        <ProgressBar>
          <p className="upload-status">
            {percentage === 100 || linkFile ? "Uploaded" : "Uploading..."}
          </p>
          {percentage === 100 || linkFile ? (
            <div className="link">
              <a
                className="file-link"
                target="_blank"
                rel="noreferrer"
                href={linkFile}
              >
                <p>{linkFile}</p>
              </a>
              {!readonly && (
                <div onClick={handleCancel}>
                  <DeleteIcon />
                </div>
              )}
            </div>
          ) : (
            <div className="center">
              <Progress width={percentage} />
              <p className="percent">{percentage}%</p>
            </div>
          )}
        </ProgressBar>
      ) : null}
      {error?.message && <span className="danger">{error.message}</span>}
    </StyledFileUpload>
  );
};

export default FileUpload;
