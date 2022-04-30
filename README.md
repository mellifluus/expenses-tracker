# Finance Tracker

This repository contains my hand-in for the SE_19 module, taken during the Spring 2022 semester.
It's a web application that allows users to keep track of their expenses, and visualize them through a line chart, allowing them to view their expenses by month or by year. I had various other ideas in mind, which I will talk more about in my reflection essay, but didn't have time to implement. Some of these are:

* View different colored lines for different categories.
* Use a user's monthly income to show them how close they are to their monthly budget.
* Allow users to choose their currency and show it in the chart.

This was developed using Express.js, a PostgreSQL database, Sequelize.js as ORM, and Chart.js on the frontend to display charts.

---

### Development environment setup instructions

You will need to install NodeJS on your machine. Installation instructions [here](https://nodejs.org/en/download/).

You will also need a PostgreSQL instance running on your machine and you will need to create an user (optional, you can use the default `postgres` user), which needs to be a superuser and a database for the application to use. [MacOS](https://www.codementor.io/@engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb) || [Windows](https://support.esri.com/en/technical-article/000010234)

1. Clone this repository.
2. Install node dependencies
   * `npm install`
3. Locate the `.env.example` file in the root folder of the app and duplicate it, renaming the copy to `.env`.
4. Add environment variables to the newly created `.env` file.
   * `COOKIE_SECRET` must be a random string.
   * `DB_NAME` must be set as the name of the database you created to run this app.
   * `DB_USERNAME` and `DB_PASSWORD` must be set as your PostgreSQL username and password (`postgres` and `admin` if you're using the default `postgres` user).
   * `DB_LOGGING` is up to you, if you would like to see database communication in the console while you run the app - either `true` or `false`.
5. Start the server
   * `npm start`

---

### Web-app architecture diagram


![Web-app flowchart](https://i.imgur.com/UZHLqwe.jpg)
