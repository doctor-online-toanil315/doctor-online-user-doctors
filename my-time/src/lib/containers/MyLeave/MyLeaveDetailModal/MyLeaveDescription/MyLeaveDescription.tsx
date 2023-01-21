import { useModal } from '@nexthcm/common';
import {
  ArrowUpIcon,
  Button,
  DownIcon,
  Modal,
  openNotification,
  Paragraph,
  Tag,
  Text,
  TextEllipsis
} from '@nexthcm/components';
import { Divider, Row, Spin, Tooltip } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Menu } from '../../../../components';
import {
  useGetDetailQuery,
  useGetEscalateQuery,
  usePostEscalateMutation,
  usePutDetailMutation
} from '../../../../services';
import { MyLeaveAvatar } from '../MyLeaveAvatar';
import {
  StyledConfirm,
  StyledDetail,
  StyledDetailLabel,
  StyledDetailRow,
  StyledDetailValue,
  StyledMyLeaveDescription,
  StyledTableButton
} from './styles';

interface MyLeaveDescriptionProps {
  leaveUrl: string;
}

const convertHours = (duration: number) => {
  let minutes: number | string = Math.floor((duration / (1000 * 60)) % 60);
  let hours: number | string = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return hours + ':' + minutes;
};

const MyLeaveDescription = (props: MyLeaveDescriptionProps) => {
  const { leaveUrl } = props;

  const [user, setUser] = useState<any>({});
  const [nextStateId, setNextStateId] = useState<string>('');
  const [nextStateName, setNextStateName] = useState<string>('');
  const [ellipsis, setEllipsis] = useState({
    expand: true,
    counter: 0
  });
  const { isOpen, handleClose, handleOpen } = useModal();
  const { t, i18n } = useTranslation();
  const { data: detailData, isLoading: isGettingDetail } = useGetDetailQuery({ url: leaveUrl });
  const { data: escalateData } = useGetEscalateQuery(
    {
      id: detailData?.data?.escalateDTO?.id,
      type: leaveUrl.split('/')[0],
      leaveId: leaveUrl.split('/')[1]
    },
    {
      skip: !detailData?.data?.escalateDTO?.id,
      refetchOnMountOrArgChange: true
    }
  );
  const [putState, { isLoading: isPuttingState }] = usePutDetailMutation();
  const [postEscalate, { isLoading: isPostingEscalate }] = usePostEscalateMutation();

  const menu = (
    <Menu
      items={detailData?.data?.nextStates?.map((item) => ({
        label: (
          <Button
            key={item?.id}
            onClick={() => {
              handleOpen();
              setNextStateId(item?.state?.id);
              setNextStateName(item?.transition?.name);
            }}
          >
            {item?.transition?.name}
          </Button>
        ),
        key: item?.id
      }))}
    />
  );

  const formatDateRange = (data) => {
    const dateRange = data?.items[0]?.fullDay
      ? `${moment(data?.fromDate).format('l')}`
      : `${moment(data?.fromDate).format('l')}${
          moment(data?.fromDate).format('l').toString() !==
          moment(data?.toDate).format('l').toString()
            ? ' - ' + moment(data?.toDate).format('l')
            : ''
        } ${
          data?.items[0]?.morning || data?.items[0]?.after
            ? '(' +
              t(
                data?.items[0]?.morning
                  ? t('myTime.myLeave.option.morning')
                  : t('myTime.myLeave.button.afternoon')
              ) +
              ')'
            : data?.items[0]?.fromTime
            ? '(' +
              convertHours(data?.items[0]?.fromTime * 1000) +
              ' - ' +
              convertHours(data?.items[0]?.toTime * 1000) +
              ')'
            : ''
        }`;

    return dateRange;
  };

  const handlePostEscalate = () => {
    postEscalate({
      type: leaveUrl.split('/')[0],
      escalateId: detailData?.data?.escalateDTO?.directReport?.id,
      objectId: leaveUrl.split('/')[1]
    })
      .unwrap()
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

  const handleOnClickConfirm = () => {
    if (nextStateId) {
      putState({
        url: leaveUrl,
        request: {
          nextState: nextStateId
        }
      })
        .unwrap()
        .then(() => {
          handleClose();
          openNotification({
            type: 'success',
            message: t('myTime.myLeave.notification.updateSuccess')
          });
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
    }
  };

  useEffect(() => {
    if (detailData) {
      setUser(detailData?.data?.employeeDTO);
    }
  }, [leaveUrl, detailData]);

  return (
    <StyledMyLeaveDescription>
      <Spin spinning={isPostingEscalate || isGettingDetail}>
        <StyledDetail>
          <StyledDetailRow>
            <StyledDetailLabel>{t('myTime.myLeave.groupControl.title.cif')}:</StyledDetailLabel>
            <StyledDetailValue>{user?.cif}</StyledDetailValue>
          </StyledDetailRow>
          <StyledDetailRow>
            <StyledDetailLabel>{t('myTime.myLeave.groupControl.title.office')}:</StyledDetailLabel>
            <StyledDetailValue>{user?.office?.name}</StyledDetailValue>
          </StyledDetailRow>
          <StyledDetailRow>
            <StyledDetailLabel>{t('myTime.myLeave.groupControl.title.status')}:</StyledDetailLabel>
            <StyledDetailValue>
              <Tag color={detailData?.data?.currentState?.stateType?.color}>
                {detailData?.data?.currentState?.name}
              </Tag>
            </StyledDetailValue>
          </StyledDetailRow>
          <StyledDetailRow>
            <StyledDetailLabel>
              {t('myTime.myLeave.groupControl.title.requestType')}:
            </StyledDetailLabel>
            <StyledDetailValue>{t(`myTime.myLeave.${leaveUrl.split('/')[0]}`)}</StyledDetailValue>
          </StyledDetailRow>
          <StyledDetailRow>
            <StyledDetailLabel>
              {t('myTime.myLeave.groupControl.title.assignee')}:
            </StyledDetailLabel>
            <StyledDetailValue>
              <Row>
                <MyLeaveAvatar
                  name={detailData?.data?.escalateDTO?.name}
                  image={detailData?.data?.escalateDTO?.image}
                />
                <Text>{detailData?.data?.escalateDTO?.name}</Text>
                {!!escalateData?.data && (
                  <Tooltip
                    placement="bottomRight"
                    color="#064ABD"
                    overlayClassName="tooltip-assignee"
                    title="Assign to a higher level supervisor"
                  >
                    <Button
                      onClick={handlePostEscalate}
                      icon={<ArrowUpIcon width={20} height={20} />}
                    />
                  </Tooltip>
                )}
              </Row>
            </StyledDetailValue>
          </StyledDetailRow>
          <StyledDetailRow>
            <StyledDetailLabel>
              {t('myTime.myLeave.groupControl.title.leaveType')}:
            </StyledDetailLabel>
            <StyledDetailValue>{detailData?.data?.leaveType?.name}</StyledDetailValue>
          </StyledDetailRow>
          <StyledDetailRow>
            <StyledDetailLabel>
              {t('myTime.myLeave.groupControl.title.dateRange')}:
            </StyledDetailLabel>
            <StyledDetailValue>{formatDateRange(detailData?.data)}</StyledDetailValue>
          </StyledDetailRow>
          <StyledDetailRow>
            <StyledDetailLabel>{t('myTime.myLeave.groupControl.title.days')}:</StyledDetailLabel>
            <StyledDetailValue>
              {detailData?.data?.durationInDay ? detailData?.data?.durationInDay : '-'}
            </StyledDetailValue>
          </StyledDetailRow>
          <StyledDetailRow>
            <StyledDetailLabel>{t('myTime.myLeave.groupControl.title.emailCC')}:</StyledDetailLabel>
            <StyledDetailValue>
              {detailData?.data?.sendToDTOs
                ? detailData?.data?.sendToDTOs?.map((item) => (
                    <Row key={item?.id}>
                      <MyLeaveAvatar name={item?.name} image={item?.image} />
                      <Text>{item.name}</Text>
                    </Row>
                  ))
                : ''}
            </StyledDetailValue>
          </StyledDetailRow>
          <StyledDetailRow>
            <StyledDetailLabel>{t('myTime.myLeave.groupControl.title.comment')}:</StyledDetailLabel>
            <StyledDetailValue>
              <TextEllipsis data={detailData?.data?.comment} />
            </StyledDetailValue>
          </StyledDetailRow>
        </StyledDetail>

        {detailData?.data?.nextStates?.length > 0 && (
          <>
            <Divider />
            <Dropdown overlay={menu} trigger={['click']}>
              <StyledTableButton>
                <span>{t('action')}</span>
                <DownIcon width={16} height={16} />
              </StyledTableButton>
            </Dropdown>
          </>
        )}
      </Spin>

      <Modal
        type="confirm"
        visible={isOpen}
        onCancel={handleClose}
        confirmIcon="?"
        title={
          <>
            {t('myTime.myLeave.warning.updatingWarning')} <br />
            {nextStateName}
          </>
        }
      >
        <StyledConfirm>
          <Button key="back" border="cancel" height={44} onClick={handleClose}>
            {t('common:confirm.cancel')}
          </Button>
          <Button key="submit" height={44} loading={isPuttingState} onClick={handleOnClickConfirm}>
            {t('common:confirm.ok')}
          </Button>
        </StyledConfirm>
      </Modal>
    </StyledMyLeaveDescription>
  );
};

export default MyLeaveDescription;
