import React, { useEffect, useMemo, useState } from "react";
import { StyledDoctorInfos, StyledImportDoctorsModal } from "./styled";
import { yup } from "doctor-online-common";
import { useTranslation } from "react-i18next";
import { ValidationError } from "yup";
import {
  Button,
  DangerIcon,
  Table,
  openNotification,
} from "doctor-online-components";
import { ColumnType } from "antd/lib/table";
import { CreateDoctorType } from "src/lib/types/DoctorType";
import { Popover } from "antd";
import { useAddDoctorMutation } from "src/lib/services";

interface Props {
  handleClose: () => void;
  data: unknown[];
}

const ImportDoctorsModal = ({ handleClose, data }: Props) => {
  const { t } = useTranslation();
  const [validationResult, setValidationResult] = useState<
    Record<string, string>[]
  >([]);
  const [addDoctor, { isLoading: addDoctorLoading }] = useAddDoctorMutation();

  useEffect(() => {
    const schema = yup.object().shape({
      email: yup.string().email().required(t("common:form.required")),
      firstName: yup.string().required(t("common:form.required")),
      lastName: yup.string().required(t("common:form.required")),
      phoneNumber: yup
        .string()
        .matches(/^((\+)33|0)[1-9](\d{2}){4}$/, "phone number is invalid"),
      address: yup.string().required(t("common:form.required")),
      certificate: yup.string().required(t("common:form.required")),
      identityCardFrontSide: yup.string().required(t("common:form.required")),
      identityCardBackSide: yup.string().required(t("common:form.required")),
      yearOfExperience: yup.string().required(t("common:form.required")),
      specialize: yup.string().required(t("common:form.required")),
      specializeTitle: yup.string().required(t("common:form.required")),
      price: yup.string().required(t("common:form.required")),
    });

    data.forEach((item) => {
      const validationResultItem: Record<string, string> = {};
      schema
        .validate(item, { abortEarly: false })
        .catch((error) => {
          for (const inner of (error as ValidationError).inner) {
            validationResultItem[inner.path as string] = inner.message;
          }
        })
        .finally(() => {
          setValidationResult((prev) => [...prev, validationResultItem]);
        });
    });
  }, []);

  const tableInstance = Table.useTable();
  const columns: ColumnType<CreateDoctorType>[] = [
    {
      title: "Doctor Name",
      dataIndex: "doctor",
      key: "doctor",
      render: (_, record, index) => (
        <StyledDoctorInfos>
          <img
            src={`https://ui-avatars.com/api/?name=${
              record.firstName + " " + record.lastName
            }`}
            alt="doctor avatar"
          />
          <div className="infos">
            <p>Dr. {`${record.firstName} ${record.lastName}`}</p>
          </div>
          <div className="error">
            {Object.keys(validationResult[index] ?? {}).length > 0 && (
              <div>
                <Popover
                  content={
                    <>
                      {Object.keys(validationResult[index]).map((key) => {
                        return (
                          <p
                            key={key}
                          >{`${key}: ${validationResult[index][key]}`}</p>
                        );
                      })}
                    </>
                  }
                  trigger={"hover"}
                >
                  <DangerIcon />
                </Popover>
              </div>
            )}
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
      title: "Phone Number",
      dataIndex: "id",
      key: "id",
      render: (_, record) => record.phoneNumber,
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
  ];

  const handleImport = async () => {
    await Promise.all(
      data
        .filter(
          (_, filterIndex) =>
            Object.keys(validationResult[filterIndex]).length === 0
        )
        .map((item, mapIndex) => {
          return addDoctor(item as CreateDoctorType);
        })
    );
    openNotification({
      type: "success",
      message: t("addDoctorSuccessFully"),
    });
    handleClose();
  };

  return (
    <StyledImportDoctorsModal>
      <h2>Import Doctors</h2>
      <Table
        tableInstance={tableInstance}
        loading={false}
        columns={columns}
        dataSource={data}
        totalElements={data.length}
        totalPages={1}
        rowClassName={(record, index) =>
          Object.keys(validationResult[index] ?? {}).length > 0
            ? "row-danger"
            : ""
        }
        showPagination
      />
      <div className="user-ctrl">
        <Button onClick={() => handleClose()} border="outline">
          Cancel
        </Button>
        <Button loading={addDoctorLoading} onClick={handleImport}>
          Save
        </Button>
      </div>
    </StyledImportDoctorsModal>
  );
};

export default ImportDoctorsModal;
