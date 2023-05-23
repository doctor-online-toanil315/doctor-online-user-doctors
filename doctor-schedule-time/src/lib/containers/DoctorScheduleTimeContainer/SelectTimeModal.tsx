import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useEffect, useRef } from "react";
import { StyledSelectTimeModal } from "./styled";
import { useGetDoctorEventsQuery, useGetMeQuery } from "src/lib/services";
import moment from "moment";

interface Props {
  selectedDate: number;
  isOpen: boolean;
  handleSetTimeRange: (start: number, end: number) => void;
}

const SelectTimeModal = ({
  selectedDate,
  isOpen,
  handleSetTimeRange,
}: Props) => {
  const calendarRef = useRef<FullCalendar>(null!);
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
    if (isOpen || events?.data) {
      calendarRef.current.getApi().changeView("timeGridDay");
    }
  }, [isOpen, events]);

  return (
    <StyledSelectTimeModal>
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        slotDuration="00:30:00"
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }}
        slotLabelInterval="00:30:00"
        slotMinTime="07:00"
        slotMaxTime="18:00"
        headerToolbar={{
          left: "",
          center: "",
          right: "",
        }}
        initialDate={new Date(Number(selectedDate ?? Date.now()))}
        events={events?.data.map((event) => {
          return {
            title: event.type,
            start: Number(event.from),
            end: Number(event.to),
            backgroundColor: "#796EFF",
          };
        })}
        eventContent={(eventInfo) => {
          console.log(eventInfo);
          return <div>{eventInfo.event.title}</div>;
        }}
        expandRows={true}
        selectable={true}
        select={(arg) =>
          handleSetTimeRange(arg.start.valueOf(), arg.end.valueOf())
        }
        selectOverlap={false}
      />
    </StyledSelectTimeModal>
  );
};

export default SelectTimeModal;
