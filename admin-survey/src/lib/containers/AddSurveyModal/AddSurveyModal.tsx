import React from "react";
import { StyledAddSurveyModal } from "./styled";
import { FormProvider, useForm } from "react-hook-form";
import { Col, Row } from "antd";
import {
  Button,
  Input,
  Modal,
  openNotification,
} from "doctor-online-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModal, yup } from "doctor-online-common";
import { useTranslation } from "react-i18next";
import { ConfirmModal } from "../ConfirmModal";
import { useAddSurveyMutation } from "src/lib/services";

interface Props {
  handleClose: () => void;
}

const AddSurveyModal = ({ handleClose }: Props) => {
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      surveyLink: "",
      resultLink: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        title: yup.string().required(t("common:form.required")),
        description: yup.string().required(t("common:form.required")),
        surveyLink: yup.string().required(t("common:form.required")),
        resultLink: yup.string().required(t("common:form.required")),
      })
    ),
  });
  const confirmModal = useModal();
  const [createSurvey, { isLoading }] = useAddSurveyMutation();

  const onSubmit = () => {
    confirmModal.handleOpen();
  };

  const handleSubmit = () => {
    createSurvey(form.getValues())
      .unwrap()
      .then(() => {
        confirmModal.handleClose();
        handleClose();
        openNotification({
          type: "success",
          message: "Create and Publish new Survey successfully.",
        });
      });
  };

  return (
    <StyledAddSurveyModal>
      <h2>Add Survey Form</h2>
      <FormProvider {...form}>
        <Row gutter={[0, 30]}>
          <Col span={24}>
            <Input
              name="title"
              label="Title"
              required
              placeholder="Enter title of survey"
            />
          </Col>
          <Col span={24}>
            <Input
              name="description"
              label="Description"
              required
              placeholder="Enter description of survey"
              type="textarea"
            />
          </Col>
          <Col span={24}>
            <Input
              name="surveyLink"
              label="Survey Link"
              required
              placeholder="Enter survey link"
            />
          </Col>
          <Col span={24}>
            <Input
              name="resultLink"
              label="Result Link"
              required
              placeholder="Enter result link"
            />
          </Col>
          <Col span={24}>
            <div className="user-ctrl">
              <Button onClick={() => handleClose()} border="outline">
                Cancel
              </Button>
              <Button onClick={form.handleSubmit(onSubmit)}>Publish</Button>
            </div>
          </Col>
        </Row>
      </FormProvider>
      <Modal
        width={500}
        destroyOnClose
        open={confirmModal.isOpen}
        onCancel={confirmModal.handleClose}
      >
        <ConfirmModal
          isLoading={isLoading}
          handleClose={confirmModal.handleClose}
          handleSubmit={() => handleSubmit()}
        />
      </Modal>
    </StyledAddSurveyModal>
  );
};

export default AddSurveyModal;
