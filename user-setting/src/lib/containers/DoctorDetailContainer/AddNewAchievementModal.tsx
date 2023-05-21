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
import { useCreateDoctorAchievementMutation } from "src/lib/services";

interface Props {
  handleClose: () => void;
  doctorId: string;
}

const AddNewAchievementModal = ({ handleClose, doctorId }: Props) => {
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      title: "",
      date: "",
      description: "",
    },
    resolver: yupResolver(
      yup.object({
        title: yup.string().required(t("common:form.required")),
        date: yup.string().required(t("common:form.required")).nullable(),
        description: yup
          .string()
          .required(t("common:form.required"))
          .nullable(),
      })
    ),
  });
  const format = useFormat();
  const [createAchievement, { isLoading }] =
    useCreateDoctorAchievementMutation();

  const onSubmit = (data: any) => {
    if (doctorId) {
      createAchievement({
        title: data.title,
        date: String(new Date(data.date).valueOf()),
        description: data.description,
        doctorId,
      })
        .unwrap()
        .then((value) => {
          handleClose();
          openNotification({
            type: "success",
            message: "Add new achievement successfully",
          });
        });
    }
  };

  return (
    <StyledDoctorInfoModal>
      <h2>Add New Achievement</h2>
      <FormProvider {...form}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Input
              name="title"
              label="Achievement"
              placeholder="Enter achievement name"
              required
            />
          </Col>
          <Col span={24}>
            <Input
              name="description"
              label="Description"
              placeholder="Enter achievement description"
              required
              type="textarea"
              style={{ height: 100 }}
            />
          </Col>
          <Col span={24}>
            <DatePicker
              label="Award Date"
              name="date"
              format={format}
              required
              placement="bottomLeft"
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

export default AddNewAchievementModal;
