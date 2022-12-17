import { PostInfo } from '@/components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'components/PostInfo',
  component: PostInfo,
  decorators: [
    Story => {
      return (
        <div>
          <Story />
        </div>
      );
    },
  ],
} as ComponentMeta<typeof PostInfo>;

// 템플릿 생성
const Template: ComponentStory<typeof PostInfo> = args => (
  <PostInfo {...args} />
);

// Default
export const Default = Template.bind({});

Default.args = {
  isLikePost: true,
  likeCnt: '10',
  description:
    '테스트입니다아아아아아아악테스트입니다아아아아아아악테스트입니다아아아아아아악테스트입니다아아아아아아악',
  publishDate: '11월 20일',
  handleLike: () => {
    return;
  },
};
