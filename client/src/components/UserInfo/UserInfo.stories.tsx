import { UserInfo } from '@/components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/UserInfo',
  component: UserInfo,
  args: { binderCnt: '123', bindingCnt: '5603', postCnt: '10' },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof UserInfo>;

// 템플릿 생성
const Template: ComponentStory<typeof UserInfo> = args => (
  <UserInfo {...args} />
);

//Default
export const Default = Template.bind({});
