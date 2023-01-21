import { Paragraph, Text } from '@nexthcm/components';
import { Row } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MyLeaveAvatar } from '../../MyLeaveAvatar';
import { StyledMyLeaveCommentContent } from './styles';

interface MyLeaveCommentContentProps {
  fullName: string;
  image?: string;
  time?: string;
  comment?: string;
}

const MyLeaveCommentContent = (props: MyLeaveCommentContentProps) => {
  const { fullName, image, time, comment } = props;

  const { t, i18n } = useTranslation();
  const [ellipsis, setEllipsis] = useState({
    expand: true,
    counter: 0
  });

  return (
    <StyledMyLeaveCommentContent>
      <Row>
        <MyLeaveAvatar name={fullName} image={image} />
        <Text style={{ lineHeight: '24px', paddingLeft: '4px' }}>
          <Text style={{ fontSize: '15px' }} color="#526ed3">
            {fullName}
          </Text>
          <Text style={{ fontSize: '15px' }} color="#1b1f3b">
            {' '}
            - {moment(time).locale(i18n.language).format('lll')}
          </Text>
        </Text>
      </Row>
      <Paragraph
        color="#1b1f3b"
        style={{ fontSize: '15px', marginTop: '8px' }}
        ellipsis={
          ellipsis.expand
            ? {
                rows: 2,
                expandable: true,
                symbol: t('myTime.myLeave.button.showMore')
              }
            : false
        }
      >
        {comment}
      </Paragraph>
    </StyledMyLeaveCommentContent>
  );
};

export default MyLeaveCommentContent;
