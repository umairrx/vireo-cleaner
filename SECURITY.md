# Security Policy

## Supported Versions

Currently supported versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of Vireo Cleaner seriously. If you discover a security vulnerability, please follow these steps:

### How to Report

1. **DO NOT** create a public GitHub issue for security vulnerabilities
2. Send a report to the project maintainers via:
   - GitHub Security Advisory (preferred)
   - Create a private security advisory at: https://github.com/umairrx/vireo-cleaner/security/advisories/new
   - Or contact via GitHub issues (mark as security concern)

### What to Include

Please include the following information in your report:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Suggested fix (if you have one)
- Your contact information

### Response Timeline

- We will acknowledge receipt of your report within **48 hours**
- We will provide a more detailed response within **7 days**
- We will work on a fix and release schedule
- We will credit you in the security advisory (unless you prefer to remain anonymous)

### Disclosure Policy

- Security issues will be disclosed publicly only after a fix is available
- We request that you do not publicly disclose the vulnerability until we've had a chance to address it
- We will coordinate with you on the disclosure timeline

## Security Best Practices

When using Vireo Cleaner:

1. **Review Custom Patterns**: Always review custom regex patterns before applying them to production code
2. **Test First**: Test patterns on non-critical files before bulk operations
3. **Backup**: Always maintain backups before running bulk comment removal
4. **Version Control**: Use git or other version control systems to track changes
5. **Review Changes**: Always review the changes made by the extension before committing

## Known Security Considerations

### Regex Patterns

- Custom regex patterns execute in the Node.js environment
- Malicious or poorly constructed regex can cause performance issues (ReDoS)
- Always validate and test custom patterns in a safe environment first

### File Processing

- The extension processes files in your workspace
- Ensure you trust the workspace files before running bulk operations
- Review the file glob patterns used for bulk processing

## Updates

This security policy may be updated from time to time. Please check back regularly for updates.

## Questions

If you have questions about this security policy, please create a GitHub issue with the "security" label.

---

Thank you for helping keep Vireo Cleaner and its users safe!
