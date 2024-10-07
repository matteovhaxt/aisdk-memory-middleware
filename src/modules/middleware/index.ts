import { type Experimental_LanguageModelV1Middleware as LanguageModelV1Middleware, type LanguageModelV1Prompt, type Message } from 'ai';
import type { MemoryManager } from '@/modules/memory-manager';
import { addToLastUserMessage, getLastUserMessage } from '@/lib/ai/utils';

export const memoryMiddleware = (memoryManager: MemoryManager): LanguageModelV1Middleware => ({
    transformParams: async ({ params }) => {
        const messages = params.prompt as Message[];

        const lastUserMessage = getLastUserMessage({ messages });

        if (!lastUserMessage) {
            return params;
        }

        await memoryManager.saveMemory(lastUserMessage);

        const memories = await memoryManager.searchMemory(lastUserMessage.content);

        const updatedMessages = addToLastUserMessage({ messages, memories });

        return {
            ...params,
            prompt: updatedMessages as LanguageModelV1Prompt,
        };
    },
});
