import { Col, Row } from "antd";
import { Button, Input, openNotification } from "doctor-online-components";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyledChangePassword } from "./styled";
import { useGetMeQuery, useUpdatePasswordMutation } from "src/lib/services";
import { yup } from "doctor-online-common";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { UpdatePasswordType } from "src/lib/types";

const ChangePassword = () => {
  const { data: currentUserLogin } = useGetMeQuery();
  const { t } = useTranslation();
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const form = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        password: yup.string().required(t("common:form.required")),
        newPassword: yup
          .string()
          .required(t("common:form.required"))
          .min(8, "Password too short")
          .max(32, "Password too long")
          .matches(
            /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            "Password must be contained upper, lowercase letter, number"
          ),
        confirmPassword: yup
          .string()
          .required(t("common:form.required"))
          .oneOf(
            [yup.ref("newPassword"), null],
            t("Confirm password not match")
          ),
      })
    ),
  });

  const onSubmit = (data: Omit<UpdatePasswordType, "email">) => {
    updatePassword({
      ...data,
      email: currentUserLogin?.data.email ?? "",
    })
      .unwrap()
      .then(() => {
        openNotification({
          type: "success",
          message: "Update password successfully",
        });
        form.reset(
          {
            password: "",
            newPassword: "",
            confirmPassword: "",
          },
          { keepErrors: false }
        );
      })
      .catch(() => {
        form.setError(
          "password",
          {
            message: "Password is incorrect",
          },
          { shouldFocus: true }
        );
        openNotification({
          type: "error",
          message: "Update password fail. Please try again!",
        });
      });
  };

  return (
    <StyledChangePassword>
      <h1>Change Password</h1>
      <Row gutter={[0, 30]}>
        <FormProvider {...form}>
          <Col span={24}>
            <Input
              name="password"
              label="Current Password"
              type="password"
              placeholder="Enter current password"
              required
            />
          </Col>
          <Col span={24}>
            <Input
              name="newPassword"
              label="New Password"
              type="password"
              placeholder="Enter new password"
              required
            />
          </Col>
          <Col span={24}>
            <Input
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Enter new password again"
              required
            />
          </Col>
          <div className="user-ctrl">
            <Button loading={isLoading} onClick={form.handleSubmit(onSubmit)}>
              Save Change
            </Button>
          </div>
        </FormProvider>
      </Row>
    </StyledChangePassword>
  );
};

export default ChangePassword;
