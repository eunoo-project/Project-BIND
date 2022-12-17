import { Button } from '@/components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Button>;

// 템플릿 생성
const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

// Small
export const Small = Template.bind({});

Small.args = { size: 'small', content: '등록' };

//Big
export const Big = Template.bind({});

Big.args = { size: 'big', content: '로그인' };

//Long
export const Long = Template.bind({});

Long.args = { size: 'long', content: '프로필 편집' };
