const express = require('express')
const db = require('monk')('localhost/events')
const app = express()
const port = 3000


app.use((req, res, next) => {
  console.log(req.url)
  next()
})

app.get('/allevents', (req, res) => {

  const events = db.get('events');

  events.find({},{_id:false}).then((result)=> {
   res.json(result);
  });

 
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  console.log('To down the server: ctrl + c')
});
