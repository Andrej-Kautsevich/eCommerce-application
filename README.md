# eCommerce-application

This project was implemented as part of a team 👥 task course from RS School. Each group consisted of 3 students, each of whom worked on his part of the task.

Together with the team, we created a small online store for the sale of watches based on eCommerceTools

### What's eCommerceTools?

This platform replicates real-world shopping experiences in a digital environment 🏪. It's a comprehensive online shopping portal that provides an interactive and seamless experience to users. From product discovery to checkout, the application ensures a smooth journey for the user, enhancing their engagement and boosting their purchasing confidence 🚀.

### What key pages in the application include:

- Login and Registration pages
- Main page 🏠
- Catalog Product page 📋
- Detailed Product page 🔎
- User Profile page 👤
- Basket page 🛒
- About Us page 🙋‍♂️🙋‍♀️

## Technology Stack 💻📚

- React ⚛️
- Vite
- TypeScript
- ESLint
- Prettier
- Trello (Task board)🗂️
- Husky🐕
- Vitest🧪

## Local Installation

- 1.Install Node.js
- 2.Clone this repo `https://github.com/Andrej-Kautsevich/eCommerce-application`
- 3.To install all dependencies use `npm install`
- 4.Start the local dev server using:

```bash
  npm run dev
```

## Setting Up Your Environment Variables

In this project, we use environment variables to keep sensitive data like API keys, database URIs, and other confidential information secure. We store these variables in a .env file which is not tracked by version control systems like Git.

In the `.env.example` file, you can find an example of basic parameter settings for the `.env` file.
You will need to create an **commercetools** account and [get your own api client](https://docs.commercetools.com/getting-started/create-api-client)
To apply the modified parameters, you will need to restart the server.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server using Vite.

- `npm run build`: Compiles your TypeScript files and builds the application for production using Vite.

- `npm run preview`: Serves the production build of your application for previewing purposes.

- `npm run lint`: Runs ESLint on your `.ts` and `.tsx` files. It reports unused ESLint directives and fails if there are any warnings.

- `npm run lint:fix`: Similar to `npm run lint`, but it also automatically fixes problems in your code that can be fixed by ESLint.

- `npm run prettier`: Formats your code using Prettier. It ignores files that Prettier doesn't recognize and writes the formatted code back to the file system.

- `npm run typecheck`: Checks your code for type errors using the TypeScript compiler. It doesn't emit any output files (`--noEmit`).

- `npm run prepare`: Sets up Husky, a tool for managing git hooks.

- `npm run test`: Runs your tests using Vitest.

- `npm run test:ui`: Opens the Vitest user interface for running and inspecting tests.

- `npm run test:watch`: Runs your tests in watch mode using Vitest. It re-runs the tests as you make changes to your code.
