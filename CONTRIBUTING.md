# 🤝 Contributing Guide

## Welcome!

Thanks for your interest in contributing to the Inventory Management System! This document provides guidelines for contributing to the project.

---

## 📋 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the project
- Show empathy towards other contributors

---

## 🚀 Getting Started

### 1. Fork & Clone
```bash
git clone https://github.com/YOUR_USERNAME/inventory-system.git
cd inventory-system
```

### 2. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Create Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

---

## 💻 Development Workflow

### Backend Development
```bash
cd backend

# Start PostgreSQL
docker-compose up postgres -d

# Run migrations
npx prisma migrate dev

# Start dev server
npm run start:dev

# Run tests
npm run test

# Run E2E tests
npm run test:e2e
```

### Frontend Development
```bash
cd frontend

# Start dev server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

---

## 📝 Coding Standards

### TypeScript
- Use TypeScript strict mode
- Avoid `any` type
- Define interfaces for all data structures
- Use meaningful variable names

### Formatting
```bash
# Backend
cd backend
npm run format

# Frontend (if configured)
cd frontend
npm run lint
```

### Naming Conventions
- **Files**: kebab-case (`user-service.ts`)
- **Classes**: PascalCase (`UserService`)
- **Variables**: camelCase (`userData`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`)
- **Interfaces**: PascalCase with `I` prefix optional (`User` or `IUser`)

---

## 🏗️ Architecture Guidelines

### Backend (NestJS)
- One module per feature
- Services for business logic
- Controllers for HTTP handling
- DTOs for validation
- Guards for authorization
- Always use Prisma for database access

### Frontend (React)
- Functional components with hooks
- Custom hooks for reusable logic
- Keep components small and focused
- Use TypeScript interfaces
- API calls in `services/`
- Global state in `store/`

---

## 🧪 Testing Requirements

### Unit Tests
- Test business logic in services
- Mock external dependencies
- Aim for >70% coverage on services
- File: `*.spec.ts`

### E2E Tests
- Test critical user flows
- Test API endpoints
- File: `*.e2e-spec.ts`

### Running Tests
```bash
# Backend unit tests
cd backend
npm run test

# Backend E2E tests
npm run test:e2e

# With coverage
npm run test:cov
```

---

## 📦 Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation only
- **style**: Formatting, missing semicolons, etc.
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **test**: Adding or updating tests
- **chore**: Updating build tasks, dependencies, etc.

### Examples
```bash
git commit -m "feat(products): add search functionality"
git commit -m "fix(sales): validate stock before sale"
git commit -m "docs(api): update endpoints documentation"
git commit -m "test(purchases): add unit tests for service"
```

---

## 🔀 Pull Request Process

### 1. Update Your Branch
```bash
git fetch origin
git rebase origin/main
```

### 2. Run Tests
```bash
# Backend
cd backend
npm run test
npm run test:e2e

# Frontend
cd frontend
npm run build  # Ensure it builds
```

### 3. Create Pull Request
- Use descriptive title
- Reference related issues
- Describe changes made
- Include screenshots for UI changes
- List breaking changes if any

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass
```

---

## 🐛 Bug Reports

### Before Submitting
1. Check existing issues
2. Try to reproduce
3. Gather information

### Bug Report Template
```markdown
**Describe the bug**
Clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g., Windows 11]
 - Browser: [e.g., Chrome 120]
 - Version: [e.g., 1.0.0]

**Additional context**
Any other context about the problem.
```

---

## ✨ Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
Clear description of the problem.

**Describe the solution you'd like**
Clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Mockups, examples, or other context.
```

---

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for public methods
- Document complex logic
- Update README when adding features
- Keep API_DOCUMENTATION.md current

### Example
```typescript
/**
 * Updates product stock by adding or subtracting kilos
 * @param id Product ID
 * @param kilos Amount to add (positive) or subtract (negative)
 * @returns Updated product with new stock
 */
async updateStock(id: number, kilos: number): Promise<Product> {
  // Implementation
}
```

---

## 🔍 Code Review

### As a Reviewer
- Be respectful and constructive
- Focus on code, not the person
- Explain why, not just what
- Approve when ready
- Request changes when needed

### As an Author
- Respond to feedback
- Don't take it personally
- Ask questions if unclear
- Make requested changes
- Thank reviewers

---

## 🚢 Release Process

### Version Numbering
Follow [Semantic Versioning](https://semver.org/):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json
- [ ] Git tag created
- [ ] Docker images built
- [ ] Release notes written

---

## 🎯 Areas for Contribution

### High Priority
- [ ] Unit test coverage improvement
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Mobile responsiveness
- [ ] Error handling enhancement

### Features (Post-MVP)
- [ ] PDF/Excel export
- [ ] Advanced filtering
- [ ] Bulk operations
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Dashboard charts

### Documentation
- [ ] Video tutorials
- [ ] API examples
- [ ] Deployment guides
- [ ] Troubleshooting wiki

---

## 💬 Communication

### Channels
- **Issues**: Bug reports, feature requests
- **Pull Requests**: Code contributions
- **Discussions**: General questions, ideas

### Response Time
- We aim to respond within 48 hours
- PRs reviewed within 1 week
- Critical bugs addressed ASAP

---

## 🎓 Learning Resources

### NestJS
- [Official Documentation](https://docs.nestjs.com/)
- [NestJS Fundamentals](https://www.youtube.com/watch?v=F_oOtaxb0L8)

### React
- [React Documentation](https://react.dev/)
- [TypeScript with React](https://react-typescript-cheatsheet.netlify.app/)

### Prisma
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Prisma Tutorial](https://www.prisma.io/docs/getting-started)

---

## ❓ Questions?

Don't hesitate to:
1. Open an issue for discussion
2. Check existing documentation
3. Look at similar implementations in the codebase

---

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Thanked publicly

---

**Thank you for contributing!** 🎉

Your contributions help make this project better for everyone.
