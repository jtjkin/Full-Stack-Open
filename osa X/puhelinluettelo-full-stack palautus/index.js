require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :POST-info'))

morgan.token('POST-info', (req, res) => { 
    return JSON.stringify(req.body)
})

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people.map(single => single.toJSON()))
    })
})

app.get('/info', (req, res) => {
    Person.find({}).then(people => {
        res.send(
            `<p>Phonebook has info for ${people.length} people</p>
            <p>${Date()}</p>`
        )
    })
    
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if(person) {
            res.json(person.toJSON())
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        }).catch(error => next(error)) 
})

app.put('/api/persons/:id', (req, res) => {
    Person.findByIdAndUpdate(req.params.id,
        {phonenumber: req.body.phonenumber},
        {upsert: true, new: true}
    ).then(result => {
        res.json(result)
    })
})


app.post('/api/persons', (req, res, next) => {
    const body = req.body

    const newPerson = new Person({
        name: body.name,
        phonenumber: body.phonenumber,
    })

    newPerson.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    }).catch(error => next(error))

})

const unknownEndpoint = (request, response) => {
    response.status(404).status({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(404).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})