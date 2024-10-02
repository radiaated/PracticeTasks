export type TypeProfile = {
  name: string;
};
export type TypeComment = {
  id: string;
  profile: TypeProfile;
  message: string;
};

export type TypePost = {
  id: string;
  author: TypeProfile;
  title: string;
  description: string;
  comments: TypeComment[];
};
