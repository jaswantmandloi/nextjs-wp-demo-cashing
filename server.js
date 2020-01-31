const express = require('express')
const next = require('next')
const handler = require('./server/handler').handler
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // server.all('*', (req, res) => {
  //   console.log(req.path)
  //   return handle(req, res)
  // })

  server.all('*', handler(app, handle))

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
