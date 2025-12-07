# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records (ADRs) documenting significant architectural decisions made in this project.

## What is an ADR?

An Architecture Decision Record (ADR) is a document that captures an important architectural decision made along with its context and consequences.

## Format

We use the following format for ADRs:

```markdown
# [Number]. [Title]

Date: YYYY-MM-DD

## Status

[Proposed | Accepted | Deprecated | Superseded]

## Context

What is the issue that we're seeing that is motivating this decision or change?

## Decision

What is the change that we're proposing and/or doing?

## Consequences

What becomes easier or more difficult to do because of this change?

## Alternatives Considered

What other options did we consider?
```

## Index

1. [Use Next.js with Static Export](./001-use-nextjs-static-export.md)
2. [TypeScript Strict Mode](./002-typescript-strict-mode.md)
3. [Testing Strategy](./003-testing-strategy.md)
4. [Deployment to GitHub Pages](./004-github-pages-deployment.md)

## Creating New ADRs

When making a significant architectural decision:

1. Create a new file: `XXX-short-title.md` (where XXX is the next number)
2. Use the template above
3. Discuss with the team (if applicable)
4. Update this index
5. Commit the ADR with your changes
