# InternHub

InternHub is a full-stack internship platform that bridges the gap between students and companies by connecting ambitious learners with real-world internship opportunities.

The platform allows students to discover, search, filter, apply for, and save internships, while companies can create and manage internship opportunities and review applications.

## Problem & Solution

### The Problem

Students often struggle to find practical, real-world internship opportunities, while traditional education may not provide enough hands-on industry experience.

### Our Solution

InternHub connects students with companies through a seamless platform where students can discover relevant internships and companies can manage their opportunities and applications.

## Features

### Authentication & Authorization

- Student and Company registration
- Login using JWT authentication
- Role-based authorization
- Password hashing using bcryptjs
- Protected backend routes

### Students

- Browse internship opportunities
- Search internships
- Filter internships by category, location, and duration
- View internship details
- Apply for internships
- Track application status
- Save internships to favorites
- Manage personal profile
- Upload and access CV
- View student information

### Companies

- Create internship opportunities
- Edit their own internships
- Delete their own internships
- View applicants for their internships
- Accept or reject applications
- View their posted internships

### Platform

- Internship categories
- Featured internships
- Student listings
- Company listings
- Platform statistics
- Newsletter subscription
- Input validation
- Error handling
- Seed data for categories and internships

## Technologies

### Frontend

- React.js
- JavaScript
- React Router
- Axios
- Bootstrap
- Framer Motion

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- CORS

## System Architecture

The application follows a client-server architecture:

```text
React Frontend
      |
      | HTTP Requests
      v
Axios
      |
      v
Express REST API
      |
      +-------------------+
      |                   |
      v                   v
Controllers          Middleware
      |
      v
Mongoose
      |
      v
MongoDB
```

### Request Flow

1. The user interacts with the React frontend.
2. Axios sends HTTP requests to the Express backend.
3. Authentication middleware verifies JWT tokens for protected routes.
4. Controllers handle validation and business logic.
5. Mongoose communicates with MongoDB.
6. The backend sends the response back to the frontend.

## Project Structure

```text
Intern_project(Team4)/
│
├── Back_end/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── seedCategories.js
│   ├── seedInternships.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── Front_end/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── README.md
└── .gitignore
```

## Database

The project uses MongoDB with Mongoose.

### Main Models

#### User

Stores both students and companies.

Important fields include:

- name
- email
- password
- role
- phone
- education
- degree
- startYear
- endYear
- skills
- aboutMe
- location
- cv

The `role` field distinguishes between:

```text
student
company
```

#### Internship

Stores internship opportunities posted by companies.

Important fields include:

- title
- description
- company
- logo
- category
- location
- duration
- type
- remote
- requirements
- skills
- deadline
- howToApply
- createdBy

#### Application

Stores student applications for internships.

Important fields include:

- student
- internship
- status
- appliedAt

Application status can be:

```text
pending
accepted
rejected
```

#### Favorite

Stores internships saved by students.

It connects:

```text
Student → Internship
```

#### Category

Stores internship categories.

#### Newsletter

Stores newsletter subscriber emails.

## Authentication & Security

The backend uses JWT-based authentication.

Protected requests require:

```text
Authorization: Bearer <your_token>
```

Security measures include:

- JWT authentication
- Role-based authorization
- Password hashing with bcryptjs
- Passwords are not returned in user API responses
- Backend authorization checks ownership of company internships
- Input validation
- Email validation
- Password validation
- Internship deadline validation
- CV file type validation
- CV file size limit
- Environment variables for sensitive configuration
- `.env` excluded from Git

## Installation

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB Atlas account
- Git

### Clone the Repository

```bash
git clone https://github.com/KIRA-20000/Internship_project.git
cd Internship_project
```

## Backend Setup

Open a terminal in the project root:

```bash
cd Back_end
npm install
```

Create a `.env` file inside the `Back_end` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit the real `.env` file or any secrets to GitHub.

An example environment file is included in the project as:

```text
.example.env
```

## Frontend Setup

Open another terminal:

```bash
cd Front_end
npm install
```

## Running the Project

### Start the Backend

```bash
cd Back_end
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### Start the Frontend

In another terminal:

```bash
cd Front_end
npm run dev
```

The frontend will run using the Vite development server.

## API Overview

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/profile` | Get current user profile |
| PUT | `/api/users/profile` | Update current user profile |
| POST | `/api/users/profile/cv` | Upload CV |
| GET | `/api/users/profile/cv` | Access CV |

### Internships

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/internships` | Get internships |
| GET | `/api/internships/featured` | Get featured internships |
| GET | `/api/internships/my` | Get company's internships |
| GET | `/api/internships/:id` | Get internship details |
| POST | `/api/internships` | Create internship |
| PUT | `/api/internships/:id` | Update internship |
| DELETE | `/api/internships/:id` | Delete internship |

### Applications

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/applications` | Apply for an internship |
| GET | `/api/applications/my` | Get student's applications |
| GET | `/api/applications/internship/:id` | Get applicants for an internship |
| PATCH | `/api/applications/:id/status` | Accept or reject application |

### Favorites

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/favorites/:internshipId` | Add internship to favorites |
| GET | `/api/favorites` | Get student's favorites |
| DELETE | `/api/favorites/:internshipId` | Remove internship from favorites |

### Categories

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/categories` | Get all categories |

### Students

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Get students |
| GET | `/api/students?skill=React` | Filter students by skill |

### Companies

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/companies` | Get companies |

### Statistics

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/statistics` | Get platform statistics |

### Newsletter

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/newsletter/subscribe` | Subscribe to newsletter |

## API Documentation

Detailed API documentation is provided separately and includes the available endpoints, methods, authentication requirements, request data, and responses.

## ERD

The project includes an Entity Relationship Diagram showing the main database models and their relationships.

Main entities:

```text
User
 |
 +---- Internship
 |
 +---- Application ---- Internship
 |
 +---- Favorite ------ Internship

Category
Newsletter
```

## Validation

The backend validates incoming data to provide clear error messages.

Examples include:

- Required authentication fields
- Valid email format
- Minimum password length
- Valid user role
- Valid internship type
- Valid internship deadline
- Future internship deadline
- Requirements and skills arrays
- PDF-only CV uploads
- Maximum CV file size

## Error Handling

The backend includes centralized error-handling middleware for handling unexpected server errors and returning consistent error responses.

API responses use appropriate HTTP status codes such as:

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
```

## Git & Version Control

The project uses Git and GitHub for version control.

The repository excludes:

- `node_modules`
- `.env`
- Uploaded files
- Build files
- Log files

Development work was committed in stages using meaningful commit messages.

## Team

### Development Team

- Badr Ahmed Sayed
- Antonyos Moures Ibrahim
- Fatema Mohey Eldin Mostafa
- Mohamed Ehab Abdrabo
- Fatma Salama Elkholy
- Farah Amin Elsadik
- Sohaila Bahgat Ahmed

### Team Roles

The team includes members working across:

- Frontend
- Backend
- Database
- UI/UX

## Project Documentation

The project documentation includes:

- API Documentation
- ERD
- Final Project Presentation

## Future Scope

Possible future improvements include:

- AI-powered internship matching
- Advanced analytics
- Dedicated mobile application

## Demo

The project can be demonstrated locally by running the backend and frontend as described in the installation section.

## License

This project was developed as a team internship project.