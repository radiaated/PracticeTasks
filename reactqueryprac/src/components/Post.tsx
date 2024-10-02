import React, { useState } from "react";
import { TypePost } from "../utils/types";
import ProfileBadge from "./ProfileBadge";
import { Link } from "react-router-dom";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import Comment from "./Comment";
import { object } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommentFormSchema } from "../utils/schema";
import { TypeCommentForm } from "../utils/schema";
import { useMutation } from "react-query";
import { addComment } from "../utils/fetch";

type TypeProps = {
  post: TypePost;
};

const Post = ({ post }: TypeProps) => {
  const [isLike, setLike] = useState<boolean>(false);

  const [showComments, setShowComments] = useState<boolean>(false);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(CommentFormSchema),
  });

  const { mutate } = useMutation({
    mutationKey: ["posts", "comment", post.id],
    mutationFn: addComment,
  });

  const onCommentSubmit = (data: TypeCommentForm) => {
    mutate({ ...data, postId: post.id });
  };

  return (
    <div className="card shadow-sm p-2">
      <div className="row">
        <div className="col-1">
          <ProfileBadge name={post.author.name} size={35} />
        </div>
        <div className="col-11">
          <h6 className="mb-0">{post.title}</h6>
          <div style={{ fontSize: "0.65rem" }} className="text-secondary">
            Oct. 1
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="p-2" style={{ fontSize: "0.85rem" }}>
            {post.description}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-sm"
              onClick={() => setLike((state: boolean) => !state)}
            >
              {isLike ? <FaThumbsUp /> : <FaRegThumbsUp />}
            </button>
            <Link
              to="#"
              className="link-underline-primary"
              style={{ width: "fit-content" }}
              onClick={() => setShowComments((state: boolean) => !state)}
            >
              <div className="col" style={{ fontSize: "0.8rem" }}>
                Comments({post.comments.length})
              </div>
            </Link>
          </div>
        </div>
      </div>

      {showComments && (
        <>
          <hr />
          <div className="row">
            <div className="col">
              {post.comments.map((comment, i) => (
                <Comment comment={comment} key={i} />
              ))}
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <form
                className="d-flex gap-2 w-100"
                onSubmit={handleSubmit(onCommentSubmit)}
              >
                <ProfileBadge name="John" size={20} />
                <div className="form-group">
                  <textarea
                    rows={4}
                    className="form-control w-100 shadow-sm"
                    style={{ fontSize: "0.85rem" }}
                    {...register("message")}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-sm btn-primary shadow-sm"
                    style={{ fontSize: "0.85rem" }}
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
