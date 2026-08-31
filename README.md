# WanderLust Trip Planner

## Overview

WanderLust is a full-stack trip-planning application designed to simplify the process of organizing group travel.

Planning a trip with multiple people can become difficult when travelers need to coordinate destinations, dates, responsibilities, lodging, activities, and communication.

WanderLust was created to bring important parts of the group-travel planning process into one application. Users can create an account, create trips, view trip information, add travelers, create and assign tasks, explore destinations, and communicate with other members of their trip.

This capstone project was also created to demonstrate the full-stack development concepts learned throughout the program, including relational databases, CRUD operations, RESTful APIs, user authentication, React components, routing, and collaborative Git/GitHub development.

## Problem Statement

Planning group travel requires communication and organization between multiple people. Information can easily become lost or scattered.

Travelers may need to keep track of:

- Where the group is traveling
- Trip dates
- Who is participating in the trip
- Tasks that need to be completed before the trip
- Who is responsible for each task
- Task due dates and status
- Activities and lodging
- Communication between travelers
  WanderLust addresses this problem by allowing users to organize their trip information all in one application instead of multiple apps.

## Project Goals

The main goals of WanderLust are to:

- Allow users to register and log in to an account.
- Allow users to create and manage trips.
- Allow users to view detailed information about a trip.
- Allow multiple registered users to participate in a trip.
- Allow travelers to create and assign trip-related tasks.
- Track task due dates and completion status.
- Alert users when incomplete tasks are approaching their due dates.
- Allow users to explore locations, lodging, and activities.
- Provide a messaging area where travelers can communicate.
- Demonstrate a full-stack application using a relational database, backend API, and React frontend.

# Core Features

## User Authentication

Users can register for an account and log in to access the application.

The authentication system makes trip information specific to registered users and allows multiple users to participate in trips.

## Create a New Trip

Once users have been authenticated, they can create a new trip using a form.

The Create Trip form collects:

- Trip name
- Destination/location
- Start date
- End date
- Description
  Trip dates are validated so that an end date cannot occur before the selected start date.

After a trip is created, the trip information is stored in the PostgreSQL database and can be accessed through the Trip Details page. By clicking “Create Trip” users will be led to the Trip Details page associated with that specific trip the user just created.

## Trip Details

The Trip Details page displays information about a specific trip a user created.

Trip information includes:

- Trip name
- Destination
- Start date
- End date
- Description
- Travelers
- Tasks
- Task due dates
- Task completion status
  The page uses the trip ID from the URL to request the correct trip from the backend.

## Traveler Management

Since the trips are designed to support multiple users, a many-to-many relationship allows one trip to have multiple users and one user to participate in multiple trips.

Users and trips are joined together through their IDs in the trips_users table. This allows registered users to participate in collaborative trip planning.

## Task Management

Users can create tasks associated with a specific trip.

Tasks contain information such as:

- Task title
- Due date
- Completion status
- Trip ID
- Assigned user
  The Trip Details page retrieves tasks belonging to the selected trip and can display the name of the user assigned to each task rather than only displaying the user's database ID.

## Task Due-Date Alerts

WanderLust includes task reminder logic for incomplete tasks.

The frontend compares the current date with the task's due date. When an incomplete task is approaching its due date, the application can display a warning to the user.

This feature helps travelers keep track of responsibilities that need to be completed before their trip.

## Explore

The Explore portion of the application allows users to browse information related to travel destinations.

Users can explore information such as:

- Locations
- Lodging
- Activities
- Descriptions of places
  This allows travelers to research potential things to do and places to stay while planning their trip.

## Group Communication

The application includes a messaging feature that allows travelers participating in the same trip to communicate with one another.

The original project design also considered sharing media such as trip-related videos and the option to delete messages.

## My Trips

This feature provides each authenticated user with a personalized view of only the trips they are assigned to. The page retrieves trips associated with the logged-in user and displays each trip as an individual card containing the trip name, start and end dates, and description.

Each trip card links dynamically to that trip’s Trip Details page using its unique trip ID. This allows users with multiple trips to navigate between their travels while keeping trip information specific to the user.

- Displays trips associated with the currently logged-in user.
- Supports users who are assigned to multiple trips.
- Organizes trips into individual trip cards.
- Displays important trip information, including dates and descriptions.
- Dynamically routes each card to the correct tripID → Trip details page.
- Uses authentication to ensure the trip list is based on the current user.

Flow of My Trips:

Authentication → Your Trips → Trip Details → Travelers / Tasks / Trip Chat.

# Overall Workflow

The application's primary workflow is:

Register → Log In → Explore page → Create Trip → Add Travelers → View Trip Details → Create/Assign Tasks → Track Task Completion

This workflow connects the application's authentication, trip management, relational database, and task-management.

Tech Stack

## Frontend

- React
- JavaScript
- HTML
- CSS
- React Router
- Vite
  React is used to build the user interface using reusable components.

React Router is used to navigate between application pages, including routes such as the Create Trip and Trip Details pages.

Vite provides the frontend development environment.

## Backend

- Node.js
- Express.js
- JavaScript
- RESTful API architecture
  Node.js allows us to use JavaScript to build the backend. Allows javascript to run directly on your computer or server.

Express is used to create API routes that receive requests from the frontend, call database query functions, and return responses. Postman was also used to test the routes.

## Database

- PostgreSQL
- pgAdmin
  PostgreSQL is used for the application's relational database.

pgAdmin was used throughout development to create and test SQL queries.

Tools

- Git
- GitHub
- GitHub Project Board
- GitHub Copilot
- Visual Studio Code
- Postman
- pgAdmin
- DrawSQL
- Figma
- ChatGPT
- URL Images

### Tool Usage

Git & GitHub
Used for version control, branches, collaboration, merging changes, and maintaining the project repositories.

GitHub Project Board
Used to divide project responsibilities and track development progress.

Visual Studio Code
Primary development environment used to write and organize the application's code.

Postman
Used to test backend API routes and verify responses before connecting them to the frontend.

pgAdmin
Used to test SQL queries and check the PostgreSQL database.

DrawSQL
Used during the planning phase to design the relational database schema and visualize relationships between tables.

Figma
Used during the planning and wireframing process.

GitHub Copilot and ChatGPT
Used as development support tools for referencing concepts, generating prompts, troubleshooting, and assisting with documentation.

Image URLs:

[Image on Create Trip and Trip Details page.](https://popsa.com/perspectives/most-photographed-greek-islands/)

[Images on Explore Page](https://images.pexels.com/photos/33562162/pexels-photo-33562162.jpeg)

# Architecture Overview

WanderLust follows a full-stack architecture:

React Frontend → REST API → Express/Node Backend → PostgreSQL Database

Webpage the user sees => sends a request => backend handles it => database stores/finds the information

User → Frontend → Backend → Database

and then:

Database → Backend → Frontend → User

The frontend displays information and receives user input.

The backend receives the requests from the frontend and runs it to create a trip, where it communicates with PostgreSQL and returns a response.

PostgreSQL stores trip data such as users, trips, locations, travelers, and tasks.

# Database Architecture

The database was designed as a relational database with primary keys and foreign-key relationships.

The schema was initially planned using DrawSQL before inputting in PostgreSQL.

Tables include:

### Users

Stores registered user information and supports authentication.

### Locations

Stores locations/destinations that can be associated with trips and explore page.

### Trips

Stores information entered when users create trips, including:

- Trip name
- Location
- Start date
- End date
- Description

### Trips_Users

A join table connecting users and trips.

-many-to-many relationship:

One user → many trips

One trip → many users

### Tasks

Stores tasks associated with trips.

Important task information includes:

- Title
- Due date
- Completed status
- Trip ID
- Assigned user ID

# Backend Architecture

- database queries, API routes, and middleware.

Frontend Request → Express Route → Database Query → PostgreSQL → Express Response → Frontend

ex:

1. The frontend sends the completed trip form to the backend.
2. The Express route receives the request.
3. The route validates the submitted data.
4. The route calls the created trip database query function.
5. PostgreSQL inserts the new trip.
6. The database returns the newly created trip.
7. Express sends the trip back to the frontend.
8. React can display information associated with the new trip.

# Frontend Architecture

-pages/components and API functions.

API files: communicate with the backend using HTTP requests.

React components: display the returned information.

Ex: Trip Details task display component structure:

TripDetails → TaskList → TaskCard

TripDetails retrieves information about the selected trip and its tasks.

TaskList receives the tasks and maps through them.

TaskCard displays information about an individual task, assigned traveler, due date, status, and due-date warning.

# Folder Structure

The project separates the frontend and backend.

A simplified structure is:

WanderLust/

│

├── frontend/

│ ├── src/

│ │ ├── api/

│ │ │ ├── trips.js

│ │ │ ├── tasks.js

│ │ │ └── locations.js

│ │ │

│ │ ├── components/

│ │ │ ├── TripForm.jsx

│ │ │ ├── TripDetails.jsx

│ │ │ ├── TaskList.jsx

│ │ │ └── TaskCard.jsx

│ │ │

│ │ ├── App.jsx

│ │ ├── App.css

│ │ └── main.jsx

│ │

│ └── package.json

│

└── backend/

    ├── api/

    │   ├── trips.js

    │   ├── locations.js

    │   └── users.js

    │

    ├── db/

    │   ├── queries/

    │   ├── schema.sql

    │   └── seed.js

    │

    ├── middleware/

    ├── app.js

    └── package.json

The application uses REST-style API routes to connect the frontend with the backend:

POST /register

POST /login

GET /users

GET /users/:id/trips

GET /users/:id/tasks

GET /trips

POST /trips

GET /trips/:id

DELETE /trips/:id

GET /trips/:id/tasks

POST /trips/:id/tasks

GET /trips/:id/chat

POST /trips/:id/chat

# Development Process

The application was developed collaboratively using Git and GitHub.

The team began by brainstorming the application and determining its required pages, MVP features, and user stories.

Development progressed from:

Database → Backend → Backend Testing → Frontend

The database schema was designed first so that relationships between application data could be established before building features that depended on that data.

Database queries were tested with pgAdmin.

Express routes were then created and tested using Postman.

After confirming that the backend returned the expected information, frontend API functions and React components were created to connect the user interface to the backend.

Team members worked on separate Git branches for their assigned features and merged completed work through GitHub.

# Screenshots

For a cleaner repository structure, it is better to keep application screenshots in a dedicated folder and reference them from this README instead of embedding large image files directly inside the documentation. This keeps the README easier to read, reduces clutter, and makes it simpler to update images later.

Store screenshots in: docs/screenshots/

Example structure:

- docs/screenshots/home-page.png
- docs/screenshots/login-registration.png
- docs/screenshots/user-dashboard.png
- docs/screenshots/create-trip.png
- docs/screenshots/trip-details.png
- docs/screenshots/task-management.png
- docs/screenshots/explore.png
- docs/screenshots/messaging.png

Then reference them in the README with relative links like:

- ![Home Page](docs/screenshots/home-page.png)
- ![Login / Registration](docs/screenshots/login-registration.png)
- ![User Dashboard](docs/screenshots/user-dashboard.png)
- ![Create New Trip](docs/screenshots/create-trip.png)
- ![Trip Details](docs/screenshots/trip-details.png)
- ![Task Management](docs/screenshots/task-management.png)
- ![Explore](docs/screenshots/explore.png)
- ![Messaging](docs/screenshots/messaging.png)

Recommended screenshots:

### Home Page

### Login / Registration

### User Dashboard(Your Trips)

### Create New Trip

### Trip Details

### Task Management

### Your Trips

Explore

### Messaging

# Stretch Goals

- Editing and deleting travelers
- Additional administrative controls for trips and tasks
- Filtering lodging and activities
- GPS/map integration
- Rating system
- Expanded photo/video sharing
- Deleting chat messages or threads
- Additional trip-management functionality
