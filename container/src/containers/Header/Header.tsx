import React, { useMemo } from "react";
import { HeaderContainer, RightHeaderContainer, StyledDivider } from "./styled";
import { OptionType, SearchIcon, Select } from "doctor-online-components";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import Notification from "./Notification";
import Profile from "./Profile";

const Header = () => {
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      search: "",
    },
  });

  return (
    <HeaderContainer>
      <FormProvider {...form}>
        <div className="search-field">
          <Select
            name="search"
            showSearch
            label={t("Search Doctor...")}
            suffixIcon={<SearchIcon />}
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
