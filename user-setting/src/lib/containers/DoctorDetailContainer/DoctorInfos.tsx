import { Col, Row, Spin } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Line, StyledDoctorInfos, Title } from "./styled";
import {
  useDeleteDoctorAchievementMutation,
  useDeleteDoctorEducationMutation,
  useDeleteDoctorWorkExperienceMutation,
  useGetDoctorAchievementsQuery,
  useGetDoctorByIdQuery,
  useGetDoctorEducationQuery,
  useGetDoctorWorkExperienceQuery,
  useGetMeQuery,
  useUpdateDoctorMutation,
} from "src/lib/services";
import { useParams } from "react-router-dom";
import moment from "moment";
import { FormProvider, useForm } from "react-hook-form";
import {
  Button,
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  Input,
  Modal,
  PlusIcon,
  openNotification,
} from "doctor-online-components";
import { UpdateDoctorType } from "src/lib/types/DoctorType";
import { useModal } from "doctor-online-common";
import AddNewEducationModal from "./AddNewEducationModal";
import AddNewWorkExperienceModal from "./AddNewWorkExperienceModal";
import AddNewAchievementModal from "./AddNewAchievementModal";

const DoctorInfos = () => {
  const { t } = useTranslation();
  const [addMore, setAddMore] = useState(false);
  const [specializeItem, setSpecializeItem] = useState("");
  const { data: currentUserLogin } = useGetMeQuery();
  const { data: doctorById } = useGetDoctorByIdQuery(
    currentUserLogin?.data.doctor?.id ?? "",
    {
      skip: !currentUserLogin?.data.doctor?.id,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: doctorAchievements } = useGetDoctorAchievementsQuery(
    currentUserLogin?.data.doctor?.id ?? "",
    {
      skip: !currentUserLogin?.data.doctor?.id,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: doctorEducation } = useGetDoctorEducationQuery(
    currentUserLogin?.data.doctor?.id ?? "",
    {
      skip: !currentUserLogin?.data.doctor?.id,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: doctorWorkExperiences } = useGetDoctorWorkExperienceQuery(
    currentUserLogin?.data.doctor?.id ?? "",
    {
      skip: !currentUserLogin?.data.doctor?.id,
      refetchOnMountOrArgChange: true,
    }
  );
  const [updateDoctor, { isLoading }] = useUpdateDoctorMutation();
  const [deleteDoctorAchievement, { isLoading: deleteAchievementLoading }] =
    useDeleteDoctorAchievementMutation();
  const [deleteDoctorEducation, { isLoading: deleteEducationLoading }] =
    useDeleteDoctorEducationMutation();
  const [
    deleteDoctorWorkExperience,
    { isLoading: deleteWorkExperienceLoading },
  ] = useDeleteDoctorWorkExperienceMutation();

  const form = useForm({
    defaultValues: {
      biography: "",
      specialize: "",
    },
  });

  const educationModal = useModal();
  const workExperienceModal = useModal();
  const achievementModal = useModal();

  useEffect(() => {
    if (doctorById?.data) {
      form.reset({
        biography: doctorById?.data.biography,
      });
    }
  }, [doctorById]);

  const onSubmit = (data: Partial<UpdateDoctorType>) => {
    updateDoctor({
      address: currentUserLogin?.data.address ?? "",
      biography: data.biography ?? "",
      certificate: currentUserLogin?.data.doctor?.certificate ?? "",
      email: currentUserLogin?.data.email ?? "",
      firstName: currentUserLogin?.data.firstName ?? "",
      id: currentUserLogin?.data.doctor?.id ?? "",
      identityCardBackSide:
        currentUserLogin?.data.doctor?.identityCardBackSide ?? "",
      identityCardFrontSide:
        currentUserLogin?.data.doctor?.identityCardFrontSide ?? "",
      lastName: currentUserLogin?.data.lastName ?? "",
      phoneNumber: currentUserLogin?.data.phoneNumber ?? "",
      price: currentUserLogin?.data.doctor?.price ?? 100000,
      specialize: currentUserLogin?.data.doctor?.specialize ?? "",
      specializeTitle: currentUserLogin?.data.doctor?.specializeTitle ?? "",
      yearOfExperience: currentUserLogin?.data.doctor?.yearOfExperience ?? 1,
    })
      .unwrap()
      .then(() => {
        openNotification({
          type: "success",
          message: "Update doctor successfully",
        });
      });
  };

  const upsertSpecialization = (special: string, type: "add" | "remove") => {
    let newSpecialize = currentUserLogin?.data.doctor?.specialize ?? "";

    if (type === "add") {
      newSpecialize += `,${special}`;
    } else {
      const index = newSpecialize?.indexOf(special) ?? -1;
      if (newSpecialize?.[index - 1] === ",") {
        newSpecialize = newSpecialize?.replace(`,${special}`, "");
      } else {
        newSpecialize = newSpecialize?.replace(special, "");
      }
    }

    updateDoctor({
      address: currentUserLogin?.data.address ?? "",
      biography: currentUserLogin?.data.doctor?.biography ?? "",
      certificate: currentUserLogin?.data.doctor?.certificate ?? "",
      email: currentUserLogin?.data.email ?? "",
      firstName: currentUserLogin?.data.firstName ?? "",
      id: currentUserLogin?.data.doctor?.id ?? "",
      identityCardBackSide:
        currentUserLogin?.data.doctor?.identityCardBackSide ?? "",
      identityCardFrontSide:
        currentUserLogin?.data.doctor?.identityCardFrontSide ?? "",
      lastName: currentUserLogin?.data.lastName ?? "",
      phoneNumber: currentUserLogin?.data.phoneNumber ?? "",
      price: currentUserLogin?.data.doctor?.price ?? 100000,
      specialize: newSpecialize,
      specializeTitle: currentUserLogin?.data.doctor?.specializeTitle ?? "",
      yearOfExperience: currentUserLogin?.data.doctor?.yearOfExperience ?? 1,
    })
      .unwrap()
      .then(() => {
        openNotification({
          type: "success",
          message: "Update doctor successfully",
        });
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSpecializeItem(e.target.value);
  };

  return (
    <StyledDoctorInfos>
      <h1>Doctor Information</h1>
      <FormProvider {...form}>
        <Row gutter={[50, 30]}>
          <Col span={24}>
            <div className="biography">
              <Title>{t("biography")}</Title>
              <Input
                name="biography"
                type="textarea"
                placeholder="Enter your biography here."
                required
                style={{ height: 140 }}
              />
              <div className="user-ctrl">
                <Button onClick={form.handleSubmit(onSubmit)}>
                  Save change
                </Button>
              </div>
            </div>
          </Col>
          <Line />
          <Col span={12}>
            <ul className="education">
              <Title>{t("education")}</Title>
              <Spin spinning={deleteEducationLoading}>
                {doctorEducation?.data.map((education) => {
                  return (
                    <li key={education.id}>
                      <div className="item">
                        <h4 className="item-title">{education.title}</h4>
                        <p>{education.date}</p>
                      </div>
                      <div
                        className="doctor-infos-delete"
                        onClick={() => deleteDoctorEducation(education.id)}
                      >
                        <DeleteIcon />
                      </div>
                    </li>
                  );
                })}
              </Spin>
              <Button onClick={() => educationModal.handleOpen()}>
                Add New Education
              </Button>
            </ul>
          </Col>
          <Col span={12}>
            <ul className="workAndExperience">
              <Title>{t("workAndExperience")}</Title>
              <Spin spinning={deleteWorkExperienceLoading}>
                {doctorWorkExperiences?.data.map((workExperience) => {
                  return (
                    <li key={workExperience.id}>
                      <div className="item">
                        <h4 className="item-title">{workExperience.title}</h4>
                        <p>{workExperience.date}</p>
                      </div>
                      <div
                        className="doctor-infos-delete"
                        onClick={() =>
                          deleteDoctorWorkExperience(workExperience.id)
                        }
                      >
                        <DeleteIcon />
                      </div>
                    </li>
                  );
                })}
              </Spin>
              <Button onClick={() => workExperienceModal.handleOpen()}>
                Add New Work Experience
              </Button>
            </ul>
          </Col>
          <Line />
          <Col span={24}>
            <ul className="achievements">
              <Title>{t("achievements")}</Title>
              <Spin spinning={deleteAchievementLoading}>
                <Row gutter={[40, 30]}>
                  {doctorAchievements?.data.map((achievement) => {
                    return (
                      <Col span={12} key={achievement.id}>
                        <li>
                          <div className="item">
                            <h4 className="item-title">{achievement.title}</h4>
                            <p className="link">
                              {moment(Number(achievement.date)).format(
                                "MMMM YYYY"
                              )}
                            </p>
                            <p>{achievement.description}</p>
                          </div>
                          <div
                            className="doctor-infos-delete"
                            onClick={() =>
                              deleteDoctorAchievement(achievement.id)
                            }
                          >
                            <DeleteIcon />
                          </div>
                        </li>
                      </Col>
                    );
                  })}
                  <Col span={12}>
                    <Button onClick={() => achievementModal.handleOpen()}>
                      Add New Achievement
                    </Button>
                  </Col>
                  <Line />
                </Row>
              </Spin>
            </ul>
          </Col>
          <Col span={24}>
            <Title>{t("specializations")}</Title>
            <ul className="specializations">
              {doctorById?.data.specialize.split(",").map((specialize) => {
                return (
                  <li key={specialize} className="special-item">
                    {specialize.trim()}
                    <div
                      className="delete"
                      onClick={() =>
                        upsertSpecialization(specialize.trim(), "remove")
                      }
                    >
                      <CloseIcon />
                    </div>
                  </li>
                );
              })}
              {addMore ? (
                <li key="add" className="special-item">
                  <form
                    onSubmit={() => {
                      upsertSpecialization(specializeItem, "add");
                      setAddMore(false);
                      setSpecializeItem("");
                    }}
                    className="add-more-specialize"
                  >
                    <input
                      value={specializeItem}
                      onChange={handleChange}
                      placeholder="Enter new specialization"
                    />
                    <div
                      className="confirm"
                      onClick={() => {
                        upsertSpecialization(specializeItem, "add");
                        setAddMore(false);
                        setSpecializeItem("");
                      }}
                    >
                      <CheckIcon />
                    </div>
                    <div
                      className="cancel"
                      onClick={() => {
                        setAddMore(false);
                        setSpecializeItem("");
                      }}
                    >
                      <CloseIcon />
                    </div>
                  </form>
                </li>
              ) : (
                <li
                  key="add"
                  className="special-item"
                  onClick={() => {
                    setAddMore(true);
                    setSpecializeItem("");
                  }}
                >
                  <PlusIcon /> Add more
                </li>
              )}
            </ul>
          </Col>
        </Row>
      </FormProvider>
      <Modal
        destroyOnClose
        open={educationModal.isOpen}
        onCancel={educationModal.handleClose}
        width={700}
      >
        <AddNewEducationModal
          handleClose={educationModal.handleClose}
          doctorId={currentUserLogin?.data.doctor?.id ?? ""}
        />
      </Modal>
      <Modal
        destroyOnClose
        open={workExperienceModal.isOpen}
        onCancel={workExperienceModal.handleClose}
        width={700}
      >
        <AddNewWorkExperienceModal
          handleClose={workExperienceModal.handleClose}
          doctorId={currentUserLogin?.data.doctor?.id ?? ""}
        />
      </Modal>
      <Modal
        destroyOnClose
        open={achievementModal.isOpen}
        onCancel={achievementModal.handleClose}
        width={700}
      >
        <AddNewAchievementModal
          handleClose={achievementModal.handleClose}
          doctorId={currentUserLogin?.data.doctor?.id ?? ""}
        />
      </Modal>
    </StyledDoctorInfos>
  );
};

export default DoctorInfos;
