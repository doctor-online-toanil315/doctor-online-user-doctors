import { ButtonWrapper, Container, Header } from './styles';
import { useTranslation } from 'react-i18next';
import {
  Title,
  Button,
  ImportIcon,
  Table,
  EditIcon,
  DeleteIcon,
  Modal,
  openNotification
} from '@nexthcm/components';
import { Upload } from '../Upload';
import { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';
import { useState } from 'react';
import { useModal } from '@nexthcm/common';
import { TimeLogForm } from '../TimeLogForm';
import { usePostProcessDataCrossCheckMutation } from '../../../../services';

interface TimeLogProps {
  onClose: () => void;
}

const TimeLog = ({ onClose }: TimeLogProps) => {
  const { t } = useTranslation();
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [index, setIndex] = useState<number>(-1);
  const tableInstance = Table.useTable();
  const { isOpen, handleOpen, handleClose } = useModal();
  const [upload, { isLoading }] = usePostProcessDataCrossCheckMutation();
  const [loadingTable, setLoadingTable] = useState<boolean>(false);

  const columns: ColumnsType = [
    {
      title: t('workingHours.cif'),
      dataIndex: 'cif',
      key: 'cif',
      width: '10%'
    },
    {
      title: t('workingHours.fullName'),
      dataIndex: 'fullName',
      key: 'fullName',
      width: '20%'
    },
    {
      title: t('workingHours.office'),
      dataIndex: 'office',
      key: 'office',
      width: '10%'
    },
    {
      title: t('workingHours.date'),
      dataIndex: 'dateTracking',
      key: 'date',
      width: '15%'
    },
    {
      title: t('workingHours.timeIn'),
      dataIndex: 'timeIn',
      key: 'timeIn',
      width: '15%'
    },
    {
      title: t('workingHours.timeOut'),
      dataIndex: 'timeOut',
      key: 'timeOut',
      width: '15%'
    },
    {
      title: t('workingHours.action'),
      dataIndex: 'action',
      key: 'action',
      width: '15%',
      render: (_, record: any, index) => {
        return (
          <Space size="small">
            <div
              className="btn btn-edit"
              onClick={() => {
                setIndex(index);
                handleOpen();
              }}
            >
              <EditIcon />
            </div>
            <div
              className="btn btn-delete"
              onClick={() => {
                setDataSource((prev) => prev.filter((item) => item.key !== record.key));
              }}
            >
              <DeleteIcon />
            </div>
          </Space>
        );
      }
    }
  ];

  const postData = () => {
    let payload = JSON.parse(JSON.stringify(dataSource));
    payload = payload.map((item) => {
      const temp = item;
      delete temp.key;
      delete temp.edited;
      return temp;
    });

    upload({ metaData: payload })
      .unwrap()
      .then(() => {
        openNotification({
          type: 'success',
          message: t('submitSuccessfully')
        });
      })
      .catch((err) => {
        openNotification({
          type: 'error',
          message: t('workingHours.errorUploadFile')
        });
        handleUploadError();
      });
  };

  const checkDisabled = () => {
    const checkDisabledArray = dataSource.filter((item) => !item.edited);
    return checkDisabledArray.length === 0 && dataSource.length !== 0 ? false : true;
  };

  const handleUploadError = () => {
    let newErrorData = JSON.parse(JSON.stringify(dataSource));
    newErrorData = newErrorData.map((item) => ({
      ...item,
      edited: false
    }));

    setDataSource(newErrorData);
  };

  return (
    <Container>
      <Header>
        <Title className="title-timelog">{t('workingHours.importTimeLog')}</Title>
      </Header>
      <div className="upload-container">
        <div style={{ flex: '7' }}>
          <Upload
            accept=".xlsx, .xls, .csv"
            setDataSource={setDataSource}
            maxCount={1}
            uploadName="image"
            subPath="admin-tenant"
            setLoadingTable={(data) => setLoadingTable(data)}
          />
        </div>

        <a
          download
          href="https://qa-nexthcm.banvien.com.vn/assets/files/import-time-log-template.xlsx"
        >
          <Button icon={<ImportIcon />} className="btn-download" height={44}>
            {t('workingHours.downloadSampleFile')}
          </Button>
        </a>
      </div>
      <Table
        rowClassName={(record) =>
          record.edited
            ? 'edited-row'
            : record.isConflictData
            ? 'conflicts-row'
            : record.isDataNotFound
            ? 'isDataNotFound-row'
            : record.isDuplicateRecord
            ? 'duplicated-row'
            : record.isWrongFormat
            ? 'incorrect-row'
            : ''
        }
        dataSource={dataSource}
        className="table table-data"
        totalElements={1}
        totalPages={1}
        loading={loadingTable}
        tableInstance={tableInstance}
        columns={columns}
        showPagination={false}
        locale={{
          emptyText: t('common:table.noResults')
        }}
      />
      <div>
        <p className="data-container">
          <span className="list-data" style={{ backgroundColor: 'rgb(248 113 113)' }}></span>
          {t('workingHours.existingData')}
        </p>
        <p className="data-container">
          <span className="list-data" style={{ backgroundColor: 'rgb(250 204 21)' }}></span>
          {t('workingHours.duplicatedData')}
        </p>
        <p className="data-container">
          <span className="list-data" style={{ backgroundColor: 'rgb(251 146 60)' }}></span>
          {t('workingHours.incorrectFormatData')}
        </p>
        <p className="data-container">
          <span className="list-data" style={{ backgroundColor: 'rgb(156 163 175)' }}></span>
          {t('workingHours.notFoundData')}
        </p>
        <p className="data-container">
          <span className="list-data" style={{ backgroundColor: 'rgb(74 222 128)' }}></span>
          {t('workingHours.editedData')}
        </p>
      </div>
      <ButtonWrapper>
        <Button loading={isLoading} disabled={checkDisabled() || isLoading} onClick={postData}>
          {t('workingHours.save')}
        </Button>
        <Button onClick={onClose} border="outline">
          {t('workingHours.cancel')}
        </Button>
      </ButtonWrapper>
      <Modal destroyOnClose visible={isOpen} onCancel={handleClose}>
        <TimeLogForm
          setData={setDataSource}
          data={dataSource}
          index={index}
          handleCloseModal={handleClose}
        />
      </Modal>
    </Container>
  );
};

export default TimeLog;
