import React, { useEffect } from "react";
import { Line, StyledWorkingTimeContainer } from "./styled";
import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  ClockIcon,
  Input,
  Switch,
  openNotification,
} from "doctor-online-components";
import {
  useGetDoctorWorkingTimeQuery,
  useGetMeQuery,
  useUpdateWorkingTimeMutation,
} from "src/lib/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { yup } from "doctor-online-common";
import { useTranslation } from "react-i18next";
import { UpdateWorkingType } from "src/lib/types";

const WorkingTimeContainer = () => {
  const { t } = useTranslation();
  const { data: currentUserLogin } = useGetMeQuery();
  const { data: workingTime } = useGetDoctorWorkingTimeQuery(
    currentUserLogin?.data.doctor?.id ?? "",
    {
      skip: !currentUserLogin?.data.doctor?.id,
    }
  );
  const [updateWorkingTime, { isLoading }] = useUpdateWorkingTimeMutation();
  const form = useForm({
    defaultValues: {
      monFrom: "",
      monTo: "",
      tueFrom: "",
      tueTo: "",
      wedFrom: "",
      wedTo: "",
      thuFrom: "",
      thuTo: "",
      friFrom: "",
      friTo: "",
      satFrom: "",
      satTo: "",
      sunFrom: "",
      sunTo: "",
      isMonOpen: true,
      isTueOpen: true,
      isWedOpen: true,
      isThuOpen: true,
      isFriOpen: true,
      isSatOpen: true,
      isSunOpen: true,
    },
    resolver: yupResolver(
      yup.object().shape({
        monFrom: yup
          .string()
          .required(t("common:form.required"))
          .matches(
            /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/,
            "working time is invalid"
          ),
        monTo: yup
          .string()
          .required(t("common:form.required"))
          .matches(
            /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/,
            "working time is invalid"
          ),
        tueFrom: yup
          .string()
          .required(t("common:form.required"))
          .matches(
            /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/,
            "working time is invalid"
          ),
        tueTo: yup
          .string()
          .required(t("common:form.required"))
          .matches(
            /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/,
            "working time is invalid"
          ),
        wedFrom: yup
          .string()
          .required(t("common:form.required"))
          .matches(
            /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/,
            "working time is invalid"
          ),
        wedTo: yup
          .string()
          .required(t("common:form.required"))
          .matches(
            /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/,
            "working time is invalid"
          ),
        thuFrom: yup
          .string()
          .required(t("common:form.required"))
          .matches(
            /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/,
            "working time is invalid"
          ),
        thuTo: yup
          .string()
          .required(t("common:form.required"))
          .matches(
            /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/,
            "working time is invalid"
          ),
        friFrom: yup
          .string()
          .required(t("common:form.required"))
          .matches(
            /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/,
            "working time is invalid"
          ),
        friTo: yup
          .string()
          .required(t("common:form.required"))
          .matches(
            /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/,
            "working time is invalid"
          ),
        satFrom: yup
          .string()
          .required(t("common:form.required"))
          .matches(
            /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/,
            "working time is invalid"
          ),
        satTo: yup
          .string()
          .required(t("common:form.required"))
          .matches(
            /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/,
            "working time is invalid"
          ),
        sunFrom: yup
          .string()
          .required(t("common:form.required"))
          .matches(
            /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/,
            "working time is invalid"
          ),
        sunTo: yup
          .string()
          .required(t("common:form.required"))
          .matches(
            /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/,
            "working time is invalid"
          ),
      })
    ),
  });

  useEffect(() => {
    if (workingTime?.data) {
      form.reset(workingTime?.data);
    }
  }, [workingTime]);

  const onSubmit = (data: Partial<UpdateWorkingType>) => {
    updateWorkingTime({
      ...(data as UpdateWorkingType),
      id: workingTime?.data.id ?? "",
      doctorId: currentUserLogin?.data.doctor?.id ?? "",
    })
      .unwrap()
      .then(() => {
        openNotification({
          type: "success",
          message: "Update working time successfully!",
        });
      });
  };

  return (
    <StyledWorkingTimeContainer>
      <h2>Set Opening Hours (VN - UTC+7)</h2>
      <Line />
      <FormProvider {...form}>
        <ul className="working-time-list">
          <li className="working-time-item">
            <span className="day">Monday</span>
            <div className="time-range">
              <Input type="time" name="monFrom" suffix={<ClockIcon />} />
              <span>To</span>
              <Input type="time" name="monTo" suffix={<ClockIcon />} />
            </div>
            <div className="open">
              <Switch
                onChange={(value) =>
                  form.setValue("isMonOpen", value, { shouldValidate: true })
                }
                checked={form.getValues("isMonOpen")}
              />
              <span>{form.getValues("isMonOpen") ? "Open" : "Close"}</span>
            </div>
          </li>
          <li className="working-time-item">
            <span className="day">Tuesday</span>
            <div className="time-range">
              <Input type="time" name="tueFrom" suffix={<ClockIcon />} />
              <span>To</span>
              <Input type="time" name="tueTo" suffix={<ClockIcon />} />
            </div>
            <div className="open">
              <Switch
                onChange={(value) =>
                  form.setValue("isTueOpen", value, { shouldValidate: true })
                }
                checked={form.getValues("isTueOpen")}
              />
              <span>{form.getValues("isTueOpen") ? "Open" : "Close"}</span>
            </div>
          </li>
          <li className="working-time-item">
            <span className="day">Wednesday</span>
            <div className="time-range">
              <Input type="time" name="wedFrom" suffix={<ClockIcon />} />
              <span>To</span>
              <Input type="time" name="wedTo" suffix={<ClockIcon />} />
            </div>
            <div className="open">
              <Switch
                onChange={(value) =>
                  form.setValue("isWedOpen", value, { shouldValidate: true })
                }
                checked={form.getValues("isWedOpen")}
              />
              <span>{form.getValues("isWedOpen") ? "Open" : "Close"}</span>
            </div>
          </li>
          <li className="working-time-item">
            <span className="day">Thursday</span>
            <div className="time-range">
              <Input type="time" name="thuFrom" suffix={<ClockIcon />} />
              <span>To</span>
              <Input type="time" name="thuTo" suffix={<ClockIcon />} />
            </div>
            <div className="open">
              <Switch
                onChange={(value) =>
                  form.setValue("isThuOpen", value, { shouldValidate: true })
                }
                checked={form.getValues("isThuOpen")}
              />
              <span>{form.getValues("isThuOpen") ? "Open" : "Close"}</span>
            </div>
          </li>
          <li className="working-time-item">
            <span className="day">Friday</span>
            <div className="time-range">
              <Input type="time" name="friFrom" suffix={<ClockIcon />} />
              <span>To</span>
              <Input type="time" name="friTo" suffix={<ClockIcon />} />
            </div>
            <div className="open">
              <Switch
                onChange={(value) =>
                  form.setValue("isFriOpen", value, { shouldValidate: true })
                }
                checked={form.getValues("isFriOpen")}
              />
              <span>{form.getValues("isFriOpen") ? "Open" : "Close"}</span>
            </div>
          </li>
          <li className="working-time-item">
            <span className="day">Saturday</span>
            <div className="time-range">
              <Input type="time" name="satFrom" suffix={<ClockIcon />} />
              <span>To</span>
              <Input type="time" name="satTo" suffix={<ClockIcon />} />
            </div>
            <div className="open">
              <Switch
                onChange={(value) =>
                  form.setValue("isSatOpen", value, { shouldValidate: true })
                }
                checked={form.getValues("isSatOpen")}
              />
              <span>{form.getValues("isSatOpen") ? "Open" : "Close"}</span>
            </div>
          </li>
          <li className="working-time-item">
            <span className="day">Sunday</span>
            <div className="time-range">
              <Input type="time" name="sunFrom" suffix={<ClockIcon />} />
              <span>To</span>
              <Input type="time" name="sunTo" suffix={<ClockIcon />} />
            </div>
            <div className="open">
              <Switch
                onChange={(value) =>
                  form.setValue("isSunOpen", value, { shouldValidate: true })
                }
                checked={form.getValues("isSunOpen")}
              />
              <span>{form.getValues("isSunOpen") ? "Open" : "Close"}</span>
            </div>
          </li>
          <li className="working-time-item">
            <Button
              className="user-ctrl"
              loading={isLoading}
              onClick={form.handleSubmit(onSubmit)}
            >
              Save Changes
            </Button>
          </li>
        </ul>
      </FormProvider>
    </StyledWorkingTimeContainer>
  );
};

export default WorkingTimeContainer;
