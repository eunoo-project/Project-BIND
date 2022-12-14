import axios from '@/utils/axios';

export const auth = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/auth`
  );
  return data;
};

export const signin = async (user: { userId: string; password: string }) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/signin`,
    user
  );
  return data;
};

export const register = async (user: { userId: string; password: string }) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/register`,
    user
  );
  return data;
};

export const getUser = async (id: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${id}`
  );
  return data;
};

export const updateBind = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  const { data } = await axios.patch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/bind/${id}`,
    { type }
  );
  return data;
};

export const updateProfile = async (form: FormData) => {
  const { data } = await axios.patch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/profile`,
    form
  );
  return data;
};

export const getSearchUsers = async (searchText: string) => {
  const encodedText = encodeURI(searchText);
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/search?searchText=${encodedText}`
  );
  return data;
};
