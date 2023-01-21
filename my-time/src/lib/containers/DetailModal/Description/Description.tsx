import {
  ArrowUpIcon,
  Button,
  DownIcon,
  Modal,
  openNotification,
  Tag,
  Text,
  Title
} from '@nexthcm/components';
import { Divider, Menu, Spin, Tooltip } from 'antd';
import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetFileStoreQuery } from '../../../services/FileApp';
import {
  useGetDetailQuery,
  useGetEscalateQuery,
  usePostEscalateMutation,
  usePutDetailMutation
} from '../../../services/MyTimeApp';
import { getFirstLetter } from '../../../utils/name';
import EmailCC from './EmailCC';
import { StyledConfirm } from '../styles';
import { useModal } from '@nexthcm/common';
import {
  ButtonAction,
  Detail,
  DetailLabel,
  DetailRow,
  DetailValue,
  DropDownAction,
  ImgAvatar,
  ImgName,
  ItemAction,
  StyledAvatar,
  StyledDescription,
  StyledInfo
} from './styles';
import ShowTextModal from '../../../components/ShowText/ShowTextModal';

interface IDescription {
  url: string;
}

const Description: FC<IDescription> = ({ url }) => {
  const { t, i18n } = useTranslation();
  const [idAction, setIdAction] = useState<string>('');
  const [stateAction, setStateAction] = useState<string>('');
  const [typeDes, setTypeDes] = useState('');
  const [user, setUser] = useState<any>({});

  const {
    isOpen: visibleConfirm,
    handleClose: handleCancelConfirm,
    handleOpen: handleOpenConfirm
  } = useModal();
  const { data, isLoading: isLoadingData } = useGetDetailQuery({
    url
  });
  const { data: dataEscalate } = useGetEscalateQuery(
    {
      id: data?.data?.escalateDTO?.id,
      type: url.split('/')[0],
      leaveId: url.split('/')[1]
    },
    {
      skip: !data?.data?.escalateDTO?.id,
      refetchOnMountOrArgChange: true
    }
  );
  const [postEscalate, { isLoading: isLoadingEscalate }] = usePostEscalateMutation();
  const [putAction, { isLoading }] = usePutDetailMutation();
  const { data: dataImg } = useGetFileStoreQuery(
    { subPath: user?.image },
    {
      skip: !user?.image
    }
  );

  useEffect(() => {
    if (data) {
      if (url.split('/')[0] === 'leaves') {
        data?.data?.employeeDTO && setUser(data?.data?.employeeDTO);
      } else if (url.split('/')[0] === 'ot-requests') {
        data?.data?.user && setUser(data?.data?.user);
      } else if (['timesheet-updates', 'outside', 'wfh'].includes(url.split('/')[0])) {
        data?.data?.userInfo && setUser(data?.data?.userInfo);
      }
    }

    url && setTypeDes(url.split('/')[0]);
  }, [url, data]);

  const convertHours = (duration: number) => {
    let minutes: number | string = Math.floor((duration / (1000 * 60)) % 60),
      hours: number | string = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes;
  };

  const handlePutAction = () => {
    if (idAction) {
      putAction({
        url,
        request: {
          nextState: idAction
        }
      })
        .unwrap()
        .then(() => {
          handleCancelConfirm();
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

  const handlePostEscalate = () => {
    postEscalate({
      type: url.split('/')[0],
      escalateId: data?.data?.escalateDTO?.directReport?.id,
      objectId: url.split('/')[1]
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

  const action = (
    <Menu
      items={data?.data?.nextStates?.map((item) => ({
        label: (
          <ItemAction
            key={item?.id}
            onClick={() => {
              setIdAction(item?.state?.id);
              handleOpenConfirm();
              setStateAction(item?.transition?.name);
            }}
          >
            {item?.transition?.name}
          </ItemAction>
        ),
        key: item?.id
      }))}
    />
  );

  return (
    <>
      <StyledDescription>
        <Spin spinning={isLoadingEscalate || isLoadingData}>
          <StyledInfo>
            <StyledAvatar>
              {user?.image ? (
                <ImgAvatar src={dataImg} />
              ) : (
                <ImgName className="default-image">
                  {user?.fullName && getFirstLetter(user?.fullName)}
                </ImgName>
              )}
            </StyledAvatar>
            <Title level={2} color="#526ed3">
              {user?.fullName}
            </Title>
            <Text style={{ fontSize: '18px' }}>{user?.jobTitle?.name}</Text>
          </StyledInfo>

          <Divider />

          <Detail>
            <DetailRow>
              <DetailLabel>{t('modal.cif')}:</DetailLabel>
              <DetailValue>{user?.cif}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>{t('modal.office')}:</DetailLabel>
              <DetailValue>{user?.office?.name}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>{t('modal.status')}:</DetailLabel>
              <DetailValue>
                {
                  <Tag color={data?.data?.currentState?.stateType?.color}>
                    {data?.data?.currentState?.name}
                  </Tag>
                }
              </DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>{t('modal.requestType')}:</DetailLabel>
              <DetailValue>{t(url.split('/')[0])}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>{t('modal.assignee')}:</DetailLabel>
              <DetailValue className="value-assignee">
                {data?.data?.escalateDTO ? (
                  <EmailCC
                    name={data?.data?.escalateDTO?.name}
                    image={data?.data?.escalateDTO?.image}
                  />
                ) : data?.data?.escalateInfo ? (
                  <EmailCC
                    name={data?.data?.escalateInfo?.name}
                    image={data?.data?.escalateInfo?.image}
                  />
                ) : (
                  ''
                )}
                {!!dataEscalate?.data && (
                  <Tooltip
                    placement="bottomRight"
                    title={t('modal.tooltipAssignee')}
                    color="#064ABD"
                    overlayClassName="tooltip-assignee"
                  >
                    <Button
                      onClick={handlePostEscalate}
                      icon={<ArrowUpIcon width={20} height={20} />}
                    />
                  </Tooltip>
                )}
              </DetailValue>
            </DetailRow>
            {typeDes === 'leaves' && (
              <DetailRow>
                <DetailLabel>{t('modal.leaveType')}:</DetailLabel>
                <DetailValue>{data?.data?.leaveType?.name}</DetailValue>
              </DetailRow>
            )}

            {typeDes === 'leaves' && (
              <DetailRow>
                <DetailLabel>{t('modal.dateRange')}:</DetailLabel>
                <DetailValue>
                  {data?.data?.items[0]?.fullDay
                    ? `${moment(data?.data?.fromDate).format('l')}`
                    : `${moment(data?.data?.fromDate).format('l')}${
                        moment(data?.data?.fromDate).format('l').toString() !==
                        moment(data?.data?.toDate).format('l').toString()
                          ? ' - ' + moment(data?.data?.toDate).format('l')
                          : ''
                      } ${
                        data?.data?.items[0]?.morning || data?.data?.items[0]?.after
                          ? '(' + t(data?.data?.items[0]?.morning ? 'morning' : 'afternoon') + ')'
                          : data?.data?.items[0]?.fromTime
                          ? '(' +
                            convertHours(data?.data?.items[0]?.fromTime * 1000) +
                            ' - ' +
                            convertHours(data?.data?.items[0]?.toTime * 1000) +
                            ')'
                          : ''
                      }`}
                </DetailValue>
              </DetailRow>
            )}

            {typeDes !== 'leaves' && (
              <DetailRow>
                <DetailLabel>{t('modal.date')}:</DetailLabel>
                {typeDes === 'timesheet-updates' ? (
                  <DetailValue>{moment(data?.data?.createdDate).format('l')}</DetailValue>
                ) : (
                  <DetailValue>
                    {moment(data?.data?.fromDate).format('l').toString() ===
                    moment(data?.data?.toDate).format('l').toString()
                      ? moment(data?.data?.fromDate).format('l')
                      : moment(data?.data?.fromDate).format('l') +
                        ' - ' +
                        moment(data?.data?.toDate).format('l')}
                  </DetailValue>
                )}
              </DetailRow>
            )}

            {['leaves', 'outside', 'wfh'].includes(typeDes) && (
              <DetailRow>
                <DetailLabel>{t('modal.days')}:</DetailLabel>
                <DetailValue>
                  {typeDes === 'leaves' &&
                    (data?.data?.durationInDay ? data?.data?.durationInDay : '-')}
                  {['outside', 'wfh'].includes(typeDes) &&
                    (data?.data?.totalDay ? data?.data?.totalDay : '-')}
                </DetailValue>
              </DetailRow>
            )}

            {typeDes === 'timesheet-updates' && (
              <DetailRow>
                <DetailLabel>{t('modal.time')}:</DetailLabel>
                <DetailValue>
                  {convertHours(data?.data?.newInTime * 1000) +
                    ' - ' +
                    convertHours(data?.data?.newOutTime * 1000)}
                </DetailValue>
              </DetailRow>
            )}

            {typeDes === 'ot-requests' && (
              <DetailRow>
                <DetailLabel>{t('modal.duration')}:</DetailLabel>
                <DetailValue>
                  {data?.data?.duration ? Number(data?.data?.duration) / 60 / 60 + 'h' : '-'}
                </DetailValue>
              </DetailRow>
            )}
            {typeDes === 'timesheet-updates' && (
              <DetailRow>
                <DetailLabel>{t('modal.duration')}:</DetailLabel>
                <DetailValue>
                  {data?.data?.updateTotalTime
                    ? +(Number(data?.data?.updateTotalTime) / 60 / 60).toFixed(1) + 'h'
                    : '-'}
                </DetailValue>
              </DetailRow>
            )}

            {typeDes === 'timesheet-updates' && (
              <DetailRow>
                <DetailLabel>{t('modal.workingDays')}:</DetailLabel>
                <DetailValue>{data?.data?.updateWorkingDay}</DetailValue>
              </DetailRow>
            )}

            {typeDes === 'outside' && (
              <DetailRow>
                <DetailLabel>{t('modal.onsiteOffice')}:</DetailLabel>
                <DetailValue>{data?.data?.officeDTO?.name}</DetailValue>
              </DetailRow>
            )}

            <DetailRow>
              <DetailLabel>{t('modal.email')}:</DetailLabel>
              <DetailValue className="value-email">
                {data?.data?.sendToDTOs
                  ? data?.data?.sendToDTOs?.map((item) => (
                      <EmailCC key={item?.id} name={item?.name} image={item?.image} />
                    ))
                  : ''}
              </DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>{t('modal.comment')}:</DetailLabel>
              <DetailValue>
                <ShowTextModal record={data?.data} className="showTextModal" />
              </DetailValue>
            </DetailRow>
          </Detail>

          {data?.data?.nextStates?.length > 0 && (
            <>
              <Divider />

              <DropDownAction
                overlayClassName="dropdown-action"
                destroyPopupOnHide={true}
                overlay={action}
                trigger={['click']}
              >
                <ButtonAction>
                  <span>{t('action')}</span>
                  <DownIcon width={16} height={16} />
                </ButtonAction>
              </DropDownAction>
            </>
          )}
        </Spin>
      </StyledDescription>

      <Modal
        type="confirm"
        visible={visibleConfirm}
        onCancel={handleCancelConfirm}
        confirmIcon="?"
        title={
          <>
            {t('modal.waitingAction')} <br />
            {stateAction}
          </>
        }
      >
        <StyledConfirm>
          <Button height={44} key="back" border="cancel" onClick={handleCancelConfirm}>
            {t('common:confirm.cancel')}
          </Button>
          <Button height={44} key="submit" loading={isLoading} onClick={handlePutAction}>
            {t('common:confirm.ok')}
          </Button>
        </StyledConfirm>
      </Modal>
    </>
  );
};

export default Description;
