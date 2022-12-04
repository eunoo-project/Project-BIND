import { UserProfile } from '@/components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/UserProfile',
  component: UserProfile,
  args: { id: 'eunoo' },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof UserProfile>;

// 템플릿 생성
const Template: ComponentStory<typeof UserProfile> = args => (
  <UserProfile {...args} />
);

//Small
export const Small = Template.bind({});

Small.args = {};

//big
export const Big = Template.bind({});

Big.args = { size: 'big' };

//Image
export const Image = Template.bind({});

Image.args = { img: 'safd' };
