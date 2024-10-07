import { MemoryManager } from "@/modules/memory-manager";
import { defaultMem0Client } from "../client";
import { type Message } from "ai";
import { MemoryClient as Mem0Client } from "mem0ai";

/**
 * See https://docs.mem0.ai/platform/quickstart#long-term-memory-for-a-user for more information.
 */
export class Mem0UserLongTermMemoryManager extends MemoryManager {
    private readonly userId: string;
    private client: Mem0Client;

    constructor(userId: string, mem0Client?: Mem0Client) {
        super();
        this.userId = userId;
        this.client = mem0Client ?? defaultMem0Client;
    }

    async saveMemory(content: Message[]): Promise<Message[]> {
        const mem0Memory = await this.client.add(
            content,
            {
                user_id: this.userId
            }
        );

        return mem0Memory.messages as Message[];
    }

    async loadMemories(): Promise<Message[]> {
        const mem0Memory = await this.client.get(this.userId);

        return mem0Memory.messages as Message[];
    }

    async searchMemory(query: string, topK: number = 1): Promise<Message[]> {
        const searchResult = await this.client.search(query, {
            user_id: this.userId
        });

        const messages = searchResult.results.slice(0, topK).flatMap((result) => result.messages);

        return messages as Message[];
    }
}