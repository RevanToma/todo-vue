# Full-Stack School Project

This project is a small full-stack application developed as part of a school assignment. It features a frontend built with Vue.js and TypeScript, and a backend leveraging Prisma, GraphQL, and PostgreSQL.

### Frontend

- **Framework**: Vue.js
- **Language**: TypeScript
- **Features**: Reactive components, modular architecture

### Backend

- **Database**: PostgreSQL
- **ORM**: Prisma
- **API**: GraphQL

## Database Setup

1. **Start your PostgreSQL Server**: Ensure your PostgreSQL server is running.

## Backend Setup

2.  **Configure `.env` File**:

    - Navigate to the root of the backend project.
    - npm install
    - Create a `.env` file (if not already present).
    - Add your PostgreSQL connection string in the following format:
      ```
      DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<dbname>"
      ```

3.  **Run Prisma Migrations**:

    - In the backend directory, run the following command to create your database schema:

      ```
      npx prisma migrate dev
      ```

4.  **Start the GraphQL Server**:
    - Run the following command to start the server:
      ```
      npm start
      ```
    - You can run the following command in another terminal if you would like to use the prisma studio.
      ```
      npx prisma studio
      ```

## Frontend Setup

1. **Install Dependencies**:

   - Navigate to the frontend directory.
   - Run:
     ```
     npm install
     ```

2. **Start the Frontend Server**:
   - Run the following command to start the Vue.js server:
     ```
     npm run dev
     ```
