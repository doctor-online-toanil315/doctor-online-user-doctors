import { yupResolver } from '@hookform/resolvers/yup';
import { useFormat } from '@nexthcm/common';
import {
  Button,
  Checkbox,
  DateRangePickerRequired,
  openNotification,
  OptionType,
  Select,
  Text,
  Title
} from '@nexthcm/components';
import { Space } from 'antd';
import FileSaver from 'file-saver';
import { isNull } from 'lodash';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useGetFileExportMutation } from '../../../../services';
import { BtnWrapper, Container } from './style';

interface Props {
  handleCloseModal: () => void;
}

const ExportTimeLogForm = ({ handleCloseModal }) => {
  const { t, i18n } = useTranslation();
  const formatDate = useFormat();

  const [checked, setChecked] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [exportFile, { isLoading }] = useGetFileExportMutation();
  const listType = ['detail', 'aggregate', 'C&B'];
  const formatFromDate = useFormat('MM/DD/YYYY 00:00:00:000', 'DD/MM/YYYY 00:00:00:000');
  const formatToDate = useFormat('MM/DD/YYYY 23:59:59:999', 'DD/MM/YYYY 23:59:59:999');

  const form = useForm({
    defaultValues: { type: 0, filterType: true, dateRange: [] },
    resolver: yupResolver(
      yup.object().shape({
        dateRange: yup.array().min(2, t('common:form.required'))
      })
    )
  });

  const formattedListType: OptionType[] = listType.map((item, index) => {
    return {
      key: index,
      value: index,
      label: item,
      render: () => t(`workingHours.${item}`)
    };
  });

  const { watch } = form;

  useEffect(() => {
    const subscription = watch((value) => {
      if (isNull(value.dateRange)) {
        setIsError(true);
      } else {
        setIsError(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleExport = (data: any) => {
    const payload: any = {
      fromDate: moment(data.dateRange[0]).format('x'),
      toDate: moment(data.dateRange[1]).format('x'),
      exportType: data.type,
      filterType: 'MY_TEAM'
    };
    !checked && delete payload.filterType;
    exportFile(payload)
      .unwrap()
      .then((value) => {
        FileSaver.saveAs(
          value,
          `Time_Log_Report_${data.dateRange[0].format(formatDate)}_to_${data.dateRange[1].format(
            formatDate
          )}.xlsx`
        );
        handleCloseModal();
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
  };

  return (
    <Container>
      <Title className="title">{t(`workingHours.exportTimeLog`)}</Title>
      <FormProvider {...form}>
        <Text className="text-label" strong>
          {t(`workingHours.dateRange`)}
          <span className="required-mark">*</span>
        </Text>
        <DateRangePickerRequired
          format={formatDate}
          message={isError ? t('common:form.required') : ''}
          label=" "
          className="date-range-container"
          name={`dateRange`}
        />
        <div style={{ margin: '22px 0' }}>
          <Select required name="type" title={t(`workingHours.type`)} options={formattedListType} />
        </div>
        <Checkbox onChange={() => setChecked(!checked)}>{t('workingHours.filterMyTeam')}</Checkbox>
        <BtnWrapper>
          <Space size="small">
            <Button
              disabled={isLoading}
              loading={isLoading}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit(handleExport)();
              }}
              size="small"
            >
              {t('save')}
            </Button>
            <Button onClick={handleCloseModal} className="btn-cancel" border="outline" size="small">
              {t('cancel')}
            </Button>
          </Space>
        </BtnWrapper>
      </FormProvider>
    </Container>
  );
};

export default ExportTimeLogForm;
