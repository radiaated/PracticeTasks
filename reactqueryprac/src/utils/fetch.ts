import axios from "axios";
import { TypeComment, TypePost } from "./types";
import { TypePostForm } from "./schema";
import { TypeCommentForm } from "./schema";

export const fetchPosts = async (): Promise<TypePost[]> => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/posts`,
    method: "GET",
  });

  return data;
};

export const createPost = async (post: TypePost): Promise<TypePost> => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/posts`,
    method: "POST",
    data: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const addComment = async (
  comment: TypeCommentForm
): Promise<TypeComment> => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/posts/${comment.postId}/comments`,
    method: "POST",
    data: JSON.stringify({ message: comment.message }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};
