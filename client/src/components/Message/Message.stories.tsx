import { Message } from '@/components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Message',
  component: Message,
  args: { message: '테스트용 메세지', time: '14:12' },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Message>;

// 템플릿 생성
const Template: ComponentStory<typeof Message> = args => <Message {...args} />;

//Mine
export const Mine = Template.bind({});

Mine.args = {
  message:
    '여수 밤바다 이    조명에 담긴    아름다운    얘기가 있어 네게 들려주고파',
  isMyMessage: true,
};

//Others
export const Others = Template.bind({});

Others.args = {
  message:
    '여수 밤바다 이    조명에 담긴    아름다운    얘기가 있어 네게 들려주고파여수 밤바다 이    조명에 담긴    아름다운    얘기가 있어 네게 들려주고파여수 밤바다 이    조명에 담긴    아름다운    얘기가 있어 네게 들려주고파여수 밤바다 이    조명에 담긴    아름다운    얘기가 있어 네게 들려주고파',
};
