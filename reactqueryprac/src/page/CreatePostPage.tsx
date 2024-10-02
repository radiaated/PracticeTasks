import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postFormSchema } from "../utils/schema";
import { useMutation } from "react-query";
import { createPost } from "../utils/fetch";
import { TypePostForm } from "../utils/schema";
import { TypePost } from "../utils/types";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(postFormSchema) });

  const { isLoading, mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      navigate("/posts");
    },
  });

  const onSubmit = (data: TypePostForm): void => {
    console.log(data);

    mutate({
      ...data,
      id: uuidv4(),
      author: {
        name: "John",
      },
      comments: [],
    });
  };

  return (
    <div className="wrapper">
      <div className="card shadow-sm p-4">
        <h3>Create post</h3>
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              {...register("title")}
              className="form-control shadow-sm"
            />
            <span className="text-danger">{errors?.title?.message}</span>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              rows={4}
              {...register("description")}
              className="form-control shadow-sm"
            />
            <span className="text-danger">{errors?.description?.message}</span>
          </div>
          <button
            type="submit"
            className="btn btn-primary d-block mt-2 shadow-sm"
            disabled={isLoading}
          >
            {!isLoading ? "Post" : "Posting"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
