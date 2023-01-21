import { Popover } from 'antd';
import { useTranslation } from 'react-i18next';
import { CardContainer } from './styles';

export interface CardProps {
  leaveName: string;
  remainingDays: number;
  active: boolean;
  setSelectedLeave: (leave: string) => void;
  id: string;
  availableDays?: number;
  disabled?: boolean;
}

const Card = ({ ...props }: CardProps) => {
  const { t } = useTranslation();

  return (
    <CardContainer {...props} onClick={() => props.setSelectedLeave(props.id)}>
      <span className="leave-name">{props.leaveName}</span>
      <div className="leave-types">
        <span className="remaining-days">{props.remainingDays}</span>
        {props.availableDays !== undefined && (
          <Popover
            overlayInnerStyle={{ borderRadius: 10 }}
            content={t('myTime.myLeave.availableLeave')}
          >
            <span className="available-days">{props.availableDays}</span>
          </Popover>
        )}
      </div>
    </CardContainer>
  );
};

export default Card;
