# LLM Playground Extraction - Progress Report

## Completed ✅

### 1. Shared Types Library (`lib/shared/`)
- ✅ Created complete type system from @langfuse/shared
- ✅ LLM types: ChatMessage, ChatMessageRole, ChatMessageType, LLMAdapter
- ✅ Model configuration: ModelParams, UIModelParams, supported models lists
- ✅ Tool definitions: LLMToolDefinition, LLMToolCallSchema, ToolCallResponseSchema
- ✅ Prompt types: PromptVariable, PromptType
- ✅ Database types: LlmSchema, LlmTool (simplified for localStorage)

### 2. Utility Functions (`lib/shared/utils/`)
- ✅ extractVariables - Extract mustache template variables
- ✅ compileChatMessages - Compile messages with placeholders
- ✅ compileChatMessagesWithIds - Compile with ID preservation
- ✅ extractPlaceholderNames - Get placeholder names from messages

### 3. UI Components (`lib/components/ui/`)
Created 15 shadcn/ui-style components:
- ✅ button, input, textarea, label
- ✅ alert, badge, dialog, form
- ✅ switch, scroll-area, tooltip
- ✅ dropdown-menu, popover, command
- ✅ resizable, input-command

### 4. Supporting Components (`lib/components/`)
- ✅ ChatMessages - Message display component
- ✅ ToolCallCard - Tool call visualization
- ✅ ModelParameters - Parameter configuration
- ✅ CodeMirrorEditor - Code editor (simplified)
- ✅ Layouts (Page, DocPopup)

### 5. Hooks (`lib/hooks/`)
- ✅ useLocalStorage - localStorage hook
- ✅ useIsMobile - Mobile detection
- ✅ useProjectIdFromURL - Project ID (stub for standalone)
- ✅ usePostHogClientCapture - Analytics (no-op stub)

### 6. Utilities (`lib/utils/`)
- ✅ notifications - Toast notifications
- ✅ clipboard - Copy to clipboard
- ✅ validation - Schema validation (LLMSchemaNameSchema, LLMToolNameSchema)
- ✅ createEmptyMessage - Create new messages
- ✅ api - API stubs (no tRPC needed)
- ✅ env - Environment config
- ✅ cn - Tailwind class merger

### 7. Import Updates
- ✅ Updated all @langfuse/shared imports to @/lib/shared
- ✅ Updated most component imports to local paths
- ✅ Updated hook imports to local paths

## Remaining Work 🚧

### 1. Missing Utilities (High Priority)
Files that need these utilities:
- `lib/playground/components/JumpToPlaygroundButton.tsx`
- `lib/playground/context/index.tsx`

**Needed:**
- `normalizeInput`, `normalizeOutput` - ChatML normalization
- `extractTools` - Extract tool definitions from observations
- `convertChatMlToPlayground` - Convert ChatML to playground format
- `getFinalModelParams` - Get final model parameters
- Types: `Observation`, `Prompt`, `ObservationLevel`

**Recommendation:** These are complex utilities from langfuse. Options:
1. Create simplified stubs that just pass data through (fastest)
2. Extract and adapt the actual implementations (more complete)
3. Remove/simplify features that use them (simplest)

### 2. LLM API Integration (Critical)
The playground needs to actually call LLM APIs. Current issues:
- Context references `fetchLLMCompletion` from langfuse server
- Need standalone implementation that:
  - Takes API keys from localStorage
  - Calls OpenAI/Anthropic/Google APIs directly
  - Handles streaming responses
  - No backend required

**Recommendation:** Create `lib/api/llm.ts` with:
- Direct API calls to each provider
- API key management
- Streaming support
- Error handling

### 3. Label Component Missing
- ModelParameters uses `<Label>` but it's not created
- Quick fix: Add to `lib/components/ui/label.tsx`

### 4. Missing Type Exports
Need to add to `lib/shared/types/`:
- `Observation` type (for JumpToPlaygroundButton)
- `Prompt` type (for SaveToPromptButton)
- `ObservationLevel` enum

### 5. Router Dependencies
- JumpToPlaygroundButton uses `next/router`
- Works in Next.js but may need App Router updates

## Recommended Next Steps

### Option A: Minimal Viable Playground (Fastest - 2-3 hours)
1. Remove/comment out JumpToPlaygroundButton (not essential)
2. Simplify context to remove chatml utils
3. Create basic LLM API integration
4. Test with OpenAI API key in localStorage
5. Basic UI for entering API keys

### Option B: Full Feature Port (Complete - 1-2 days)
1. Extract all chatml utilities from langfuse
2. Extract fetchLLMCompletion and adapt for client-side
3. Implement full JumpToPlayground feature
4. Add all observation/prompt types
5. Full API key management UI

### Option C: Hybrid Approach (Recommended - 4-6 hours)
1. Keep core playground features
2. Remove advanced features (JumpToPlayground, SaveToPrompt)  
3. Create solid LLM API layer
4. Add basic API key UI
5. Test and polish

## File Structure Summary
```
lib/
├── shared/           # Extracted langfuse types
│   ├── types/
│   │   ├── llm.ts
│   │   ├── prompts.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── string.ts
│   │   ├── chatMessages.ts
│   │   └── index.ts
│   └── index.ts
├── components/
│   ├── ui/           # 15 shadcn components
│   ├── ChatMessages/
│   ├── ModelParameters/
│   ├── layouts/
│   └── editor.tsx
├── hooks/
│   ├── useLocalStorage.ts
│   ├── use-mobile.ts
│   ├── useProjectIdFromURL.ts
│   └── usePostHogClientCapture.ts
├── utils/
│   ├── notifications.ts
│   ├── clipboard.ts
│   ├── validation.ts
│   ├── createEmptyMessage.ts
│   └── api.ts
├── playground/       # Copied from langfuse
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── storage/
│   ├── types.ts
│   └── index.tsx
├── utils.ts          # cn() helper
└── env.ts           # Environment config
```

## Next Command to Run

For quickest path to working playground:
```bash
# 1. Comment out advanced features
# 2. Create basic LLM API layer  
# 3. Add Label component
# 4. Test build
```
