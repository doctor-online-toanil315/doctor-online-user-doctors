import { StyledContainerFilter } from './styles';
import { Button, Checkbox, CheckIcon, EyeWhite, Input, Select } from '@nexthcm/components';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const EveryoneFilter = () => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultValues = {
    year: searchParams.get('year') ?? '',
    month: searchParams.get('month'),
    search: searchParams.get('search') ?? '',
    filterType: searchParams.get('filterType') ?? ''
  };
  const form = useForm({
    defaultValues
  });

  const optionsMonth = [
    {
      key: 0,
      value: '0',
      label: 'January',
      render: () => <span>{t('overViewEveryone.january')}</span>
    },
    {
      key: 1,
      value: '1',
      label: 'February',
      render: () => <span>{t('overViewEveryone.february')}</span>
    },
    {
      key: 2,
      value: '2',
      label: 'March',
      render: () => <span>{t('overViewEveryone.march')}</span>
    },
    {
      key: 3,
      value: '3',
      label: 'April',
      render: () => <span>{t('overViewEveryone.april')}</span>
    },
    {
      key: 4,
      value: '4',
      label: 'May',
      render: () => <span>{t('overViewEveryone.may')}</span>
    },
    {
      key: 5,
      value: '5',
      label: 'June',
      render: () => <span>{t('overViewEveryone.june')}</span>
    },
    {
      key: 6,
      value: '6',
      label: 'July',
      render: () => <span>{t('overViewEveryone.july')}</span>
    },
    {
      key: 7,
      value: '7',
      label: 'August',
      render: () => <span>{t('overViewEveryone.august')}</span>
    },
    {
      key: 8,
      value: '8',
      label: 'September',
      render: () => <span>{t('overViewEveryone.september')}</span>
    },
    {
      key: 9,
      value: '9',
      label: 'October',
      render: () => <span>{t('overViewEveryone.october')}</span>
    },
    {
      key: 10,
      value: '10',
      label: 'November',
      render: () => <span>{t('overViewEveryone.november')}</span>
    },
    {
      key: 11,
      value: '11',
      label: 'December',
      render: () => <span>{t('overViewEveryone.december')}</span>
    }
  ];

  useEffect(() => {
    form.reset(defaultValues);
  }, [searchParams]);

  const handleFilter = () => {
    form.getValues('filterType') !== ''
      ? searchParams.set('filterType', form.getValues('filterType'))
      : searchParams.delete('filterType');
    form.getValues('search') !== ''
      ? searchParams.set('search', form.getValues('search'))
      : searchParams.delete('search');
    searchParams.set('year', form.getValues('year')!);
    searchParams.set('month', form.getValues('month')!);
    setSearchParams(searchParams);
  };

  return (
    <StyledContainerFilter>
      <FormProvider {...form}>
        <div className="grid grid-cols-2 gap-col-8 gap-row-16">
          <div>
            <Input
              type="number"
              maxLength={4}
              name="year"
              allowClear
              subLabel={t('overViewEveryone.year')}
            />
          </div>
          <div>
            <Select
              label={t('overViewEveryone.month')}
              name="month"
              options={optionsMonth}
              menuItemSelectedIcon={<CheckIcon />}
              onChange={(value) => {
                form.setValue('month', value);
              }}
              allowClear={true}
            />
          </div>
          <div className="col-span-2">
            <Input
              name="search"
              onChange={(e) => {
                form.setValue('search', `${e.target.value}`);
              }}
              subLabel={t('overViewEveryone.search')}
              allowClear={true}
            />
          </div>
          <div className="col-span-2 button">
            <Checkbox
              checked={checked}
              onChange={() => {
                setChecked(!checked);
                form.setValue('filterType', !checked ? 'MY_TEAM' : '');
              }}
            >
              {t('overViewEveryone.myTeam')}
            </Checkbox>
            <Button
              className="button-view"
              height={32}
              icon={<EyeWhite />}
              disabled={
                form.watch('year') === null ||
                form.watch('year') === '' ||
                form.watch('month') === undefined
              }
              onClick={handleFilter}
            >
              {t('overViewEveryone.view')}
            </Button>
          </div>
        </div>
      </FormProvider>
    </StyledContainerFilter>
  );
};

export default EveryoneFilter;
