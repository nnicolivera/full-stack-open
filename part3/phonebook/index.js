require('dotenv').config()
const express = require('express')
const Person = require('./models/person')

const app = express()

const morgan = require('morgan')

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body);
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))
app.use(express.json())

app.get('/', (request, response) => response.send('<h1>Hello World!</h1>'))

app.get('/info', (request, response) => {
    Person.countDocuments().then(entries => {
        const date = new Date()
        const info = `
                    <p>Phonebook has info for ${entries} people</p>
                    <p>${date}</p>
                    `
        response.send(info)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => response.json(persons))
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => response.json(person))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'person data is missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => response.json(savedPerson))
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(response.status(204).end())
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)