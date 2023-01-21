import { useTranslation } from 'react-i18next';
import { Button, PlusIcon, ExportIcon } from '@nexthcm/components';
import { StyledButtonList } from './style';
import { FC } from 'react';

interface CheckButton {
  hasSelected: any;
}

const ButtonList: FC<CheckButton> = ({ hasSelected }) => {
  const { t } = useTranslation();
  const handleBulkChange = () => {
    console.log('');
  };

  const handleExport = () => {
    console.log('');
  };

  return (
    <StyledButtonList>
      <Button
        height={44}
        icon={<PlusIcon />}
        disabled={hasSelected ? false : true}
        onClick={handleBulkChange}
      >
        {t('myTime.bulkChange')}
      </Button>
      <Button height={44} icon={<ExportIcon />} onClick={handleExport}>
        {t('myTime.export')}
      </Button>
    </StyledButtonList>
  );
};

export default ButtonList;
