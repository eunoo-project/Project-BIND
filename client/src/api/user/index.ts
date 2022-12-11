import axios from 'axios';

export const getSearchUsers = async (searchText: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/search?searchText=${searchText}`
  );
  return data;
};
