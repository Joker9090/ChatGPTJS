This is a [Next.js](https://nextjs.org/) with [`OpenAI`](https://www.npmjs.com/package/openai/v/4.0.0-beta.0) integration. More info on [`OpenAI API Reference`](https://platform.openai.com/docs/api-reference)


## Requirements

**node v18** is neccesary to run this app.

## Getting Started

First, install the dependencies:
```bash
npm install
# or
yarn install
```
Then, replace .env_template file to just .env file and put your credentials
```
OPENAI_API_KEY=
OPENAI_ORGANIZATION=
```

Finally run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## OpenAI Docs

**Service Logic:**
  - **Method**: setModel
    - **Description**: This method sets the model to be used in the API calls. Default model is gpt-4-1106-preview

  - **Method**: getModels
    - **Description**: This method returns the list of models available in OpenAI API.

  - **Method**: createAssistant
    - **Description**: This method creates an assistant in OpenAI API.

  - **Method**: createThread
    - **Description**: This method creates a thread in OpenAI API.

  - **Method**: createMessage
    - **Description**: This method creates a message in OpenAI API.

  - **Method**: runner
    - **Description**: This method creates a runner in OpenAI API.

  - **Method**: retrieve
    - **Description**: This method retrieves a runner in OpenAI API.


----
**API Logic:**
  - Path: GET pages/api/models.ts
    - Method: getModels
        - Description: This method returns the list of models available in OpenAI API.

  - Path: POST pages/api/assistant.ts
    - Method: createAssistant
        - Description: This method creates an assistant in OpenAI API. It's neccesary to pass instructions parameter, tools parameter is optional and it's an array of tools

  - Path: POST pages/api/thread.ts
        - Method: createThread
            - Description: This method creates a thread in OpenAI API.

  - Path: POST pages/api/chat.ts
        - Method: createMessage, runner, retrieve, longPollingCall
            - Description: This method creates a message in OpenAI API. Then it creates a runner and waits for the runner to be completed. It's neccesary to pass threadId and text instructions and assistantId parameters are optional.


## NextJs Docs

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/test](http://localhost:3000/api/test). This endpoint can be edited in `pages/api/test.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
