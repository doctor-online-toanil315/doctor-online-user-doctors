import { useModal } from '@nexthcm/common';
import { Button, DownArrowSvgComponent, Title } from '@nexthcm/components';
import { Row } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Menu } from '../../../components';
import { MyRequestModalForm } from '../MyRequestModalForm';
import { StyledHeader, StyledModal } from './styles';

export enum ModalGenre {
  WORK_FROM_HOME = 'WORK_FROM_HOME',
  WORK_OVERTIME = 'WORK_OVERTIME',
  WORK_ONSITE = 'WORK_ONSITE'
}

const MyRequestHeader = () => {
  const [modalGenre, setModalGenre] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const { t } = useTranslation();
  const { isOpen, handleOpen, handleClose } = useModal();

  const menuList = [
    {
      key: 0,
      label: t('myTime.myRequest.requestToWorkFromHome'),
      genre: ModalGenre.WORK_FROM_HOME
    },
    { key: 1, label: t('myTime.myRequest.requestToWorkOvertime'), genre: ModalGenre.WORK_OVERTIME },
    { key: 2, label: t('myTime.myRequest.requestToWorkOnsite'), genre: ModalGenre.WORK_ONSITE }
  ];

  const handleOnClick = (value) => {
    setIsShowDropdown(!isShowDropdown);
  };

  const menu = (
    <Menu
      items={menuList.map((menuItem) => {
        return {
          label: (
            <Button
              onClick={() => {
                handleOpen();
                setIsShowDropdown(false);
                setModalTitle(menuItem.label);
                setModalGenre(menuItem.genre);
              }}
            >
              {menuItem.label}
            </Button>
          ),
          key: menuItem.key
        };
      })}
    />
  );

  return (
    <StyledHeader isShowDropdown={isShowDropdown}>
      <Row className="header">
        <Title>{t('myTime.myRequest.title')}</Title>
        <Dropdown
          overlay={menu}
          trigger={['click']}
          onVisibleChange={(open) => {
            setIsShowDropdown(open);
          }}
        >
          <Button height={44} onClick={handleOnClick}>
            {t('myTime.myRequest.buttonCreateRequest')} <DownArrowSvgComponent />
          </Button>
        </Dropdown>
      </Row>

      <StyledModal width="680px" destroyOnClose visible={isOpen} onCancel={handleClose}>
        <MyRequestModalForm
          modalGenre={modalGenre}
          modalTitle={modalTitle}
          handleCloseModal={handleClose}
        />
      </StyledModal>
    </StyledHeader>
  );
};

export default MyRequestHeader;
