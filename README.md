# QA Engineer Recruitment test

## Before you start

The test is based on Playwright v1.48.1. You can find the full playwright documentation [here](https://playwright.dev/docs/intro). To build the project you will need [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/getting-started/install).
In the file `widget.test.ts` are the initial steps of the test.

Before starting, create an `.env` file in the main directory and put shared values into it. Without this, you will not be able to log in to the test project.

### Commands

In the project directory, you can run:

#### `yarn`

Installs a package and any packages that it depends on.

#### `yarn playwright install`

Installs playwright default browsers.

#### `yarn run test`

Launches test headless.

#### `yarn run dev`

Launches test non-headless with playwright inspector.

### Using Docker

Running tests in Docker ensures that all dependencies and environment configurations are consistent across different machines and environments. 

Prerequisites: Docker must be installed on your machine.

- Build the Docker Image

Navigate to the project directory and build the Docker image with:

#### `docker build -t widget-tests .`

- Run Tests in Docker Container

You in order to run the tests in a Docker container you need to pass the environment variables through the .env file.

#### `docker run --rm --env-file .env widget-tests`

## Rules

- Please do not fork the repo, clone it and put it in your own github.
- When possible use selectors which resemble how users interacts with the page.
- Don't push the .env file to the repository.
- If you have any questions or need help please ask us.

## Part 1

Add the two missing steps to the test. In the first step click on the button "Simulate a Conversation" a popup will open with livechat preview. Dismiss the running chatbot, send the message and verify that it reached the user panel. In the second step, send a reply message from the user panel.

## Part 2 (Optional)

Use a docker to containerize project. Use the official Playwright Docker image or build a custom image. Include information how to run test from the docker side in the readme.

Good luck!
