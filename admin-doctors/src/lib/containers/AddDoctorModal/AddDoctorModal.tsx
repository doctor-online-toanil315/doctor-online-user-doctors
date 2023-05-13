import React from "react";
import { StyledAddDoctorModal } from "./styled";
import { FormProvider, useForm } from "react-hook-form";
import { Col, Row } from "antd";
import { Button, Input, openNotification } from "doctor-online-components";
import { FileUpload } from "src/lib/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { yup } from "doctor-online-common";
import { useTranslation } from "react-i18next";
import { useAddDoctorMutation } from "src/lib/services";
import { CreateDoctorType } from "src/lib/types/DoctorType";

interface Props {
  handleClose: () => void;
}

const AddDoctorModal = ({ handleClose }: Props) => {
  const { t } = useTranslation();
  const [addDoctor, { isLoading: addDoctorLoading }] = useAddDoctorMutation();
  const form = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      certificate: "",
      identityCardFrontSide: "",
      identityCardBackSide: "",
      yearOfExperience: 1,
      specialize: "",
      specializeTitle: "",
      price: 200,
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email().required(t("common:form.required")),
        firstName: yup.string().required(t("common:form.required")),
        lastName: yup.string().required(t("common:form.required")),
        phoneNumber: yup
          .string()
          .matches(/^((\+)33|0)[1-9](\d{2}){4}$/, "Phone number is invalid"),
        address: yup.string().required(t("common:form.required")),
        certificate: yup.string().required(t("common:form.required")),
        identityCardFrontSide: yup.string().required(t("common:form.required")),
        identityCardBackSide: yup.string().required(t("common:form.required")),
        yearOfExperience: yup.string().required(t("common:form.required")),
        specialize: yup.string().required(t("common:form.required")),
        specializeTitle: yup.string().required(t("common:form.required")),
        price: yup.string().required(t("common:form.required")),
      })
    ),
  });

  const onSubmit = (data: CreateDoctorType) => {
    addDoctor(data)
      .unwrap()
      .then(() => {
        openNotification({
          type: "success",
          message: t("addDoctorSuccessFully"),
        });
        handleClose();
      });
  };

  return (
    <StyledAddDoctorModal>
      <h2>Add Doctor</h2>
      <FormProvider {...form}>
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Input
              name="firstName"
              label="First Name"
              placeholder="Enter first name"
              required
            />
          </Col>
          <Col span={12}>
            <Input
              name="lastName"
              label="Last Name"
              placeholder="Enter last name"
              required
            />
          </Col>
          <Col span={12}>
            <Input
              name="email"
              label="Email"
              placeholder="Enter email"
              required
            />
          </Col>
          <Col span={12}>
            <Input
              name="phoneNumber"
              label="Phone Number"
              placeholder="Enter phone number"
              required
            />
          </Col>
          <Col span={12}>
            <Input
              name="address"
              label="Address"
              required
              placeholder="Enter address"
            />
          </Col>
          <Col span={12}>
            <Input
              name="price"
              label="Price"
              required
              suffix={"VND"}
              type="number"
              placeholder="Enter price"
            />
          </Col>
          <Col span={12}>
            <Input
              name="yearOfExperience"
              label="Year of Experience"
              required
              suffix={"years"}
              type="number"
              placeholder="Enter year of experience"
            />
          </Col>
          <Col span={12}>
            <Input
              name="specializeTitle"
              label="Title"
              required
              placeholder="Enter title"
            />
          </Col>
          <Col span={24}>
            <Input
              name="specialize"
              label="Specializes"
              placeholder="Enter specializes"
              required
            />
          </Col>
          <Col span={24}>
            <FileUpload
              baseUrl={process.env.API_URL ?? ""}
              label="Add Certificate"
              value={form.getValues("certificate")}
              name="certificate"
              error={{
                message: form.formState.errors.certificate?.message as string,
              }}
              onChange={(value) =>
                form.setValue("certificate", value, { shouldValidate: true })
              }
              isRequired
            />
          </Col>
          <Col span={12}>
            <FileUpload
              baseUrl={process.env.API_URL ?? ""}
              label="Add Identity Card (Front side)"
              value={form.getValues("identityCardFrontSide")}
              name="identityCardFrontSide"
              error={{
                message: form.formState.errors.identityCardFrontSide
                  ?.message as string,
              }}
              onChange={(value) =>
                form.setValue("identityCardFrontSide", value, {
                  shouldValidate: true,
                })
              }
              isRequired
            />
          </Col>
          <Col span={12}>
            <FileUpload
              baseUrl={process.env.API_URL ?? ""}
              label="Add Identity Card (Back side)"
              value={form.getValues("identityCardBackSide")}
              name="identityCardBackSide"
              error={{
                message: form.formState.errors.identityCardBackSide
                  ?.message as string,
              }}
              onChange={(value) =>
                form.setValue("identityCardBackSide", value, {
                  shouldValidate: true,
                })
              }
              isRequired
            />
          </Col>
          <Col span={24}>
            <div className="user-ctrl">
              <Button onClick={() => handleClose()} border="outline">
                Cancel
              </Button>
              <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
            </div>
          </Col>
        </Row>
      </FormProvider>
    </StyledAddDoctorModal>
  );
};

export default AddDoctorModal;
