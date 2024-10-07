import type { Message } from "ai";

export const getLastUserMessage = ({ messages }: { messages: Message[] }) => {
    const lastUserMessage = messages.reverse().find((message) => message.role === 'user');

    return lastUserMessage;
};

export const addToLastUserMessage = ({ messages, memories }: { messages: Message[], memories: Message[] }) => {
    const lastUserMessage = getLastUserMessage({ messages });

    if (!lastUserMessage) {
        return messages;
    }

    const lastUserMessageIndex = messages.indexOf(lastUserMessage);
    
    const updatedMessages = [
        ...messages.slice(0, lastUserMessageIndex),
        ...memories,
        ...messages.slice(lastUserMessageIndex + 1),
    ];

    return updatedMessages;
};

