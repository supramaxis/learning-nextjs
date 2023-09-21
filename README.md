# URL Shortener

This is a web application built with Next.js that allows users to shorten URLs. It uses Prisma as the ORM to interact with a PostgreSQL database, and is written in TypeScript.

## Getting Started

To get started with this project, you'll need to have Node.js and PostgreSQL installed on your machine. You can then follow these steps:

1. Clone the repository: `git clone https://github.com/supramaxis/learning-nextjs.git`
2. Install dependencies: `npm install`
3. Create a PostgreSQL database for the project
4. Use the .env.example file to create a .env file with the correct environment variables
5. Run database migrations: `npx prisma migrate dev`
6. Start the development server: `npm run dev`

## Usage

Once the development server is running, you can access the web app at `http://localhost:3000`. From there, you can login and click the create links button. The shortened URL will be displayed on the page.
