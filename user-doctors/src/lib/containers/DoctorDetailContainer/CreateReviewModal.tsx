import React from "react";
import { StyledCreateReviewModal } from "./styled";
import {
  Button,
  Checkbox,
  Input,
  SadIcon,
  SmileIcon,
  openNotification,
} from "doctor-online-components";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { HAPPY_WITH, RATING_DESCRIBE_ENUM } from "src/lib/constants";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { Rate } from "antd";
import {
  useCreateDoctorReviewMutation,
  useGetDoctorByIdQuery,
} from "src/lib/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { yup } from "doctor-online-common";
import { useTranslation } from "react-i18next";

interface Props {
  handleClose: () => void;
}

const CreateReviewModal = ({ handleClose }: Props) => {
  const { t } = useTranslation();
  const { doctorId } = useParams();
  const { data: doctorById } = useGetDoctorByIdQuery(doctorId ?? "", {
    skip: !doctorId,
  });
  const form = useForm({
    defaultValues: {
      recommend: true,
      problem: "",
      reasonHappyWith: [],
      rate: 5,
      experience: "",
    },
    resolver: yupResolver(
      yup.object({
        problem: yup.string().required(t("common:form.required")),
        reasonHappyWith: yup.array().min(1, t("common:form.required")),
        experience: yup.string().required(t("common:form.required")),
      })
    ),
  });
  const [createReview, { isLoading }] = useCreateDoctorReviewMutation();

  const handleChangeReasonHappyWith = (e: CheckboxChangeEvent) => {
    const checkedSpecial = new Set(
      form.getValues("reasonHappyWith") as string[]
    );

    if (checkedSpecial.has(e.target.name ?? "")) {
      checkedSpecial.delete(e.target.name ?? "");
    } else {
      checkedSpecial.add(e.target.name ?? "");
    }

    form.setValue("reasonHappyWith", Array.from(checkedSpecial) as any);
  };

  const onSubmit = (data: {
    recommend: boolean;
    problem: string;
    reasonHappyWith: string[];
    rate: number;
    experience: string;
  }) => {
    const reviewDto = {
      ...data,
      doctorId: doctorId ?? "",
      reasonHappyWith: data.reasonHappyWith.join(","),
    };
    createReview(reviewDto)
      .unwrap()
      .then(() => {
        handleClose();
        openNotification({
          type: "success",
          message: t("addReviewSuccess"),
        });
      });
  };

  return (
    <StyledCreateReviewModal>
      <FormProvider {...form}>
        <h2>
          How was your appointment experienc with Dr.{" "}
          {`${doctorById?.data.user?.firstName} ${doctorById?.data.user?.lastName}`}
        </h2>
        <div className="form">
          <div className="recommend">
            <p>Would you like to recommend the doctor?</p>
            <div
              onClick={() =>
                form.setValue("recommend", true, { shouldValidate: true })
              }
              className={`action purple ${
                form.getValues("recommend") ? "active" : ""
              }`}
            >
              <SmileIcon />
              Yes
            </div>
            <div
              onClick={() =>
                form.setValue("recommend", false, { shouldValidate: true })
              }
              className={`action red ${
                form.getValues("recommend") ? "" : "active"
              }`}
            >
              <SadIcon />
              No
            </div>
          </div>
          <Input
            name="problem"
            label="For wich health problem/treatment did you visit?"
            placeholder="Enter your problem or treatment which you visited"
            required
          />
          <div className="reason-happy">
            <p>What were you most happy with?</p>
            <div className="options">
              {HAPPY_WITH.map((reason) => {
                return (
                  <div className="happy-option-item" key={reason}>
                    <Checkbox
                      name={reason}
                      onChange={handleChangeReasonHappyWith}
                    />
                    <span>{reason}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rating">
            <div className="infos">
              <span>How overall you rate</span>
              <p>
                Dr.{" "}
                {`${doctorById?.data.user?.firstName} ${doctorById?.data.user?.lastName}`}
              </p>
            </div>
            <div className="rate">
              <Rate
                allowClear={false}
                onChange={(value) =>
                  form.setValue("rate", value, { shouldValidate: true })
                }
                value={form.getValues("rate")}
              />
              {form.getValues("rate") && (
                <span className="rate-text">
                  {RATING_DESCRIBE_ENUM[form.getValues("rate")]}
                </span>
              )}
            </div>
          </div>
          <Input
            type="textarea"
            name="experience"
            label="Share your experience"
            placeholder="Enter your experience"
            required
          />
          <Button loading={isLoading} onClick={form.handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </FormProvider>
    </StyledCreateReviewModal>
  );
};

export default CreateReviewModal;
