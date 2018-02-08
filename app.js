const express = require('express');
const router = require('./router/router.js')
const app = express()


app.get('/insert',router.insert)
app.get('/remove',router.remove)
app.get('/search',router.search)
app.get('/sort',router.sort)
app.get('/update',router.updateInfo)
app.listen(3000,() => {
  console.log('serve in on port 3000')
})
