import { openNotification } from "doctor-online-components";
import axios from "axios";

class UploadImageAdapter {
  loader: any = null;

  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  async upload() {
    if (this.loader) {
      const file = await this.loader.file;
      const { imgUrl }: any = await handleUploadImage(file);

      if (imgUrl) {
        return {
          urls: {
            default: imgUrl,
            // Optional different sizes of images.
          },
        };
      }
    }

    return "";
  }
}

export default function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new UploadImageAdapter(loader);
  };

  const imageUploadEditing = editor.plugins.get("ImageUploadEditing");
  imageUploadEditing.on("uploadComplete", (evt, { data, imageElement }) => {
    editor.model.change((writer) => {
      writer.setAttribute("src", data.imgUrl, imageElement);
    });
  });
}

export const handleUploadImage = async (file: File) => {
  const isImageType =
    file.type === "image/jpeg" ||
    file.type === "image/jpg" ||
    file.type === "image/png" ||
    file.type === "image/sgv+xml" ||
    file.type === "image/gif" ||
    file.type === "application/pdf";

  if (!isImageType) {
    openNotification({
      type: "error",
      message: "Wrong format. Please try again",
    });
    return;
  }

  const imgUrl = await uploadImage(file);

  return { imgUrl };
};

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const data = await axios.post(
      `${process.env.API_URL ?? ""}/upload/image`,
      formData
    );
    return data?.data.url;
  } catch (error) {
    console.log(error);
  }
};
