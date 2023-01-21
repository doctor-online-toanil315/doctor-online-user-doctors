import { CheckCircleOutlined } from '@ant-design/icons';
import { openNotification, CloseIcon, ErrorUploadIcon } from '@nexthcm/components';
import { UploadProps as AntUploadProps, message } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePostDataCrossCheckMutation } from '../../../../services';
import { StyledUpload } from './style';

export interface UploadProps extends AntUploadProps {
  uploadName: string;
  message?: string;
  subPath: string;
  value?: string;
  setDataSource: (dataSource: any) => void;
  setLoadingTable: (loadingTable: boolean) => void;
}

const Upload = (props: UploadProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [showInput, setShowInput] = useState<boolean>(true);
  const [showInputDiv, setShowInputDiv] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [upload, { isLoading }] = usePostDataCrossCheckMutation();
  const [isError, setIsError] = useState<boolean>(false);
  const [uploadFailed, setUploadFailed] = useState<boolean>(false);

  const { t } = useTranslation();

  const onClickDel = () => {
    setShowInput(true);
    setShowInputDiv(false);
    setFileList([]);
    setIsDisabled(false);
  };

  useEffect(() => {
    props.setLoadingTable(isLoading);
  }, [isLoading]);

  return (
    <StyledUpload
      disabled={isDisabled}
      fileList={fileList}
      beforeUpload={() => {
        return false;
      }}
      onChange={(object) => {
        const isExcel =
          object.file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        setFileList(object.fileList);
        if (!isExcel) {
          setIsError(true);
        } else {
          setIsError(false);
          const formData = new FormData();
          formData.append('file', object.fileList[0].originFileObj as any);
          upload(formData)
            .unwrap()
            .then((res) => {
              props.setDataSource(
                JSON.parse(res).data.map((item, index) => ({
                  ...item,
                  key: index,
                  edited: false
                }))
              );
              setShowInput(false);
              setShowInputDiv(true);
              setIsDisabled(true);
            })
            .catch((err) => {
              setIsError(true);
              setUploadFailed(true);
              openNotification({
                type: 'error',
                message: t('workingHours.errorUploadFile')
              });
            });
        }
      }}
      {...props}
    >
      <>
        {showInput && (
          <>
            <div className="info-subtext">
              <div className="text">{t('workingHours.chooseAFile')}</div>
              <div className="sub-text">{t('workingHours.dragFileHere')}</div>
            </div>
            <label htmlFor="info-text" />
          </>
        )}

        {showInputDiv && (
          <>
            {fileList.map((data, index) => (
              <div className="name-input" key={index}>
                <div className="info-input">
                  <div className="check-input">
                    <CheckCircleOutlined />
                  </div>
                  <div className="text-input">{data.name}</div>
                </div>
                <button className="delete-input" onClick={onClickDel}>
                  <CloseIcon width={10} height={10} />
                </button>
              </div>
            ))}
          </>
        )}
      </>
      {isError && fileList.length !== 0 && (
        <div className="error-upload" onClick={(e) => e.stopPropagation()}>
          {fileList.map((data, index) => (
            <div className="name-input" key={index}>
              <div className="info-input">
                <div className="check-input">
                  <ErrorUploadIcon />
                </div>
                <div className="text-input">
                  <div>{data.name}</div>
                  <div className="error-message">
                    {uploadFailed ? t('workingHours.errorUpload') : t('workingHours.wrongFileType')}
                  </div>
                </div>
              </div>
              <button className="delete-input" onClick={onClickDel}>
                <CloseIcon width={10} height={10} />
              </button>
            </div>
          ))}
        </div>
      )}
    </StyledUpload>
  );
};

export default Upload;
