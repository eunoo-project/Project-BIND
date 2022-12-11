import axios from 'axios';

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

export const getSearchUsers = async (searchText: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/search?searchText=${searchText}`
  );
  return data;
};
