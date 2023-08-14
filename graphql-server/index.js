
/** ======================= GraphQL ========================================
 * 
 * GraphQL is a query language for APIs (Application Programming Interfaces) 
 * and a server-side runtime for executing those queries by using a type 
 * system you define for your data. It was developed by Facebook in 
 * 2012 and released as an open-source project in 2015.
 * 
 * GraphQL allows clients to request exactly the data they need and nothing more.
 * 
 * In GraphQL, clients send queries to the server specifying the structure of 
 * the data they need and the server responds with the requested data in a 
 * format that matches the structure of the query.
 * 

Key features:

1. **Single Endpoint:** Unlike REST APIs with multiple endpoints for different 
   resources, GraphQL typically uses a single endpoint for all data requests.

2. **Strong Typing:** GraphQL uses a schema to define the types of data that 
   can be queried and the relationships between them. This enforces strong 
   typing, making it easier to understand and work with the data.

3. **Flexibility:** Clients can ask for exactly the data they need, avoiding 
   over-fetching and under-fetching. This is particularly useful for mobile 
   and web applications where bandwidth and performance are crucial.

4. **Introspection:** GraphQL APIs are self-documenting. Clients can query the 
   schema to understand what types are available and how they can be queried.

5. **Real-time Data:** GraphQL supports subscriptions, which allow clients 
   to receive real-time updates when specific data changes on the server.

6. **Batching:** Clients can send multiple queries in a single request, 
   reducing the number of round-trips between the client and server.

7. **Backwards Compatibility:** Adding new fields or changing the structure 
   of the API does not necessarily break existing clients, as clients request
   only the fields they need.

GraphQL has gained significant popularity in recent years due to its ability 
to solve many of the challenges associated with building and consuming APIs. 
It's used by many companies and organizations as an alternative to traditional 
REST APIs for building more efficient, flexible, and responsive applications.

1. mkdir graphQL-tutorial

2. cd graphQL-tutorial

3. npm init 

4. npm install @apollo/server graphql

5. npm install uuid 

https://www.apollographql.com/docs/apollo-server/

*/

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

let persons = [
  {
    name: "Juan Pablo",
    phone: "999-1231543",
    street: "Caimito Street",
    city: "Imus",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Pedro Cruz",
    phone: "919-2532342",
    street: "Avocado Street",
    city: "Pasig",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Micha Gagabo-an",
    street: "Adalla Street",
    city: "Makati",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
]

// Scalar type
const typeDefs = `
  type Address {
    street: String!
    city: String! 
  }

  enum YesNo {
    YES
    NO  
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person

    editNumber(
      name: String!
      phone: String! 
    ): Person 
  }
`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if(!args.phone) {
        return persons
      }
      const byPhone = (person) => 
        args.phone === 'YES' ? person.phone : !persons.byPhone
      return persons.filter(byPhone)
    },
    findPerson: (root, args) =>
      persons.find(p => p.name === args.name)
  },
  Person: {
    address: ({ street, city}) => {
      return {
        street,
        city,
      }
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find(p => p.name === args.name)) {
        /*
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name,
        })
        */
        throw new GraphQLError('Name must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          },
        })
      }

      const person = { ...args, id: uuid() }
      persons = persons.concat(person)
      return person
    },
    editNumber: (root, args) => {
      const person  = persons.find(p => p.name ===args.name)
      if (!person) {
        return null
      }

      const updatedPerson = { ...person, phone: args.phone }
      persons = persons.map(p => p.name === args.name ? updatedPerson : p)
      return updatedPerson
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

/*
Examples queries:

query {
  personCount
}

Response: 

{
  "data": {
    "personCount": 3
  }
}

query {
  allPersons {
    name
    phone
  }
}

Response:

{
  "data": {
    "allPersons": [
      {
        "name": "Juan Pablo",
        "phone": "999-1231543",
      },
      {
        "name": "Pedro Cruz",
        "phone": "919-2532342"
      },
      {
        "name": "Micha Gagabo-an",
        "phone": null
      }
    ]
  }
}

query {
  findPerson(name: "Juan Pablo") {
    phone 
    city 
    street
    id
  }
}

Response:

{
  "data": {
    "findPerson": {
      "name": "Juan Pablo",
      "phone": "999-1231543",
      "street": "Caimito Street",
      "city": "Imus",
      "id": "3d594650-3436-11e9-bc57-8b80ba54c431"
    }
  }
}

query {
  findPerson(name: "Alexander Cruz") {
    phone 
  }
}

Response:

{
  "data": {
    "findPerson": null
  }
}

*/