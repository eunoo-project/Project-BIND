import React from 'react';

const withBackground = StoryFn => (
  <div style={{}}>
    <StoryFn />
  </div>
);

export const globalDecorators = [withBackground];
