# Demo - Deploying to Heroku w/ Postgres

This app accompanies a 2022 lightning talk to Hack Reactor's Denver campus about deploying a full stack web application to Heroku using their provided PostgreSQL database service.

---

## Technologies

This app is comprised of the following primary technologies:

- NodeJS + ExpressJS
    - Server-side JavaScript runtime & framework
- Heroku + Heroku Postgres
    - Cloud platform provider w/ managed SQL database service
- ReactJS
    - Client-side JavaScript framework
- Webpack + Babel
    - JavaScript processing libraries for transpilation and bundling of client-side JavaScript code

---
## Pre-Configuration

The following are steps done in advance which are crucial for successful deployment:
- The NodeJS version was specified in the `package.json` under `"engines"`
- Necessary scripts were listed in the `package.json`, which will automatically be run by Heroku on each deployment:
    - `build`
        - transpiles & bundles the client app JavaScript code
    - `start`
        - starts the server listening on the specifed port
---
```json
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "start": "node server",
    ...
  },
  ...
  "engines": {
    "node": "14.x"
  }
```
---
## Instructions for Deployment

- **Install the Heroku CLI**
    - `brew tap heroku/brew && brew install heroku`
        - This command requires having homebrew installed
        - Visit the [Heroku website](https://devcenter.heroku.com/articles/heroku-cli) for more details.
- **Log in to your Heroku account via the CLI**
    - `heroku login`
        - This should open a browser window to the Heroku login page.
        - After logging in from your browser, the CLI will have access to your account.
- **Create a new heroku app via the CLI**
    - `heroku create`
        - This will prompt some questions for creating the app in Heroku's system
- **Push your app to your new Heroku branch**
    - `git push heroku [your branch name here]`
        - This command pushes your branch to Heroku, where it will then automatically do the following:
            - Install the app's dependencies via `npm install`
            - Build the app via `npm run build`
            - Remove all dev-dependencies (they are initially installed for the build process)
            - Start your app via `npm run start`
- **Your app is now deployed! (Database setup comes next)**
---
## Setting Up Your Heroku Postgres Databse

- **Use the Heroku CLI to attach a pre-configured database to your app:**
    - `heroku addons:create heroku-postgresql:hobby-dev`
        - This sets up a database with the hobby-dev (free) plan, for more advanced features you might want a paid plan
- **Connect into your new database**
    - `heroku pg:psql DATABASE`
        - This is the literal command - "DATABASE" is NOT a placeholder
- **Run the SQL commands necessary to initalize the necessary tables**
    - This app currently assumes the database schema specified in `schema.sql`. Copying-&-pasting the contents of that file into the the Heroku Postgres CLI will create the table required for this app to function as designed. If you would like to set up your own tables, you will also need to adjust the server query and front end accordingly.
    - NOTE: Because of how Heroku Postgres works behind the scenes, you do not need to create a database via any sort of `CREATE DATABASE` command - the database has already been created and you simply need to create your tables.
- **Your database should now be up and running!**
---
## Confirming A Successful Deployment

Based on the message that appears in the browser when opening this app, you will be able to gauge the level of success:

- `Hello Postgres!🐘`
    - The app is fully operational - server, database, and front end interacting as designed.
- `Hello React!`
    - The React app was successfully built and served to the browser, but the request to the server/database query was unsuccessful. Confirm that you initialized the database as instructed
- `Hello HTML...`
    - The HTML was successfully served to the browser, but the React app was not rendered properly. If developing locally, trying running `npm run build` again.

---

## Moving Forward

- `heroku logs --tail`
    - Run this command to see the stream of logs from your deployed app.
- Want to update the deployed version of your app? Just commit to your local branch, then push to your heroku remote branch again, which will trigger the build/start process again with your updated code

---
## Instructions for Local Development

This app's server checks for `DATABASE_URL` environment variable, which will be automatically passed in by heroku on deployment. If the app doesn't find this environment variables, it will then attempt a connection to a local database via other environment variables, whose values are set from the project's `.env` file. This logic occurs in the `server.js` file.

For local development with a successful database connection, first use `schema.sql` to create the appropriate database, and then adjust the values in the `.env` file to match the configuration of your local PostgreSQL database. Once you have done this, be sure to remove `.env` from git tracking (`git rm --cached .env`) so that your personal db connection info doesn't get pushed to GitHub.
    