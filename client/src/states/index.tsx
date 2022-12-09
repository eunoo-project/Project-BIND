import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {},
});

export const themeState = atom({
  key: 'themeState',
  default: false,
});
