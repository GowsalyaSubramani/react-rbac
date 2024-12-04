# Role Based Access Control(RBAC) UI
Building an admin dashboard for managing users, roles, and permissions.
## Installation and Setup

1. **Clone the repository:**
   ```
    git clone https://github.com/your-username/react-rbac.git
    cd react-rbac
   ```
2. **Install Dependencies:**
   ```
    npm install bootstrap
    npm i react-toastify
   ```
3. **Implement Routing:**
   ```
    npm install react-router-dom
   ```
4. **Define & Run JSON Server REST API:**
   ```
     json-server --watch db.json --port 8000
   ```
5. **Start the Development Server:**
   ```
   npm start
   ```
6. **Open the application in your browser:**
   ```
    http://localhost:3000
   ```
## Explanation
There are 2 roles
  1.admin
  2.user
### For Admin Login (Credentials)
Username: adminuser
Password: admin
Admin can add, edit, remove and view employee details
### For User Login(Credentials)
Username: ntuser
Password: ntuser
User can only view employee details only no other actions can be performed.

## Screenshots
### Login Page
![Login Page](./login-page.png)

### New User Registration Page
![Register Page](./register-page.png)

### Admin View Page
![Admin View](./admin-view.png)

### Admin Edit Page
![Admin Edit](./admin-edit.png)

### Admin Remove Page
![Admin Remove](./admin-remove.png)

### User View Page
![User View](./user-view.png)

### User Edit Remove 
![User Edit Remove](./user-edit-remove.png)

### User View Details Page
![User View Details](./user-viewdetails.png)
   
