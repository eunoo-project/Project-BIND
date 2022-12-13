import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    _id: null as string | null,
    userId: null as string | null,
    imageURL: null as string | null,
  },
});

export const themeState = atom({
  key: 'themeState',
  default: false,
});
