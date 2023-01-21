import { Modal } from '@nexthcm/components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Comment from './Comment/Comment';

import History from './History/History';
import { Collapse, StyledDetailModal, StyledPanel } from './styles';
import './styles.scss';
import DescriptionsMyRequest from './Description/DescriptionsMyRequest';

interface DetailMyRequestModalProps {
  typeRequest: string;
}

const DetailMyRequestsModal = ({ typeRequest }: DetailMyRequestModalProps) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const [url, setUrl] = useState<string>('');
  const [type, setType] = useState<number>();
  const [typeComment, setTypeComment] = useState<string>('');

  const paramDates = searchParams.get('dates')
    ? `&dates=${encodeURI(`${searchParams.get('dates') ? searchParams.get('dates') : ''}`)}`
    : '';

  useEffect(() => {
    if (!!id && pathname.includes('working-after-hours')) {
      setUrl(`ot-requests/${id}`);
      setType(1);
      setTypeComment('hcm_ot_comment');
    } else if (!!id && pathname.includes('update-timesheet')) {
      setUrl(`timesheet-updates/${id}`);
      setType(2);
      setTypeComment('hcm_update_time_comment');
    } else if (!!id && pathname.includes('working-onsite')) {
      setUrl(`outside/${id}`);
      setType(3);
      setTypeComment('hcm_working_onsite_comment');
    } else if (!!id && pathname.includes('work-from-home')) {
      setUrl(`wfh/${id}`);
      setType(4);
      setTypeComment('hcm_wfh_comment');
    }
  }, [searchParams, pathname]);

  return (
    <Modal
      destroyOnClose={true}
      visible={!!id}
      onCancel={() => {
        navigate({
          pathname: `/my-time/my-requests/${typeRequest}`,
          search: searchParams.toString()
        });
      }}
      width="680px"
    >
      <StyledDetailModal>
        <DescriptionsMyRequest url={url} />

        <Collapse ghost>
          <StyledPanel header={t('history')} key="1">
            <History type={type} id={id ?? ''} />
          </StyledPanel>
          <StyledPanel header={t('comment')} key="2">
            <Comment type={typeComment} id={id ?? ''} />
          </StyledPanel>
        </Collapse>
      </StyledDetailModal>
    </Modal>
  );
};

export default DetailMyRequestsModal;
