# Contributing to Mini CRM

Thank you for considering contributing to this project! 🎉

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:

- A clear, descriptive title
- Steps to reproduce the problem
- Expected vs. actual behaviour
- Your Node.js version and OS

### Suggesting Enhancements

Feature requests are welcome. Please open an issue and describe:

- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

### Submitting a Pull Request

1. **Fork** the repository and create your branch from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** — keep them focused and minimal.

3. **Test** your changes manually (see README for setup instructions).

4. **Commit** using clear, conventional commit messages:

   ```
   feat: add lead export to CSV
   fix: handle duplicate email on lead creation
   docs: update API endpoint table
   ```

5. **Push** your branch and open a Pull Request against `main`.

6. Fill in the Pull Request template, describing what you changed and why.

## Code Style

- Use `const`/`let` (avoid `var`)
- Use `async/await` for asynchronous code
- Follow the existing file and folder naming conventions
- Keep controller functions focused — one responsibility per function

## Commit Message Convention

This project loosely follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | When to use |
|---|---|
| `feat:` | A new feature |
| `fix:` | A bug fix |
| `docs:` | Documentation only changes |
| `chore:` | Maintenance tasks (deps, config) |
| `refactor:` | Code restructuring without behaviour change |
| `test:` | Adding or updating tests |

## Questions?

Open a [GitHub Issue](https://github.com/Mpho-Gift-Masina/FUTURE_FS_02/issues) and we'll be happy to help.
