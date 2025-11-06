const express = require('express')
const app = express()
require('dotenv').config()

app.get('/', (req, res) => {
  res.send(`<h1 style="display:flex; justify-content:center; align-items:center;height:100%;color:#0fb34b;background:#0c0c0c">Dhog garey mami buwa !!!</h1>`);
})

app.listen(process.env.PORT,()=>{
    console.log(`app is listening on port:: ${process.env.PORT}`)
})
