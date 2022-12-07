import React from 'react';
import { RecoilRoot } from 'recoil';

const withBackground = StoryFn => (
  <RecoilRoot>
    <div style={{}}>
      <StoryFn />
    </div>
  </RecoilRoot>
);

export const globalDecorators = [withBackground];
