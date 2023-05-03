import {
  Button,
  Input,
  OptionType,
  SearchIcon,
  Select,
  openNotification,
} from "doctor-online-components";
import React, { useState } from "react";
import { MedicineType } from "src/lib/types";
import { StyledAddMedicineModal } from "./styled";
import { useAddMedicineMutation, useGetMedicinesQuery } from "src/lib/services";
import { FormProvider, useForm } from "react-hook-form";
import { Col, Row } from "antd";
import { WHEN_ENUM } from "src/lib/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { yup } from "doctor-online-common";
import { useTranslation } from "react-i18next";
import { string } from "yup";

interface Props {
  handleClose: () => void;
  consultationId: string | undefined;
}

const AddMedicineModal = ({ handleClose, consultationId }: Props) => {
  const { t } = useTranslation();
  const [selectedMedicine, setSelectedMedicine] = useState<
    MedicineType | undefined
  >(undefined);
  const { data: medicines } = useGetMedicinesQuery({
    page: 1,
    size: 999,
  });
  const form = useForm({
    defaultValues: {
      notes: "",
      dosage: 1,
      when: "",
      quantity: 1,
      medicineId: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        notes: yup.string().required(t("common:form.required")),
        dosage: yup.string().required(t("common:form.required")),
        when: yup.string().required(t("common:form.required")),
        quantity: yup.string().required(t("common:form.required")),
        medicineId: yup.string().required(t("common:form.required")),
      })
    ),
  });
  const [addMedicine, { isLoading }] = useAddMedicineMutation();

  const options: OptionType[] | undefined = medicines?.data.map((medicine) => {
    return {
      key: medicine.name,
      value: medicine.id,
      label: medicine.name,
      render: () => medicine.name,
    };
  });

  const onSubmit = (data: {
    notes: string;
    dosage: number;
    when: string;
    quantity: number;
    medicineId: string;
  }) => {
    addMedicine({
      consultionId: consultationId ?? "",
      notes: data.notes,
      dosage: Number(data.dosage),
      when: data.when,
      quantity: Number(data.quantity),
      medicineId: data.medicineId,
    })
      .unwrap()
      .then((value) => {
        openNotification({
          type: "success",
          message: t("addMedicineSuccessfully"),
        });
        handleClose();
      });
  };

  return (
    <StyledAddMedicineModal>
      <FormProvider {...form}>
        <h3>Add New Medicine</h3>
        <div className="line"></div>
        <Select
          name="medicineId"
          showSearch
          title="Medicine Name"
          placeholder="Enter name of medicine"
          suffixIcon={<SearchIcon />}
          options={options}
          onSelect={(value) => {
            setSelectedMedicine(
              medicines?.data.find((medicine) => medicine.id === value)
            );
            form.setValue("medicineId", value);
          }}
          onClear={() => {
            setSelectedMedicine(undefined);
            form.setValue("medicineId", "");
          }}
        />
        <div className="line"></div>
        {selectedMedicine && (
          <div className="form-group">
            <h4>Medicine Characteristics</h4>
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <img
                  width={200}
                  src={selectedMedicine?.image}
                  alt="medicine image"
                />
              </Col>
              <Col span={12}></Col>
              <Col span={12}>
                <Input
                  name="form"
                  label="Form Of Medicine"
                  value={selectedMedicine?.form}
                  readOnly
                />
              </Col>
              <Col span={12}>
                <Input
                  name="method"
                  label="Method of Intake"
                  value={selectedMedicine?.methodOfIntake}
                  readOnly
                />
              </Col>
            </Row>
            <div className="line" />
          </div>
        )}
        <div className="form-group">
          <h4>Prescription Of Medicine</h4>
          <Row gutter={[20, 20]}>
            <Col span={4}>
              <Input type="number" required name="quantity" label="Quantity" />
            </Col>
            <Col span={10}>
              <Select
                required
                name="dosage"
                title="Dosage"
                placeholder="e.g 3 Times daily"
                options={Array(10)
                  .fill(1)
                  .map((_, index) => ({
                    key: `${index + 1} Times daily`,
                    value: index + 1,
                    label: `${index + 1} Times daily`,
                    render: () => `${index + 1} Times daily`,
                  }))}
              />
            </Col>
            <Col span={10}>
              <Select
                required
                name="when"
                title="When"
                placeholder="e.g Before Food"
                options={[
                  {
                    key: WHEN_ENUM.BEFORE_FOOD,
                    value: WHEN_ENUM.BEFORE_FOOD,
                    label: WHEN_ENUM.BEFORE_FOOD,
                    render: () => WHEN_ENUM.BEFORE_FOOD,
                  },
                  {
                    key: WHEN_ENUM.AFTER_FOOD,
                    value: WHEN_ENUM.AFTER_FOOD,
                    label: WHEN_ENUM.AFTER_FOOD,
                    render: () => WHEN_ENUM.AFTER_FOOD,
                  },
                ]}
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
    </StyledAddMedicineModal>
  );
};

export default AddMedicineModal;
