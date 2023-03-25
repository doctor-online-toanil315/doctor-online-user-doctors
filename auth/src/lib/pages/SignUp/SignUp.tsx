import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import {
  Button,
  Input,
  LogoPrimary,
  openNotification,
} from "doctor-online-components";
import { Contact, ContainerLogin, StyledButton, StyledForm } from "./styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSignUpMutation } from "../../services/Auth";
import { SignUpRequest } from "src/lib/types/AuthTypes";
import { Col, Row } from "antd";

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();
  const [error, setError] = useState({
    isCheck: false,
    type: "error",
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    resolver: yupResolver(
      yup.object({
        email: yup.string().required(t("common:form.required")),
        password: yup.string().required(t("common:form.required")),
        passwordConfirmation: yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords must match"),
        firstName: yup.string().required(t("common:form.required")),
        lastName: yup.string().required(t("common:form.required")),
        phoneNumber: yup.string().required(t("common:form.required")),
      })
    ),
  });

  const { watch } = form;

  const onSubmit = (data: SignUpRequest) => {
    signUp(data)
      .unwrap()
      .then(() => {
        navigate("/login");
        openNotification({
          type: "success",
          message: t("signUp.success"),
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

  return (
    <ContainerLogin>
      <FormProvider {...form}>
        <StyledForm onSubmit={form.handleSubmit(onSubmit)}>
          <div className="logo">
            <LogoPrimary />
          </div>
          <Row gutter={[20, 20]}>
            <Col span={12}>
              <Input
                label={t("login.firstName")}
                placeholder={t("login.enterFirstName")}
                name="firstName"
                required
              />
            </Col>
            <Col span={12}>
              <Input
                label={t("login.lastName")}
                placeholder={t("login.enterLastName")}
                name="lastName"
                required
              />
            </Col>
            <Col span={24}>
              <Input
                label={t("login.username")}
                placeholder={t("login.enterUsername")}
                name="email"
                required
              />
            </Col>
            <Col span={24}>
              <Input
                label={t("login.password")}
                placeholder={t("login.enterPassword")}
                type="password"
                name="password"
                required
              />
            </Col>
            <Col span={24}>
              <Input
                label={t("login.confirmPass")}
                placeholder={t("login.enterConfirmPass")}
                type="password"
                name="confirmPass"
                required
              />
            </Col>
            <Col span={24}>
              <Input
                label={t("login.phoneNumber")}
                placeholder={t("login.enterPhoneNumber")}
                type="number"
                name="phoneNumber"
                required
              />
            </Col>
          </Row>
          <StyledButton>
            <Button loading={isLoading} htmlType="submit">
              {t("signUp.btn")}
            </Button>
            <Contact>
              <Trans
                i18nKey="signUp.contact"
                components={{
                  1: <Link to={"/login"} />,
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

export default SignUp;
