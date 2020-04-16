const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://puhelinluettelo-app:${password}@cluster0-oaqhk.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})


const phonebookSchema = new mongoose.Schema({
    name: String,
    phonenumber: String,
})

const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person.name, person.phonenumber)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        phonenumber: process.argv[4],
    })

    person.save().then(response => {
        console.log(`added ${response.name} number ${response.phonenumber} to phonebook`)
        mongoose.connection.close()
    })
}