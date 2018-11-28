const Koop = require('koop')
const providers = require('./providers.json')

// load local environment variables
require('dotenv').config()

// initiate a koop app
const koop = new Koop()

// register koop providers
providers.forEach((provider) => {
  koop.register(require(provider))
})

const welcomeMessage = `
Welcome to Koop!

Installed Providers:
${providers.join('\n')}
`

// This is how you implement additional arbitrary routes on the Koop server
koop.server.get('/', (req, res) => {
  res.status(200).send(welcomeMessage)
})

const port = process.env.PORT || 8080

// start the server
koop.server.listen(port, () => koop.log.info(`Koop server listening at ${port}`))
