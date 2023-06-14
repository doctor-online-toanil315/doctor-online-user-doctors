import React, { useMemo } from "react";
import { StyledCreateBlogContainer } from "./styled";
import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Input,
  Modal,
  OptionType,
  Select,
  openNotification,
} from "doctor-online-components";
import { FileUpload } from "../FileUpload";
import { CustomCkEditor } from "../CustomCkEditor";
import { CreateBlogType } from "src/lib/types/BlogType";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModal, yup } from "doctor-online-common";
import { useTranslation } from "react-i18next";
import { useCreateBlogMutation, useGetMeQuery } from "src/lib/services";
import PreviewBlogContainer from "../PreviewBlogContainer/PreviewBlogContainer";
import { useNavigate } from "react-router-dom";

const CreateBlogContainer = () => {
  const { t } = useTranslation();
  const form = useForm<CreateBlogType>({
    defaultValues: {
      category: "",
      content: "",
      references: "",
      thumbnail: "",
      title: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        category: yup.string().required(t("common:form.required")),
        content: yup.string().required(t("common:form.required")),
        references: yup.string().required(t("common:form.required")),
        thumbnail: yup.string().required(t("common:form.required")),
        title: yup.string().required(t("common:form.required")),
      })
    ),
  });
  const options: OptionType[] = useMemo(() => {
    const healthCategories = [
      "tim mạch (Cardiologist)",
      "da liễu (Dermatologist)",
      "tiêu hóa (Gastroenterologist)",
      "chấn thương chỉnh hình (Orthopedic surgeon)",
      "nhi khoa (Pediatrician)",
      "thần kinh học (Neurologist)",
      "mắt (Ophthalmologist)",
      "ung thư (Oncologist)",
      "tâm lý (Psychiatrist)",
      "nội tiết (Endocrinologist)",
      "phổi (Pulmonologist)",
      "dị ứng (Allergist)",
      "nha khoa (Dentist)",
      "Chuyên gia dinh dưỡng (Nutritionist)",
      "vật lý trị liệu (Physical therapist)",
      "chỉnh hình xương cột sống (Chiropractor)",
      "châm cứu (Acupuncturist)",
      "tâm lý học (Psychologist)",
      "thấp khớp (Rheumatologist)",
      "tiết niệu (Urologist)",
    ];

    return healthCategories.map((categoryItem) => {
      return {
        key: categoryItem,
        label: categoryItem,
        render: () => categoryItem,
        value: categoryItem,
      } as OptionType;
    });
  }, []);
  const { data: currentUserLogin } = useGetMeQuery();
  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const modal = useModal();
  const navigate = useNavigate();

  const onSubmit = (data: CreateBlogType) => {
    createBlog({
      ...data,
      doctorId: currentUserLogin?.data.doctor?.id ?? "",
    })
      .unwrap()
      .then(() => {
        openNotification({
          type: "success",
          message: "Create blog successfully.",
        });
      });
  };

  return (
    <StyledCreateBlogContainer>
      <div className="header">
        <h1>Create New Blog</h1>
        <p>
          All content that you add in your blog posts must be original content.
          If it is your own content from any of your other websites, please use
          the Reference Url option to indicate this. All acknowledgements of
          source references must be ensured.
        </p>
      </div>
      <div className="create-form">
        <FormProvider {...form}>
          <Input
            name="title"
            label="Blog Title"
            required
            placeholder="Enter blog title"
          />
          <FileUpload
            baseUrl={process.env.API_URL ?? ""}
            label="Blog Thumbnail"
            value={form.getValues("thumbnail")}
            name="thumbnail"
            error={{
              message: form.formState.errors.thumbnail?.message as string,
            }}
            onChange={(value) =>
              form.setValue("thumbnail", value, { shouldValidate: true })
            }
            isRequired
          />
          <CustomCkEditor
            label="Description"
            name="content"
            required
            placeholder="Enter blog content"
          />
          <Select
            title="Blog Category"
            placeholder="Select blog category"
            options={options}
            name="category"
            required
          />
          <Input
            name="references"
            label="Reference URL"
            required
            placeholder="Enter reference URL"
          />
          <div className="user-ctrl">
            <Button border="outline" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button border="cancel" onClick={() => modal.handleOpen()}>
              Preview
            </Button>
            <Button loading={isLoading} onClick={form.handleSubmit(onSubmit)}>
              Publish
            </Button>
          </div>
        </FormProvider>
      </div>
      <Modal open={modal.isOpen} width={1080} onCancel={modal.handleClose}>
        <PreviewBlogContainer blog={form.getValues()} />
      </Modal>
    </StyledCreateBlogContainer>
  );
};

export default CreateBlogContainer;
