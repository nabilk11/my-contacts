import express from 'express';
import mongoose from 'mongoose'


// Initialize express app
const app = express()


// middleware



// routes


// server config

const PORT = process.env.PORT || 8000

// listener
app.listen(PORT, () => console.log(`My Contacts is Live on port : ${PORT}` ))


