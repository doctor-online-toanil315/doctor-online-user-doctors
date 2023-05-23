import React, { useEffect, useState } from "react";
import { StyledAddEventModal } from "./styled";
import { FormProvider, useForm } from "react-hook-form";
import { Col, Row } from "antd";
import {
  Button,
  ClockIcon,
  DatePicker,
  Input,
  Modal,
  OptionType,
  Select,
  openNotification,
} from "doctor-online-components";
import { CreateDoctorEvent } from "src/lib/types/DoctorType";
import { useTranslation } from "react-i18next";
import { useFormat, useModal, yup } from "doctor-online-common";
import moment from "moment";
import SelectTimeModal from "./SelectTimeModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventTypeEnum } from "src/lib/constants";
import { useCreateEventMutation } from "src/lib/services";

interface Props {
  handleClose: () => void;
  doctorId: string;
  isOpen: boolean;
}

const AddEventModal = ({ handleClose, doctorId, isOpen }: Props) => {
  const { t } = useTranslation();
  const format = useFormat();
  const [selectedDate, setSelectedDate] = useState(0);
  const [timeRange, setTimeRange] = useState<number[]>([0, 0]);
  const form = useForm({
    defaultValues: {
      type: "",
      from: "",
      to: "",
      description: "",
      note: "",
      date: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        type: yup.string().required(t("common:form.required")),
        date: yup.string().required(t("common:form.required")),
      })
    ),
  });
  const modal = useModal();
  const [createEvent, { isLoading }] = useCreateEventMutation();

  const onSubmit = (data: Partial<CreateDoctorEvent>) => {
    createEvent({
      description: data.description ?? "",
      note: data.note ?? "",
      doctorId,
      from: data.from ?? "",
      to: data.to ?? "",
      type: data.type ?? EventTypeEnum.MEETING,
    })
      .unwrap()
      .then(() => {
        handleClose();
        openNotification({
          type: "success",
          message: "Create event successfully!",
        });
      });
  };

  const handleSetTimeRange = (start: number, end: number) => {
    setTimeRange([start, end]);
    form.setValue("from", String(start));
    form.setValue("to", String(end));
    modal.handleClose();
  };

  const options: OptionType[] | undefined = [
    {
      key: EventTypeEnum.MEETING,
      value: EventTypeEnum.MEETING,
      label: EventTypeEnum.MEETING,
      render: () => EventTypeEnum.MEETING,
    },
    {
      key: EventTypeEnum.OPERATION,
      value: EventTypeEnum.OPERATION,
      label: EventTypeEnum.OPERATION,
      render: () => EventTypeEnum.OPERATION,
    },
  ];

  return (
    <StyledAddEventModal>
      <FormProvider {...form}>
        <Row gutter={[20, 25]}>
          <Col span={24}>
            <Select
              title="Event"
              name="type"
              placeholder="Select type of event"
              required
              options={options}
            />
          </Col>
          <Col span={24}>
            <DatePicker
              value={selectedDate ? moment(selectedDate) : null}
              onChange={(value) => {
                form.setValue("date", String(value?.valueOf() ?? 0));
                setSelectedDate(value?.valueOf() ?? 0);
                modal.handleOpen();
              }}
              label={"Event Date"}
              format={format}
              required
              allowClear={false}
              name="date"
            />
          </Col>
          <Col span={12}>
            <div className="time start-time">
              <ClockIcon />
              {timeRange[0] ? moment(timeRange[0]).format("LT") : "HH/MM"}
            </div>
          </Col>
          <Col span={12}>
            <div className="time end-time">
              <ClockIcon />
              {timeRange[1] ? moment(timeRange[1]).format("LT") : "HH/MM"}
            </div>
          </Col>
          <Col span={24}>
            <Input
              label="Description"
              name="description"
              placeholder="Enter description of event"
              type="textarea"
            />
          </Col>
          <Col span={24}>
            <Input
              label="Note"
              name="note"
              placeholder="Enter note of event"
              type="textarea"
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
      <Modal
        width={700}
        open={modal.isOpen}
        onCancel={modal.handleClose}
        destroyOnClose
      >
        <SelectTimeModal
          selectedDate={selectedDate}
          isOpen={modal.isOpen}
          handleSetTimeRange={handleSetTimeRange}
        />
      </Modal>
    </StyledAddEventModal>
  );
};

export default AddEventModal;
