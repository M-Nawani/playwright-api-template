# Playwright API Testing Template

This repository provides an easy-to-use Playwright template for API testing. It serves as a blueprint for users who want to quickly implement and automate API test cases using Playwright, streamlining the process with minimal setup and configuration.

## Features

- **Simple Setup**: Get started quickly with a Playwright API testing template.
- **Automated Tests**: Easily automate your API test cases.
- **Extensible**: Easily extend the template to add more API tests or modify existing ones.
- **Support for Different Environments**: The template is easily configurable to work across different environments.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version >= 16.x)
- [Playwright](https://playwright.dev/)
- (Optional) [dotenv](https://www.npmjs.com/package/dotenv) for environment variable management.

## Getting Started

Follow these steps to get started with the Playwright API testing template.

1. Clone this repository:

   ```bash
   git clone https://github.com/M-Nawani/playwright-api-template.git
   cd playwright-api-template
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setting Up Environment Variables
   You may need to configure some environment variables. Create a .env file in the root of the project (if not already present) and add any required API keys, URLs, or credentials. Example of a `.env` file
   ```bash
   API_BASE_URL=https://api.example.com
   API_KEY=your-api-key-here

   ```

4. Configure the Playwright Test Configuration
   You can configure the Playwright settings by modifying the `playwright.config.ts` file. Below is a breakdown of the key configuration options:

   - **`testDir`**: The directory where your tests are located (./src/tests).
   - **`fullyParallel`**: Enables parallel test execution.
   - **`forbidOnly`**: Ensures that `test.only` is not used accidentally in CI.
   - **`retries`**: Configures the number of retries for tests on CI, ensuring more stable results.
   - **`reporter`**: Specifies the reporter for the test results. In this case, it generates an HTML report.
   - **`trace`**: Enables collecting trace information when retrying a failed test.

5. Writing API Tests
   Tests should be placed in the `src/tests` folder. Each API test should be written in a .ts file.
   Example of an API test (src/tests/sampleApi.test.ts):

   ```typescript
    import { test, expect } from "@playwright/test";
    import { ApiHelper } from "../../utilities/api_template/ApiHelper";
    import { ResponseAssertions } from "../../utilities/api_template/ResponseAssertions";

    test("Get booking details and validate response", async () => {
        const apiHelper = new ApiHelper("https://restful-booker.herokuapp.com");
        const response = await apiHelper.readSingleResource("booking", "1");
        ResponseAssertions.assertPropertyEquals(response.data, "", "firstname", "Jim");
    });
    ````

6. Running Tests
    To run the tests, execute:

    ```bash
    npx playwright test
    ```

7. Test Report
    The tests will be reported in an HTML format. The report will be generated in the `test-results` folder by default. You can view the results by opening the `index.html` file.

## Project Structure
    ├── src
    │   └── tests                # API test cases
    ├── playwright.config.ts      # Playwright configuration
    ├── .env                      # Environment variables
    ├── package.json              # Project dependencies and scripts
    └── README.md                 # Project documentation

## Contributions

Contributions are welcome! Please feel free to open issues and submit pull requests.

### How to Contribute

1. **Fork the repository**.
2. **Create a new branch**:
   ```bash
   git checkout -b feature/new-feature
   ```
3. **Make your changes and commit them**:
   ```bash
   git commit -am 'Add new feature'
   ```
4. **Push the branch**:
   ```bash
   git push origin feature/new-feature
   ```
5. **Open a pull request**.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.