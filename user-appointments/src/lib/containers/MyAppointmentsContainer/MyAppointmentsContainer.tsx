import React, { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import { StyledDoctorInfos, StyledMyAppointmentsContainer } from "./styled";
import { Input, SearchIcon, Table, Tabs } from "doctor-online-components";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { ColumnType } from "antd/lib/table";
import { AppointmentType } from "src/lib/types";
import moment from "moment";
import { APPOINTMENT_STATUS } from "src/lib/constants";
import { useGetAppointmentByUserQuery, useGetMeQuery } from "src/lib/services";
import { useDebounceWithoutDependencies } from "src/lib/hooks";

const MyAppointmentsContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { type, page, search } = Object.fromEntries(searchParams.entries());
  const form = useForm();
  const [searchTerm, setSearchTerm] = useState(search);
  const tableInstance = Table.useTable();
  const { data: currentUserLogin } = useGetMeQuery();
  const { data: appointments, isFetching } = useGetAppointmentByUserQuery(
    {
      userId: currentUserLogin?.data.id ?? "",
      page: Number(page) + 1 ?? 1,
      size: 10,
      status: type === "ALL" ? undefined : (type as APPOINTMENT_STATUS),
      search,
    },
    {
      skip: !currentUserLogin?.data.id,
      refetchOnMountOrArgChange: true,
    }
  );
  const { setDebounce } = useDebounceWithoutDependencies(300);

  const tabContents = useMemo(() => {
    return [
      {
        id: "ALL",
        title: "All Appointment",
      },
      {
        id: APPOINTMENT_STATUS.WAITING,
        title: "Waiting",
      },
      {
        id: APPOINTMENT_STATUS.CONFIRMED,
        title: "Confirmed",
      },
      {
        id: APPOINTMENT_STATUS.DECLINED,
        title: "Declined",
      },
    ];
  }, []);

  const columns: ColumnType<AppointmentType>[] = [
    {
      title: "Doctor Name",
      dataIndex: "doctor",
      key: "doctor",
      render: (_, record) => (
        <StyledDoctorInfos>
          <img
            src={
              record.doctor.user.avatar ??
              "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
            }
            alt="doctor avatar"
          />
          <div className="infos">
            <p>
              Dr.{" "}
              {`${record.doctor.user.firstName} ${record.doctor.user.lastName}`}
            </p>
            <span>{record.doctor.specializeTitle}</span>
          </div>
        </StyledDoctorInfos>
      ),
    },
    {
      title: "Appointment Date",
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <StyledDoctorInfos>
          <div className="infos">
            <p>{moment(Number(record.startTime)).format("DD MMM, YYYY")}</p>
            <span>{moment(Number(record.startTime)).format("LT")}</span>
          </div>
        </StyledDoctorInfos>
      ),
    },
    {
      title: "Booking Date",
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <StyledDoctorInfos>
          <div className="infos">
            <p>
              {moment(new Date(record.created_at).valueOf()).format(
                "DD MMM, YYYY"
              )}
            </p>
          </div>
        </StyledDoctorInfos>
      ),
    },
    {
      title: "Status",
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <p
          className={`tag ${
            record.status === APPOINTMENT_STATUS.WAITING
              ? "orange"
              : record.status === APPOINTMENT_STATUS.DECLINED
              ? "red"
              : "purple"
          }`}
        >
          {record.status}
        </p>
      ),
    },
    {
      title: "Amount",
      dataIndex: "id",
      key: "id",
      render: (_, record) => <span>${record.doctor.price.toFixed(2)}</span>,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <Link className="action" to={`/${record.id}`}>
          Details
        </Link>
      ),
    },
  ];

  useEffect(() => {}, [searchParams]);

  useEffect(() => {
    setDebounce(() => {
      if (searchTerm) {
        searchParams.set("search", String(searchTerm));
      } else {
        searchParams.delete("search");
      }
      setSearchParams(searchParams);
    });
  }, [searchTerm]);

  const handleTabChange = (value: string) => {
    searchParams.set("type", value);
    setSearchParams(searchParams);
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <StyledMyAppointmentsContainer>
      <h2>Appointment List</h2>
      <Tabs
        onChange={handleTabChange}
        activeKey={type}
        contentCommon={tabContents as any}
      />
      <div className="container">
        <FormProvider {...form}>
          <Input
            value={searchTerm}
            prefix={(<SearchIcon />) as any}
            name="search"
            placeholder="Search"
            style={{ width: 350 }}
            onChange={handleSearchChange as any}
          />
        </FormProvider>
        <div className="appointment-list">
          <Table
            tableInstance={tableInstance}
            loading={isFetching}
            columns={columns}
            dataSource={appointments?.data}
            totalElements={appointments?.totalItems ?? 0}
            totalPages={appointments?.totalPages ?? 0}
          />
        </div>
      </div>
    </StyledMyAppointmentsContainer>
  );
};

export default MyAppointmentsContainer;
