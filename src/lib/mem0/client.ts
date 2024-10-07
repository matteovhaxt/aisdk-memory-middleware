import { MemoryClient } from "mem0ai";

const { MEM0_API_KEY } = process.env;

if (!MEM0_API_KEY) {
    throw new Error("MEM0_API_KEY is not set");
}

export const defaultMem0Client = new MemoryClient(MEM0_API_KEY);
