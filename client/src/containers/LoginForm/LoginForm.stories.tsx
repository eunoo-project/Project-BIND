import { LoginFrom } from '@/containers';
// import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'containers/LoginFrom',
  component: LoginFrom,
  parameters: {},
  decorators: [
    (Story: any) => (
      <div style={{ margin: '30px' }}>
        <Story />
      </div>
    ),
  ],
};

// 템플릿 생성
const Template = () => <LoginFrom />;

// default
export const Default = Template.bind({});
