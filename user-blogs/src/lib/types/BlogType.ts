import { DoctorType } from "./DoctorType";

export interface BaseBlogType {
  isActive: boolean;
  publishAt: string;
  title: string;
  thumbnail: string;
  content: string;
  category: string;
  references: string;
}

export interface CreateBlogType extends BaseBlogType {
  doctorId: string;
  doctor?: DoctorType;
}

export interface BlogType extends BaseBlogType {
  id: string;
  doctor: DoctorType;
}
