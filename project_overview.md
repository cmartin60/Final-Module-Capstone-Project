# Library Tracker API - Project Proposal

**Author:** Christian Martin

## Project Concept

My project is called Library Tracker API. It is a back-end application that helps manage books and users in a library. The main purpose of this API is to make it easy to track which books are available, who borrowed them, and when they are due to be returned. I chose this theme because it’s a practical system that connects well with real-world use and shows how RESTful APIs can manage and organize data clearly.

## Scope and Functionality

The API will have the following main resources:

- **Users** – for managing library users (register, login, view profile).
- **Books** – for adding, updating, deleting, and listing books.
- **Borrow Records** – for tracking when a user borrows or returns a book.

### Main Features and Endpoints

1. **User Management**
   - Register
   - Login (Firebase Authentication)
   - View/Edit profile
   - Role-based access controls (e.g., admin vs. regular user)

2. **Book Management**
   - Add a new book
   - Update book information
   - Delete a book
   - List/search books

3. **Borrow Tracker**
   - Create borrow record when a user borrows a book
   - Mark return when a book is returned
   - Track due dates and current borrower

## Course Content Alignment

This project will use many skills from the course, including:

- **Express.js** – to create RESTful routes
- **TypeScript** – for better code organization and types
- **Firebase Authentication** – for user login and role-based access
- **Validation with Joi** – to ensure input data is correct
- **Error Handling** – middleware for consistent responses
- **Testing with Jest and Supertest** – to verify endpoints
- **Swagger Documentation** – to document the API clearly

## Extras

I am thinking to add Email Notifications using NodeMailer. When a user borrows or returns a book, they will receive an email confirmation. I will be thinking more of extra codes to add for my final project and will let you know if I see something that fits.

- NodeMailer: https://www.npmjs.com/package/nodemailer

