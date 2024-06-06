import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();

const database = new DatabaseMemory()

server.post('/user', (request, reply) => {
    const {name, cpf, phone, email} = request.body
    
    database.create({
        name,
        cpf,
        phone,
        email
    })

    return reply.status(201).send()
})

server.get('/user', () => {
    const users = database.list()

    return users
})

server.put('/user/:id', (request, reply) => {
    const userId = request.params.id
    const {name, cpf, phone, email} = request.body

    const user = database.update(userId, {
        name,
        cpf,
        phone,
        email
    });

    return reply.status(204).send()
})
server.delete('/user/:id', (request, reply) => {
    const userId = request.params.id

    database.delete(userId)

    return reply.status(204).send()
})

server.listen({
    port: 3333
});