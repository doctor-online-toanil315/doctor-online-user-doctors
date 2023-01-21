import { Modal } from '@nexthcm/components';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { number } from 'yup';
import { formatInTimeOutTime } from '../../../utils/utils';
import { WorkingHoursType } from '../OnlyMe';

interface WorkingHoursDetailProps {
  isShowModal?: boolean;
  onCloseModal?: () => void;
  dataView?: WorkingHoursType;
}

const WorkingHoursDetail = ({ isShowModal, onCloseModal, dataView }: WorkingHoursDetailProps) => {
  const { t } = useTranslation();
  const [isShowModalView, setIsShowModalView] = useState(isShowModal);

  const workingHoursDetail = [
    { key: t('workingHours.date'), value: dataView?.trackingDate },

    { key: t('workingHours.office'), value: dataView?.office },

    {
      key: t('workingHours.timeInDetail'),
      value: formatInTimeOutTime(dataView?.inTime || 0)
    },
    {
      key: t('workingHours.timeOutDetail'),
      value: formatInTimeOutTime(dataView?.outTime || 0)
    },
    {
      key: t('workingHours.totalWorkingTime'),
      value: ((dataView?.totalWorkingTime || 0) / 3600).toFixed(1),
      line: true
    },
    { key: t('workingHours.workingDays'), value: dataView?.workingDay, line: true },
    { key: t('workingHours.otDetail'), value: dataView?.ot, line: true },
    { key: t('workingHours.workingOnsite'), value: dataView?.onsiteDay, line: true },
    { key: t('workingHours.leave'), value: dataView?.leaveType }
  ];

  const handleCancle = () => {
    setIsShowModalView(false);
    onCloseModal && onCloseModal();
  };

  return (
    <Modal
      title={t('Working hours detail')}
      footer={null}
      className="modal__working-hours-detail--section"
      visible={isShowModalView}
      onCancel={handleCancle}
    >
      {workingHoursDetail.map(
        (label: { key: string; value: any; line?: boolean }, index: number) => {
          const isLine = (!label.value || Number(label.value) === 0) && label.line;
          const isShowTimeInTimeOut = label.value === '00:00';
          return (
            <div key={index} style={{ display: 'flex' }} className="modal__working-hours-detail">
              <div className="title__working-hours-detail">
                <label> {label.key}: </label>
              </div>
              <div className="title__working-hours-detail--sub">
                {isLine ? '-' : isShowTimeInTimeOut ? '' : label.value}
              </div>
            </div>
          );
        }
      )}
    </Modal>
  );
};

export default WorkingHoursDetail;
