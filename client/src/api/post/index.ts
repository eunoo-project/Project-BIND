import axios from '@/utils/axios';

export const getPosts = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/post`
  );
  return data;
};
