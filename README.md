# To-Do List Application

## Features Implemented
- **User Authentication**: Secure user registration and login using hashed passwords and JWT-based authentication.
- **Task Management**:
  - Add new tasks with a title and description.
  - Edit existing tasks.
  - View task details.
  - Delete tasks.
  - Mark tasks as complete (future implementation suggested).
- **User-Specific Tasks**: Each user can manage their own tasks, ensuring data privacy.
- **Responsive UI**: Clean and responsive user interface built with EJS templates and styled using Bootstrap and custom CSS.
- **Database Integration**:
  - MySQL for user and task data.
  - MongoDB for additional task-related operations (optional).
- **Middleware**: Authorization middleware to protect routes and ensure only authenticated users can access certain features.

## Technologies Used
- **Backend**:
  - [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/) for server-side logic.
  - [MySQL](https://www.mysql.com/) for relational database management.
  - [Mongoose](https://mongoosejs.com/) for MongoDB integration (optional).
- **Frontend**:
  - [EJS](https://ejs.co/) for templating.
  - [Bootstrap](https://getbootstrap.com/) and custom CSS for styling.
- **Authentication**:
  - [bcrypt](https://github.com/kelektiv/node.bcrypt.js) for password hashing.
  - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) for token-based authentication.
- **Environment Management**:
  - [dotenv](https://github.com/motdotla/dotenv) for environment variable configuration.

## How to Setup the Project
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd To-Do-List
   ```
2. **Install Dependencies**
    ```bash
    npm install
    ```
3. **Set Up the Environment Variables:**
    - Create a .env file in the root directory.
    - Add the following variables (modify as needed):

    ```bash
    PORT=3000
    MONGODB_URL=mongodb://localhost:27017/ToDoList
    JWT_SECRET=<your-secret-key>
    ```
4. **Set Up the MySQL Database:**
    - Ensure MySQL is installed and running on your system.
    - Update the database credentials in database/db.js:
    ```js
    export const connection = createConnection({
      host: "localhost",
      user: "<your-mysql-username>",
      password: "<your-mysql-password>",
      database: "ToDoList",
    });
    ```
    - Run the application to automatically create the required database and tables.
5. **Run the Application:**
    ```bash
    npm start
    ```
6. **Access the Application:**

    - Navigate to http://localhost:3000 in your browser.
    - Register a new user and start managing your tasks.

## Additional Notes
- **Database Initialization**: The [`setupDB`](controller/init.js#L38-L46) function in [`controller/init.js`](controller/init.js) ensures that the required database and tables are created if they do not already exist.
- **Static Files**: CSS and JavaScript files are served from the [`public`](public) directory.
- **Future Enhancements**:
  - Add task completion functionality.
  - Implement pagination for task lists.
  - Enhance error handling and validation.
- **Testing**: No tests are currently implemented. Consider adding unit and integration tests for better reliability.
- **Dependencies**: Refer to the [`package.json`](package.json) file for a complete list of dependencies.

Feel free to contribute to the project by submitting issues or pull requests!