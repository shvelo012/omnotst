Run npm install 

Install localtunnel
Example in ubuntu terminal 
step 1: npm install -g localtunnel
step 2: lt --port 3000
leave it running. It should give you base url.

Create .env and copy everything from .env.sample
Copy localtunnel link in .env BASE_URL

Now start project using
npm run dev

Copy BASE_URL in browser
You need tunnel password. Follow the instruction click link which is shown down. Copy password which looks like ip.
Now you can test it. There is test static data already in project. 
I added some visualization to test it easily. You can also look for logs in terminal.

# Project Setup

## Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

## Installation

1. **Install Dependencies**

   Run the following command to install the necessary dependencies:

   \`\`\`bash
   npm install
   \`\`\`

2. **Install LocalTunnel**

   Install LocalTunnel globally using npm:

   \`\`\`bash
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

   \`\`\`bash
   cp .env.sample .env
   \`\`\`

   Update the `BASE_URL` in your `.env` file with the LocalTunnel URL provided in the previous step.

5. **Start the Project**

   Start your project using the following command:

   \`\`\`bash
   npm run dev
   \`\`\`

6. **Access the Application**

   Open your browser and navigate to the \`BASE_URL\` specified in your `.env` file.

   - **Note**: You will need a tunnel password to access the application. Follow the instructions provided in the terminal after starting LocalTunnel. Click the link shown in the terminal, and copy the password which looks like an IP address.

7. **Testing**

   - You can test the application using the static data already provided in the project.
   - For visualization, you can refer to the added features for easier testing.
   - Check the logs in the terminal for debugging and validation.

## Troubleshooting

- **If you encounter issues with LocalTunnel**, ensure that your `.env` file is correctly configured and that LocalTunnel is running.
- **For any errors during \`npm run dev\`**, check the terminal logs for details on what might be going wrong.
EOL