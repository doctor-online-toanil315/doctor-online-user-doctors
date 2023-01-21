import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { MyLeaveComment } from './MyLeaveComment';
import { MyLeaveDescription } from './MyLeaveDescription';
import { MyLeaveHistoryList } from './MyLeaveHistory';
import { StyledCollapse, StyledMyLeaveDetailModal, StyledPanel } from './styles';

const MyLeaveDetailModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [leaveUrl, setLeaveUrl] = useState<string>('');
  const [typeHistory, setTypeHistory] = useState<number>();
  const [typeComment, setTypeComment] = useState<string>('');
  const { id } = useParams();

  const paramDates = searchParams.get('dates')
    ? `&dates=${encodeURI(`${searchParams.get('dates') ? searchParams.get('dates') : ''}`)}`
    : '';
  const paramStatus = searchParams.get('status')
    ? `&status=${encodeURI(`${searchParams.get('status') ? searchParams.get('status') : ''}`)}`
    : '';

  useEffect(() => {
    if (!!id && pathname.includes('leave')) {
      setLeaveUrl(`leaves/${id}`);
      setTypeHistory(5);
      setTypeComment('hcm_leave_comment');
    }
  }, [searchParams, pathname]);

  return (
    <StyledMyLeaveDetailModal
      width="680px"
      destroyOnClose={true}
      visible={!!id}
      onCancel={() => {
        navigate({
          pathname: `/my-time/my-leave`,
          search: `page=${searchParams.get('page')?.toString()}${paramDates}${paramStatus}`
        });
      }}
    >
      <MyLeaveDescription leaveUrl={leaveUrl} />
      <StyledCollapse ghost>
        <StyledPanel key="1" header={t('myTime.myLeave.groupControl.title.history')}>
          <MyLeaveHistoryList type={typeHistory} id={id ?? ''} />
        </StyledPanel>
        <StyledPanel key="2" header={t('myTime.myLeave.groupControl.title.comment')}>
          <MyLeaveComment type={typeComment} id={id ?? ''} />
        </StyledPanel>
      </StyledCollapse>
    </StyledMyLeaveDetailModal>
  );
};

export default MyLeaveDetailModal;
