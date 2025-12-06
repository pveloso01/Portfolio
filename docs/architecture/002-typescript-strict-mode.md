# 2. TypeScript Strict Mode

Date: 2025-12-06

## Status

Accepted

## Context

TypeScript provides various levels of type checking strictness. We needed to decide what level of strictness to enforce in our codebase to balance:
- Type safety and bug prevention
- Developer productivity
- Learning curve
- Code maintainability

## Decision

We will enable TypeScript strict mode with additional strict options:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noPropertyAccessFromIndexSignature": true
  }
}
```

## Consequences

### Positive

- **Type Safety**: Catches many bugs at compile time
- **Better IDE Support**: More accurate autocomplete and refactoring
- **Self-Documenting**: Types serve as documentation
- **Easier Refactoring**: Compiler catches breaking changes
- **Professional Standard**: Demonstrates code quality commitment

### Negative

- **More Verbose**: Some code requires explicit type annotations
- **Learning Curve**: Requires understanding TypeScript's type system
- **Initial Overhead**: May slow down initial development
- **Third-Party Types**: May encounter issues with poorly-typed dependencies

### Mitigations

- Use type inference where possible
- Leverage utility types (`Partial`, `Pick`, `Omit`, etc.)
- Add type definitions for untyped dependencies
- Use `@ts-expect-error` with comments for edge cases

## Impact on Development

### Before (Non-strict)

```typescript
function getUser(id) {
  const users = { 1: 'Alice', 2: 'Bob' };
  return users[id]; // Could be undefined
}
```

### After (Strict)

```typescript
function getUser(id: number): string | undefined {
  const users: Record<number, string> = { 1: 'Alice', 2: 'Bob' };
  return users[id]; // Type system knows this could be undefined
}

// Usage
const user = getUser(3);
if (user !== undefined) {
  console.log(user.toUpperCase()); // Safe
}
```

## Alternatives Considered

### 1. Non-strict TypeScript
- **Pros**: Faster to write, easier for beginners
- **Cons**: Defeats the purpose of using TypeScript

### 2. Gradual Adoption
- **Pros**: Easier migration for existing codebases
- **Cons**: Inconsistent code quality, technical debt

### 3. Even Stricter (with custom rules)
- **Pros**: Maximum type safety
- **Cons**: Diminishing returns, slower development

