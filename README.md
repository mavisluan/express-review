## Express generator

- npx express-generator --view=ejs myapp
- cd myapp
- yarn install (intall dependencies)
- DEBUG=myapp:\* yarn start (run the app)

## Basic routing

- app.METHOD(PATH, HANDLER)

## Serving static files

- Use middleware express.static(root, [options])
  - app.use('/static', express.static(path.join(\_\_dirname, 'public')))

## Middleware functions

- Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
- Middlewares execution

  - Middleware runs in order
  - No mount path middleware is executed every time the app receives the request
  - Middleware mounted on sepcific path is executed only when the path matches

- 2 ways to end the middleware (Example: routes -> users.js -> /users/favorite routes)
  - next(): run the the next middleware
  - res.send(): end the cycle -> the next middleware/routes will not run
  - Notes: If the middleware does not end the req-res cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

## Working with MySQL

- CRUD example: routes -> posts

1. Install mysql package:
   - Yarn add mysql
2. Create connection
   - const mysql = require('mysql')
   - const db = mysql.createConnection({
     <br/>&emsp; host: 'localhost',
     <br/>&emsp; user: 'username',
     <br/>&emsp; password: 'password'
     <br/>&emsp; database: 'dbname'
     <br/>})
3. Connect
   - db.connect(err => {
     <br/>&emsp;if (err) throw err;
     <br/>&emsp;console.log('MySql Connected');
     <br/>});
