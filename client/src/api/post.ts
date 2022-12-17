import axios from '@/utils/axios';

export const getPosts = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/post`
  );
  return data;
};

export const updatePost = async ({
  postId,
  payload,
}: {
  postId: string;
  payload: { [key: string]: unknown };
}) => {
  const { data } = await axios.patch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}`,
    { ...payload }
  );
  return data;
};

export const deletePost = async ({ postId }: { postId: string }) => {
  const { data } = await axios.delete(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}`
  );
  return data;
};

export const addPost = async (form: FormData) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/post`,
    form
  );
  return data;
};
