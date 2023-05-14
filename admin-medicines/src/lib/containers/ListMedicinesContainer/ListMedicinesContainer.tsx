import React, { ChangeEventHandler, useEffect, useState } from "react";
import { StyledDoctorInfos, StyledMyAppointmentsContainer } from "./styled";
import {
  Button,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  Input,
  Modal,
  PlusIcon,
  SearchIcon,
  Table,
  TextEllipsis,
  openNotification,
} from "doctor-online-components";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { ColumnType } from "antd/lib/table";
import {
  useDeleteMedicineMutation,
  useGetMedicinesQuery,
} from "src/lib/services";
import { useDebounceWithoutDependencies } from "src/lib/hooks";
import { useModal } from "doctor-online-common";
import { AddMedicineModal } from "../AddMedicineModal";
import { MedicineType } from "src/lib/types";
import { FORM_MODE_ENUM } from "src/lib/constants";
import { ConfirmModal } from "../ConfirmModal";
import { useTranslation } from "react-i18next";

const ListMedicinesContainer = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, size, search } = Object.fromEntries(searchParams.entries());
  const form = useForm();
  const [searchTerm, setSearchTerm] = useState(search);
  const [mode, setMode] = useState<FORM_MODE_ENUM>(FORM_MODE_ENUM.CREATE);
  const [medicineId, setMedicineId] = useState("");
  const tableInstance = Table.useTable();
  const { data: medicines, isFetching } = useGetMedicinesQuery(
    {
      page: page ? Number(page) + 1 : 1,
      size: size ? Number(size) : 10,
      search,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [deleteMedicine, { isLoading: deleteMedicineLoading }] =
    useDeleteMedicineMutation();
  const { setDebounce } = useDebounceWithoutDependencies(300);
  const modal = useModal();
  const confirmModal = useModal();

  const columns: ColumnType<MedicineType>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: (_, record) => (
        <StyledDoctorInfos>
          <img src={record.image} alt="medicine image" />
          <div className="infos">
            <p>{record.name}</p>
          </div>
        </StyledDoctorInfos>
      ),
    },
    {
      title: "Description",
      dataIndex: "descriptions",
      key: "descriptions",
      render: (value) => <TextEllipsis haveShowMore length={60} data={value} />,
    },
    {
      title: "Medicine Effect",
      dataIndex: "benefits",
      key: "benefits",
      render: (value) => <TextEllipsis length={60} data={value} />,
    },
    {
      title: "Restrictions, Contraindications",
      dataIndex: "restrict",
      key: "restrict",
      render: (value) => <TextEllipsis length={60} data={value} />,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_, record) => (
        <div className="user-ctrl">
          <div
            className="action"
            onClick={() => {
              setMode(FORM_MODE_ENUM.VIEW);
              setMedicineId(record.id);
              modal.handleOpen();
            }}
          >
            <EyeIcon />
          </div>
          <div
            className="action"
            onClick={() => {
              setMode(FORM_MODE_ENUM.UPDATE);
              setMedicineId(record.id);
              modal.handleOpen();
            }}
          >
            <EditIcon />
          </div>
          <div
            className="action"
            onClick={() => {
              setMedicineId(record.id);
              confirmModal.handleOpen();
            }}
          >
            <DeleteIcon />
          </div>
        </div>
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

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = () => {
    deleteMedicine(medicineId)
      .unwrap()
      .then(() => {
        openNotification({
          type: "success",
          message: t("deleteMedicineSuccessfully"),
        });
        confirmModal.handleClose();
      });
  };

  return (
    <StyledMyAppointmentsContainer>
      <h2>Medicine List</h2>
      <div className="container">
        <div className="header">
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
          <div className="user-ctrl">
            <Button
              onClick={() => {
                setMode(FORM_MODE_ENUM.CREATE);
                modal.handleOpen();
              }}
            >
              <PlusIcon /> Add Medicine
            </Button>
          </div>
        </div>
        <div className="appointment-list">
          <Table
            tableInstance={tableInstance}
            loading={isFetching}
            columns={columns}
            dataSource={medicines?.data}
            totalElements={medicines?.totalItems ?? 0}
            totalPages={medicines?.totalPages ?? 0}
          />
        </div>
      </div>
      <Modal
        width={800}
        destroyOnClose
        open={modal.isOpen}
        onCancel={modal.handleClose}
      >
        <AddMedicineModal
          mode={mode}
          medicineId={medicineId}
          handleClose={modal.handleClose}
        />
      </Modal>
      <Modal
        width={500}
        destroyOnClose
        open={confirmModal.isOpen}
        onCancel={confirmModal.handleClose}
      >
        <ConfirmModal
          handleClose={confirmModal.handleClose}
          handleSubmit={handleDelete}
        />
      </Modal>
    </StyledMyAppointmentsContainer>
  );
};

export default ListMedicinesContainer;
