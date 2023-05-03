import { yupResolver } from "@hookform/resolvers/yup";
import { yup } from "doctor-online-common";
import {
  Button,
  Input,
  OptionType,
  SearchIcon,
  Select,
  openNotification,
} from "doctor-online-components";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TEST_PRIORITY_ENUM } from "src/lib/constants";
import { useAddTestMutation, useGetLabTestsQuery } from "src/lib/services";
import { StyledAddTestModal } from "./styled";
import { Col, Row } from "antd";

interface Props {
  handleClose: () => void;
  consultationId: string | undefined;
}

const AddLabTestModal = ({ handleClose, consultationId }: Props) => {
  const { t } = useTranslation();
  const { data: tests } = useGetLabTestsQuery({
    page: 1,
    size: 999,
  });
  const form = useForm({
    defaultValues: {
      notes: "",
      priority: TEST_PRIORITY_ENUM.EMARGENCY,
      reason: "",
      testId: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        notes: yup.string().required(t("common:form.required")),
        priority: yup.string().required(t("common:form.required")),
        reason: yup.string().required(t("common:form.required")),
        testId: yup.string().required(t("common:form.required")),
      })
    ),
  });
  const [addTest, { isLoading }] = useAddTestMutation();

  const options: OptionType[] | undefined = tests?.data.map((test) => {
    return {
      key: test.name,
      value: test.id,
      label: test.name,
      render: () => test.name,
    };
  });

  const onSubmit = (data: {
    notes: string;
    priority: string;
    reason: string;
    testId: string;
  }) => {
    addTest({
      consultionId: consultationId ?? "",
      notes: data.notes,
      priority: data.priority,
      reason: data.reason,
      testId: data.testId,
    })
      .unwrap()
      .then((value) => {
        openNotification({
          type: "success",
          message: t("addTestSuccessfully"),
        });
        handleClose();
      });
  };

  return (
    <StyledAddTestModal>
      <FormProvider {...form}>
        <h3>Add Lab Test</h3>
        <div className="line"></div>
        <div className="form-group">
          <Row gutter={[20, 20]}>
            <Col span={12}>
              <Select
                name="testId"
                showSearch
                title="Test Name"
                placeholder="Enter name of test"
                suffixIcon={<SearchIcon />}
                options={options}
                onSelect={(value) => {
                  form.setValue("testId", value);
                }}
                onClear={() => {
                  form.setValue("testId", "");
                }}
              />
            </Col>
            <Col span={12}>
              <Select
                required
                name="priority"
                title="Priority"
                placeholder="e.g Emergency"
                options={[
                  {
                    key: TEST_PRIORITY_ENUM.EMARGENCY,
                    value: TEST_PRIORITY_ENUM.EMARGENCY,
                    label: TEST_PRIORITY_ENUM.EMARGENCY,
                    render: () => TEST_PRIORITY_ENUM.EMARGENCY,
                  },
                  {
                    key: TEST_PRIORITY_ENUM.HIGH,
                    value: TEST_PRIORITY_ENUM.HIGH,
                    label: TEST_PRIORITY_ENUM.HIGH,
                    render: () => TEST_PRIORITY_ENUM.HIGH,
                  },
                  {
                    key: TEST_PRIORITY_ENUM.LOW,
                    value: TEST_PRIORITY_ENUM.LOW,
                    label: TEST_PRIORITY_ENUM.LOW,
                    render: () => TEST_PRIORITY_ENUM.LOW,
                  },
                ]}
              />
            </Col>
            <Col span={24}>
              <Input
                name="reason"
                label="Test Reason"
                placeholder="Enter reason for test"
                required
              />
            </Col>
            <Col span={24}>
              <Input
                name="notes"
                label="Note"
                placeholder="Enter notes for patient"
                type="textarea"
                required
              />
            </Col>
          </Row>
          <div className="user-ctrl">
            <Button onClick={() => handleClose()} border="outline">
              Cancel
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
          </div>
        </div>
      </FormProvider>
    </StyledAddTestModal>
  );
};

export default AddLabTestModal;
