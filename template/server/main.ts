import express from 'express'
import { print } from 'listening-on'
import { join } from 'path'
import { env } from './env'
import { readFileSync, readdirSync } from 'fs'
import { api } from './api'
import { HttpError } from './error'

let app = express()

if (
  env.NODE_ENV == 'production' &&
  readdirSync('public').includes('base.min.js')
) {
  let base_min_js = readFileSync(join('public', 'base.min.js'))
  app.get('/base.js', (req, res) => {
    res.contentType('text/javascript')
    res.end(base_min_js)
  })
}

app.use(express.static('public'))
app.use(express.static('public/examples'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(api)

let errorHandler: express.ErrorRequestHandler = (
  error: HttpError,
  req,
  res,
  next,
) => {
  if (!(error instanceof HttpError)) {
    console.error(error)
  }
  res.status(error.status || error.statusCode || 500)
  if (req.header('Sec-Fetch-Mode') == 'navigate') {
    res.end(String(error))
  } else {
    res.json({ error: String(error) })
  }
}
app.use(errorHandler)

let port = env.PORT
app.listen(port, () => {
  print(port)
})
