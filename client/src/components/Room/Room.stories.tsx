import { Room } from '@/components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Room',
  component: Room,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Room>;

// 템플릿 생성
const Template: ComponentStory<typeof Room> = args => <Room {...args} />;

//Default
export const Default = Template.bind({});

Default.args = {};
