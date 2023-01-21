import React, { useEffect, useState } from 'react';
import { Button, Modal, openNotification, Table, Tag, Title } from '@nexthcm/components';
import { FormProvider, useForm } from 'react-hook-form';
import { Radio, RadioChangeEvent } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { useBulkApproveMutation } from '../../services';
import { StyledBulkChange, StyledButtons, StyledContainer, StyledGroup } from './styles';

interface BulkChangeProps {
  dataBulk: any;
  onCloseDrawer: () => void;
  onReload?: () => void;
  type: string;
  columnBulk: ColumnsType<any>;
  dataFormat: any;
}

const BulkChange = ({
  dataFormat,
  columnBulk,
  dataBulk,
  onCloseDrawer,
  type,
  onReload
}: BulkChangeProps) => {
  const form = useForm();
  const { t, i18n } = useTranslation();
  const tableInstance = Table.useTable();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nextState, setNextState] = useState<string>(dataBulk[0].data[0].targetStatus.id);
  const [tableIndex, setTableIndex] = useState(0);
  const [dataTable, setDataTable] = useState(dataBulk[0].data[0].requests);
  const [updateStatus, { isLoading }] = useBulkApproveMutation();

  useEffect(() => {
    setDataTable(dataBulk[0].data[0].requests);
    setNextState(dataBulk[0].data[0].targetStatus.id);
    setTableIndex(0);
  }, [dataBulk]);
  const onChange = (e: RadioChangeEvent, itemBulk: any, index) => {
    const selectData = itemBulk.data.find((item) => item.targetStatus.id === e.target.value);
    if (selectData) {
      setDataTable(selectData.requests);
      setNextState(e.target.value);
      setTableIndex(index);
    }
  };
  const confirmUpdateStatus = () => {
    const payload = dataTable?.map((item: any) => {
      return {
        id: item.id,
        request: {
          nextState: nextState
        }
      };
    });
    updateStatus({ type: type, body: payload })
      .unwrap()
      .then(() => {
        openNotification({
          type: 'success',
          message: t('common:notification.updateSuccess', { name: '' })
        });
        onCloseDrawer();

        if (onReload) {
          onReload();
        }
      })
      .catch((error) => {
        const errorMessage = i18n.exists(`common:ERRORS.${error.data.message}`)
          ? t(`common:ERRORS.${error.data.message}`)
          : t(`common:HTTP_RESPONSE_ERROR_MESSAGES.${error.status}`);
        openNotification({
          type: 'error',
          message: errorMessage
        });
      });
    setIsModalVisible(false);
  };
  return (
    <StyledBulkChange>
      <Title level={1}>{t('bulkChange')}</Title>
      <FormProvider {...form}>
        {dataBulk?.map((itemBulk: any, index: number) => (
          <section key={itemBulk.name}>
            <StyledContainer>
              <div className="group-status">
                {Array.isArray(itemBulk.name) && (
                  <StyledGroup>
                    <div className="status">{t('leaveType') + ':'}</div>
                    {itemBulk.name.map((item: string) => (
                      <div key={item}>{item}</div>
                    ))}
                  </StyledGroup>
                )}
                <StyledGroup>
                  <div className="status">{t('status') + ':'}</div>
                  <Radio.Group onChange={(e) => onChange(e, itemBulk, index)} value={nextState}>
                    {itemBulk.data.map((item) => (
                      <Radio.Button key={item.targetStatus.id} value={item.targetStatus.id}>
                        <Tag color={item.targetStatus.stateType?.color}>
                          {item.targetStatus.name}
                        </Tag>
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </StyledGroup>
              </div>
              {tableIndex === index && (
                <Table
                  tableInstance={tableInstance}
                  totalElements={dataTable.length}
                  totalPages={1}
                  columns={columnBulk.map((item) => {
                    return {
                      ...item,
                      sorter: false
                    };
                  })}
                  dataSource={dataFormat(dataTable)}
                  loading={false}
                  showPagination={false}
                />
              )}
            </StyledContainer>
            <Modal
              type="confirm"
              visible={isModalVisible}
              onCancel={() => setIsModalVisible(false)}
              className="modal-confirm-employees"
              confirmIcon="?"
              title={t('performOperation')}
            >
              <div className="button" style={{ justifyContent: 'center' }}>
                <Button
                  className="button-cancel"
                  height={44}
                  key="back"
                  border="outline"
                  onClick={() => setIsModalVisible(false)}
                >
                  {t('common:confirm.cancel')}
                </Button>
                <Button
                  className="button-ok"
                  height={44}
                  key="submit"
                  onClick={confirmUpdateStatus}
                >
                  {t('common:confirm.ok')}
                </Button>
              </div>
            </Modal>
          </section>
        ))}
        <StyledButtons>
          <Button
            height={56}
            loading={isLoading}
            disabled={isLoading}
            key="submit"
            onClick={() => setIsModalVisible(true)}
          >
            {t('common:confirm.save')}
          </Button>
          <Button height={56} key="back" border="outline" onClick={() => onCloseDrawer()}>
            {t('common:confirm.cancel')}
          </Button>
        </StyledButtons>
      </FormProvider>
    </StyledBulkChange>
  );
};

export default BulkChange;
