'use strict';

const bodyParser = require('body-parser')
const env = require('node-env-file')
const express = require('express')
const swaggerJSDoc = require('swagger-jsdoc')

const options = {
  swaggerDefinition: {
    info: {
      title: 'log-server',
      version: '1.0.0'
    },
    basePath: '/log-server'
  },
  apis: ['./server.js']
}

const swaggerSpec = swaggerJSDoc(options)

env(__dirname + '/.env')
const PORT = 8080


const app = express()
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.disable('etag')
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.get('/', function (req, res) {
  res.send('Log Server v1.0')
})
app.get('/api-docs.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

/**
 * @swagger
 * /log:
 *   put:
 *     description: Log an event.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: dataObject
 *         description: Event details
 *         in: body
 *         required: true
 *         type: object
 *         items:
 *           type: object
 *     responses:
 *       200:
 *         description: Successful request
 *       500:
 *         description: Error fetching intents from Firebase
 */
app.post('/log', function (req, res) {
  console.log('received body:\n', req.body)
  res.send({ status: 'OK' })
})

app.listen(PORT)
console.log('Log server running on port:' + PORT)
