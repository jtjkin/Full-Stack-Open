const { ApolloServer, gql, UserInputError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const pubsub = new PubSub()

const JWT_PASSWORD = process.env.JWT_PASSWORD

const Author = require('./schemas/authorSchema')
const Book = require('./schemas/bookSchema')
const User = require('./schemas/userSchema')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log('attempt connecting to MongoDB')

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
      ): [Book]
    allAuthors: [Author]
    me: User
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String
    ) : User
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ) : Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
    login(
      username: String!
      password: String!
    ) : Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre === undefined && args.author === undefined) {
        return Book.find({}).populate('author')
      }

      const books = await Book.find({}).populate('author')
      const authors = await Author.find({})

      if (args.genre === undefined) {
        const newSetOfBooks = books.filter(book => 
          {
            const foundAuthor = authors.find(author => author.name === args.author)
            if (foundAuthor === undefined) {
              return false
            }

            return String(book.author) === String(foundAuthor._id)
          }
        )
        return newSetOfBooks
      } else if (args.author === undefined) {
        return books.filter(book => book.genres.includes(args.genre))
      }

      return books.filter(book => {
        const foundAuthor = authors.find(author => author.name === args.author)
            if (foundAuthor === undefined) {
              return false
            }

        if (String(book.author) === String(foundAuthor._id) && book.genres.includes(args.genre)) {
          return book
        }
      })
    },
    allAuthors: () => Author.find({}),
  },

  Author: {
    bookCount: async (root) => {
      let numberOfBooks = 0
      const books = await Book.find({})

      books.map(book => {
        if (String(book.author) === String(root._id)) {
          numberOfBooks++
        }
      })

      return numberOfBooks
    },
  },

  Mutation: {
    createUser: (root, args) => {
      const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username})

      if(!user || args.password !== 'secret') {
        throw new UserInputError('Wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }
      
      return {value: jwt.sign(userForToken, JWT_PASSWORD)}
    },
    addBook: async (root, args, { currentUser }) => {
      if (currentUser === undefined) {
        throw new UserInputError('Invalid token')
      }

      if(args.title.length === 0) {
        throw new UserInputError('Title is missing, please add a title', {
          invalidArgs: args.title
        })
      }

      if(args.author.length === 0) {
        throw new UserInputError('Authors name is missing, please add an author', {
          invalidArgs: args.author
        })
      }

      if(args.published === 0) {
        throw new UserInputError('Publishing year is missing, please add the publishing year', {
          invalidArgs: args.published
        })
      }
 
      const existingAuthor = await Author.findOne({name: args.author})

      if (existingAuthor === null) {
        const newAuthor = new Author({name: args.author})
        const newBook = new Book({...args, author: newAuthor})

        try {
          await newAuthor.save()
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

        try {
          await newBook.save()
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
  
        return newBook
      }
      
      const newBook = new Book({...args, author: existingAuthor})

      try {
        await newBook.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', {bookAdded: newBook})
      return newBook
    },
    editAuthor: async (root, args, {currentUser}) => {
      if (currentUser === undefined) {
        throw new UserInputError('Invalid token')
      }

      if(args.setBornTo === 0) {
        throw new UserInputError('Year cannot be blank, please provide a year', {
          invalidArgs: args.setBornTo
        })
      }

      let author = await Author.findOne({name: args.name})

      if(author === undefined) {
        throw new UserInputError('Author not in database', {
          invalidArgs: args.name
        })
      }
      
      author.born = args.setBornTo 
      
      return author.save()
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null

    if(auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_PASSWORD
      )
      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server running at ${url}`)
  console.log(`Subscriptions running at ${subscriptionsUrl}`)
})