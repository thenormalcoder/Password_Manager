const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const bodyparser=require('body-parser')
// or as an es module:
// import { MongoClient } from 'mongodb'
const cors=require('cors')
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'Word_Wrap';
const port = process.env.PORT || 3000
const dotenv= require('dotenv')
app.use(bodyparser.json())
app.use(cors())
dotenv.config()
// console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working
 client.connect();
app.get('/', async(req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('wrapped_passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
// for saving a password
app.post('/', async(req, res) => {
  const password=req.body
  const db = client.db(dbName);
  const collection = db.collection('wrapped_passwords');
  const findResult = await collection.insertOne (password)
  res.send({success:true ,result: findResult})
})

// deleting a password
app.delete('/', async(req, res) => {
  const password=req.body
  const db = client.db(dbName);
  const collection = db.collection('wrapped_passwords');
  const findResult = await collection.deleteOne(password)
  res.send({success:true ,result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
