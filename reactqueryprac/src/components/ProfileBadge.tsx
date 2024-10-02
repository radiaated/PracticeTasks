import React from "react";

const ProfileBadge = (props: { name: string; size: number }) => {
  return (
    <div
      className="rounded p-1 d-flex bg-primary justify-content-center align-items-center text-light"
      style={{ height: `${props.size}px`, width: `${props.size}px` }}
      data-bs-title={props.name}
    >
      {props.name[0].toUpperCase()}
    </div>
  );
};

export default ProfileBadge;
