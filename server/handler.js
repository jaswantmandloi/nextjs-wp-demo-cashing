
const cacheManager = require('cache-manager')
const fsStore = require('cache-manager-fs')

const diskCache = cacheManager.caching({
  store: fsStore,
  options: {
    ttl: 60 * 60 * 9000 /* seconds */,
    maxsize: 1000 * 1000 * 1000 /* max size in bytes on disk */,
    path: 'diskcache',
    preventfill: true
  }
})

const getCacheResponse = pagePath => {
  return new Promise((resolve, reject) => {
    diskCache.get(pagePath, function (err, result) {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

const handler = (app, handle) => {
  return async (req, res) => {
    const path = req.path
    if (path === '/') {
      const pagePath = '/index'

      const htmlCacheResponse = await getCacheResponse(pagePath)
      // console.log('From cache', htmlCacheResponse)
      if (htmlCacheResponse) {
        console.log('From cache')
        return res.send(htmlCacheResponse)
      }

      const queryParams = Object.assign(req.query, req.params)
      const htmlResponse = await app.renderToHTML(
        req,
        res,
        pagePath,
        queryParams
      )
      diskCache.set(pagePath, htmlResponse)

      // console.log(htmlResponse)

      return res.send(htmlResponse)
    }

    return handle(req, res)
  }
}

module.exports = { handler }

// options.ttl = 60; // time to life in seconds
// options.path = "cache/"; // path for cached files
// options.preventfill = false; // prevent filling of the cache with the files from the cache-directory
// options.fillcallback = null; // callback fired after the initial cache filling is completed
// options.zip = false; // if true the cached files will be zipped to save diskspace
// options.reviveBuffers = true;
