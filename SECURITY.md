# Security Policy

## Supported Versions

This is a personal portfolio project. Security updates are applied to the latest version only.

| Version  | Supported          |
| -------- | ------------------ |
| Latest   | :white_check_mark: |
| < Latest | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in this portfolio project, please follow these steps:

### 1. DO NOT Open a Public Issue

Please **do not** open a public GitHub issue for security vulnerabilities.

### 2. Report Privately

Send a detailed report to:

- **GitHub Security Advisories**: Use the "Security" tab in this repository
- **Email**: [Your contact email - update this]

### 3. Include These Details

- **Description**: Clear description of the vulnerability
- **Impact**: What could an attacker achieve?
- **Steps to Reproduce**: How to reproduce the vulnerability
- **Proof of Concept**: If possible, provide a PoC
- **Suggested Fix**: If you have ideas on how to fix it

### 4. What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 1 week
- **Status Updates**: Regular updates on progress
- **Resolution**: Fix and disclosure timeline

## Security Measures

This project implements several security measures:

### Code Quality

- ✅ TypeScript strict mode
- ✅ ESLint with security rules
- ✅ Automated dependency updates (Dependabot)
- ✅ Pre-commit hooks with secret scanning (Gitleaks)

### CI/CD Security

- ✅ Automated security scanning in CI
- ✅ Dependency vulnerability checks
- ✅ Code review requirements (for contributions)
- ✅ Signed commits (recommended)

### Frontend Security

- ✅ Content Security Policy (CSP) headers
- ✅ XSS protection
- ✅ No inline scripts
- ✅ Secure headers configuration
- ✅ Regular dependency updates

### Dependency Management

- ✅ Automated vulnerability scanning (Dependabot)
- ✅ Regular updates
- ✅ Lock files for reproducible builds
- ✅ Minimal dependencies

## Best Practices

When contributing to this project:

1. **Keep Dependencies Updated**: Regular updates prevent vulnerabilities
2. **No Secrets in Code**: Never commit API keys, tokens, or passwords
3. **Use Environment Variables**: For configuration and secrets
4. **Validate Inputs**: Always validate and sanitize user inputs
5. **Follow OWASP Guidelines**: Be familiar with common vulnerabilities

## Security Checklist for Contributors

Before submitting a PR:

- [ ] No hardcoded secrets or credentials
- [ ] Dependencies are up to date
- [ ] No known vulnerabilities in dependencies
- [ ] Input validation is implemented
- [ ] Error messages don't leak sensitive information
- [ ] Security headers are properly configured
- [ ] Authentication/authorization is properly implemented (if applicable)

## Known Security Considerations

This is a static portfolio site with:

- No user authentication
- No backend API (in production)
- No sensitive data storage
- No payment processing

The attack surface is minimal, but we still follow security best practices.

## Disclosure Policy

- Security vulnerabilities will be fixed as soon as possible
- A security advisory will be published after the fix is deployed
- Credit will be given to the reporter (unless they prefer to remain anonymous)

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [npm Security Best Practices](https://docs.npmjs.com/packages-and-modules/securing-your-code)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [GitHub Security](https://docs.github.com/en/code-security)

---

Thank you for helping keep this project secure! 🔒
