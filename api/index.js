const express = require('express')
const app = express()
module.exports = {path: '/api', handler: app}

const adminRoutes = require('./routes/admin')
const db = require('./db')

app.use(express.json())

app.use('/admin', adminRoutes)

