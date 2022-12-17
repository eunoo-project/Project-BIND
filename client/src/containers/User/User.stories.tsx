import { User } from '@/containers';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'containers/User',
  component: User,
  decorators: [
    Story => {
      return (
        <div>
          <Story />
        </div>
      );
    },
  ],
} as ComponentMeta<typeof User>;

// 템플릿 생성
const Template: ComponentStory<typeof User> = args => <User {...args} />;

// me
export const Me = Template.bind({});

// others
export const Others = Template.bind({});
