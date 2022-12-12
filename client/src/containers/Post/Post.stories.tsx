import { Post } from '@/containers';
// import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'containers/Post',
  component: Post,
};

// 템플릿 생성
const Template = () => <Post />;

// default
export const Default = Template.bind({});
