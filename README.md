# Project Setup

## Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

## Installation

1. **Install Dependencies**

   Run the following command to install the necessary dependencies:

   \`\`\`
   npm install
   \`\`\`

2. **Install LocalTunnel**

   Install LocalTunnel globally using npm:

   \`\`\`
   npm install -g localtunnel
   \`\`\`

3. **Start LocalTunnel**

   Start LocalTunnel and expose your local server:

   \`\`\`bash
   lt --port 3000
   \`\`\`

   Leave this command running. It will provide you with a base URL.

4. **Configure Environment Variables**

   Create a `.env` file in the root directory of your project. Copy the contents from `.env.sample` to `.env`.

   Update the `BASE_URL` in your `.env` file with the LocalTunnel URL provided in the previous step.

5. **Start the Project**

   Start your project using the following command:

   \`\`\`
   npm run dev
   \`\`\`

6. **Access the Application**

   Open your browser and navigate to the \`BASE_URL\` specified in your `.env` file.

   - **Note**: You will need a tunnel password to access the application. Follow the instructions provided in browser  after starting LocalTunnel.

7. **Testing**

   - You can test the application using the static data already provided in the project.
   - For visualization, you can refer to the added features for easier testing.
   - Check the logs in the terminal for debugging and validation.

## Troubleshooting

- **If you encounter issues with LocalTunnel**, ensure that your `.env` file is correctly configured and that LocalTunnel is running.
- **For any errors during \`npm run dev\`**, check the terminal logs for details on what might be going wrong.
EOL