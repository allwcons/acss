# Contributing to Acss

Thank you for considering contributing to Acss! Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

## How to Contribute

### 1. Reporting Bugs

If you encounter any bugs, please file an issue using the [Issues](https://github.com/allwcons/acss/issues) tab. Before creating a new issue, please check if the bug has already been reported. When reporting a bug, please include:

- A descriptive title for the issue.
- Clear steps to reproduce the bug.
- Screenshots or logs, if relevant.
- Your Node.js version and environment details.

### 2. Requesting Features

Feature requests are always welcome! If you have a feature idea, please open a "Feature Request" issue and provide:

- A clear description of the feature.
- The motivation behind the feature.
- Any potential use cases or examples.

### 3. Code Contributions

If you'd like to contribute code, here's how you can get started:

#### Prerequisites
- Ensure you have Node.js version 6 or higher installed.
- Understand the basics of how Acss works by reviewing the [README](https://github.com/allwcons/acss/blob/main/README.md).

#### Steps to Contribute Code

1. **Fork the repository**  
   Start by forking the [Acss repository](https://github.com/allwcons/acss) to your GitHub account.

2. **Clone your fork**  
   Clone your forked repository locally:
   ```bash
   git clone https://github.com/<your-username>/acss.git
   cd acss
3. **Install dependencies**  
   Install the required dependencies by running:

   ```bash
   npm install
   
4. **Create a new branch**
Create a new branch for your changes:
```bash
git checkout -b feature-or-bugfix-name
```

5. **Make your changes**
Implement your changes in the acss.js, compiler.js, or other necessary files. Ensure your code is well-documented and follows the coding standards of the project.

6. **Test your changes**
Before pushing your changes, make sure to test them by compiling Acss code using:

```bash
node compiler.js your-file.acss build-file.js
```
7. **Commit your changes**
Commit your changes with a meaningful message:

```bash
git commit -m "Description of the change"
```
8. **Push to your fork**
Push the changes to your fork:

```bash
git push origin feature-or-bugfix-name
```
9. **Submit a pull request**
Create a pull request (PR) to merge your changes into the main repository. Describe your changes and why they are useful.

### 4. Code Style and Guidelines

Please adhere to the following guidelines:

- Follow the JavaScript coding conventions and keep your code clean and well-structured.
- Add comments where necessary, especially for complex logic.
- Respect the syntax rules of Acss, ensuring proper spacing as outlined in the documentation.

### 5. Testing

Please ensure that your changes do not break existing functionality. If you introduce new features or fix bugs, write corresponding tests where applicable.

- Test your Acss code by running the compiler with your `.acss` file and checking the generated build file.
- Validate the changes in the browser with your HTML file to confirm styling.

### 6. License

By contributing to Acss, you agree that your contributions will be licensed under the project's MIT License.


