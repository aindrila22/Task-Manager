# Task Management App

## Demo

You can view the demo of the app here: [Task Management App Demo](https://drive.google.com/file/d/1bJdez3kx9NH1M5pU0bQvfoITZU8Jyonr/view?usp=sharing)

This is a Task Management App that allows users to create, update, delete, and track tasks.

## Features

- **User Authentication:** Secure login and registration for users.
- **Task Management:** Users can create, update, delete, and mark tasks as completed.


## Technology Stack

- **Back-End:** Laravel (PHP) with Sanctum for authentication.
- **Front-End:**  React.js
- **Styling:** TailwindCSS
  
## API Endpoints

### Authentication
- `POST /register` - Register a new user.
- `POST /login` - Login and retrieve an authentication token.
- `POST /logout` - Logout user.
- `GET /profile` - Fetch User details.

### Task Management
- `GET /tasks` - List all tasks for the authenticated user.
- `POST /tasks` - Create a new task.
- `PUT /tasks/{id}` - Update an existing task.
- `DELETE /tasks/{id}` - Delete a task.
- `PATCH /tasks/{id}/complete` - Mark a task as completed.

## Back-End Setup (Laravel)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/aindrila22/Task-Manager.git
   cd Task-Manager
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   composer install
   ```

3. **Set up your environment:**

   Copy `.env.example` to `.env` and update the database and authentication settings.

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Migrate the database:**

   ```bash
   php artisan migrate
   ```

5. **Install frontend dependencies :**

   ```bash
   npm install
   npm run dev
   ```

6. **Start the Laravel development server:**

   ```bash
   php artisan serve
   ```

   Your API should now be running at `http://localhost:8000`.

## Front-End Setup

1. **Clone the repository (if separate):**

   If your frontend is in a separate repo, clone it and install dependencies:

   ```bash
 
   cd frontend
   npm install
   npm run dev
   ```


## Running Tests (Optional)

You can run PHPUnit tests to verify the functionality of your API:

```bash
php artisan test
```


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

