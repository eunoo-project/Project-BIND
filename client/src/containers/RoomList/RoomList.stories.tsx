import { RoomList } from '@/containers';
// import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/RoomList',
  component: RoomList,
  parameters: {
    layout: 'fullscreen',
  },
};

// 템플릿 생성
const Template = () => <RoomList />;

//Default
export const Default = Template.bind({});
