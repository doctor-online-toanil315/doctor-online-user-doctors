import React, { useEffect, useRef, useState } from 'react';
import { ContentStyled, StyledHead, StyledList } from './styles';
import { List, Spin } from 'antd';
import { TabsCommonContentType } from '@nexthcm/common';
import { useTranslation } from 'react-i18next';
import {
  Button,
  CheckIcon,
  ClearIcon,
  MoreHorizIcon,
  Switch,
  Tabs,
  Text,
} from '@nexthcm/components';
import { NotificationItem } from '../../../../types';
import { Card } from '../../../Card';
import moment from 'moment';
import { StyledPopover } from './styles';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { isNotEmptyArray } from '../../../../utils';
import { LoadingOutlined } from '@ant-design/icons';

interface ContentProps {
  onChangeTabs: (key: string) => void;
  onChangeSwitch: (checked: boolean) => void;
  dataList?: NotificationItem[];
  onMarkRead: (id: string) => void;
  onRemoveNotification: (id: string) => void;
  activeTab: string;
  onLoadMore: () => void;
  toPageNotification: ({
    type,
    targetId,
    notificationId,
  }: NotificationItem) => void;
  visible: boolean;
  hasMore?: boolean;
  isLoading: boolean;
}

const tabsNotifiContent: TabsCommonContentType[] = [
  {
    id: 1,
    title: 'notification.new',
  },
  {
    id: 2,
    title: 'notification.requestSubmission',
  },
];
const Content = ({
  onChangeTabs,
  onChangeSwitch,
  dataList,
  onMarkRead,
  activeTab,
  onRemoveNotification,
  onLoadMore,
  toPageNotification,
  hasMore,
  isLoading,
}: ContentProps) => {
  const { t } = useTranslation();
  const [popoverID, setPopoverID] = useState<string | null>(null);
  const scrollRef = useRef<Scrollbars | null>(null);
  const [loadMore, setLoadMore] = useState(false);
  const handleVisibleChange = (newVisible: string | null) => {
    setPopoverID(newVisible);
  };
  useEffect(() => {
    if (loadMore) {
      setLoadMore(false);
    } else {
      scrollRef.current?.scrollToTop();
    }
  }, [dataList]);
  return (
    <ContentStyled>
      <Spin
        spinning={isLoading}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <StyledHead>
          <Tabs
            contentCommon={tabsNotifiContent}
            activeKey={activeTab}
            onChange={(key: string) => onChangeTabs(key)}
          />
          <div className="switch">
            {t('notification.onlyShowUnread')}
            <Switch
              size="small"
              defaultChecked={false}
              onChange={onChangeSwitch}
            />
          </div>
        </StyledHead>
        <StyledList>
          <Scrollbars
            style={{ height: isNotEmptyArray(dataList) ? '400px' : '0px' }}
            onScrollFrame={(e) => {
              if (e.top >= 0.9 && hasMore) {
                setLoadMore(true);
                onLoadMore();
              }
            }}
            renderTrackVertical={(props) => (
              <div {...props} className="track-vertical" />
            )}
            renderThumbVertical={(props) => (
              <div {...props} className="thumb-vertical" />
            )}
            ref={(e) => (scrollRef.current = e)}
          >
            <List
              size="large"
              bordered
              dataSource={dataList}
              renderItem={(item) => (
                <List.Item
                  key={item.notificationId}
                  className={item.read ? '' : 'unread'}
                  onClick={() =>
                    toPageNotification({
                      type: item.type,
                      targetId: item.targetId,
                      notificationId: item.notificationId,
                    } as NotificationItem)
                  }
                >
                  <Card url={item.image} name={item.fullName} />
                  <div className="main">
                    <div
                      className="mb-8"
                      dangerouslySetInnerHTML={{ __html: item.shortContent }}
                    ></div>
                    <p>{moment(new Date(item.sendDate)).fromNow()}</p>
                  </div>
                  <StyledPopover
                    placement="bottomRight"
                    getPopupContainer={(trigger) => trigger.parentElement!}
                    overlayClassName="styled-header-popover"
                    trigger="click"
                    visible={item.notificationId === popoverID}
                    onVisibleChange={() =>
                      handleVisibleChange(
                        item.notificationId === popoverID
                          ? null
                          : item.notificationId
                      )
                    }
                    content={
                      <div className="dropdown-group-btn">
                        {!item.read && (
                          <button
                            className="button-content"
                            onClick={(e) => {
                              e.stopPropagation();
                              onMarkRead(item.notificationId);
                              setPopoverID(null);
                            }}
                          >
                            <Text>
                              {<CheckIcon />}
                              {t('notification.markAsRead')}
                            </Text>
                          </button>
                        )}

                        <button
                          className="button-content"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveNotification(
                              item.notificationId.toString()
                            );
                            setPopoverID(null);
                          }}
                        >
                          <Text>
                            {<ClearIcon />}{' '}
                            {t('notification.removeTheNotification')}
                          </Text>
                        </button>
                      </div>
                    }
                  >
                    <Button
                      border="borderless"
                      className="more-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPopoverID(item.notificationId);
                      }}
                      icon={<MoreHorizIcon />}
                    ></Button>
                  </StyledPopover>
                  {!item.read && <div className="dot-read"></div>}
                </List.Item>
              )}
            />
          </Scrollbars>
        </StyledList>
      </Spin>
    </ContentStyled>
  );
};

export default React.memo(Content);
