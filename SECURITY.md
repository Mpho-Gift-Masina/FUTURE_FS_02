# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| latest (`main`) | ✅ |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, **please do not open a public GitHub issue**.

Instead, report it privately by emailing the repository owner or opening a [GitHub Security Advisory](https://github.com/Mpho-Gift-Masina/FUTURE_FS_02/security/advisories/new).

Please include:

- A description of the vulnerability and its potential impact
- Steps to reproduce the issue
- Any suggested mitigations or fixes

You can expect an acknowledgement within **72 hours** and a resolution update within **7 days** for confirmed issues.

## Security Best Practices for Deployers

When running this application in any environment beyond local development:

- **JWT_SECRET**: Use a long, randomly generated secret (64+ characters). Never reuse secrets across environments.
- **MONGO_URI**: Restrict database user permissions to the minimum required. Enable MongoDB Atlas IP allowlisting.
- **CORS**: Update the CORS configuration in `server.js` to allow only your trusted frontend origins.
- **HTTPS**: Always serve the API over HTTPS in production. Use a reverse proxy (e.g., Nginx) or a platform that handles TLS automatically.
- **Rate Limiting**: Consider adding rate-limiting middleware (e.g., `express-rate-limit`) to the auth and lead creation endpoints to prevent abuse.
- **Dependency Updates**: Regularly run `npm audit` and update dependencies to patch known vulnerabilities.

## Disclosure Policy

This project follows a **coordinated disclosure** model. Vulnerabilities will be publicly disclosed after a fix is released and deployers have had reasonable time to update.
