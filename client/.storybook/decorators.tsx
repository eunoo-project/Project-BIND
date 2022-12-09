import React from 'react';
import { RecoilRoot } from 'recoil';

const withBackground = StoryFn => (
  <RecoilRoot>
    <div className="dark:bg-black dark:text-white">
      <StoryFn />
    </div>
  </RecoilRoot>
);

export const globalDecorators = [withBackground];
