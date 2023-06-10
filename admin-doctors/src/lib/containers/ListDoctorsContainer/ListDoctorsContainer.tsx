import { ColumnType } from "antd/lib/table";
import { useModal } from "doctor-online-common";
import {
  Button,
  DeleteIcon,
  EyeIcon,
  ImportIcon,
  Input,
  Modal,
  PlusIcon,
  SearchIcon,
  StarGold,
  Table,
  openNotification,
} from "doctor-online-components";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { useDebounceWithoutDependencies } from "src/lib/hooks";
import { useDeleteDoctorMutation, useGetDoctorsQuery } from "src/lib/services";
import { DoctorType } from "src/lib/types/DoctorType";
import * as XLSX from "xlsx";
import { AddDoctorModal } from "../AddDoctorModal";
import { ImportDoctorsModal } from "../ImportDoctorsModal.tsx";
import { StyledDoctorInfos, StyledMyAppointmentsContainer } from "./styled";
import { ConfirmModal } from "../ConfirmModal";
import { DOCTOR_TAB_ENUM } from "src/lib/constants";

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
  const confirmModal = useModal();
  const [importData, setImportData] = useState<unknown[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [deleteDoctor, { isLoading }] = useDeleteDoctorMutation();

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
      render: (_, record) => <span>{record.price.toLocaleString()} VND</span>,
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
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_, record) => (
        <div className="user-ctrl">
          <Link className="action" to={`/${record.doctorId}`}>
            <EyeIcon />
          </Link>
          <div
            className="action"
            onClick={() => {
              setSelectedDoctor(record.doctorId);
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

  const handleTabChange = (value: string) => {
    searchParams.set("type", value);
    setSearchParams(searchParams);
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(event.target.files[0]);
      fileReader.onload = (e) => {
        const bufferArray = e?.target?.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        setImportData(data);
        importModal.handleOpen();
        event.target.value = "";
      };
    }
  };

  const handleDelete = (doctorId: string) => {
    deleteDoctor(doctorId)
      .unwrap()
      .then(() => {
        openNotification({
          type: "success",
          message: "Delete doctor successfully.",
        });
        confirmModal.handleClose();
        setSelectedDoctor(null);
      });
  };

  return (
    <StyledMyAppointmentsContainer>
      <h2>Doctor List</h2>
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
            <Button>
              <label htmlFor="doctorsExcel">
                <ImportIcon /> Import Doctors
              </label>
            </Button>
            <input
              id="doctorsExcel"
              name="doctorsExcel"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button onClick={() => modal.handleOpen()}>
              <PlusIcon /> Add Doctor
            </Button>
          </div>
        </div>
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
      <Modal
        width={800}
        destroyOnClose
        open={modal.isOpen}
        onCancel={modal.handleClose}
      >
        <AddDoctorModal handleClose={modal.handleClose} />
      </Modal>
      <Modal
        width={1200}
        destroyOnClose
        open={importModal.isOpen}
        onCancel={importModal.handleClose}
      >
        <ImportDoctorsModal
          data={importData}
          handleClose={importModal.handleClose}
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
          handleSubmit={() => selectedDoctor && handleDelete(selectedDoctor)}
        />
      </Modal>
    </StyledMyAppointmentsContainer>
  );
};

export default ListDoctorsContainer;
