import React from 'react';

const withBackground = StoryFn => (
  <div
    style={{
      background: '#fff',
      height: '100vh',
    }}>
    <StoryFn />
  </div>
);

export const globalDecorators = [withBackground];
