const express = require('express')
const app = express()
module.exports = {path: '/api', handler: app}

const adminRoutes = require('./routes/admin')
const rootRoutes = require('./routes/root')
const sampleRoutes = require('./routes/sample')


app.use(express.json())

app.use('/admin', adminRoutes)
app.use('', rootRoutes)
app.use('/sample', sampleRoutes)

