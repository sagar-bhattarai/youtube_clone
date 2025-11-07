const express = require('express')
const app = express()
require('dotenv').config()

app.get('/', (req, res) => {
  res.send(`<div style="display:flex; justify-content:center; align-items:center; flex-direction:column;height:100%;color:#0fb34b;background:#0c0c0c"> <h1 >Dhog garey mami buwa !!!</h1><h2>jay shree krishna (bishow rup)</h2></div>`);
})

app.listen(process.env.PORT,()=>{
    console.log(`app is listening on port:: ${process.env.PORT}`)
})
