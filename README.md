# aisdk-memory-middleware

A plug-in memory middleware for Vercel ai sdk.

## Installation

```bash
npm install aisdk-memory-middleware
```

### Usage

```typescript
import { memoryMiddleware, MemoryManager } from "aisdk-memory-middleware";

// Create a new memory manager. Either implement your own or use an existing one.
const memoryManager = new MemoryManager()

// Create the middleware
const middleware = memoryMiddleware(memoryManager)

// Wrap your language model with the middleware
const wrappedLanguageModel = wrapLanguageModel({
    model: openai('gpt-3.5-turbo'),
    middleware,
})

// Use the wrapped language model
const result = await streamText({
    model: wrappedLanguageModel,
    system: 'You are a helpful assistant',
})
```