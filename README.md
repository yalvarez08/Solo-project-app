# Casalogue App

This project is a full-stack CRUD application I created in a 2-week duration. The name of this app is Casalogue. It is a home maintenance task manager for homeowners who need help organizing and keeping track of home-related upkeep tasks. Users can create an account and once logged in, they are able to create tasks, create reminders, edit tasks, update tasks as 'completed', and delete tasks/reminders. In essence, the purpose of this app is to help alleviate the stress and difficulty that often comes with maintaining the condition of one's property. 

## Getting Started

The following instructions will guide you through everything that is required to get this project fully functional on your local machine.

### Prerequisites

Before continuing any further, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org)

### Installation
1. Git clone this project to your computer and open in editor of your choice (i.e. VS Code).
2. Open PostgreSQL and create a new database in your localhost. Name this database 'casalogue_app'.
3. Copy all query found in the `database.sql` file and paste it into your 'casalogue_app' database in order to create tables and populate all required information for the data. Make sure Postgres is running. 
4. In your terminal, run `npm install` to install all necessary dependencies.
5. You will need to add an `.env` file. In the editor, create a `.env` file at the root of the project and include a `SERVER_SESSION_SECRET` key with a random string that is longer than 8 characters. For example:
   ```SERVER_SESSION_SECRET=79TuiER$pa20@jxC```
   If you're having trouble coming up with a random string, here's a site that can generate one for you: [Password Generator Plus](https://passwordsgenerator.net)
6. In your terminal, run `npm run server` to start the backend.
7. Run `npm run client` to start the frontend.
8. In your browser, navigate to `http://localhost:5173/`.


## Usage
1. Register for a new account on the registration page.
2. Login to your newly created account with your username and password.
3. Once on the dashboard page, create a new Item by clicking `Add Home Item`.
4. Fill out the form with all required information and then click `Save & Add Item`.
5. On the dashboard, click `Manage Items` to mark tasks as complete or to delete them.
6. View item details by clicking the image next to the task name.
7. On the item details page, click on the `Edit Item` button to update an item's information.
8. Set a reminder by clicking `Set Reminder?` and completing the short form to set it up.
9. View all set reminders by clicking the 'Reminders' tab on the side navigation bar.
10. View scheduled reminders on the calendar by navigating to the 'Calendar' page.


## Built With
- Node.js
- ReactJS
- Redux-Saga
- Express
- Postgres
- FullCalendar
- SweetAlert
- Semantic UI React

