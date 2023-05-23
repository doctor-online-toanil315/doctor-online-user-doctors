import React, { useEffect, useState } from "react";
import { StyledDoctorEventContainer } from "./styled";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import {
  Button,
  LongArrowLeftIcon,
  LongArrowRightIcon,
  Modal,
  PeopleIcon,
  PersonIcon,
  PlusIcon,
  Stethoscope,
} from "doctor-online-components";
import {
  CHANGE_DATE_ACTION_ENUM,
  DayOfWeek,
  EventTypeEnum,
} from "src/lib/constants";
import AddEventModal from "./AddEventModal";
import { useModal } from "doctor-online-common";
import { useGetDoctorEventsQuery, useGetMeQuery } from "src/lib/services";
import { Col, Row } from "antd";
import DoctorNotFoundImg from "src/lib/assets/doctor-not-found.png";

const DoctorEventContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [dateInRange, SetDateInRange] = useState<number>(0);
  const from = moment(Number(dateInRange)).startOf("weeks").valueOf();
  const to = moment(Number(dateInRange)).endOf("weeks").valueOf();
  const modal = useModal();
  const { data: currentUserLogin } = useGetMeQuery();

  const { data: events } = useGetDoctorEventsQuery(
    {
      from: moment(Number(selectedDate)).startOf("day").valueOf(),
      to: moment(Number(selectedDate)).endOf("day").valueOf(),
      id: currentUserLogin?.data.doctor?.id ?? "",
    },
    {
      skip: !currentUserLogin?.data.doctor?.id || !selectedDate,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (selectedDate) {
      searchParams.delete("date");
      searchParams.append("date", selectedDate.toString());
      setSearchParams(searchParams);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(Date.now());
      SetDateInRange(Date.now());
    }
  }, []);

  const handleSelectedDateChange = (action: CHANGE_DATE_ACTION_ENUM) => {
    return () => {
      if (action === CHANGE_DATE_ACTION_ENUM.INCREASE) {
        SetDateInRange(moment(dateInRange).add(1, "weeks").valueOf());
      } else {
        SetDateInRange(moment(dateInRange).subtract(1, "weeks").valueOf());
      }
    };
  };

  const renderDayOfWeek = () => {
    const startTime = moment(Number(from));
    const endTime = moment(Number(to));

    return Array(7)
      .fill(1)
      .map((_, index) => {
        return (
          <li
            key={index}
            onClick={() =>
              setSelectedDate(
                startTime.valueOf() + index * (1000 * 60 * 60 * 24)
              )
            }
            className={`day-item ${
              new Date(selectedDate).getDay() === index &&
              selectedDate <= to &&
              selectedDate >= from
                ? "active"
                : ""
            }`}
          >
            {DayOfWeek[index].toLowerCase()}
          </li>
        );
      });
  };

  const renderEvents = () => {
    return events?.data.map((event) => {
      return (
        <Col span={6}>
          <li className="event-item" key={event.id}>
            <div className={`icon ${EventTypeEnum.MEETING ? "purple" : "red"}`}>
              {EventTypeEnum.MEETING ? <PeopleIcon /> : <Stethoscope />}
            </div>
            <div className="info">
              <h3>{event.type.toLowerCase()}</h3>
              <span>{`${moment(Number(event.from)).format("LT")} - ${moment(
                Number(event.to)
              ).format("LT")}`}</span>
            </div>
          </li>
        </Col>
      );
    });
  };

  return (
    <StyledDoctorEventContainer>
      <div className="header">
        <div className="user-ctrl">
          <div
            className="action next"
            onClick={handleSelectedDateChange(CHANGE_DATE_ACTION_ENUM.DECREASE)}
          >
            <LongArrowLeftIcon width={16} />
          </div>
          {`${moment(dateInRange).startOf("weeks").format("DD")} - ${moment(
            dateInRange
          )
            .endOf("weeks")
            .format("DD MMM, YYYY")}`}
          <div
            className="action prev"
            onClick={handleSelectedDateChange(CHANGE_DATE_ACTION_ENUM.INCREASE)}
          >
            <LongArrowRightIcon width={16} />
          </div>
        </div>
        <div className="add-event">
          <Button onClick={() => modal.handleOpen()}>
            <PlusIcon /> Add Event
          </Button>
        </div>
      </div>
      <ul className="day-of-week">{renderDayOfWeek()}</ul>
      {events?.data.length ? (
        <Row gutter={[20, 20]}>
          <ul className="list-events">{renderEvents()}</ul>
        </Row>
      ) : (
        <div className="empty">
          <img src={DoctorNotFoundImg} alt="not found appointments" />
          <p>No event on {moment(selectedDate).format("MMM DD, YYYY")}</p>
        </div>
      )}
      <Modal width={600} onCancel={modal.handleClose} open={modal.isOpen}>
        <AddEventModal
          handleClose={modal.handleClose}
          doctorId={currentUserLogin?.data.doctor?.id ?? ""}
          isOpen={modal.isOpen}
        />
      </Modal>
    </StyledDoctorEventContainer>
  );
};

export default DoctorEventContainer;
