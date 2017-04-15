const express = require('express')
const app = express()
const port = 3000

app.get('/allevents', (req, res) => res.json({oi: 'hello'}))

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  console.log('To down the server: ctrl + c')
})
