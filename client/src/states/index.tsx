import { atom } from 'recoil';

export interface Auth {
  _id: string | null;
  userId: string | null;
  imageURL?: string | null;
}

export const userState = atom<Auth>({
  key: 'userState',
  default: {
    _id: null,
    userId: null,
    imageURL: null,
  },
});

export const themeState = atom({
  key: 'themeState',
  default: false,
});
