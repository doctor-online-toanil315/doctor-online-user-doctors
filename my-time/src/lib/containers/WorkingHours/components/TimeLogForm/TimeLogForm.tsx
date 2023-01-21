import { yupResolver } from '@hookform/resolvers/yup';
import { useFormat } from '@nexthcm/common';
import { Button, DatePicker, Input, TimeCircleIcon } from '@nexthcm/components';
import { Space } from 'antd';
import moment from 'moment';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { BtnWrapper, Container } from './style';

interface Props {
  handleCloseModal: () => void;
  data: any[];
  index: number;
  setData: (data: any[]) => void;
}

const TimeLogForm = ({ handleCloseModal, data, index, setData }: Props) => {
  const { t } = useTranslation();
  const formatDate = useFormat();

  const form = useForm({
    defaultValues: {
      cif: data[index].cif,
      name: data[index].fullName,
      office: data[index].office,
      date: moment(data[index].dateTracking, 'DD-MM-YYYY'),
      timeIn: data[index].timeIn,
      timeOut: data[index].timeOut
    },
    resolver: yupResolver(
      yup.object().shape({
        cif: yup.string().required(t('common:form.required')),
        name: yup.string().required(t('common:form.required')),
        office: yup.string().required(t('common:form.required')),
        date: yup.date().required(t('common:form.required')),
        timeIn: yup.string().required(t('common:form.required')),
        timeOut: yup.string().required(t('common:form.required'))
      })
    )
  });

  const handleSave = (dataForm) => {
    const updateData = data.map((item, count) =>
      count === index
        ? {
            ...item,
            edited: true,
            cif: dataForm.cif,
            fullName: dataForm.name,
            office: dataForm.office,
            timeIn: dataForm.timeIn,
            timeOut: dataForm.timeOut,
            dateTracking: moment(dataForm.date).format('DD-MM-YYYY')
          }
        : item
    );
    setData(updateData);
    handleCloseModal();
  };

  return (
    <Container>
      <FormProvider {...form}>
        <Input
          label={t('modal.cif')}
          required
          name="cif"
          placeholder={t('workingHours.enterCIF')}
        />
        <div style={{ margin: '20px 0' }}>
          <Input
            label={t('modal.name')}
            required
            name="name"
            placeholder={t('workingHours.enterName')}
          />
        </div>
        <Input
          label={t('modal.office')}
          required
          name="office"
          placeholder={t('workingHours.enterOffice')}
        />
        <div style={{ margin: '20px 0' }}>
          <DatePicker
            format={formatDate}
            label={t('modal.date')}
            required
            name="date"
            placeholder={t('workingHours.chooseADate')}
          />
        </div>
        <div className="container-specify-time">
          <Input
            required
            label={t('workingHours.timeInDetail')}
            icons={<TimeCircleIcon />}
            subLabel={t('workingHours.enterInTime')}
            type="time"
            name="timeIn"
          />
          <Input
            required
            label={t('workingHours.timeOutDetail')}
            icons={<TimeCircleIcon />}
            subLabel={t('workingHours.enterOutTime')}
            type="time"
            name="timeOut"
          />
        </div>
        <BtnWrapper>
          <Space size="small">
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit(handleSave)();
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

export default TimeLogForm;
