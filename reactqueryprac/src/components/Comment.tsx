import React from "react";
import { TypeComment } from "../utils/types";
import ProfileBadge from "./ProfileBadge";

type TypeProps = {
  comment: TypeComment;
};

const Comment = ({ comment }: TypeProps) => {
  return (
    <div className="rounded border border-secondary-emphasis p-1">
      <div className="d-flex gap-2">
        <ProfileBadge name={comment.profile.name} size={20} />

        <div style={{ fontSize: "0.75rem" }}>{comment.message}</div>
      </div>
    </div>
  );
};

export default Comment;
