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
