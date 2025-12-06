# Contributing Guide

Thank you for considering contributing to this portfolio project! While this is a personal project, contributions in the form of bug reports, suggestions, and improvements are welcome.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Process](#development-process)
- [Code Standards](#code-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## Code of Conduct

This project follows a simple code of conduct:

- Be respectful and constructive
- Focus on what is best for the project
- Show empathy towards others
- Accept constructive criticism gracefully

---

## Getting Started

### Prerequisites

- Node.js v20+
- pnpm v9+
- Git
- Basic knowledge of TypeScript and React

### Setup

1. **Fork the repository** (for external contributors)
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio.git
   cd portfolio
   ```
3. **Install dependencies**:
   ```bash
   cd apps/web
   pnpm install
   ```
4. **Install pre-commit hooks**:
   ```bash
   pip install pre-commit
   pre-commit install
   pre-commit install --hook-type commit-msg
   ```
5. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature
   ```

---

## How to Contribute

### Types of Contributions

1. **Bug Reports**: Found a bug? Open an issue
2. **Feature Suggestions**: Have an idea? Open an issue to discuss
3. **Code Contributions**: Fix bugs or implement features
4. **Documentation**: Improve or add documentation
5. **Testing**: Add or improve tests

---

## Development Process

### 1. Pick an Issue

- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to let others know you're working on it
- If no issue exists, create one to discuss your changes

### 2. Create a Branch

Branch naming convention:

```bash
feature/add-dark-mode       # New feature
fix/navigation-bug          # Bug fix
docs/update-contributing    # Documentation
refactor/simplify-utils     # Refactoring
test/add-button-tests       # Tests
```

### 3. Make Your Changes

- Follow the [Code Standards](#code-standards)
- Write or update tests
- Update documentation if needed
- Test your changes locally

### 4. Run Quality Checks

```bash
# From apps/web directory
pnpm type-check    # TypeScript
pnpm lint          # ESLint
pnpm format:check  # Prettier
pnpm test run      # Unit tests
pnpm build         # Build check
```

All checks must pass before submitting a PR.

### 5. Commit Your Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat(frontend): Add dark mode toggle"
```

See [Commit Guidelines](#commit-guidelines) for details.

### 6. Push and Create PR

```bash
git push origin feature/your-feature
```

Then create a Pull Request on GitHub.

---

## Code Standards

### TypeScript

- **Strict mode**: Always enabled
- **No `any`**: Use proper types or `unknown`
- **Type inference**: Use where possible
- **Explicit types**: For function parameters and return types

**Example:**
```typescript
// ✅ Good
type User = {
  id: number;
  name: string;
};

export const getUser = (id: number): User | undefined => {
  // implementation
};

// ❌ Bad
function getUser(id: any): any {
  // implementation
}
```

### React Components

- **Functional components**: Always
- **TypeScript props**: Required
- **Named exports**: Preferred
- **File structure**: One component per file

**Example:**
```typescript
// ✅ Good
type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
};

export const Button = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}: ButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
};
```

### Styling

- **Tailwind CSS**: Preferred
- **Utility-first**: Use Tailwind utilities
- **Component variants**: Use `class-variance-authority`
- **Responsive**: Mobile-first approach

**Example:**
```typescript
export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm md:p-6">
      {children}
    </div>
  );
};
```

### Testing

- **Test user behavior**: Not implementation
- **Accessible queries**: Use `getByRole`, `getByLabelText`
- **Async utilities**: Use `waitFor`, `findBy`
- **Clear assertions**: One concept per test

**Example:**
```typescript
import { render, screen, userEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    
    await userEvent.click(screen.getByRole('button', { name: /click me/i }));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## Commit Guidelines

### Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `build`: Build system or dependencies
- `ci`: CI/CD changes
- `chore`: Other changes (no production code)
- `revert`: Revert previous commit

### Scopes

- `frontend`: Frontend code
- `backend`: Backend code
- `infra`: Infrastructure
- `docs`: Documentation
- `deps`: Dependencies
- `ci`: CI/CD
- `config`: Configuration files

### Examples

```bash
feat(frontend): Add dark mode toggle
fix(backend): Resolve authentication bug
docs(readme): Update installation instructions
style(frontend): Format code with Prettier
refactor(frontend): Extract reusable hook
test(frontend): Add Button component tests
build(deps): Update Next.js to v16
ci(github): Add Lighthouse workflow
chore(config): Update ESLint rules
```

### Commit Message Rules

1. **Use imperative mood**: "Add feature" not "Added feature"
2. **Don't capitalize first letter**: "add feature" not "Add feature"
3. **No period at the end**: "Add feature" not "Add feature."
4. **Keep subject under 50 characters**
5. **Separate subject from body** with blank line
6. **Explain what and why**, not how

**Good:**
```
feat(frontend): Add user authentication

Implement JWT-based authentication with refresh tokens.
Includes login, logout, and token refresh functionality.

Closes #123
```

**Bad:**
```
Updated some files
```

---

## Pull Request Process

### Before Submitting

✅ Checklist:

- [ ] Code follows style guidelines
- [ ] Tests pass (`pnpm test`)
- [ ] Type checking passes (`pnpm type-check`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Documentation updated (if needed)
- [ ] Tests added/updated (if needed)
- [ ] Commit messages follow guidelines

### PR Title

Use the same format as commit messages:

```
feat(frontend): Add dark mode toggle
```

### PR Description

Include:

1. **What**: What changes were made
2. **Why**: Why these changes were needed
3. **How**: How the changes work (if complex)
4. **Testing**: How to test the changes
5. **Screenshots**: For UI changes
6. **Related Issues**: Link to issues

**Template:**

```markdown
## Description
Brief description of changes

## Motivation
Why these changes are needed

## Changes
- Change 1
- Change 2

## Testing
How to test these changes

## Screenshots (if applicable)
![Screenshot](url)

## Related Issues
Closes #123
```

### Review Process

1. **Automated checks**: Must pass all CI checks
2. **Code review**: May receive feedback
3. **Address feedback**: Make requested changes
4. **Approval**: Once approved, PR can be merged
5. **Merge**: Squash and merge (default)

---

## Reporting Bugs

### Before Reporting

1. **Check existing issues**: Might already be reported
2. **Test on latest version**: Bug might be fixed
3. **Minimal reproduction**: Simplify to essential steps

### Bug Report Template

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable

## Environment
- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 120]
- Node.js: [e.g., v20.10.0]
- Version: [e.g., commit hash or version]

## Additional Context
Any other relevant information
```

---

## Suggesting Features

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Problem
What problem does this solve?

## Proposed Solution
How should this feature work?

## Alternatives Considered
Other ways to solve this problem

## Additional Context
Screenshots, mockups, examples, etc.
```

### Discussion

- Feature requests will be discussed before implementation
- Not all features will be accepted
- Focus on features that align with project goals

---

## Questions?

- **Documentation**: Check the [Development Guide](./DEVELOPMENT.md)
- **Issues**: Search existing issues
- **Contact**: Open a new issue

---

Thank you for contributing! 🎉

