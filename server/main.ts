import express from 'express'
import { print } from 'listening-on'
import { env } from './env'

let app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let articles = [
  {
    id: 1,
    title: 'Hello World',
    intro: 'This is a sample article',
    cover_image: 'https://picsum.photos/seed/1/200',
    cover_alt: 'brown tune photo of bridge',
    cover_title: 'sample image 1',
    detail: '/article.html?id=1',
  },
  {
    id: 2,
    title: 'Hello SPA',
    intro: 'This is the second sample article',
    cover_image: 'https://picsum.photos/seed/2/200',
    cover_alt:
      'desk with laptop, keyboard, mouse, notebook and a pair of glasses',
    cover_title: 'sample image 2',
    detail: '/article.html?id=2',
    archived: true,
  },
  {
    id: 3,
    title: 'Hello SPA',
    intro: 'This is text should be bolded',
    cover_image: 'https://picsum.photos/seed/3/200',
    cover_alt: 'a small waterfall in the forest',
    cover_title: 'sample image 3',
    detail: '/article.html?id=3',
    passed: true,
    highlight: true,
  },
]

app.get('/articles', (req, res) => {
  res.json(articles)
})

app.get('/article', (req, res) => {
  let article = articles.find(article => article.id == +req.query.id!)
  if (!article) {
    res.status(404).json({ error: 'article not found' })
    return
  }
  res.json(article)
})

let port = env.PORT
app.listen(port, () => {
  print(port)
})
