import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { Button, Checkbox, Input, LogoPrimary } from "doctor-online-components";
import { AuthResponse } from "../../types/Responses";
import { saveRemember } from "doctor-online-common";
import { useCommonDispatch } from "doctor-online-common";

import {
  Contact,
  ContainerLogin,
  InputMessageStyled,
  LabelRemember,
  StyledButton,
  StyledForm,
  StyledGroupRemembers,
} from "./styles";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../../services/Auth";
import { Link } from "react-router-dom";
import { LoginRequest } from "src/lib/types/AuthTypes";

const Login = () => {
  const dispatch = useCommonDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const [isRememberMe, setIsRememberMe] = useState(false);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const from = location.state?.from || "/";
  const [error, setError] = useState({
    isCheck: false,
    type: "error",
  });

  const [login, { isLoading }] = useLoginMutation();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object({
        email: yup.string().required(t("common:form.required")),
        password: yup.string().required(t("common:form.required")),
      })
    ),
  });

  const { watch } = form;

  const onSubmit = (data: LoginRequest) => {
    login({
      email: data.email,
      password: data.password,
    })
      .unwrap()
      .then((data) => {
        if (isRememberMe) {
          dispatch(saveRemember({ isRemember: true } as any));
          localStorage.setItem("access_token", data.accessToken);
        } else {
          dispatch(saveRemember({ isRemember: false } as any));
          sessionStorage.setItem("access_token", data.accessToken);
        }
        if (location.search) {
          window.location.replace(location.search.replace("?from=", ""));
        } else {
          window.location.replace("http://127.0.0.1:8000/overview/me");
        }
      })
      .catch((e) => {
        if (e.status === 401) {
          setError({
            isCheck: true,
            type: "error",
          });
        } else {
          setError({
            isCheck: true,
            type: "errorServer",
          });
        }
      });
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        setError((prev) => ({ ...prev, isCheck: false }));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token")
    ) {
      localStorage.removeItem("access_token");
      sessionStorage.removeItem("access_token");
    }
    if (localStorage.getItem("refresh_token")) {
      localStorage.removeItem("refresh_token");
    }
  }, []);

  return (
    <ContainerLogin>
      <FormProvider {...form}>
        <StyledForm onSubmit={form.handleSubmit(onSubmit)}>
          <div className="logo">
            <LogoPrimary />
          </div>
          <Input
            label={t("login.username")}
            placeholder={t("login.enterUsername")}
            name="email"
            required
          />
          <br />
          <Input
            label={t("login.password")}
            placeholder={t("login.enterPassword")}
            type="password"
            name="password"
            required
          />
          {error.isCheck && (
            <InputMessageStyled>{t(`form.${error.type}`)}</InputMessageStyled>
          )}
          <StyledGroupRemembers>
            <Checkbox
              id="remember"
              onChange={(e) => {
                setIsRememberMe(e.target.checked);
              }}
            />
            <LabelRemember htmlFor="remember">
              {t("login.remember")}
            </LabelRemember>
          </StyledGroupRemembers>
          <StyledButton>
            <Button loading={isLoading} htmlType="submit">
              {t("login.btn")}
            </Button>
            <Contact>
              <Trans
                i18nKey="login.contact"
                components={{
                  1: <Link to={"/sign-up"} />,
                }}
              />
            </Contact>
          </StyledButton>
        </StyledForm>
      </FormProvider>
      <div className="bg-holder"></div>
    </ContainerLogin>
  );
};

export default Login;
