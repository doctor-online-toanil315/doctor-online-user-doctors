import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StyledDoctorInfos, StyledMyAppointmentsContainer } from "./styled";
import {
  AddIcon,
  Button,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  ImportIcon,
  Input,
  Modal,
  PlusIcon,
  SearchIcon,
  StarGold,
  Table,
} from "doctor-online-components";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { ColumnType } from "antd/lib/table";
import { AppointmentType } from "src/lib/types";
import moment from "moment";
import { useGetDoctorsQuery, useGetMeQuery } from "src/lib/services";
import { useDebounceWithoutDependencies } from "src/lib/hooks";
import { DoctorType } from "src/lib/types/DoctorType";
import { useModal } from "doctor-online-common";
import * as XLSX from "xlsx";
import { ExpandDoctor } from "../ExpandDoctor";

const ListDoctorsContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, size, search } = Object.fromEntries(searchParams.entries());
  const form = useForm();
  const [searchTerm, setSearchTerm] = useState(search);
  const tableInstance = Table.useTable();
  const { data: appointments, isFetching } = useGetDoctorsQuery(
    {
      page: page ? Number(page) + 1 : 1,
      size: size ? Number(size) : 10,
      search,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { setDebounce } = useDebounceWithoutDependencies(300);
  const modal = useModal();
  const importModal = useModal();
  const [expandedRowKey, setExpandedRowKey] = useState<string>("");

  const columns: ColumnType<DoctorType>[] = [
    {
      title: "Doctor Name",
      dataIndex: "doctor",
      key: "doctor",
      render: (_, record) => (
        <StyledDoctorInfos>
          <img
            src={
              record.avatar ??
              "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
            }
            alt="doctor avatar"
          />
          <div className="infos">
            <p>Dr. {`${record.firstName} ${record.lastName}`}</p>
          </div>
        </StyledDoctorInfos>
      ),
    },
    {
      title: "Title",
      dataIndex: "id",
      key: "id",
      render: (_, record) => record.specializeTitle,
    },
    {
      title: "Specializes",
      dataIndex: "id",
      key: "id",
      render: (_, record) =>
        record.specialize
          .split(",")
          .map((specialize) => <p className={`tag purple`}>{specialize}</p>),
    },
    {
      title: "Experience",
      dataIndex: "id",
      key: "id",
      render: (_, record) => `${record.yearOfExperience} years of experience`,
    },
    {
      title: "Price",
      dataIndex: "id",
      key: "id",
      render: (_, record) => <span>{record.price.toLocaleString()} $</span>,
    },
    {
      title: "Rating",
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <span className="center">
          <StarGold /> {record.rating.toFixed(2)}
        </span>
      ),
    },
  ];

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
      <h2>Doctor List</h2>
      <div className="container">
        <div className="appointment-list">
          <Table
            tableInstance={tableInstance}
            loading={isFetching}
            columns={columns}
            dataSource={appointments?.data}
            totalElements={appointments?.totalItems ?? 0}
            totalPages={appointments?.totalPages ?? 0}
            rowKey={(record) => record.id}
            expandable={{
              expandedRowKeys: [expandedRowKey],
              expandedRowRender: (record: any) => (
                <ExpandDoctor record={record} />
              ),
              onExpand: (expanded, record) => {
                console.log(record);
                let key = "";
                if (expanded) {
                  key = record.id;
                }
                setExpandedRowKey(key);
              },
            }}
          />
        </div>
      </div>
    </StyledMyAppointmentsContainer>
  );
};

export default ListDoctorsContainer;
