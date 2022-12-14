import { globalDecorators } from './decorators';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import ko from 'axe-core/locales/ko.json';
import '../src/styles/globals.css';

const customViewport = {
  iPhone8: {
    name: 'iPhone 8',
    styles: {
      width: '375px',
      height: '812px',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    hideNoControlsWarning: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      ...customViewport,
    },
    defaultViewport: 'iPhone8',
  },
  a11y: {
    config: { locale: ko },
  },
  themes: {
    clearable: false,
    list: [
      {
        name: 'Light',
        class: [],
        color: '#fefefe',
      },
      {
        name: 'Dark',
        class: 'dark',
        color: '#222222',
      },
    ],
  },
  backgrounds: {
    default: 'Light',
    values: [
      { name: 'Light', value: '#fefefe' },
      { name: 'Dark', value: '#222222' },
    ],
  },
};

export const decorators = globalDecorators;
