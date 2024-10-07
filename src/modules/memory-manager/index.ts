import type { Message } from 'ai';

/**
 * Abstract class representing a memory management system.
 * This class defines the interface for saving, loading, and searching memories.
 */
export abstract class MemoryManager {
    /**
     * Saves a new memory based on the given prompt.
     * @param prompt The input prompt to be saved as a memory.
     * @returns A Promise that resolves to the saved Memory object.
     */
    abstract saveMemory(content: Message | Message[]): Promise<Message[]>;

    /**
     * Loads all stored memories.
     * @returns A Promise that resolves to an array of Memory objects.
     */
    abstract loadMemories(): Promise<Message[]>;

    /**
     * Searches for a specific memory based on the given query.
     * @param query The search query to find a relevant memory.
     * @returns A Promise that resolves to the found Memory object.
     */
    abstract searchMemory(query: string, topK?: number): Promise<Message[]>;
}
