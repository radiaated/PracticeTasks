import { object, string, ObjectSchema } from "yup";

export interface TypePostForm {
  title: string;
  description: string;
}

export const postFormSchema: ObjectSchema<TypePostForm> = object({
  title: string().required("Title is a required field"),
  description: string().required("Description is a required field"),
});

export interface TypeCommentForm {
  message: string;
  postId?: string;
}

export const CommentFormSchema: ObjectSchema<TypeCommentForm> = object({
  message: string().required("Message field is required"),
  postId: string(),
});
