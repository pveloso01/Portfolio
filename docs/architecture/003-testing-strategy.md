# 3. Testing Strategy

Date: 2025-12-06

## Status

Accepted

## Context

We needed a comprehensive testing strategy that would:

- Catch bugs early in development
- Provide confidence in refactoring
- Document expected behavior
- Run fast in CI/CD
- Cover different testing levels

## Decision

We will implement a three-tier testing strategy following the testing pyramid:

### 1. Unit Tests (Vitest + React Testing Library)

- **Purpose**: Test individual components and functions in isolation
- **Coverage Target**: 80%+
- **Speed**: Very fast (< 1 second)

### 2. Integration Tests (Vitest + React Testing Library)

- **Purpose**: Test component interactions and data flow
- **Coverage Target**: Critical user flows
- **Speed**: Fast (< 5 seconds)

### 3. End-to-End Tests (Playwright)

- **Purpose**: Test complete user workflows across browsers
- **Coverage Target**: Critical paths only
- **Speed**: Slower (30 seconds - 2 minutes)

## Test Distribution

```
    /\
   /  \     E2E Tests (5-10 tests)
  /    \    - Critical user journeys
 /------\   - Cross-browser
/        \  Integration Tests (20-30 tests)
/----------\ - Feature workflows
/            \ Unit Tests (100+ tests)
/              \ - Components, utilities
/--------------\
```

## Tools Selected

| Level             | Tool                  | Reason                        |
| ----------------- | --------------------- | ----------------------------- |
| Unit/Integration  | Vitest                | Fast, native ESM, great DX    |
| Component Testing | React Testing Library | User-centric, best practices  |
| E2E               | Playwright            | Multi-browser, reliable, fast |
| Coverage          | V8                    | Built-in, accurate            |

## Consequences

### Positive

- **Fast Feedback**: Unit tests run in < 1 second
- **Confidence**: Comprehensive coverage across levels
- **Cross-Browser**: E2E tests verify browser compatibility
- **Documentation**: Tests serve as living documentation
- **Regression Prevention**: Catches bugs before deployment

### Negative

- **Maintenance**: Tests require updating when features change
- **Setup Time**: Initial test setup takes time
- **CI Time**: Full test suite may take several minutes
- **Flakiness**: E2E tests can occasionally be flaky

### Mitigations

- Keep unit tests focused and isolated
- Use test fixtures and factories for common setups
- Run E2E tests only on CI or before deployment
- Use Playwright's auto-wait and retry mechanisms
- Implement parallel test execution

## Testing Standards

### What to Test

✅ **DO Test:**

- User interactions and behaviors
- Edge cases and error states
- Critical business logic
- Accessibility features
- Responsive design (E2E)

❌ **DON'T Test:**

- Implementation details
- Third-party library internals
- Trivial code (getters/setters)
- Auto-generated code

### Example: Component Test

```typescript
import { render, screen, userEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Example: E2E Test

```typescript
import { test, expect } from "@playwright/test";

test("user can navigate to blog post", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /blog/i }).click();
  await page.getByRole("article").first().click();

  await expect(page).toHaveURL(/\/blog\/.+/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
```

## CI/CD Integration

```yaml
# Run in parallel
- Unit Tests (every commit)
- Integration Tests (every commit)
- E2E Tests (PR only, main branch)
- Coverage Report (PR only)
```

## Alternatives Considered

### 1. Jest instead of Vitest

- **Pros**: More mature, larger ecosystem
- **Cons**: Slower, requires additional configuration for ESM

### 2. Cypress instead of Playwright

- **Pros**: Better debugging experience
- **Cons**: Single-browser in free tier, slower

### 3. Only E2E tests

- **Pros**: Tests real user experience
- **Cons**: Slow, flaky, poor feedback loop

### 4. Only Unit tests

- **Pros**: Very fast
- **Cons**: Miss integration issues, over-mocking
