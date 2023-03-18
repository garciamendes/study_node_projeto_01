// Node
import { randomUUID } from 'node:crypto'

// Local
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()
export const routes = [
  {method: 'GET',
    path: buildRoutePath('/users'),
    handler: (request, response) => {
      const { search } = request.query

      const data = JSON.stringify(database.select('users', search ? {
        name: search,
        email: search
      } : null))
      return response.end(data)
    }
  },
  {method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (request, response) => {
      const { id } = request.params
      database.delete('users', id)

      return response.writeHead(204).end()
    }
  },
  {method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (request, response) => {
      const { id } = request.params
      const { name, email } = request.body

      const data = { name, email }
      database.update('users', id, data)
      return response.writeHead(200).end()
    }
  },
  {method: 'POST',
    path: buildRoutePath('/users'),
    json: true,
    handler: (request, response) => {
      const { name, email } = request.body

      const data = {
        id: randomUUID(),
        name,
        email
      }

      database.insert('users', data)
      return response.writeHead(201).end()
    }
  },

]