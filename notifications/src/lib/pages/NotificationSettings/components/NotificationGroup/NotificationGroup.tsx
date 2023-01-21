import { NotificationSettings } from '../../../../types';
import { Checkbox } from '@nexthcm/components';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface GroupProps {
  notifiModule: any;
  name: string;
}

const NotificationGroup = ({ notifiModule, name }: GroupProps) => {
  const { getValues, setValue, reset } = useFormContext();
  const { t } = useTranslation();
  const lng = localStorage.getItem('i18nextLng');
  const onNotifyChange = (name: string, checked: boolean, type: 'desktop' | 'mobile') => {
    setValue(name + (type === 'desktop' ? 'notifyOnDesktop' : 'notifyOnMobile'), checked);
    reset(getValues(), {
      [name]: checked
    });
    onSoundChange(name, checked, type);
  };
  const onSoundChange = (name: string, checked: boolean, type: 'desktop' | 'mobile') => {
    setValue(name + (type === 'desktop' ? 'soundNotifyOnDesktop' : 'soundNotifyOnMobile'), checked);
    reset(getValues(), {
      [name]: checked
    });
  };

  return (
    <>
      <tr>
        <td className="bg-neutral-200 font-bold" colSpan={3}>
          {t('NOTIFICATION_MODULE.' + notifiModule.moduleName)}
        </td>
      </tr>
      {notifiModule.listNotifiSetting.map((notifi, index) => (
        <>
          <tr>
            <td className="font-bold">{lng === 'en' ? notifi.title : notifi.titleVN}</td>
            <td className="center">
              <Checkbox
                checked={getValues(`${name}.${index}.notifyOnDesktop`)}
                readonly={notifi.active === 0}
                onChange={(e) => {
                  onNotifyChange(`${name}.${index}.`, e.target.checked, 'desktop');
                }}
                className={notifi.active === 0 ? 'readOnly' : ''}
              ></Checkbox>
            </td>
            <td className="center">
              <Checkbox
                checked={getValues(`${name}.${index}.notifyOnMobile`)}
                onChange={(e) => {
                  onNotifyChange(`${name}.${index}.`, e.target.checked, 'mobile');
                }}
                className={notifi.active === 0 ? 'readOnly' : ''}
                readonly={notifi.active === 0}
              ></Checkbox>
            </td>
          </tr>
          <tr>
            <td>{t('soundOn')}</td>
            <td className="center">
              <Checkbox
                checked={
                  !getValues(`${name}.${index}.notifyOnDesktop`)
                    ? false
                    : getValues(`${name}.${index}.soundNotifyOnDesktop`)
                }
                onChange={(e) => {
                  onSoundChange(`${name}.${index}.`, e.target.checked, 'desktop');
                }}
                className={notifi.active === 0 ? 'readOnly' : ''}
                readonly={notifi.active === 0}
              ></Checkbox>
            </td>
            <td className="center">
              <Checkbox
                checked={
                  !getValues(`${name}.${index}.notifyOnMobile`)
                    ? false
                    : getValues(`${name}.${index}.soundNotifyOnMobile`)
                }
                onChange={(e) => {
                  onSoundChange(`${name}.${index}.`, e.target.checked, 'mobile');
                }}
                className={notifi.active === 0 ? 'readOnly' : ''}
                readonly={notifi.active === 0}
              ></Checkbox>
            </td>
          </tr>
        </>
      ))}
    </>
  );
};

export default NotificationGroup;
