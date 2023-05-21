import React from "react";
import { StyledDoctorInfoModal } from "./styled";
import { FormProvider, useForm } from "react-hook-form";
import { Col, Row } from "antd";
import {
  Button,
  DatePicker,
  Input,
  openNotification,
} from "doctor-online-components";
import { useFormat, yup } from "doctor-online-common";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useCreateDoctorEducationMutation } from "src/lib/services";

interface Props {
  handleClose: () => void;
  doctorId: string;
}

const AddNewEducationModal = ({ handleClose, doctorId }: Props) => {
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      title: "",
      startDate: "",
      endDate: "",
    },
    resolver: yupResolver(
      yup.object({
        title: yup.string().required(t("common:form.required")),
        startDate: yup.string().required(t("common:form.required")).nullable(),
        endDate: yup.string().required(t("common:form.required")).nullable(),
      })
    ),
  });
  const format = useFormat();
  const [createEducation, { isLoading }] = useCreateDoctorEducationMutation();

  const onSubmit = (data: any) => {
    if (doctorId) {
      createEducation({
        title: data.title,
        date: `${new Date(data.startDate).getFullYear()} - ${new Date(
          data.endDate
        ).getFullYear()}`,
        doctorId,
      })
        .unwrap()
        .then((value) => {
          handleClose();
          openNotification({
            type: "success",
            message: "Add new education successfully",
          });
        });
    }
  };

  return (
    <StyledDoctorInfoModal>
      <h2>Add New Education</h2>
      <FormProvider {...form}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Input
              name="title"
              label="Location"
              placeholder="Enter location"
              required
            />
          </Col>
          <Col span={12}>
            <DatePicker
              label="Start Date"
              name="startDate"
              format={format}
              required
            />
          </Col>
          <Col span={12}>
            <DatePicker
              label="End Date"
              name="endDate"
              format={format}
              required
              disabledDate={(dateItem) => {
                return form.getValues("startDate")
                  ? dateItem.valueOf() <= Number(form.getValues("startDate"))
                  : false;
              }}
            />
          </Col>
          <Col span={24}>
            <div className="user-ctrl">
              <Button border="outline" onClick={() => handleClose()}>
                Cancel
              </Button>
              <Button loading={isLoading} onClick={form.handleSubmit(onSubmit)}>
                Save
              </Button>
            </div>
          </Col>
        </Row>
      </FormProvider>
    </StyledDoctorInfoModal>
  );
};

export default AddNewEducationModal;
