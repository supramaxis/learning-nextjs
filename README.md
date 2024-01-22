# URL Shortener

This is a web application built with Next.js that allows users to shorten URLs. It uses Prisma as the ORM to interact with a PostgreSQL database, and is written in TypeScript.

## Getting Started

To get started with this project, you'll need to have Node.js and a PostgreSQL database. You can then follow these steps:

1. Clone the repository: `git clone https://github.com/supramaxis/learning-nextjs.git`
2. Install dependencies: `npm install`
3. Rename `.env.example` to `.env` and fill in the values
4. Run the database migrations: `npx prisma migrate dev`
5. Start the development server: `npm run dev`

## Usage

Once the development server is running, you can access the web app at `http://localhost:3000`. From there, you can try the demo or login and click the create links button. The shortened URL will be displayed on the page.
