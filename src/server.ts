import express from 'express'
import compression from 'compression'
import cors from 'cors'
import schema from './schema'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'
import expressPlayGround from 'graphql-playground-middleware-express'

const app = express()

app.use('*', cors())

app.use(compression())

app.get('/', expressPlayGround({
    endpoint: '/graphql'
}))

const server = new ApolloServer({
    schema,
    introspection: true
})

server.applyMiddleware({ app })

const PORT = 5200

const httpServer = createServer(app)

httpServer.listen({
    port : PORT
}, () => console.log(`Server up on http://localhost:${PORT}`))