const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
//app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :POST-info'))

morgan.token('POST-info', (req, res) => { 
    return JSON.stringify(req.body)
})

let persons = [
    {
        id: 1,
        name: "Esko Valtaoja",
        phonenumber: "123456678"
    },
    {
        id: 2,
        name: "Eskon sisko",
        phonenumber: "987654321"
    },
    {
        id: 3,
        name: "Älä vastaa (Eskon isä)",
        phonenumber: "256789123"
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${Date()}</p>`
    )
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
    
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    const nameIsAlreadyThere = persons.find(person => 
        person.name === body.name)

    if (!body.name || !body.phonenumber) {
        res.status(400).json({
            error: 'name or phonenumber missing'
        })
    } else if (nameIsAlreadyThere) {
        res.status(400).json({
            error: 'name must be unique' 
        })
    } else {
        const newPerson = {
            id: randomId(),
            name: body.name,
            phonenumber: body.phonenumber,
        }
    
        persons = persons.concat(newPerson)
        res.json(newPerson)
    }

})

const randomId = () => {
    return Math.floor(Math.random() * (1000 - 0 + 1) ) + 0
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})