## Todos

### Create

POST http://localhost:3000/api/todos/

body (raw):

- {
- "content": "My new todo item"
- }

Content-Type:

- application/json

### Read

GET http://localhost:3000/api/todos/

### Update

PUT http://localhost:3000/api/todos/{id}

body (raw):

- {
- "content": "Updated todo item"
- }

Content-Type:

- application/json

### DESTROY

DELETE http://localhost:3000/api/todos/{id}
