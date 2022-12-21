import axios from '@/utils/axios';

export const getRooms = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/chat`
  );
  return data;
};

export const getRoom = async (id: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/${id}`
  );
  return data;
};

// export const exitRoom = async (id: string) => {
//   const { data } = await axios.delete(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/${id}`
//   );
//   return data;
// };
