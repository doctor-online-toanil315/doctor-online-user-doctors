import React, { useMemo } from "react";
import { HeaderContainer, RightHeaderContainer, StyledDivider } from "./styled";
import { OptionType, SearchIcon, Select } from "doctor-online-components";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import Notification from "./Notification";
import Profile from "./Profile";
import { useDebounceWithoutDependencies } from "src/lib/hooks";
import { useLazyGetDoctorsQuery } from "src/lib/services";

const Header = () => {
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      search: "",
    },
  });
  const { debounceRef, setDebounce } = useDebounceWithoutDependencies(400);
  const [searchDoctor, { data: doctors, isLoading, isFetching }] =
    useLazyGetDoctorsQuery();

  const handleOnSearch = (value: string) => {
    form.setValue("search", value);
    setDebounce(() =>
      searchDoctor({
        page: 1,
        size: 5,
        search: value,
      })
    );
  };

  const optionsDoctor = useMemo(() => {
    return doctors && form.getValues("search")
      ? doctors?.data.map((doctor) => {
          return {
            key: doctor.doctorId,
            value: doctor.doctorId,
            label: `${doctor.firstName} ${doctor.lastName}`,
            render: () => `${doctor.firstName} ${doctor.lastName}`,
          };
        })
      : [];
  }, [doctors, form.getValues()]);

  return (
    <HeaderContainer>
      <FormProvider {...form}>
        <div className="search-field">
          <Select
            name="search"
            showSearch
            label={t("homeSearch")}
            suffixIcon={<SearchIcon />}
            onSearch={handleOnSearch}
            loading={isLoading || isFetching}
            options={optionsDoctor}
          />
        </div>
      </FormProvider>
      <RightHeaderContainer>
        <div className="notification">
          <Notification />
        </div>
        <StyledDivider />
        <div className="profile">
          <Profile />
        </div>
      </RightHeaderContainer>
    </HeaderContainer>
  );
};

export default Header;
