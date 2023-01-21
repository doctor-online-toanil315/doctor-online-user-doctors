import React, { FC, useEffect, useState } from "react";
import {
  DateObjectType,
  FullCalendar,
  Input,
  Select,
  StarIcon,
} from "@nexthcm/components";
import { useForm } from "react-hook-form";
import { Form } from "../../containers/Form";
import { HoverCard } from "../../containers/Popover";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { DayCellContentArg } from "@fullcalendar/core";
import { useTranslation } from "react-i18next";
import { RootState, useCommonSelector, useFormat } from "@nexthcm/common";
import {
  StyleContainer,
  StyleDivDot,
  StyleDot,
  StyleDotDay,
  StyleEvent,
  StyleHeader,
  StyleLabelEvent,
} from "./styles";
import { Spinner } from "../../containers/Spin";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import * as yup from "yup";
import { useGetWorkingHourQuery } from "../../services";

type DateArrayInfo = Array<DateObjectType>;

const MAX_WIDTH_PERCENT = 100;

const OnlyMe: FC<any> = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const formatDate = useFormat();
  const getCurrentDate = (currentMonth, currentYear) => {
    const startDate = moment([currentYear, currentMonth]).toDate().getTime();
    const endDate = moment(startDate).endOf("month").toDate().getTime();
    return [startDate, endDate];
  };

  const optionsMonth = [
    {
      key: 0,
      value: "0",
      label: "January",
      render: () => <span>{t("overViewOnlyMe.january")}</span>,
    },
    {
      key: 1,
      value: "1",
      label: "February",
      render: () => <span>{t("overViewOnlyMe.february")}</span>,
    },
    {
      key: 2,
      value: "2",
      label: "March",
      render: () => <span>{t("overViewOnlyMe.march")}</span>,
    },
    {
      key: 3,
      value: "3",
      label: "April",
      render: () => <span>{t("overViewOnlyMe.april")}</span>,
    },
    {
      key: 4,
      value: "4",
      label: "May",
      render: () => <span>{t("overViewOnlyMe.may")}</span>,
    },
    {
      key: 5,
      value: "5",
      label: "June",
      render: () => <span>{t("overViewOnlyMe.june")}</span>,
    },
    {
      key: 6,
      value: "6",
      label: "July",
      render: () => <span>{t("overViewOnlyMe.july")}</span>,
    },
    {
      key: 7,
      value: "7",
      label: "August",
      render: () => <span>{t("overViewOnlyMe.august")}</span>,
    },
    {
      key: 8,
      value: "8",
      label: "September",
      render: () => <span>{t("overViewOnlyMe.september")}</span>,
    },
    {
      key: 9,
      value: "9",
      label: "October",
      render: () => <span>{t("overViewOnlyMe.october")}</span>,
    },
    {
      key: 10,
      value: "10",
      label: "November",
      render: () => <span>{t("overViewOnlyMe.november")}</span>,
    },
    {
      key: 11,
      value: "11",
      label: "December",
      render: () => <span>{t("overViewOnlyMe.december")}</span>,
    },
  ];
  const defaultValues = {
    month: searchParams.get("month")
      ? searchParams.get("month")
      : new Date().getMonth().toString(),
    year: searchParams.get("year")
      ? searchParams.get("year")
      : new Date().getFullYear(),
  };
  const form = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(
      yup.object({
        year: yup.number().nullable(),
        month: yup.string().nullable(),
      })
    ),
  });

  const { user } = useCommonSelector((state: RootState) => state.user);
  const [date, setDate] = useState(
    searchParams.get("month")
      ? new Date(
          getCurrentDate(searchParams.get("month"), searchParams.get("year"))[0]
        )
      : new Date()
  );
  const [workingHour, setWorkingHour] = useState({
    fromDate: searchParams.get("month")
      ? getCurrentDate(searchParams.get("month"), searchParams.get("year"))[0]
      : moment().startOf("month").toDate().getTime(),
    toDate: searchParams.get("month")
      ? getCurrentDate(searchParams.get("month"), searchParams.get("year"))[1]
      : moment().endOf("month").toDate().getTime(),
    size: 31,
    userId: user.userId,
    month: searchParams.get("month")
      ? searchParams.get("month")
      : new Date().getMonth(),
  });
  const [dateEvent, setDateEvent] = useState([] as DateArrayInfo);

  const { data, isFetching } = useGetWorkingHourQuery(workingHour, {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (data) {
      setDateEvent(data.data.items);
    }
  }, [data]);

  const onSubmit = (data: any) => {
    const newDate = moment([data.year, data.month]).toDate();
    setDate(newDate);
    searchParams.set("month", data.month);
    searchParams.set("year", data.year);
    setSearchParams(searchParams);
    setWorkingHour({
      ...workingHour,
      fromDate: moment(newDate).startOf("month").toDate().getTime(),
      toDate: moment(newDate).endOf("month").toDate().getTime(),
      month: data.month,
    });
  };
  const renderDayCell = (dayCellContent: DayCellContentArg) => {
    if (!dateEvent)
      return (
        <>
          <span
            className="day-number"
            style={{ textAlign: "center", display: "block" }}
          >
            {dayCellContent.dayNumberText}
          </span>

          <HoverCard type="other">
            <div className="hover-area" />
          </HoverCard>
        </>
      );

    let width = "";

    const time = dateEvent?.find(
      (item) => item?.trackingDate === dayCellContent?.date?.getTime()
    );

    const isRenderProgressBackground =
      (time && !time.isWeekend) || (time && time?.isWeekend && time?.ot);
    const backGroundProgress = isRenderProgressBackground ? (
      <div className="progress progress-background" />
    ) : null;

    if (time) {
      width =
        (time?.workingDay ? time?.workingDay : 0) * MAX_WIDTH_PERCENT + "%";
    }

    const hoverCardContent =
      time && HoverCard ? (
        <HoverCard
          data={{
            timeIn: time?.inTime,
            timeOut: time?.outTime,
            totalWorkingHour: time?.totalWorkingTime,
            overTime: time?.ot ? time?.ot : "",
            workingOnsite: time?.onsiteDay ? time?.onsiteDay : "",
          }}
        >
          <div className="hover-area" />
        </HoverCard>
      ) : null;

    return (
      <>
        <span
          className="day-number"
          style={{ textAlign: "center", display: "block" }}
        >
          {dayCellContent.dayNumberText}
        </span>
        <div
          className={time?.isHoliday ? "progress-holiday progress" : "progress"}
          style={{ width: time?.isHoliday ? "100%" : width }}
        />
        <StyleDivDot>
          {time?.ot && time?.ot > 0 ? <StyleDotDay property="overTime" /> : ""}
          {time?.onsiteDay && time?.onsiteDay > 0 ? (
            <StyleDotDay property="onSite" />
          ) : (
            ""
          )}
        </StyleDivDot>
        <StyleEvent>
          {time?.leaveType ? (
            <StyleLabelEvent property={"leave"}>
              {time?.leaveType}
            </StyleLabelEvent>
          ) : (
            ""
          )}
          {time?.wfh ? (
            <StyleLabelEvent property={"workFromHome"}>WFH</StyleLabelEvent>
          ) : (
            ""
          )}
        </StyleEvent>
        {backGroundProgress}
        {hoverCardContent}
      </>
    );
  };
  const eventInfo = dateEvent
    ?.filter(
      (ev) => (ev.leaveType && !ev.isHoliday) || (ev.isHoliday && !ev.leaveType)
    )
    .map((evn) => ({
      ...evn,
      title: evn.leaveType || evn.holidayName,
      classNames: evn.isHoliday ? "holiday" : "leave-type",
      start: moment(evn.trackingDate).format(formatDate),
    }));

  const eventHoliDayAndLeaveType = dateEvent?.filter(
    (ev) => ev.leaveType && ev.isHoliday
  );
  if (eventHoliDayAndLeaveType && eventHoliDayAndLeaveType.length > 0) {
    eventHoliDayAndLeaveType.forEach((event) => {
      const objectLeaveType = { ...event } as any;
      objectLeaveType.isHoliday = false;
      objectLeaveType.holidayName = "";
      objectLeaveType["title"] = objectLeaveType.leaveType;
      objectLeaveType["classNames"] = "leave-type";
      objectLeaveType["start"] = moment(objectLeaveType.trackingDate).format(
        formatDate
      );

      const objectHoliday = { ...event } as any;
      objectHoliday.leaveType = "";
      objectHoliday.isHoliday = true;
      objectHoliday["title"] = objectHoliday.holidayName;
      objectHoliday["classNames"] = "holiday";
      objectHoliday["start"] = moment(objectHoliday.trackingDate).format(
        formatDate
      );

      eventInfo?.push(objectHoliday);
      eventInfo?.push(objectLeaveType);
    });
  }
  const renderEventContent = (eventInfo) => {
    return (
      <>
        {eventInfo.event.extendedProps.isHoliday ? (
          <StarIcon style={{ margin: "0 2px" }} />
        ) : null}
        {eventInfo.event.title}
      </>
    );
  };
  const callback = (fromDate, toDate, month, year) => {
    setWorkingHour({ ...workingHour, fromDate, toDate, month });
    searchParams.set("month", month);
    searchParams.set("year", year);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const elInput = document.querySelectorAll(
      ".input-year-only input"
    )[0] as HTMLInputElement;

    if (elInput) {
      elInput.maxLength = 4;
      elInput.addEventListener("keydown", (e) => {
        if (e.keyCode !== 8) {
          if (
            (e.keyCode < 47 || e.keyCode > 57) &&
            (e.keyCode > 105 || e.keyCode < 95)
          ) {
            e.preventDefault();
          }

          if (e.shiftKey) {
            e.preventDefault();
          }
        }
      });

      elInput.addEventListener("keyup", (e) => {
        if (e.keyCode !== 8) {
          if (
            (e.keyCode < 47 || e.keyCode > 57) &&
            (e.keyCode > 105 || e.keyCode < 95)
          ) {
            e.preventDefault();
          }

          if (e.shiftKey) {
            e.preventDefault();
          }
        }
      });
    }
  }, []);
  return (
    <>
      <StyleHeader>{t("overViewOnlyMe.tabTitle")}</StyleHeader>
      <StyleContainer>
        <Form form={form} onSubmit={onSubmit}>
          <Input
            name="year"
            onChange={(e) => {
              form.setValue("year", e.target.value);
            }}
            allowClear={true}
            subLabel={t("overViewOnlyMe.year")}
            style={{ width: "160px" }}
            className="input-year-only"
          />
          <Select
            options={optionsMonth}
            style={{ width: "160px" }}
            name="month"
            label={t("overViewOnlyMe.month")}
            onChange={(value) => {
              form.setValue("month", value);
            }}
          />
        </Form>
        <StyleContainer className="container-right">
          <div>
            <div className="container-right__contain">
              <StyleDot property="workingday" />
              <span>{t("overViewOnlyMe.workingDay")}</span>
            </div>
            <div className="container-right__contain">
              <StyleDot property="overTime" />
              <span>{t("overViewOnlyMe.overTime")}</span>
            </div>
          </div>
          <div>
            <div className="container-right__contain">
              <StyleDot property="holiday" />
              <span>{t("overViewOnlyMe.holiday")}</span>
            </div>
            <div className="container-right__contain">
              <StyleDot property="onSite" />
              <span>{t("overViewOnlyMe.onSite")}</span>
            </div>
          </div>
        </StyleContainer>
      </StyleContainer>
      <FullCalendar
        dateView={date}
        eventContent={renderEventContent}
        events={eventInfo}
        dayCellContent={renderDayCell}
        callback={callback}
      >
        {isFetching && (
          <div className="loading">
            <Spinner />
          </div>
        )}
      </FullCalendar>
    </>
  );
};

export default OnlyMe;
