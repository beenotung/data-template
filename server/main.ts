import express from 'express'
import { print } from 'listening-on'
import { env } from './env'

let app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let port = env.PORT
app.listen(port, () => {
	print(port)
})
