import React, { useEffect } from "react";
import { StyledAddDoctorModal } from "./styled";
import { FormProvider, useForm } from "react-hook-form";
import { Col, Row } from "antd";
import { Button, Input, openNotification } from "doctor-online-components";
import { FileUpload } from "src/lib/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { yup } from "doctor-online-common";
import { useTranslation } from "react-i18next";
import {
  useAddMedicineMutation,
  useCreateTestMutation,
  useGetMedicineByIdQuery,
  useGetTestByIdQuery,
  useUpdateMedicineMutation,
  useUpdateTestMutation,
} from "src/lib/services";
import { AddMedicineType, CreateLabTest } from "src/lib/types";
import {
  FORM_MODE_ENUM,
  FORM_OF_MEDICINE,
  METHOD_OF_INTAKE,
} from "src/lib/constants";

interface Props {
  handleClose: () => void;
  medicineId?: string;
  mode: FORM_MODE_ENUM;
}

const AddTestModal = ({ handleClose, medicineId, mode }: Props) => {
  const { t } = useTranslation();
  const [addMedicine, { isLoading: addMedicineLoading }] =
    useCreateTestMutation();
  const [updateMedicine, { isLoading: updateMedicineLoading }] =
    useUpdateTestMutation();
  const { data: medicineByID } = useGetTestByIdQuery(medicineId ?? "", {
    skip: !medicineId || mode === FORM_MODE_ENUM.CREATE,
    refetchOnMountOrArgChange: true,
  });

  const form = useForm({
    defaultValues: {
      name: "",
      image: "",
      descriptions: "",
      useFor: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(t("common:form.required")),
        image: yup.string().required(t("common:form.required")),
        descriptions: yup.string().required(t("common:form.required")),
        useFor: yup.string().required(t("common:form.required")),
      })
    ),
  });

  useEffect(() => {
    if (medicineByID?.data && mode === FORM_MODE_ENUM.UPDATE) {
      const medicineData = medicineByID?.data;
      form.reset({
        name: medicineData.name,
        image: medicineData.image,
        descriptions: medicineData.descriptions,
        useFor: medicineData.useFor,
      });
    }
  }, [medicineByID]);

  const onSubmit = (data: CreateLabTest) => {
    if (mode === FORM_MODE_ENUM.CREATE) {
      addMedicine(data)
        .unwrap()
        .then(() => {
          openNotification({
            type: "success",
            message: t("addMedicineSuccessFully"),
          });
          handleClose();
        });
    } else {
      updateMedicine({ ...data, id: medicineId ?? "" })
        .unwrap()
        .then(() => {
          openNotification({
            type: "success",
            message: t("updateMedicineSuccessFully"),
          });
          handleClose();
        });
    }
  };

  return (
    <StyledAddDoctorModal>
      <h2>
        {mode === FORM_MODE_ENUM.VIEW
          ? "View"
          : mode === FORM_MODE_ENUM.CREATE
          ? "Add"
          : "Update"}{" "}
        Medicine
      </h2>
      <FormProvider {...form}>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Input
              name="name"
              label="Medicine Name"
              placeholder="Enter medicine name"
              required
            />
          </Col>
          <Col span={24}>
            {mode === FORM_MODE_ENUM.VIEW ? (
              <img
                className="medicine-image"
                src={form.getValues("image")}
                alt="medicine image"
              />
            ) : (
              <FileUpload
                baseUrl={process.env.API_URL ?? ""}
                label="Medicine Image"
                value={form.getValues("image")}
                name="image"
                error={{
                  message: form.formState.errors.image?.message as string,
                }}
                onChange={(value) =>
                  form.setValue("image", value, { shouldValidate: true })
                }
                isRequired
              />
            )}
          </Col>
          <Col span={24}>
            <Input
              name="descriptions"
              label="Descriptions"
              placeholder="Enter description"
              required
              type="textarea"
            />
          </Col>
          <Col span={24}>
            <Input
              name="useFor"
              label="Test Effect"
              placeholder="Enter test effect"
              required
              type="textarea"
            />
          </Col>
          <Col span={24}>
            <div className="user-ctrl">
              <Button onClick={() => handleClose()} border="outline">
                Cancel
              </Button>
              {mode !== FORM_MODE_ENUM.VIEW && (
                <Button
                  loading={addMedicineLoading || updateMedicineLoading}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Save
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </FormProvider>
    </StyledAddDoctorModal>
  );
};

export default AddTestModal;
