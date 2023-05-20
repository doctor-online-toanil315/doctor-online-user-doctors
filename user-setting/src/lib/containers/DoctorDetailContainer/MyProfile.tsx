import { Col, Row } from "antd";
import {
  Button,
  DatePicker,
  Input,
  OptionType,
  Select,
  openNotification,
} from "doctor-online-components";
import React, { useEffect, useRef, useState } from "react";
import { useGetMeQuery, useUpdateUserMutation } from "src/lib/services";
import { StyledMyProfile } from "./styled";
import { FileUpload } from "../FileUpload";
import { FormProvider, useForm } from "react-hook-form";
import moment from "moment";
import { ROLE_ENUM, useFormat } from "doctor-online-common";
import { GENDER_ENUM } from "src/lib/constants";
import { UpdateUserType } from "src/lib/types";

const MyProfile = () => {
  const { data: currentUserLogin } = useGetMeQuery();
  const [uploadPhoto, setUploadPhoto] = useState<string>("");
  const form = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      birthday: "",
      gender: GENDER_ENUM.MALE,
      address: "",
    },
  });
  const format = useFormat();
  const options: OptionType[] | undefined = [
    {
      key: GENDER_ENUM.MALE,
      value: GENDER_ENUM.MALE,
      label: GENDER_ENUM.MALE,
      render: () => GENDER_ENUM.MALE,
    },
    {
      key: GENDER_ENUM.FEMALE,
      value: GENDER_ENUM.FEMALE,
      label: GENDER_ENUM.FEMALE,
      render: () => GENDER_ENUM.FEMALE,
    },
  ];
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (currentUserLogin?.data) {
      const userData = currentUserLogin?.data;
      form.reset({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        address: userData.address ?? "",
        birthday: userData.birthday ?? "",
        gender: userData.gender,
        phoneNumber: userData.phoneNumber,
      });
    }
  }, [currentUserLogin]);

  useEffect(() => {
    if (uploadPhoto && currentUserLogin?.data) {
      updateUser({
        id: currentUserLogin?.data.id ?? "",
        email: currentUserLogin?.data.email ?? "",
        firstName: currentUserLogin?.data.firstName ?? "",
        lastName: currentUserLogin?.data.lastName ?? "",
        address: currentUserLogin?.data.address ?? "",
        birthday: currentUserLogin?.data.birthday ?? "",
        gender: currentUserLogin?.data.gender ?? GENDER_ENUM.MALE,
        phoneNumber: currentUserLogin?.data.phoneNumber ?? "",
        avatar: uploadPhoto,
        role: currentUserLogin?.data.role ?? ROLE_ENUM.USER,
      })
        .unwrap()
        .then(() =>
          openNotification({
            type: "success",
            message: "Upload new photo successfully",
          })
        );
      setUploadPhoto("");
    }
  }, [uploadPhoto, currentUserLogin]);

  const onSubmit = (data: Partial<UpdateUserType>) => {
    updateUser({
      id: currentUserLogin?.data.id ?? "",
      email: data.email ?? "",
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
      address: data.address ?? "",
      birthday: data.birthday ?? "",
      gender: data.gender ?? GENDER_ENUM.MALE,
      phoneNumber: data.phoneNumber ?? "",
      avatar: currentUserLogin?.data.avatar ?? "",
      role: data.role ?? ROLE_ENUM.USER,
    })
      .unwrap()
      .then(() =>
        openNotification({
          type: "success",
          message: "Update user successfully",
        })
      );
  };

  return (
    <StyledMyProfile>
      <h1>My Profile</h1>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <div className="profile-picture">
            <h3>Profile Picture</h3>
            <div className="container">
              <div className="picture">
                <img
                  src={
                    currentUserLogin?.data.avatar ??
                    `https://ui-avatars.com/api/?name=${
                      currentUserLogin?.data.firstName +
                      " " +
                      currentUserLogin?.data.lastName
                    }`
                  }
                  alt="user avatar"
                />
                <span>You Can upload jpg, gif or png image files</span>
              </div>
              <div className="user-ctrl">
                <Button loading={isLoading}>
                  <label htmlFor="uploadPhoto">Upload New Photo</label>
                </Button>
                <div style={{ display: "none" }}>
                  <FileUpload
                    baseUrl={process.env.API_URL ?? ""}
                    value={uploadPhoto}
                    name="uploadPhoto"
                    onChange={(value) => setUploadPhoto(value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </Col>
        <FormProvider {...form}>
          <Col span={12}>
            <Input
              name="firstName"
              label="First Name"
              placeholder="Enter first name"
              required
            />
          </Col>
          <Col span={12}>
            <Input
              name="lastName"
              label="Last Name"
              placeholder="Enter last name"
              required
            />
          </Col>
          <Col span={12}>
            <Input
              name="email"
              label="Email"
              placeholder="Enter email"
              required
            />
          </Col>
          <Col span={12}>
            <Input
              name="phoneNumber"
              label="Phone Number"
              placeholder="Enter phone number"
              required
            />
          </Col>
          <Col span={12}>
            <DatePicker
              label="Birthday"
              name="birthday"
              format={format}
              value={moment(Number(form.getValues("birthday")))}
              required
              allowClear={false}
            />
          </Col>
          <Col span={12}>
            <Select
              title="Gender"
              name="gender"
              options={options}
              onSelect={(value) => {
                form.setValue("gender", value);
              }}
            />
          </Col>
          <Col span={24}>
            <Input
              name="address"
              label="Address"
              placeholder="Enter address"
              required
            />
          </Col>
          <div className="user-ctrl">
            <Button onClick={form.handleSubmit(onSubmit)} loading={isLoading}>
              Save Change
            </Button>
          </div>
        </FormProvider>
      </Row>
    </StyledMyProfile>
  );
};

export default MyProfile;
