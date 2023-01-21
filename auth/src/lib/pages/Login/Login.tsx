import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { AlertMobile, Button, Checkbox, Input } from "@nexthcm/components";
import { AuthResponse } from "../../types/Responses";
import imgLogo from "../../assets/logo.png";
import {
  RootState,
  saveRemember,
  setDisplayed,
  setIsOpenApp,
  useCommonSelector,
} from "@nexthcm/common";
import { useCommonDispatch } from "@nexthcm/common";

import {
  Contact,
  ContainerLogin,
  InputMessageStyled,
  LabelRemember,
  StyledButton,
  StyledForm,
  StyledGroupRemembers,
  StyledLogo,
} from "./styles";
import { useEffect, useState } from "react";
import { StyledModalNotification } from "./styledNotification";
import {
  usePreFlightMutation,
  useLoginMutation,
} from "../../services/GatewayApp";
import CryptoJS from "crypto-js";

const Login = () => {
  const dispatch = useCommonDispatch();
  const { t } = useTranslation();
  const { isOpenApp } = useCommonSelector(
    (state: RootState) => state.mobileAlertSlice
  );
  const { isDisplayed } = useCommonSelector(
    (state: RootState) => state.mobileAlertSlice
  );

  const navigate = useNavigate();
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
  const [preFlight, { isLoading: isLoadingPreFlight }] = usePreFlightMutation();

  const form = useForm({
    defaultValues: {
      username: "",
    },
    resolver: yupResolver(
      yup.object({
        username: yup.string().required(t("common:form.required")),
        password: yup.string().required(t("common:form.required")),
      })
    ),
  });

  const { watch } = form;

  const onSubmit = (data: any) => {
    preFlight({ data: data.username })
      .unwrap()
      .then((response) => {
        const key = CryptoJS.enc.Base64.parse(response.data.secret).toString(
          CryptoJS.enc.Utf8
        );
        login({
          username: data.username,
          password: CryptoJS.AES.encrypt(data.password, key).toString(
            CryptoJS.format.OpenSSL
          ),
        })
          .unwrap()
          .then((data: AuthResponse) => {
            if (isRememberMe) {
              dispatch(saveRemember({ isRemember: true } as any));
              localStorage.setItem("access_token", data.access_token);
            } else {
              dispatch(saveRemember({ isRemember: false } as any));
              sessionStorage.setItem("access_token", data.access_token);
            }

            localStorage.setItem("refresh_token", data.refresh_token);
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
      })
      .catch(() => {
        setError({
          isCheck: true,
          type: "errorServer",
        });
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

  const userAgent = navigator.userAgent.toLowerCase();

  useEffect(() => {
    if (
      !isDisplayed &&
      (/android/i.test(userAgent) || /iphone/i.test(userAgent))
    ) {
      dispatch(setIsOpenApp(true));
      dispatch(setDisplayed());
    }

    return () => {
      dispatch(setIsOpenApp(false));
    };
  }, []);

  const handleExit = () => {
    dispatch(setIsOpenApp(false));
  };

  return (
    <ContainerLogin>
      <FormProvider {...form}>
        <StyledForm onSubmit={form.handleSubmit(onSubmit)}>
          <StyledLogo src={imgLogo} />
          <Input
            label={t("login.username")}
            placeholder={t("login.enterUsername")}
            name="username"
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
          <Contact>
            <Trans
              i18nKey="login.contact"
              components={{
                1: (
                  <a
                    href="https://jira.banvien.com.vn/servicedesk/customer/portal/9"
                    target="_blank"
                    rel="noreferrer"
                  />
                ),
              }}
            />
          </Contact>
          <StyledButton>
            <Button loading={isLoading || isLoadingPreFlight} htmlType="submit">
              {t("login.btn")}
            </Button>
          </StyledButton>
        </StyledForm>
      </FormProvider>
      <StyledModalNotification
        visible={isOpenApp}
        title="Do you want open to myBv App ?"
        onCancel={handleExit}
        type="confirm"
        confirmIcon="?"
      >
        <AlertMobile handleExit={handleExit} userAgent={userAgent} />
      </StyledModalNotification>
    </ContainerLogin>
  );
};

export default Login;
