import { Text } from '@nexthcm/components';
import { Row } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MyLeaveAvatar } from '../../MyLeaveAvatar';
import { StyledMyLeaveHistoryItem } from './styles';

interface MyLeaveHistoryItemProps {
  avatar?: string;
  fullName: string;
  time?: number;
  from?: string;
  to?: any;
  type?: string;
}

const MyLeaveHistoryItem = (props: MyLeaveHistoryItemProps) => {
  const { avatar, fullName, time, from, to, type } = props;

  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.log(avatar);
  }, [avatar]);

  return (
    <StyledMyLeaveHistoryItem>
      <Row>
        <MyLeaveAvatar image={avatar} name={fullName} size="24"></MyLeaveAvatar>
        <Text style={{ lineHeight: '24px', paddingLeft: '4px' }}>
          <Text style={{ fontSize: '15px' }} color="#526ed3">
            {fullName}
          </Text>
          <Text style={{ fontSize: '15px' }}>
            {' '}
            {type === 'Change Status'
              ? !from
                ? t('myTime.myLeave.text.submittedTheRequest')
                : t('myTime.myLeave.text.changedTheStatusTo')
              : t('myTime.myLeave.text.changedTheEscalationTo')}
          </Text>

          {type === 'Change Status' ? (
            <Text strong style={{ fontSize: '15px' }}>
              {' '}
              {!!from && to}{' '}
            </Text>
          ) : (
            <Text style={{ fontSize: '15px' }} color="#526ed3">
              {to?.fullName}
            </Text>
          )}
          {' - '}
          <Text color="rgb(209, 213, 219)" style={{ fontSize: '15px' }}>
            {moment(time).locale(i18n.language).format('lll')}
          </Text>
        </Text>
      </Row>
    </StyledMyLeaveHistoryItem>
  );
};

export default MyLeaveHistoryItem;
