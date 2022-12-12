import { PostNav } from '@/containers';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'containers/PostNav',
  component: PostNav,
  decorators: [
    Story => {
      return (
        <div>
          <Story />
        </div>
      );
    },
  ],
} as ComponentMeta<typeof PostNav>;

// 템플릿 생성
const Template: ComponentStory<typeof PostNav> = args => <PostNav {...args} />;

// Default
export const Default = Template.bind({});

Default.args = {
  author: { _id: '', userId: 'eunoo' },
  editMode: false,
  myPost: true,
  handleEditMode: () => {
    return;
  },
};

// Edit
export const EditMode = Template.bind({});

EditMode.args = {
  author: { _id: '', userId: 'eunoo' },
  editMode: true,
  myPost: true,
  handleEditMode: () => {
    return;
  },
};
