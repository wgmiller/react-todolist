# react-todolist

To do list written in React.js with a Flask back end and SQLite database.

## Usage

This web app is available at: https://wgmiller.github.io/react-todolist/

Its back end is hosted here: http://grahams.pythonanywhere.com/list

All changes made to the do list will persist to a SQLite database hosted on pythonanywhere.com. For now, rearranging items is session based--in the future these may persist to the database.

## Design

Create React App (github.com/facebookincubator/create-react-app) was used to create the front end of this application. It preconfigues Webpack and Babel so that the app is ready to go from the start. With Create React App, it's as simple as navigating the project's folder and running:

npm start

From there, I just added components and used fetch to interact with my back end.

The back end was creating using Flask. I also installed Flask-Cors to handle some cross origin problems I was having. The back end currently supports GET, PUT, and POST requests. To simplify connecting my app to my front end, each request returns a json reprensation of the database so that the sites state in React can be updated.

## In Progress

1) Add method on back end to rearrange items in the database
2) Tighten up security when using the Flask-CORS package
3) Add deletion capability to front and back end



http://localhost:3000/