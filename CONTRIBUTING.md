# Contributing to Smart Krishi Sahayak

We love your input! We want to make contributing to Smart Krishi Sahayak as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with Github
We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## We Use [Github Flow](https://guides.github.com/introduction/flow/index.html), So All Code Changes Happen Through Pull Requests
Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the MIT Software License
In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issues](https://github.com/abhishek-dbz/smart-krishi-sahayak/issues)
We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/abhishek-dbz/smart-krishi-sahayak/issues/new); it's that easy!

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Use a Consistent Coding Style

* Use TypeScript for all React components
* Use Tailwind CSS for styling
* Follow React hooks best practices
* Use meaningful variable and function names
* Add JSDoc comments for complex functions
* Follow the existing project structure

## Feature Development Guidelines

### For Disease Detection Features:
- Always include image validation
- Add proper error handling
- Include confidence scoring
- Support multiple languages

### For Weather Features:
- Use mock data for development
- Include proper error handling
- Make it responsive
- Add loading states

### For UI Components:
- Follow Tailwind CSS conventions
- Make components responsive
- Add proper TypeScript types
- Include accessibility features

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/smart-krishi-sahayak.git`
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`
5. Make your changes
6. Test your changes
7. Commit with a descriptive message
8. Push to your fork
9. Create a Pull Request

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the version numbers in package.json if applicable
3. The PR will be merged once you have the sign-off of the maintainers

## Languages and Localization

When adding new text content:
- Add English version in `src/i18n/locales/en.json`
- Add Hindi version in `src/i18n/locales/hi.json`
- Add other language versions if possible
- Use translation keys in components, not hardcoded text

## Testing

- Test on different screen sizes
- Test language switching
- Test error scenarios
- Test with invalid inputs
- Test offline scenarios

## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## References

This document was adapted from the open-source contribution guidelines from [Facebook's Draft](https://github.com/facebook/draft-js/blob/a9316a723f9e918afde44dea68b5f9f39b7d9b00/CONTRIBUTING.md)
