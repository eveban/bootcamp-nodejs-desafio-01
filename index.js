const express = require('express');
const nunjucks = require('nunjucks')

const server = express();

nunjucks.configure('views', {
  autoescape: true,
  express: server,
  watch: true
})

server.set('view engine', 'njk')
server.use(express.urlencoded({ extended: false }))

const checkAgeQueryParam = (req, res, next) => {
  const { idade } = req.query;
  if (!idade) {
    return res.redirect('/');
  }
  return next();
}

server.get('/', (req, res) => {
  return res.render('start')
})

server.get('/menor', checkAgeQueryParam, (req, res) => {
  const { idade } = req.query

  return res.render('menor', { idade })
})

server.get('/maior', checkAgeQueryParam, (req, res) => {
  const { idade } = req.query

  return res.render('maior', { idade })
})

server.post('/check', (req, res) => {
  const { idade } = req.body
  if (idade >= 18) {
    return res.redirect(`/maior?idade=${idade}`)
  } else {
    return res.redirect(`/menor?idade=${idade}`)
  }
})
server.listen(3333);