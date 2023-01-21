import React, { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { Button, EyeIcon } from "@nexthcm/components";
import { StyledForm } from "./styles";
import { useTranslation } from "react-i18next";

interface FormProps {
  onSubmit: (data: any) => void;
  children: React.ReactNode;
  form: any;
  isSubmitLoading?: boolean;
}

const Form = ({ children, isSubmitLoading, form, onSubmit }: FormProps) => {
  const { t } = useTranslation();
  const { month, year } = form.watch();
  const [isValid, setIsvalid] = useState(true);
  useEffect(() => {
    if (!month || !year) {
      setIsvalid(false);
    } else {
      setIsvalid(true);
    }
  }, [month, year]);
  return (
    <StyledForm>
      <FormProvider {...form}>
        {children}

        <div className="btn-group">
          <Button
            disabled={!isValid}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit(onSubmit)();
            }}
          >
            <EyeIcon className="eye-icon" />
            {t("overViewOnlyMe.view")}
          </Button>
        </div>
      </FormProvider>
    </StyledForm>
  );
};

export default React.memo(Form);
