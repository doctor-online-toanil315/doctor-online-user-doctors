import React, { useEffect } from 'react';
import { Button, openNotification, Title } from '@nexthcm/components';
import { useGetListSettingQuery, usePostSettingsMutation } from '../../services';
import { FormProvider, useForm } from 'react-hook-form';
import { StyledNotifiSettings } from './styles';
import { useTranslation } from 'react-i18next';
import NotificationGroup from './components/NotificationGroup/NotificationGroup';
import { RootState, useCommonSelector } from '@nexthcm/common';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const NotificationSettings = () => {
  const { data: dataListSetting, isFetching } = useGetListSettingQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [postSettings, { isLoading: isSubmitLoading }] = usePostSettingsMutation();
  const { user } = useCommonSelector((state: RootState) => state.user);
  const form = useForm();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (dataListSetting) {
      const defaultValues = dataListSetting.map((module) => {
        const moduleName = 'notifi-' + module.moduleName;
        const list = module.listNotifiSetting.map((item) => item);
        return {
          [moduleName]: list
        };
      });
      const defaultValuesFormat = Object.assign({}, ...defaultValues);
      form.reset(defaultValuesFormat);
    }
  }, [dataListSetting]);
  const onSubmit = (data: any) => {
    const payload = Object.keys(data).map((key) => {
      return {
        userId: user.userId,
        listNotifiSetting: data[key],
        moduleName: key.split('-')[1]
      };
    });
    postSettings(payload)
      .unwrap()
      .then(() => {
        openNotification({
          type: 'success',
          message: t('updateNotificationSettingSuccessfully')
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
  };

  return (
    <Spin spinning={isFetching} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
      <Title level={1}>{t('notificationSettings')}</Title>
      <StyledNotifiSettings>
        <FormProvider {...form}>
          <table>
            <thead>
              <tr className="tr-head">
                <td></td>
                <td> {t('NOTIFICATION_CONFIGURATION_COLUMNS.notifyOnDesktop')}</td>
                <td>{t('NOTIFICATION_CONFIGURATION_COLUMNS.notifyOnMobile')}</td>
              </tr>
            </thead>
            <tbody>
              {dataListSetting?.map((notifiModule) => (
                <NotificationGroup
                  key={notifiModule.userId}
                  notifiModule={notifiModule}
                  name={'notifi-' + notifiModule.moduleName}
                />
              ))}
            </tbody>
          </table>
          <div className="btn">
            <Button
              loading={isSubmitLoading}
              disabled={isSubmitLoading}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit(onSubmit)();
              }}
            >
              {t('common:confirm.save')}
            </Button>
          </div>
        </FormProvider>
      </StyledNotifiSettings>
    </Spin>
  );
};

export default NotificationSettings;
