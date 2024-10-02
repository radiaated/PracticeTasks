import React from "react";
import { FaPlus } from "react-icons/fa";

import Post from "../components/Post";

import { useQuery } from "react-query";
import { fetchPosts } from "../utils/fetch";
import { TypePost } from "../utils/types";
import { Link } from "react-router-dom";

const PostsPage = () => {
  const { data } = useQuery<TypePost[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return (
    <div className="wrapper">
      <div className="w-100 mb-2 text-end">
        <Link to="/post/create" className="btn btn-sm btn-primary">
          Create <FaPlus className="me-2" style={{ fontSize: "0.85rem" }} />
        </Link>
      </div>

      <div className="d-flex flex-column gap-4">
        {data?.map((post) => (
          <div className="row" key={post.id}>
            <Post key={post.id} post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
