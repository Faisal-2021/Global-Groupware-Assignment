
# EmployWise User Management

A React application that integrates with the Reqres API to perform basic user management functions, including authentication, user listing, and CRUD operations.

## Features

- User Authentication
- Paginated User List
- CRUD Operations (Create, Read, Update, Delete)
- Responsive Design
- Form Validation
- Error Handling

## Technologies Used

- React
- TypeScript
- React Router for navigation
- React Hook Form with Zod for form validation
- Tailwind CSS for styling
- shadcn/ui components
- Framer Motion for animations
- Local Storage for token persistence

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14.x or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Faisal-2021/Global-Groupware-Assignment
   cd Global-Groupware-Assignment
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:8080` (or the port shown in your terminal).

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── pages/          # Page components
├── services/       # API services
├── types/          # TypeScript type definitions
├── App.tsx         # Main application component
└── main.tsx        # Entry point
```

## API Integration

This project uses the [Reqres](https://reqres.in/) API for demonstration purposes. The following endpoints are used:

- `POST /api/login` - User authentication
- `GET /api/users?page={page}` - Fetch paginated list of users
- `GET /api/users/{id}` - Fetch a single user
- `PUT /api/users/{id}` - Update a user
- `DELETE /api/users/{id}` - Delete a user

## Authentication

Demo credentials:
- Email: eve.holt@reqres.in
- Password: cityslicka

The authentication token is stored in local storage to persist the user's session.


