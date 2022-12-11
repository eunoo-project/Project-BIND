import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: { _id: '', userId: '' },
});

export const themeState = atom({
  key: 'themeState',
  default: false,
});
