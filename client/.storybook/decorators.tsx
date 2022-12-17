import React from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryclient = new QueryClient();

const withBackground = StoryFn => (
  <RecoilRoot>
    <QueryClientProvider client={queryclient}>
      <div className="dark:bg-black dark:text-white">
        <StoryFn />
      </div>
    </QueryClientProvider>
  </RecoilRoot>
);

export const globalDecorators = [withBackground];
