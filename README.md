Guest Management App
This is a React-based guest management application with a PocketBase backend. It allows users to view, add, edit, and delete guest records, with features like search functionality and form validation.
Features

Guest List: Display all guests in a table with search functionality and a "No data found" message when applicable.
Add Guest: Form to add new guests with validation for name, email, and phone.
Edit Guest: Form to update existing guest details.
PocketBase Backend: Uses PocketBase for a lightweight, self-hosted backend with SQLite.

Prerequisites

Node.js: Version 16 or higher (LTS recommended).
Git: For cloning the repository and version control.
PocketBase: Version 0.29.3 or compatible (download from PocketBase Releases).
Terminal: For running commands (e.g., Command Prompt, PowerShell, or Bash).
VS Code (optional): Recommended for editing code, with Git integration.

Setup Instructions
1. Clone the Repository
Clone this repository to your local machine:
git clone https://github.com/USERNAME/REPOSITORY.git
cd REPOSITORY

Replace USERNAME and REPOSITORY with your GitHub username and repository name.
2. Install Frontend Dependencies
Navigate to the project directory and install the required Node.js packages:
npm install

This installs dependencies like React, @tanstack/react-router, pocketbase, framer-motion, and lodash.
3. Set Up PocketBase

Download PocketBase:

Visit the PocketBase Releases page and download the executable for your platform (e.g., pocketbase_0.29.3_linux_amd64.zip for Linux).
Extract the archive to a directory (e.g., backend/pocketbase in your project).


Run PocketBase:

Navigate to the directory containing the pocketbase executable:cd backend/pocketbase


Start the PocketBase server:./pocketbase serve


By default, PocketBase runs on http://127.0.0.1:8090. The first time you run it, it will generate an admin UI link (e.g., http://127.0.0.1:8090/_/) to set up your admin account.


Create Admin Account

Open the admin UI link in your browser and create an admin account with the email sanjula200249@gmail.com and password Sanjula22..
Alternatively, create an admin account via the command line:./pocketbase superuser create sanjula200249@gmail.com Sanjula22.


Security Note: Store these credentials securely in a .env file (e.g., VITE_POCKETBASE_ADMIN_EMAIL and VITE_POCKETBASE_ADMIN_PASSWORD) and ensure .env is added to .gitignore. Avoid hardcoding credentials in the codebase or public files.


Create the Guests Collection:

In the PocketBase admin UI (http://127.0.0.1:8090/_/), log in with your admin credentials.
Click New Collection and create a collection named guests with the following fields:
first_name (Text, required)
last_name (Text, required)
email (Email, required, unique)
phone (Text, optional)
address (Text, optional)
date_of_birth (Date, optional)


Save the collection.



4. Configure PocketBase Credentials

The frontend connects to PocketBase at http://127.0.0.1:8090 (as defined in the code: const pb = new PocketBase("http://127.0.0.1:8090")).
No additional credentials are needed for basic CRUD operations in this setup, as the guests collection can be configured to allow public access for create, read, update, and delete operations in the PocketBase admin UI:
Go to Collections > guests > Settings > Rules in the admin UI.
Set the following rules for simplicity (adjust based on your security needs):
List/Search: @request.auth.id != "" || true
View: @request.auth.id != "" || true
Create: @request.auth.id != "" || true
Update: @request.auth.id != "" || true
Delete: @request.auth.id != "" || true


These rules allow authenticated users or public access to perform all operations. For production, restrict rules to authenticated users only (remove || true).


Environment Variables (optional for production):
Create a .env file in the project root to store the PocketBase URL:VITE_POCKETBASE_URL=http://127.0.0.1:8090


Update the code to use the environment variable:const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);


Ensure .env is added to .gitignore to avoid committing sensitive data:.env





5. Run the Frontend
Start the React development server:
npm run dev


Open your browser and navigate to http://localhost:5173 (or the port shown in the terminal).
The app should connect to the PocketBase backend at http://127.0.0.1:8090.

Project Structure
├── backend/
│   └── pocketbase/         # PocketBase executable and data
│       ├── pb_data/        # Database and uploaded files (add to .gitignore)
│       ├── pb_migrations/  # Migration files (version control)
├── src/
│   ├── GuestList.tsx       # Guest list with search and table
│   ├── AddGuestForm.tsx    # Form to add new guests
│   ├── GuestDetail.tsx     # Form to view/edit guest details
├── .gitignore
├── README.md
├── package.json
└── vite.config.ts

Important Notes

Do Not Commit pb_data:
The pb_data directory contains sensitive information (database, user data, etc.). Ensure it’s in your .gitignore:backend/pocketbase/pb_data/




Docker Option:
To run PocketBase with Docker, create a docker-compose.yml:version: "3.7"
services:
  pocketbase:
    image: ghcr.io/muchobien/pocketbase:latest
    container_name: pocketbase
    restart: unless-stopped
    ports:
      - "8090:8090"
    volumes:
      - ./backend/pocketbase/pb_data:/pb_data
      - ./backend/pocketbase/pb_public:/pb_public


Run with:docker-compose up -d




Production Considerations:
Use a secure PocketBase URL (e.g., HTTPS).
Restrict collection access rules to authenticated users.
Set up automated backups for pb_data.
Consider using an S3-compatible storage for file uploads if needed.



Running the App

Start PocketBase:cd backend/pocketbase
./pocketbase serve


Start the React frontend:npm run dev


Access the app at http://localhost:5173/guests.

Troubleshooting

PocketBase Not Running: Ensure the server is running at http://127.0.0.1:8090. Check the terminal for errors.
CORS Issues: If you encounter CORS errors, ensure the PocketBase server is running and accessible. For production, configure CORS in the PocketBase admin UI.
No Data in Table: Verify the guests collection exists and contains data. Check the admin UI or create test records.

Contributing
To contribute:

Fork the repository.
Create a feature branch:git checkout -b feature/your-feature


Commit changes:git commit -m "Add your feature description"


Push to your fork:git push origin feature/your-feature


Open a pull request on GitHub.

License
This project is licensed under the MIT License.
