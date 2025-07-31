# To-Do-List Application

A full-stack task management application built with Laravel (backend) and Vue.js (frontend). This application demonstrates modern web development practices including real-time notifications, JWT authentication, and follows SOLID principles with Repository and Service patterns.

![To-Do List Application](https://via.placeholder.com/800x400?text=To-Do+List+Application)

## Features

- 🔐 **Secure Authentication** with JWT tokens
- 📝 **Complete Task Management** (Create, Read, Update, Delete)
- ⚡ **Real-time Notifications** using Laravel Echo and Pusher
- 🔄 **State Management** with Pinia
- 🎨 **Modern UI** built with Tailwind CSS
- 🏗️ **Solid Architecture** following SOLID principles and design patterns

## Tech Stack

### Backend

- **Framework**: Laravel 12
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Laravel Broadcasting with Pusher
- **Architecture**: Repository and Service patterns

### Frontend

- **Framework**: Vue.js 3
- **State Management**: Pinia
- **API Calls**: Axios
- **Real-time**: Laravel Echo with Pusher.js
- **UI Framework**: Tailwind CSS

## Project Structure

```
├── todo-backend/     # Laravel backend application
│   ├── app/
│   │   ├── Events/   # Broadcast events
│   │   ├── Http/     # Controllers and middleware
│   │   ├── Models/   # Database models
│   │   ├── Repositories/  # Repository pattern implementation
│   │   └── Services/      # Service layer
│   ├── config/      # Application configuration
│   ├── database/    # Migrations and seeders
│   └── routes/      # API routes
└── todo-frontend/   # Vue.js frontend application
    ├── public/      # Static assets
    └── src/
        ├── assets/        # Images and other assets
        ├── components/    # Vue components
        ├── composables/   # Vue composables for reusable logic
        ├── plugins/       # Axios, Echo configuration
        ├── router/        # Vue Router configuration
        ├── stores/        # Pinia stores
        └── views/         # Page components
```

## Installation

### Prerequisites

- PHP 8.2+
- Composer
- Node.js 16+
- npm or yarn
- MySQL

### Backend Setup

1. Clone the repository

   ```bash
   git clone https://github.com/Echaftech23/To-Do-List-VueJs.git
   cd To-Do-List-VueJs/todo-backend
   ```

2. Install dependencies

   ```bash
   composer install
   ```

3. Environment setup

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Configure your database in `.env`

   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=todo_app
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. Configure Pusher for real-time notifications

   ```
   BROADCAST_DRIVER=pusher
   PUSHER_APP_ID=your_app_id
   PUSHER_APP_KEY=your_app_key
   PUSHER_APP_SECRET=your_app_secret
   PUSHER_APP_CLUSTER=your_app_cluster
   ```

6. Run migrations

   ```bash
   php artisan migrate
   ```

7. Generate JWT secret

   ```bash
   php artisan jwt:secret
   ```

8. Start the server
   ```bash
   php artisan serve
   ```

### Frontend Setup

1. Navigate to the frontend directory

   ```bash
   cd ../todo-frontend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Configure environment variables

   ```bash
   cp .env.example .env
   ```

   Edit `.env` to point to your backend API and Pusher credentials:

   ```
   VITE_API_URL=http://127.0.0.1:8000/api
   VITE_PUSHER_APP_KEY=your_app_key
   VITE_PUSHER_APP_CLUSTER=your_app_cluster
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## Usage

1. Register a new account with your details
2. Log in with your credentials
3. Create, view, update, and delete tasks
4. Receive real-time notifications when tasks are created
5. View all notifications in the dedicated notifications page

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in and receive JWT token
- `POST /api/auth/logout` - Log out (invalidate token)
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/profile` - Get user profile

### Tasks

- `GET /api/tasks` - Get all tasks for authenticated user
- `GET /api/tasks/{id}` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task

## Best Practices Implemented

- **SOLID Principles**:

  - Single Responsibility Principle: Each class has a single responsibility
  - Open/Closed Principle: Code is extensible without modification
  - Liskov Substitution Principle: Repository pattern allows substitution
  - Interface Segregation: Clear interfaces with specific methods
  - Dependency Inversion: Dependencies injected through constructors

- **Repository Pattern**: Separation of data access logic
- **Service Pattern**: Separation of business logic
- **Real-time Events**: Broadcasting task events for real-time updates
- **State Management**: Centralized state with Pinia stores

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

[Echaftech23](https://github.com/Echaftech23)
