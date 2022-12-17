import { FormInput } from '@/components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'components/FormInput',
  component: FormInput,
  args: {
    type: 'text',
    name: 'userId',
    label: '아이디',
  },
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof FormInput>;

// 템플릿 생성
const Template: ComponentStory<typeof FormInput> = args => (
  <FormInput {...args} />
);

// default
export const Default = Template.bind({});
