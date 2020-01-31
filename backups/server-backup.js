const cacheableResponse = require('cacheable-response')
const express = require('express')
const next = require('next')


const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

//https://www.w3schools.in/wp-json/wp/v2/categories
//https://www.w3schools.in/wp-json/wp/v2/posts?per_page=100&page=9

// const ssrCache = cacheableResponse({
//   ttl: 1000 * 60 * 60, // 1hour
//   get: async ({ req, res, pagePath, queryParams }) => ({
//     data: await app.renderToHTML(req, res, pagePath, queryParams),
//   }),
//   send: ({ data, res }) => res.send(data),
// })

app.prepare().then(() => {
  const server = express()
  //console.log('process', process)
  
  //server.get('/', (req, res) => ssrCache({ req, res, pagePath: '/' }))

  // server.get('/blog/:id', (req, res) => {
  //   const queryParams = { id: req.params.id }
  //   const pagePath = '/blog'
  //   return ssrCache({ req, res, pagePath, queryParams })
  // })

  server.get('/', async (req, res) => {
    console.log("Get request index");
    const pagePath = "/index";
    const queryParams = Object.assign(req.query, req.params);
    const htmlResponse = await app.renderToHTML(
      req,
      res,
      pagePath,
      queryParams
    );

    console.log(htmlResponse);

    return res.send(htmlResponse);
  })

  server.get('*', async (req, res) => {
    console.log('Get request')

    //app.sendHTML(req, res, '<div>This is testing.</div>')

    // return renderAndCache(req, res, '/post', Object.assign(
    //   req.query,
    //   req.params
    // ));
    // const pagePath = '/index'
    // const queryParams = Object.assign(
    //   req.query,
    //   req.params
    // )
    // const htmlResponse = await app.renderToHTML(req, res, pagePath, queryParams)
    
    // //app.sendHTML(req, res, htmlResponse)

    // res.send(htmlResponse)

    return handle(req, res);
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
