import Chat, { Bubble, ChatProps, useMessages } from '@chatui/core';
import '@chatui/core/es/styles/index.less';
import '@chatui/core/dist/index.css';

export default function(): JSX.Element {
  const { messages, appendMsg, setTyping } = useMessages([]);

  const handleSend: ChatProps['onSend'] = (type, val) => {
    if (type === 'text') {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });
    }

    setTyping(true);

    setTimeout(() => {
      appendMsg({
        type: 'text',
        content: { text: 'I am robot' },
      });
    }, 1000);
  }

  return (
    <Chat
      navbar={{ title: 'Assistant' }}
      messages={messages}
      renderMessageContent={(msg => (
        <Bubble content={msg.content.text} />
      ))}
      onSend={handleSend}
    />
  );
}
