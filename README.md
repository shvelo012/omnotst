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

