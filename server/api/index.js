const express = require('express')
const app = express()
module.exports = {path: '/api', handler: app}

const adminRoutes = require('./routes/admin')
const rootRoutes = require('./routes/root')
const userRoutes = require('./routes/user')
const sampleRoutes = require('./routes/sample')
const samplesRoutes = require('./routes/samples')
const usersSamplesRoutes = require('./routes/usersSamples')


app.use(express.json())

app.use('/admin', adminRoutes)
app.use('', rootRoutes)
app.use('/sample', sampleRoutes)
app.use('/samples', samplesRoutes)
app.use('/user/', userRoutes)
app.use('/users/:uuid/samples', usersSamplesRoutes)

