const express = require('express')
const app = express()
module.exports = {path: '/api', handler: app}

const adminRoutes = require('./routes/admin')
const rootRoutes = require('./routes/root')

app.use(express.json())

app.use('/admin', adminRoutes)
app.use('', rootRoutes)

