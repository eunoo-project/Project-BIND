import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: null,
});

export const themeState = atom({
  key: 'themeState',
  default: false,
});
