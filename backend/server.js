// const express = require('express')
import express from "express";
const app = express()
// require('dotenv').config()

app.get('/api/naman', (req, res) => {
  const naman = {
    parent:"Dhog garey mami buwa !!!",
    god:"jay shree krishna (bishow rup)"
  }
  res.send(naman);
})
const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`app is listening on port:: ${process.env.PORT || port} `)
})
