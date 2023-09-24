import { checkbox, object, string } from 'cast.ts'
import { Router } from 'express'

export let api = Router()

type Article = {
  id: number
  title: string
  tags: string[]
  intro: string
  cover_image: string
  cover_alt: string
  cover_title: string
  detail: string
  archived?: boolean
  passed?: boolean
  highlight?: boolean
}
let articles: Article[] = [
  {
    id: 1,
    title: 'Hello World',
    tags: ['tag1', 'tag2', 'tag3'],
    intro: 'This is a sample article',
    cover_image: 'https://picsum.photos/seed/1/200',
    cover_alt: 'brown tune photo of bridge',
    cover_title: 'sample image 1',
    detail: '/article.html?id=1',
  },
  {
    id: 2,
    title: 'Hello Blog',
    tags: ['tag1'],
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
    title: 'Hello Article',
    tags: [],
    intro: 'This is text should be bolded',
    cover_image: 'https://picsum.photos/seed/3/200',
    cover_alt: 'a small waterfall in the forest',
    cover_title: 'sample image 3',
    detail: '/article.html?id=3',
    passed: true,
    highlight: true,
  },
]

api.get('/articles', (req, res) => {
  res.json(articles)
})

api.get('/article', (req, res) => {
  let article = articles.find(article => article.id == +req.query.id!)
  if (!article) {
    res.status(404).json({ error: 'article not found' })
    return
  }
  res.json(article)
})

let postArticleRequestParser = object({
  body: object({
    title: string({ nonEmpty: true }),
    intro: string({ nonEmpty: true }),
    cover_image: string({ nonEmpty: true }),
    cover_alt: string({ nonEmpty: true }),
    cover_title: string({ nonEmpty: true }),
    archived: checkbox(),
    passed: checkbox(),
    highlight: checkbox(),
  }),
})
api.post('/articles', (req, res) => {
  let { body } = postArticleRequestParser.parse(req)
  let id = articles.reduce((id, article) => Math.max(id, article.id), 0) + 1
  articles.push({
    id,
    detail: '/article.html?id=' + id,
    tags: [],
    ...body,
  })
  res.json({ id })
})

let counter = 0
api.get('/counter', (req, res) => {
  res.json(counter)
})
api.post('/counter/inc', (req, res) => {
  res.json(++counter)
})
api.post('/counter/dec', (req, res) => {
  res.json(--counter)
})
api.patch('/counter', (req, res) => {
  res.json((counter = req.body.value))
})
